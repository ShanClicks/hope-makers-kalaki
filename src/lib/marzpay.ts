const MARZPAY_BASE_URL = "https://wallet.wearemarz.com/api/v1";

function getAuthHeader() {
  const apiKey = process.env.MARZPAY_API_KEY;
  const apiSecret = process.env.MARZPAY_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error("MARZPAY_API_KEY / MARZPAY_API_SECRET is not configured.");
  }

  const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  return `Basic ${credentials}`;
}

export interface MarzPayTransaction {
  uuid: string;
  reference: string;
  status: string;
  provider_reference: string | null;
}

export interface MarzPayCollectionResponse {
  status: string;
  message: string;
  data: {
    transaction: MarzPayTransaction;
    collection: {
      amount: { formatted: string; raw: number; currency: string };
      provider: string;
      phone_number: string;
      mode: string;
    };
  };
}

export interface CollectMoneyParams {
  amount: number;
  phoneNumber: string;
  reference: string;
  description?: string;
  callbackUrl?: string;
}

async function marzpayRequest(path: string, init?: RequestInit): Promise<MarzPayCollectionResponse> {
  const response = await fetch(`${MARZPAY_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader(),
      ...init?.headers,
    },
  });

  const json = await response.json().catch(() => null);

  if (!response.ok || !json) {
    const message =
      (json && typeof json === "object" && "message" in json && String(json.message)) ||
      `MarzPay request to ${path} failed with status ${response.status}.`;
    throw new Error(message);
  }

  return json as MarzPayCollectionResponse;
}

/** Initiates a mobile money collection — the customer approves the charge via a prompt on their phone. */
export function collectMoney(params: CollectMoneyParams) {
  return marzpayRequest("/collect-money", {
    method: "POST",
    body: JSON.stringify({
      amount: params.amount,
      phone_number: params.phoneNumber,
      country: "UG",
      reference: params.reference,
      description: params.description,
      callback_url: params.callbackUrl,
    }),
  });
}

/** Looks up the current status of a collection by its MarzPay transaction UUID. */
export function getCollectionStatus(uuid: string) {
  return marzpayRequest(`/collect-money/${uuid}`, { method: "GET" });
}

/** Normalizes common Ugandan phone number formats to the +256XXXXXXXXX shape MarzPay expects. */
export function toUgandaE164(phone: string): string | null {
  const digits = phone.replace(/[^\d+]/g, "");

  if (/^\+256\d{9}$/.test(digits)) return digits;
  if (/^256\d{9}$/.test(digits)) return `+${digits}`;
  if (/^0\d{9}$/.test(digits)) return `+256${digits.slice(1)}`;
  if (/^\d{9}$/.test(digits)) return `+256${digits}`;

  return null;
}

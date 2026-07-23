// Signed session cookie for the /admin password gate. Uses Web Crypto (not Node's
// `crypto`/`Buffer`) so the same code works in both the Node.js server runtime and
// Next.js Edge middleware without any polyfills.

export const ADMIN_SESSION_COOKIE = "admin_session";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function requireSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured.");
  return secret;
}

function getKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function bufferToBase64Url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBuffer(b64url: string): ArrayBuffer {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

export async function createSessionToken(): Promise<string> {
  const secret = requireSecret();
  const expires = Date.now() + MAX_AGE_MS;
  const key = await getKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(String(expires)));
  return `${expires}.${bufferToBase64Url(signature)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;

  const [expiresStr, signatureB64] = token.split(".");
  if (!expiresStr || !signatureB64) return false;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  try {
    const secret = requireSecret();
    const key = await getKey(secret);
    const signature = base64UrlToBuffer(signatureB64);
    return await crypto.subtle.verify("HMAC", key, signature, new TextEncoder().encode(expiresStr));
  } catch {
    return false;
  }
}

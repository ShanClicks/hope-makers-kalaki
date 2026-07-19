import { SITE_CONFIG } from "@/constants/site";

export function LocationMap() {
  const { lat, lng } = SITE_CONFIG.mapCoordinates;
  const query = `${lat},${lng}`;

  return (
    <div className="overflow-hidden rounded-xl border border-border shadow-sm">
      <iframe
        title={`Map showing ${SITE_CONFIG.address}`}
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        className="h-64 w-full sm:h-80"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

import { FaWhatsapp } from "react-icons/fa6";
import { SITE_CONFIG } from "@/constants/site";
import { getWhatsAppLink } from "@/lib/utils";

export function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppLink(SITE_CONFIG.whatsapp, `Hello ${SITE_CONFIG.shortName}, I'd like to get in touch.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
    >
      <FaWhatsapp className="size-7" />
    </a>
  );
}

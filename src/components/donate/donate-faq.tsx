import { Reveal } from "@/components/common/reveal";
import { Accordion, type AccordionItemData } from "@/components/common/accordion";

const ITEMS: AccordionItemData[] = [
  {
    id: "how-mobile-money-works",
    question: "How does a mobile money donation work?",
    answer:
      "After you submit the form with your amount and MTN or Airtel number, you'll receive a USSD prompt directly on your phone. Enter your mobile money PIN there to approve the payment, and your donation is confirmed instantly — no card or bank details needed.",
  },
  {
    id: "payment-security",
    question: "Is my payment secure?",
    answer:
      "Yes. Your mobile money payment is processed directly by MarzPay, our payment processor, which connects securely to MTN and Airtel's official mobile money networks. We never see or store your mobile money PIN.",
  },
  {
    id: "receipt-confirmation",
    question: "Will I get a receipt or confirmation?",
    answer:
      "Yes — once you approve the payment on your phone, you'll see an on-screen confirmation, and our team is notified right away so we can follow up with you if needed.",
  },
  {
    id: "other-payment-methods",
    question: "Do you support other payment methods, like cards or PayPal?",
    answer:
      "Not yet. Mobile money and bank transfer are currently the only ways to donate. We don't have a timeline for card or PayPal support, but it's something we're keeping in mind for the future.",
  },
];

export function DonateFaq() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <div className="container-app">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">Donation FAQs</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Common questions about paying with mobile money and bank transfer.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl" delay={0.1}>
          <Accordion items={ITEMS} defaultOpenId={ITEMS[0].id} />
        </Reveal>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { PageHero } from "@/components/common/page-hero";
import { DraftNotice } from "@/components/legal/draft-notice";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions for ${SITE_CONFIG.name}.`,
};

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms & Conditions" />
      <section className="container-app py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <DraftNotice />

          <div className="flex flex-col gap-8 text-sm leading-7 text-muted-foreground">
            <p>Last updated: [insert date]</p>

            <div>
              <h2 className="text-lg text-foreground">1. Acceptance of Terms</h2>
              <p className="mt-2">
                By accessing and using this website, you agree to be bound by these Terms &amp;
                Conditions. If you do not agree, please do not use this site.
              </p>
            </div>

            <div>
              <h2 className="text-lg text-foreground">2. Use of Site</h2>
              <p className="mt-2">
                This website is provided for informational purposes about {SITE_CONFIG.name} and
                its programs. You agree not to misuse the site or attempt to disrupt its normal
                operation.
              </p>
            </div>

            <div>
              <h2 className="text-lg text-foreground">3. Donations</h2>
              <p className="mt-2">
                Donation pledges submitted through this site are expressions of intent to give and
                do not constitute an immediate financial transaction. We will follow up separately
                with secure payment instructions. [Insert refund policy once finalized.]
              </p>
            </div>

            <div>
              <h2 className="text-lg text-foreground">4. Intellectual Property</h2>
              <p className="mt-2">
                All content on this site, including text, images, and logos, is the property of
                {" "}
                {SITE_CONFIG.name} unless otherwise noted, and may not be reproduced without
                permission.
              </p>
            </div>

            <div>
              <h2 className="text-lg text-foreground">5. Limitation of Liability</h2>
              <p className="mt-2">
                {SITE_CONFIG.name} is not liable for any damages arising from the use of, or
                inability to use, this website.
              </p>
            </div>

            <div>
              <h2 className="text-lg text-foreground">6. Governing Law</h2>
              <p className="mt-2">
                [Insert the governing jurisdiction, e.g. the laws of the Republic of Uganda.]
              </p>
            </div>

            <div>
              <h2 className="text-lg text-foreground">7. Contact Us</h2>
              <p className="mt-2">
                Questions about these terms can be directed to{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary hover:underline">
                  {SITE_CONFIG.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

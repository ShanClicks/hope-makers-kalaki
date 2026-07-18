import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { PageHero } from "@/components/common/page-hero";
import { DraftNotice } from "@/components/legal/draft-notice";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_CONFIG.name}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />
      <section className="container-app py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <DraftNotice />

          <div className="flex flex-col gap-8 text-sm leading-7 text-muted-foreground">
            <p>Last updated: [insert date]</p>

            <div>
              <h2 className="text-lg text-foreground">1. Information We Collect</h2>
              <p className="mt-2">
                We may collect information you provide directly to us, such as your name, email
                address, phone number, and any message content, when you fill out our contact or
                donation forms. We do not collect payment card information through this website.
              </p>
            </div>

            <div>
              <h2 className="text-lg text-foreground">2. How We Use Information</h2>
              <p className="mt-2">
                Information you submit is used to respond to your inquiries, process donation
                pledges, and communicate with you about {SITE_CONFIG.name}&apos;s programs. We do
                not sell your personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-lg text-foreground">3. Cookies &amp; Analytics</h2>
              <p className="mt-2">
                This website may use cookies or similar technologies to understand how visitors
                use the site. [Insert details of any analytics or tracking tools actually used.]
              </p>
            </div>

            <div>
              <h2 className="text-lg text-foreground">4. Third-Party Services</h2>
              <p className="mt-2">
                We use third-party services to operate this website, including email delivery for
                contact and donation form submissions. These providers process data on our behalf
                and are bound by their own privacy and security practices.
              </p>
            </div>

            <div>
              <h2 className="text-lg text-foreground">5. Data Security</h2>
              <p className="mt-2">
                We take reasonable steps to protect the information you share with us, but no
                method of transmission over the internet is completely secure.
              </p>
            </div>

            <div>
              <h2 className="text-lg text-foreground">6. Your Rights</h2>
              <p className="mt-2">
                You may request access to, correction of, or deletion of your personal information
                by contacting us using the details below.
              </p>
            </div>

            <div>
              <h2 className="text-lg text-foreground">7. Contact Us</h2>
              <p className="mt-2">
                Questions about this policy can be directed to{" "}
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

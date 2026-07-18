import { SITE_CONFIG } from "@/constants/site";

export function OurStory() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <div className="container-app">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl sm:text-4xl">Our Story</h2>

          <div className="mt-8 flex flex-col gap-5 text-base leading-7 text-muted-foreground">
            <p>{SITE_CONFIG.name} was born out of heartbreak and hope.</p>
            <p>
              It began with one woman&apos;s first visit to Kalaki, a remote community that
              immediately won her over with its warmth, talent, and hospitality. She chose to
              stay, to marry into the community, and to become part of it fully.
            </p>
            <p>
              But beneath the welcome, she saw a community losing its potential. Talented,
              hardworking people were held back by challenges that had become normalized: idle
              youth, teenage pregnancies no longer making headlines, early marriages going
              unquestioned, and families trapped in poverty by limited access to education.
            </p>
            <p>
              The breaking point came when a friend&apos;s 16-year-old daughter, still in school,
              became pregnant. Instead of protection, she was married off, and a fine of one cow,
              locally known as <em>toyo</em>, settled the matter. In a moment, two young lives
              were redirected into a future neither of them had chosen.
            </p>
            <p>
              That moment made it clear: someone had to stand up for the community and offer real
              solutions. In 2022, that conviction brought together a group of friends who shared
              the same vision, and {SITE_CONFIG.name} was founded.
            </p>
            <p>
              Today, we&apos;re seeking partnerships and collaborations to hold hands with us and
              build Kalaki, together.
            </p>
          </div>

          <blockquote className="mt-10 border-l-4 border-primary bg-secondary/40 px-6 py-5 text-lg italic leading-8 text-foreground">
            &ldquo;We believe every young girl and boy in Kalaki deserves a future they choose for
            themselves, not one decided for them.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}

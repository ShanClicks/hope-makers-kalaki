import { SITE_CONFIG } from "@/constants/site";
import { Reveal } from "@/components/common/reveal";

export function IntroVideo() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <div className="container-app">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">See Our Impact</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            A short look at the work we do and the community we do it with.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-4xl" delay={0.1}>
          {/* TODO: placeholder video — replace with real Home page intro video once uploaded, currently reusing founder's story video ID */}
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              src="https://www.youtube.com/embed/yh5qiG2N82A"
              title={`See Our Impact — ${SITE_CONFIG.name}`}
              className="absolute inset-0 size-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

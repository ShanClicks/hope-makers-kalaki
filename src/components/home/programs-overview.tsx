import { ProgramCards } from "@/components/programs/program-cards";
import { Reveal } from "@/components/common/reveal";

export function ProgramsOverview() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <div className="container-app">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">Our Programs</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Four focus areas working together to build a stronger, healthier Kalaki District.
          </p>
        </Reveal>

        <div className="mt-12">
          <ProgramCards />
        </div>
      </div>
    </section>
  );
}

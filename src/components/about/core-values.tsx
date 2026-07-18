import { CORE_VALUES } from "@/services/mock";
import { ICON_MAP } from "@/lib/icons";

export function CoreValues() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <div className="container-app">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">Our Core Values</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            These principles guide every program and partnership we build.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((value) => {
            const Icon = ICON_MAP[value.icon];
            return (
              <div
                key={value.id}
                className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                  {Icon ? <Icon className="size-6" /> : null}
                </span>
                <h3 className="text-lg">{value.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

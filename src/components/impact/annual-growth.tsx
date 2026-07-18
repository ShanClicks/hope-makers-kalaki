import { ANNUAL_GROWTH } from "@/services/mock";

export function AnnualGrowth() {
  const maxBeneficiaries = Math.max(...ANNUAL_GROWTH.map((d) => d.beneficiaries));

  return (
    <section className="container-app py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl sm:text-4xl">Growth Over Time</h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          Beneficiaries reached each year since our founding, as our programs have expanded.
        </p>
      </div>

      <div className="mx-auto mt-12 flex max-w-3xl items-end justify-between gap-3 sm:gap-6">
        {ANNUAL_GROWTH.map((datum) => {
          const heightPercent = Math.max((datum.beneficiaries / maxBeneficiaries) * 100, 4);
          return (
            <div key={datum.year} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-semibold text-foreground sm:text-sm">
                {datum.beneficiaries.toLocaleString()}
              </span>
              <div className="flex h-40 w-full items-end sm:h-56">
                <div
                  className="w-full rounded-t-md bg-primary transition-all"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground sm:text-sm">{datum.year}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

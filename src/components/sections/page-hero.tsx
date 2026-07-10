export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section
      data-path-target="true"
      className="border-b border-border bg-muted/30 pt-32 pb-16 lg:pt-40 lg:pb-20"
    >
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </span>
        <h1 className="font-display mt-3 text-4xl italic leading-tight md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

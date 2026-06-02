type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-black text-ink md:text-3xl">{title}</h2>
      </div>
      {description ? <p className="max-w-xl text-sm leading-6 text-gray-500">{description}</p> : null}
    </div>
  );
}

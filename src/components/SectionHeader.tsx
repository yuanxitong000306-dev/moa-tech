type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex flex-col justify-between gap-2 sm:mb-6 sm:flex-row sm:items-end sm:gap-3">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-accent sm:text-xs sm:tracking-[0.18em]">{eyebrow}</p>
        <h2 className="mt-1 text-xl font-black text-ink sm:mt-2 sm:text-2xl md:text-3xl">{title}</h2>
      </div>
      {description ? <p className="max-w-xl text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">{description}</p> : null}
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="pt-[10.667px] text-center text-[12px] font-medium tracking-[2.6667px] text-ink-label uppercase sm:text-[16px]">
      {children}
    </p>
  );
}

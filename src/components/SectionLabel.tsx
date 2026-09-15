export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="pt-[10.667px] text-center text-[16px] font-medium tracking-[2.6667px] text-ink-label uppercase">
      {children}
    </p>
  );
}

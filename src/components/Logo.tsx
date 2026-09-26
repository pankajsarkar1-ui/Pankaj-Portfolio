/**
 * The personal mark — a geometric lowercase "p". Traced from the Figma source,
 * so it scales cleanly and takes its colour from the surface it sits on
 * (`currentColor`), which the dark card backs and footer rely on.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20.1797 24"
      className={className}
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d="M20.1797 0V13.2002C20.1796 17.1765 16.9558 20.4003 12.9795 20.4004C9.61514 20.4004 6.79015 18.0924 6 14.9736V24H0V0H20.1797ZM12.9795 3.05469C9.93709 3.05472 7.47073 5.52107 7.4707 8.56348V12.8936C7.4707 15.936 9.93707 18.4023 12.9795 18.4023C16.0219 18.4023 18.4883 15.936 18.4883 12.8936V8.56348C18.4882 5.52105 16.0219 3.05469 12.9795 3.05469Z" />
    </svg>
  );
}

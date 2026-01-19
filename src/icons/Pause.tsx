type PauseProps = {
  className?: string;
};

export function Pause({ className }: PauseProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" className={className}>
      <path fill="currentColor" d="M11 7H8v10h3V7zM13 17h3V7h-3v10z" />
    </svg>
  );
}

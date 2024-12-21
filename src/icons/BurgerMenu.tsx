type BurgerMenuProps = {
  onClick: () => void;
};

export function BurgerMenu({ onClick }: BurgerMenuProps) {
  return (
    <svg
      width="26"
      height="19"
      viewBox="0 0 26 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <rect x="5.87109" y="0.395508" width="20" height="2" fill="white" />
      <rect x="0.871094" y="8.39551" width="25" height="2" fill="white" />
      <rect x="5.87109" y="16.3955" width="20" height="2" fill="white" />
    </svg>
  );
}

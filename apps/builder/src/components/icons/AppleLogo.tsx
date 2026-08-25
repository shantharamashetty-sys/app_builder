interface IconProps {
  className?: string
}

/** Apple brand mark — not available in lucide-react, so it's vendored from Figma as a component. */
export default function AppleLogo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M14.2083 16.9C13.3917 17.6917 12.5 17.6333 11.6417 17.2333C10.7333 16.8167 9.90833 16.8333 8.94167 17.2333C7.74167 17.75 7.10833 17.6 6.39167 16.9C2.325 12.7083 2.925 6.325 7.54167 6.09167C8.66667 6.15 9.45 6.70833 10.1083 6.75833C11.0917 6.55833 12.0333 5.98333 13.0833 6.05833C14.3417 6.15833 15.2917 6.65833 15.9167 7.55833C13.3167 9.11667 13.9333 12.5417 16.3167 13.5C15.8417 14.75 15.225 15.9917 14.2 16.9083L14.2083 16.9ZM10.025 6.04167C9.9 4.18333 11.4083 2.65 13.1417 2.5C13.3833 4.65 11.1917 6.25 10.025 6.04167Z"
        fill="currentColor"
      />
    </svg>
  )
}

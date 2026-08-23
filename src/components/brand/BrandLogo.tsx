interface BrandLogoProps {
  className?: string;
  alt?: string;
}

export function BrandLogo({
  className = "h-7 w-7",
  alt = "KarmaDots",
}: BrandLogoProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <img
        src="/karmadots-logo.png"
        alt={alt}
        width={256}
        height={256}
        className="h-full w-full rounded-[22%] dark:hidden"
        draggable={false}
      />
      <img
        src="/karmadots-logo-dark.png"
        alt=""
        width={256}
        height={256}
        className="hidden h-full w-full rounded-[22%] dark:block"
        draggable={false}
        aria-hidden={true}
      />
    </span>
  );
}

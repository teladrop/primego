import Image from "next/image";
import Link from "next/link";

export function Logo({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  return (
    <Link href="/" className="inline-flex items-center">
      <Image
        src="/logo.png"
        alt="WestMark Industrial Services Ltd"
        width={220}
        height={60}
        className={`h-12 w-auto object-contain ${variant === "light" ? "brightness-0 invert" : ""}`}
        priority
      />
    </Link>
  );
}

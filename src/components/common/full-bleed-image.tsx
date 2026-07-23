import Image from "next/image";

interface FullBleedImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  onError: () => void;
  /** Foreground image object-fit. Defaults to "contain" (never crops). Pass "cover" when
   * the source photos are a mismatched aspect ratio and gaps/letterboxing are worse than
   * cropping for this use case. */
  fit?: "contain" | "cover";
}

export function FullBleedImage({ src, alt, sizes, priority, onError, fit = "contain" }: FullBleedImageProps) {
  return (
    <>
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        className="scale-110 object-cover blur-2xl brightness-50"
        onError={onError}
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={fit === "cover" ? "object-cover" : "object-contain"}
        onError={onError}
      />
    </>
  );
}

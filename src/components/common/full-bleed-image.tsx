import Image from "next/image";

interface FullBleedImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  onError: () => void;
}

export function FullBleedImage({ src, alt, sizes, priority, onError }: FullBleedImageProps) {
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
        className="object-contain"
        onError={onError}
      />
    </>
  );
}

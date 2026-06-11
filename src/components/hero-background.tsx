import Image from "next/image";

type HeroBackgroundProps = {
  image: string;
  video?: string;
};

function videoMimeType(src: string): string {
  return /\.webm(\?|$)/i.test(src) ? "video/webm" : "video/mp4";
}

export function HeroBackground({ image, video }: HeroBackgroundProps) {
  if (video?.trim()) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={image || undefined}
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      >
        <source src={video} type={videoMimeType(video)} />
      </video>
    );
  }

  return (
    <Image
      src={image}
      alt=""
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
  );
}

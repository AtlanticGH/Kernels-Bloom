"use client";

import { useRef, useState } from "react";
import { HairlineRule } from "@/components/hairline-rule";

type FounderVideoProps = {
  className?: string;
  videoSrc?: string;
  videoPoster?: string;
};

export function FounderVideo({
  className = "",
  videoSrc = "/videos/founder.mp4",
  videoPoster = "/images/founder-portrait.png",
}: FounderVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    void videoRef.current?.play();
  };

  return (
    <figure className={`mx-auto max-w-kb-content ${className}`}>
      <HairlineRule width="80px" variant="gold" className="mb-kb-6" />
      <div className="relative aspect-video overflow-hidden bg-kb-chalk">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          controls={playing}
          playsInline
          preload="metadata"
          poster={videoPoster}
          aria-label="Founder story — Kernels & Bloom"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {!playing && (
          <button
            type="button"
            onClick={play}
            className="group absolute inset-0 flex items-center justify-center bg-kb-dusk/15 transition-colors duration-500 hover:bg-kb-dusk/25"
            aria-label="Play founder story"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full border-[0.5px] border-kb-parchment/70 text-kb-parchment transition-transform duration-300 group-hover:scale-105">
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="currentColor"
                aria-hidden="true"
                className="ml-0.5"
              >
                <path d="M0 0v12l10-6L0 0z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </figure>
  );
}

export function FounderVideo() {
  return (
    <div className="relative aspect-video overflow-hidden bg-kb-chalk ring-[0.5px] ring-kb-chalk">
      <video
        className="h-full w-full object-cover"
        controls
        playsInline
        preload="metadata"
        poster="/images/DSC09530.jpg"
        aria-label="Founder story — Kernels & Bloom"
      >
        <source src="/videos/founder.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default function VideoBackgroundWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={`w-full h-full overflow-hidden ${className ?? ''}`}>
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 brightness-50"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/background/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10">{children}</div>
    </main>
  );
}

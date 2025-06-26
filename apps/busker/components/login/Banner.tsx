import Image from 'next/image';

export default function Banner() {
  return (
    <section className="flex-1/4 relative font-poppins text-white min-w-sm">
      <video
        src="/background/intro.mp4"
        autoPlay
        loop
        muted
        className="h-screen object-cover brightness-50"
      />
      <Image
        src="/logo/logo.png"
        alt="Logo"
        width={120}
        height={120}
        className="absolute top-30 left-5"
      />
      <div className="absolute top-55 left-5">
        <h2 className="text-3xl font-bold mb-14">
          Feelthe VYBZ.
          <span className="block">Share your moment.</span>
        </h2>
        <p className="text-xs font-semibold">
          버스커로 등록해보세요
          <span className="block">버스킹을 위한 모든 것 VYBZ.PLATFORM</span>
        </p>
      </div>
    </section>
  );
}

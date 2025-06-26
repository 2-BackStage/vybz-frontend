import Image from 'next/image';

export default function SuggestedSection({
  data,
}: {
  data: { id: number; buskerName: string; buskerUrl: string }[];
}) {
  return (
    <section className="px-4 pb-16">
      <h2 className="text-xl font-semibold mb-4">Suggested For You</h2>

      <div className="grid grid-cols-2 gap-2">
        {data.map((item) => (
          <article
            key={item.id}
            className="relative w-full aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
          >
            <Image
              src={item.buskerUrl}
              alt={item.buskerName}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/40 px-2 py-1.5">
              <p className="text-white font-semibold text-xs line-clamp-1">
                {item.buskerName}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

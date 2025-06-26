import Image from 'next/image';

export default function FeedImageGrid({ images }: { images: string[] }) {
  return (
    <div className="w-full">
      {images.length === 1 && (
        <div className="relative w-full aspect-square">
          <Image
            src={images[0] as string}
            alt="feed"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      {images.length === 2 && (
        <div className="grid grid-cols-2 gap-1">
          {images.map((src, i) => (
            <div key={`${i}+${src}`} className="relative aspect-square">
              <Image
                src={src}
                alt={`feed-${i}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}

      {images.length === 3 && (
        <div className="grid grid-cols-3 gap-1">
          <div className="relative col-span-2 row-span-2">
            <Image
              src={images[0] as string}
              alt="feed-0"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-rows-2 gap-1">
            {images.slice(1).map((src, i) => (
              <div key={`${i}+${src}`} className="relative aspect-square">
                <Image
                  src={src}
                  alt={`feed-${i + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {images.length >= 4 && (
        <div className="grid grid-cols-2 grid-rows-2 gap-1">
          {images.slice(0, 4).map((src, i) => (
            <div key={`${i}+${src}`} className="relative aspect-square">
              <Image
                src={src}
                alt={`feed-${i}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";
import Image from "next/image";

export function SuggestedArtists({ artists }: {
  artists: { name: string; image: string }[];
}) {
  return (
    <div className="px-4 mb-20">
      <h2 className="text-2xl font-bold mb-6">Suggested For You</h2>
      <div className="grid grid-cols-2 gap-4">
        {artists.map((artist, index) => (
          <div key={index} className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#2a2a2a]">
            <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white font-semibold text-lg">{artist.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
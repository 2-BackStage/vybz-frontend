import { X } from '@repo/ui/components/icons';

export default function RecentSearch({
  data,
}: {
  data: { id: number; title: string }[];
}) {
  return (
    <section className="px-2">
      <header className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-semibold text-white">Recent Searches</h1>
        <button className="text-sm font-medium pt-3 text-fuchsia-400 hover:underline">
          Clear All
        </button>
      </header>
      {data.map((item) => (
        <article
          key={item.id}
          className="flex justify-between items-center bg-div-background rounded-lg px-4 py-4 text-base my-4"
        >
          <h2>{item.title}</h2>
          <button className="text-gray-400 hover:text-white">
            <X />
          </button>
        </article>
      ))}
    </section>
  );
}

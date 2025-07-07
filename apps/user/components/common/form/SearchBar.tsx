import { Search } from '@repo/ui/components/icons';
import { Button } from '@repo/ui/components/ui/button';

export default function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <form className="relative w-full flex items-center bg-div-background rounded-full px-4 py-2 text-white">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
      />
      <Button
        size="icon"
        className="rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-violet-500 text-black hover:opacity-90 border-none shrink-0"
      >
        <Search className="w-5 h-5" />
      </Button>
    </form>
  );
}

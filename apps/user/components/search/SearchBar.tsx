"use client";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function SearchBar({ value, onChange, onSearch }: {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
}) {
  return (
    <div className="p-4 pt-12">
      <div className="relative">
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Search artists, songs, genres..."
          className="bg-[#2a2a2a] border-none rounded-full pl-6 pr-16 py-4 text-gray-300 placeholder:text-gray-500 focus:ring-0 focus:ring-offset-0"
        />
        <Button
          size="icon"
          onClick={onSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 rounded-full w-10 h-10"
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
} 
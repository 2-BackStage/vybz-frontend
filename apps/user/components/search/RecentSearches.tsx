"use client";
import { X } from "lucide-react";
import { Button } from "../ui/button";

export function RecentSearches({ searches, onRemove, onClear }: {
  searches: string[];
  onRemove: (keyword: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="px-4 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Recent Searches</h2>
        <Button variant="ghost" className="text-purple-400 hover:text-purple-300 p-0" onClick={onClear}>
          Clear All
        </Button>
      </div>
      <div className="space-y-3">
        {searches.map((search, index) => (
          <div key={index} className="flex items-center justify-between bg-[#2a2a2a] rounded-2xl px-6 py-4">
            <span className="text-white font-medium">{search}</span>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-6 w-6" onClick={() => onRemove(search)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
} 
"use client";
import { Search, Grid3X3, User } from "lucide-react";
import { Button } from "../ui/button";

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-[#2a2a2a]">
      <div className="flex justify-around items-center py-3">
        <Button variant="ghost" size="icon" className="text-gray-400">
          <div
            className="w-6 h-6 bg-gray-400 rounded"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)" }}
          />
        </Button>
        <Button size="icon" className="bg-blue-500 hover:bg-blue-600 rounded-full w-12 h-12">
          <Search className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400">
          <Grid3X3 className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-400">
          <User className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
} 
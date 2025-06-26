'use client';

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@repo/ui/components/ui/avatar';
import { FormContext } from '@/context/FormContext';
import { use } from 'react';

export function BuskerProfileBox() {
  const { artistName, buskerProfileUrl } = use(FormContext);
  return (
    <div className="flex items-center mb-4">
      <Avatar className="w-16 h-16 ring-4 ring-white mr-4">
        <AvatarImage src={buskerProfileUrl} />
        <AvatarFallback className="bg-blue-300 text-gray-900 text-xl font-bold">
          BK
        </AvatarFallback>
      </Avatar>
      <h2 className="text-white text-xl font-bold">{artistName}</h2>
    </div>
  );
}

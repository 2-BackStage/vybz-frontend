'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { motion } from 'framer-motion';

export default function TabButtonBox({ labels }: { labels: string[] }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="w-full mb-6">
      <div className="flex relative border-b border-gray-700">
        {labels.map((label, index) => (
          <Button
            key={label}
            variant="ghost"
            className={`flex-1 rounded-none text-base font-medium ${
              activeTab === index ? 'text-white' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {label}
          </Button>
        ))}

        <motion.div
          className="absolute bottom-0 h-0.5 bg-white"
          layout
          layoutId="underline"
          initial={false}
          animate={{
            left: `${(100 / labels.length) * activeTab}%`,
            width: `${100 / labels.length}%`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>
    </section>
  );
}

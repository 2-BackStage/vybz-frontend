'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { motion } from 'framer-motion';

interface TabButtonBoxProps {
  labels: string[];
  activeTab?: number | string;
  onTabChange?: (tab: number | string) => void;
}

export default function TabButtonBox({ 
  labels, 
  activeTab: externalActiveTab, 
  onTabChange 
}: TabButtonBoxProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(0);
  
  // 외부에서 제어하는 경우와 내부에서 제어하는 경우를 구분
  const isControlled = externalActiveTab !== undefined && onTabChange !== undefined;
  const activeTab = isControlled ? externalActiveTab : internalActiveTab;
  
  const handleTabChange = (index: number) => {
    if (isControlled) {
      onTabChange(index);
    } else {
      setInternalActiveTab(index);
    }
  };

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
            onClick={() => handleTabChange(index)}
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
            left: `${(100 / labels.length) * (typeof activeTab === 'number' ? activeTab : 0)}%`,
            width: `${100 / labels.length}%`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>
    </section>
  );
}

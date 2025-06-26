import type { JSX, SVGProps } from 'react';

export type FooterItemType = {
  id: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  path: string;
};

export type EmojiCategory = {
  id: number;
  name: string;
  representativeEmoticon: string;
  emojis: string[];
};

export type EmojiDataType = {
  [key: string]: EmojiCategory;
};
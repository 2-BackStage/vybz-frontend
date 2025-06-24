import { CategoryData } from '@/data/categoryData';

type CategoryName = (typeof CategoryData)[number]['name'];
export type Category = Exclude<CategoryName, 'All'>;

export type FormContextType = {
  buskerProfileUrl: string;
  setBuskerProfileUrl: (url: string) => void;
  artistName: string;
  setArtistName: (name: string) => void;
  artistGenre: number[];
  setArtistGenre: (genre: number[]) => void;
  artistDescription: string;
  setArtistDescription: (description: string) => void;
};

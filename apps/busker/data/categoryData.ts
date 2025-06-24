import { CategoryDataType } from "@/types/ResponseDataTypes";

export const CategoryData: CategoryDataType[] = [
    {
        id: 1,
        name: "All"
    },
    {
        id: 2,
        name: "Music"
    },
    {
        id: 3,
        name: "Dance"
    },
    {
        id: 4,
        name: "Magic"
    },
    {
        id: 5,
        name: "Gag"
    },
    {
        id: 6,
        name: "Art"
    },
    {
        id: 7,
        name: "Performance Art"
    },
    {
        id: 8,
        name: "ETC"
    }
]

export const categoryColors: { [key: string]: string } = {
    'Music': 'bg-blue-600 hover:bg-blue-700',
    'Dance': 'bg-purple-600 hover:bg-purple-700',
    'Magic': 'bg-yellow-500 hover:bg-yellow-600',
    'Gag': 'bg-pink-500 hover:bg-pink-600',
    'Art': 'bg-green-500 hover:bg-green-600',
    'Performance Art': 'bg-red-500 hover:bg-red-600',
    'ETC': 'bg-gray-600 hover:bg-gray-700',
    'default': 'bg-blue-500 hover:bg-blue-600'
  };
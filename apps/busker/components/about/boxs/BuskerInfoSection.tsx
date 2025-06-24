'use client';

import { Badge } from '@repo/ui/components/ui/badge';
import { FormContext } from '@/context/FormContext';
import { use } from 'react';
import { CategoryData, categoryColors } from '@/data/categoryData';

export function BuskerInfoSection() {
  const { artistDescription, artistGenre } = use(FormContext);
  const filteredGenres = artistGenre.filter((id) => id !== 1);

  const getCategoryName = (id: number) => {
    const category = CategoryData.find((cat) => cat.id === id);
    return category?.name || 'ETC';
  };

  const getCategoryColor = (categoryName: string) => {
    return categoryColors[categoryName] || categoryColors['default'];
  };

  return (
    <section className="space-y-6">
      <article>
        <h3 className="text-blue-300 font-semibold mb-3 text-lg">소개</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          {artistDescription || '소개글이 아직 작성되지 않았습니다.'}
        </p>
      </article>

      <article>
        <h3 className="text-blue-300 font-semibold mb-3 text-lg">장르</h3>
        <div className="flex flex-wrap gap-2">
          {filteredGenres.length > 0 ? (
            filteredGenres.map((genreId) => {
              const categoryName = getCategoryName(genreId);
              return (
                <Badge
                  key={genreId}
                  className={`text-white ${getCategoryColor(categoryName)}`}
                >
                  {categoryName}
                </Badge>
              );
            })
          ) : (
            <p className="text-gray-400 text-sm">선택된 장르가 없습니다.</p>
          )}
        </div>
      </article>
    </section>
  );
}

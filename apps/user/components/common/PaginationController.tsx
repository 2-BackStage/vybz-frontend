'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@repo/ui/components/ui/pagination';
import { fetchHistory } from '@/services/user-services/user-donations-services';

export default function PaginationController({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const goToPrev = () => {
    if (page > 1) fetchHistory(page - 1);
  };

  const goToNext = () => {
    if (page < totalPages) fetchHistory(page + 1);
  };

  const renderPageLink = (p: number) => (
    <PaginationItem key={p}>
      <PaginationLink isActive={p === page} onClick={() => fetchHistory(p)}>
        {p}
      </PaginationLink>
    </PaginationItem>
  );

  let startPage = Math.max(1, page - 2);
  let endPage = Math.min(totalPages, page + 2);

  if (totalPages <= 5) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (page <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (page >= totalPages - 2) {
      startPage = totalPages - 4;
      endPage = totalPages;
    }
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={goToPrev} />
        </PaginationItem>

        {pageNumbers.map((p) => renderPageLink(p))}

        <PaginationItem>
          <PaginationNext onClick={goToNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

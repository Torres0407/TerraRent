import { useMemo, useState } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  setItemsPerPage: (count: number) => void;
  pageNumbers: number[];
  getPageItems: <T>(items: T[]) => T[];
}

/**
 * usePagination Hook
 * Handles pagination logic for lists and tables.
 * 
 * @param totalItems - Total number of items
 * @param itemsPerPage - Number of items per page (default: 10)
 * @param initialPage - Initial page number (default: 1)
 * @returns Pagination state and helper functions
 * 
 * @example
 * const { 
 *   currentPage, 
 *   totalPages, 
 *   nextPage, 
 *   previousPage,
 *   getPageItems 
 * } = usePagination({ totalItems: 100, itemsPerPage: 10 });
 * 
 * const currentItems = getPageItems(allItems);
 */
export function usePagination({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(itemsPerPage);

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / perPage);

  // Calculate start and end indices for current page
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, totalItems);

  // Check if there are next/previous pages
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  // Generate array of page numbers for pagination UI
  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

  // Navigation functions
  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const nextPage = () => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const previousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const setItemsPerPage = (count: number) => {
    setPerPage(count);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Helper function to get items for current page
  const getPageItems = <T,>(items: T[]): T[] => {
    return items.slice(startIndex, endIndex);
  };

  return {
    currentPage,
    totalPages,
    itemsPerPage: perPage,
    startIndex,
    endIndex,
    hasNextPage,
    hasPreviousPage,
    goToPage,
    nextPage,
    previousPage,
    goToFirstPage,
    goToLastPage,
    setItemsPerPage,
    pageNumbers,
    getPageItems,
  };
}

/**
 * useServerPagination Hook
 * Handles pagination for server-side paginated APIs.
 * Use this when the API returns paginated data (like Spring Boot Page).
 * 
 * @param initialPage - Initial page number (default: 0 for Spring Boot)
 * @param initialSize - Initial page size (default: 10)
 * @returns Server pagination state and helper functions
 * 
 * @example
 * const { page, size, setPage, nextPage } = useServerPagination(0, 10);
 * 
 * const { properties, totalPages } = useProperties(filter, page, size);
 */
export function useServerPagination(initialPage: number = 0, initialSize: number = 10) {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);

  const nextPage = () => setPage(prev => prev + 1);
  const previousPage = () => setPage(prev => Math.max(0, prev - 1));
  const goToPage = (newPage: number) => setPage(Math.max(0, newPage));
  const goToFirstPage = () => setPage(0);
  const changeSize = (newSize: number) => {
    setSize(newSize);
    setPage(0); // Reset to first page when changing size
  };

  return {
    page,
    size,
    setPage: goToPage,
    nextPage,
    previousPage,
    goToFirstPage,
    setSize: changeSize,
  };
}

export default usePagination;
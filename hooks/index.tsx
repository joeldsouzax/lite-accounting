import * as React from 'react';
import { useTheme } from 'next-themes';
import useSWRInfinite from 'swr/infinite';
import { debounce } from 'lodash';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import type { Fetcher } from 'swr';
import type { SWRInfiniteKeyLoader } from 'swr/infinite';
import { useDebounce } from '@uidotdev/usehooks';

export const useCurrentTheme = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  return {
    currentTheme,
    setTheme,
  };
};

export interface InfiniteScrollReturn<Response extends object> {
  data: Response[][] | undefined;
  error: any;
  isLoading: boolean;
  ref: React.RefObject<HTMLDivElement>;
  size: number;
  isLoadingMore: boolean | undefined;
  isReachingEnd: boolean | undefined;
  setSize: (
    size: number | ((_size: number) => number)
  ) => Promise<Response[][] | undefined>;
}

export const useInfiniteScroll = <Response extends object>(
  getKey: SWRInfiniteKeyLoader,
  fetcher: Fetcher<Array<Response>>
): InfiniteScrollReturn<Response> => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = React.useState(false);
  const { data, size, setSize, isLoading, error } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateFirstPage: false,
    }
  );

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < DEFAULT_PAGE_SIZE);

  const handleScroll = () => {
    if (ref.current && typeof window !== 'undefined') {
      const container = ref.current;
      const { bottom } = container.getBoundingClientRect();
      const { innerHeight } = window;
      setIsInView((prev) => bottom <= innerHeight);
    }
  };

  React.useEffect(() => {
    const handleDebouncedScroll = debounce(() => handleScroll(), 100);
    window.addEventListener('scroll', handleDebouncedScroll);
    return () => {
      window.removeEventListener('scroll', handleDebouncedScroll);
    };
  }, [isReachingEnd]);

  React.useEffect(() => {
    if (isInView && !isReachingEnd) {
      setSize(size + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, isReachingEnd]);

  return {
    data,
    error,
    isLoading,
    ref,
    size,
    isLoadingMore,
    isReachingEnd,
    setSize,
  };
};

export const useDebouncedSearch = (initialSearchTerm: string = '') => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  return { debouncedSearchTerm, setSearchTerm };
};

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(response.statusText);
    throw error;
  }

  return response.json();
};

export const useInfiniteApi = <T extends object>(
  url: string,
  size: number = DEFAULT_PAGE_SIZE
) => {
  const { debouncedSearchTerm, setSearchTerm } = useDebouncedSearch('');
  const infiniteProps = useInfiniteScroll<T>(
    (index) => `${url}?q=${debouncedSearchTerm}&page=${index}&size=${size}`,
    fetcher
  );

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> | undefined = (
    e
  ) => setSearchTerm(e.target.value);

  return { setSearchTerm, handleSearch, ...infiniteProps };
};

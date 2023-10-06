import * as React from 'react';
import { useTheme } from 'next-themes';
import useSWRInfinite from 'swr/infinite';
import { debounce } from 'lodash';
import { PAGE_SIZE } from '@/constants';
import type { Fetcher } from 'swr';
import type { SWRInfiniteKeyLoader } from 'swr/infinite';

export const useCurrentTheme = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  return {
    currentTheme,
    setTheme,
  };
};

export const useInfiniteScroll = <Response extends object>(
  getKey: SWRInfiniteKeyLoader,
  fetcher: Fetcher<Array<Response>>
) => {
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
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

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

  return { data, error, isLoading };
};

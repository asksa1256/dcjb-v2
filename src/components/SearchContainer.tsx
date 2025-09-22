import {
  useState,
  useMemo,
  useCallback,
  useRef,
  type ChangeEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategorySelect from "@/components/CategorySelect";
import debounce from "@/lib/debounce";
import supabase from "@/lib/supabase";
import SearchResults from "@/components/SearchResults";
import type { Result } from "@/types/result";
import { useQuery } from "@tanstack/react-query";

const SearchContainer = () => {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const debouncedSetKeyword = useMemo(
    () => debounce((v: string) => setDebouncedKeyword(v), 500),
    []
  );
  const [category, setCategory] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchResults = useCallback(
    async (keyword: string) => {
      const trimmed = keyword.trim();
      if (!trimmed) return [];

      const keywords = trimmed.split(/\s+/);

      let query = supabase.from(`quiz_${category}`).select("*");

      keywords.forEach((word) => {
        query = query.ilike("question", `%${word}%`);
      });

      const { data, error } = await query;
      if (error) throw new Error(error.message);

      return data || [];
    },
    [category]
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    debouncedSetKeyword(value);
  };

  const clearSearch = () => {
    setKeyword("");
    setDebouncedKeyword("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChangeCategory = (v: string) => {
    setCategory(v);
    clearSearch();
  };

  const {
    data: results = [],
    isPending,
    error,
  } = useQuery<Result[], Error>({
    queryKey: ["quiz", category, debouncedKeyword],
    queryFn: () => fetchResults(debouncedKeyword),
    enabled: debouncedKeyword.trim().length > 0,
    staleTime: Infinity,
  });

  const isCategoryEmpty = category === "" && keyword.length > 0;
  const isSearching = category && debouncedKeyword && isPending;
  const isEmpty = !isPending && !error && results.length === 0;

  return (
    <section className="relative flex flex-col justify-center w-full max-w-[640px]">
      <div className="flex flex-col max-w-[320px] self-center">
        <CategorySelect
          id="category"
          value={category}
          className="mb-6"
          onChange={handleChangeCategory}
        />

        <div className="flex gap-4 items-center">
          <Input
            ref={inputRef}
            value={keyword}
            placeholder="검색어 입력..."
            onChange={handleSearch}
          />
          <Button onClick={clearSearch}>지우기</Button>
        </div>

        <div className="mt-3 ml-3 text-sm">
          {isCategoryEmpty && (
            <p className="text-red-500">카테고리를 선택해주세요.</p>
          )}
          {isSearching && <p className="text-blue-500">검색 중...</p>}
          {isEmpty && <p className="text-gray-500">검색 결과가 없습니다.</p>}
          {error && <p className="text-red-500">검색 오류: {error.message}</p>}
        </div>
      </div>

      {/* 검색 결과 */}
      <SearchResults results={results} keyword={keyword} />
      {results.length > 0 && (
        <p className="my-4 text-center text-xs text-gray-400">
          검색 결과를 모두 불러왔습니다.
        </p>
      )}
    </section>
  );
};

export default SearchContainer;

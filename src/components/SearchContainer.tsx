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
import type { Database } from "@/types/supabase";
import type { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";

type TableNames = keyof Database["public"]["Tables"];

const SearchContainer = () => {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const debouncedSetKeyword = useMemo(
    () => debounce((v: string) => setDebouncedKeyword(v), 500),
    []
  );
  const [category, setCategory] = useState<Category | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loadingPercent, setLoadingPercent] = useState(0);

  const fetchResults = useCallback(async (ctg: TableNames) => {
    const { count } = await supabase
      .from(ctg)
      .select("*", { count: "exact", head: true });

    const totalCount = count || 0;
    const batchSize = 1000;

    type RecordType = Database["public"]["Tables"][typeof ctg]["Row"];
    let allData: RecordType[] = [];

    for (let i = 0; i < totalCount; i += batchSize) {
      const { data, error } = await supabase
        .from(ctg)
        .select("*")
        .range(i, i + batchSize - 1);

      if (error) {
        console.error("Error fetching data:", error);
        break;
      }

      allData = allData.concat(data);

      setLoadingPercent(Math.floor((allData.length / totalCount) * 100));
    }

    return allData;
  }, []);

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

  const handleChangeCategory = (v: Category) => {
    setCategory(v);
    clearSearch();
  };

  const {
    data: results = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["quiz", category],
    queryFn: () => fetchResults(category as TableNames),
    staleTime: Infinity,
    enabled: !!category,
  });

  const filteredResults = useMemo(() => {
    const trimmedKeyword = debouncedKeyword.trim();

    if (trimmedKeyword.length === 0) {
      return [];
    }

    const keywords = trimmedKeyword.toLowerCase().split(/\s+/).filter(Boolean);

    return results.filter((item) => {
      const fullText = `${item.question?.toLowerCase()}`;

      return keywords.every((keyword) => fullText.includes(keyword));
    });
  }, [results, debouncedKeyword]);

  const isSearching = category && debouncedKeyword && isPending;
  const isEmpty =
    category && debouncedKeyword.length > 0 && filteredResults.length === 0;

  return (
    <section className="relative flex flex-col items-center w-full">
      <div className="flex flex-col max-w-[320px] self-center">
        <CategorySelect
          id="category"
          value={category || ""}
          className="mb-6 w-full"
          onChange={handleChangeCategory}
        />

        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-4">
            <Input
              ref={inputRef}
              value={keyword}
              placeholder="검색어 입력..."
              onChange={handleSearch}
            />
            <Button onClick={clearSearch}>지우기</Button>
          </div>

          {category && loadingPercent < 100 && (
            <p className="text-xs text-gray-400">
              문제 불러오는 중... {loadingPercent}%
            </p>
          )}
        </div>

        <div className="mt-3 text-center mb-6 text-sm">
          {!category && <p className="text-red-500">퀴즈를 선택해주세요.</p>}
          {isSearching && <p className="text-blue-500">검색 중...</p>}
          {isEmpty && <p className="text-gray-500">검색 결과가 없습니다.</p>}
          {error && <p className="text-red-500">검색 오류: {error.message}</p>}
        </div>
      </div>

      {/* 검색 결과 */}
      {debouncedKeyword.length > 0 && filteredResults.length > 0 && (
        <>
          <SearchResults results={filteredResults} keyword={keyword} />
          <p className="my-4 text-center text-xs text-gray-400">
            검색 결과를 모두 불러왔습니다.
          </p>
        </>
      )}
    </section>
  );
};

export default SearchContainer;

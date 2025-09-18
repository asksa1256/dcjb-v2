import { useState, useMemo, useCallback, useRef, type ChangeEvent } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import CategorySelect from "./components/CategorySelect";
import debounce from "./lib/debounce";
import supabase from "./lib/supabase";
import SearchResults from "./components/SearchResults";
import type { Result } from "@/types/result";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "sonner";
import CreateQuizModal from "./components/CreateQuizModal";

function App() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const debouncedSetKeyword = useMemo(
    () => debounce((v: string) => setDebouncedKeyword(v), 500),
    []
  );
  const [category, setCategory] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchResults = useCallback( async (keyword: string) => {
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
  }, [category])

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

  return (
    <main className="flex min-h-svh flex-col items-center justify-center">
      <div className="flex flex-col gap-6 max-w-[640px]">
        <CategorySelect id="category" value={category} onChange={(v) => setCategory(v)}/>

        <div className="flex gap-4 items-center">
          <Input
            ref={inputRef}
            value={keyword}
            placeholder="검색어 입력..."
            className="md:text-lg md:px-4 md:py-6"
            onChange={handleSearch}
          />
          <Button onClick={clearSearch}>지우기</Button>
        </div>
      </div>

      {/* 검색 결과 */}
      {debouncedKeyword && isPending && <p>검색 중...</p>}
      {error && <p className="text-red-500">검색 오류: {error.message}</p>}
      <SearchResults results={results} keyword={keyword} />

      <Toaster position="bottom-center" richColors />

      <CreateQuizModal/>
    </main>
  );
}

export default App;

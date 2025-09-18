import { useState, useMemo, useCallback, type ChangeEvent } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import CategorySelect from "./components/CategorySelect";
import debounce from "./lib/debounce";
import supabase from "./lib/supabase";

interface Result {
  id: number;
  question: string;
  answer: string;
}

function App() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  const fetchResults = useCallback(async (v: string) => {
    const trimmed = v.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }

    // 공백 기준 키워드 분리
    const keywords = trimmed.split(/\s+/);

    // Supabase 조회
    let query = supabase.from("quiz_kkong").select("*");

    // 분리된 각 단어에 대해 ilike 'AND' 조건 추가
    keywords.forEach((word) => {
      query = query.ilike("question", `%${word}%`);
    });

    const { data, error } = await query;
    if (error) {
      alert(`검색 오류: ${error.message}`);
      return;
    }

    setResults(data || []);
  }, []);

  const debouncedFetch = useMemo(
    () => debounce(fetchResults, 500),
    [fetchResults]
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    debouncedFetch(value);
  };

  const clearSearch = () => {
    setKeyword("");
    setResults([]);
  };

  return (
    <main className="flex min-h-svh flex-col items-center justify-center">
      <div className="flex flex-col gap-6 max-w-[640px]">
        <CategorySelect />

        <h2>검색</h2>
        <Input
          onChange={handleSearch}
          value={keyword}
          placeholder="검색어 입력..."
        />
        <Button onClick={clearSearch}>지우기</Button>
      </div>

      {/* 검색 결과 렌더링 */}
      <ul className="mt-4 space-y-2">
        {results.map((quiz) => (
          <li key={quiz.id} className="p-2 border rounded">
            <p>Q. {quiz.question}</p>
            <p className="mt-2">
              A. <b className="text-blue-500">{quiz.answer}</b>
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;

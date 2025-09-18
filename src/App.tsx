import { useState, useMemo, type ChangeEvent } from "react";
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

  const fetchResults = async (v: string) => {
    if (!v.trim()) {
      setResults([]);
      return;
    }

    const { data, error } = await supabase
      .from("quiz_kkong")
      .select("*")
      .ilike("question", `%${v}%`); // 부분 검색

    if (error) {
      console.error("검색 오류:", error.message);
      return;
    }

    setResults(data || []);
  };

  const debouncedFetch = useMemo(
    () => debounce(fetchResults, 300),
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

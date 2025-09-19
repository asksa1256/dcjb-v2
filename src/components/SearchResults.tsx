import type { Result } from "@/types/result";
import { highlightWords } from "@/lib/highlightWords";
import { copyToClipboard } from "@/lib/copyToClipborad";

interface SearchResultsProps {
  results: Result[];
  keyword: string;
}

const SearchResults = ({ results, keyword }: SearchResultsProps) => {
  return (
    <ul className="mt-4 mb-6 space-y-4">
      {results.map((quiz) => (
        <li
          key={quiz.id}
          role="button"
          tabIndex={0}
          onClick={() => copyToClipboard(quiz.answer)}
          onKeyDown={(e) => {
            if (e.key === "Enter") copyToClipboard(quiz.answer);
          }}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <p className="text-md font-medium text-gray-400">Q.</p>
          <p className="mt-1 text-lg text-gray-800">
            {highlightWords(quiz.question, keyword)}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-md font-medium text-gray-400">A.</span>
            <b className="rounded text-lg bg-blue-50 px-2 py-1 text-blue-600">
              {quiz.answer}
            </b>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;

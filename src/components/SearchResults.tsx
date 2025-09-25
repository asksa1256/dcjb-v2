import type { Records } from "@/types";
import { highlightWords } from "@/lib/highlightWords";
import { copyToClipboard } from "@/lib/copyToClipborad";

interface SearchResultsProps {
  results: Records;
  keyword: string;
}

const SearchResults = ({ results, keyword }: SearchResultsProps) => {
  return (
    <ul className="mt-4 space-y-4">
      {results.map((quiz, i) => (
        <li
          key={`${quiz.answer}-${i}`}
          role="button"
          tabIndex={0}
          onClick={() => copyToClipboard(quiz.answer || "")}
          onKeyDown={(e) => {
            if (e.key === "Enter") copyToClipboard(quiz.answer || "");
          }}
          className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <h6 className="flex gap-2">
            <span className="text-md font-medium text-gray-500 mt-1.5">Q.</span>
            <p className="mt-1 text-lg text-gray-800">
              {highlightWords(quiz.question || "", keyword)}
            </p>
          </h6>

          <div className="mt-3 flex items-center justify-between gap-2">
            <h6>
              <span className="text-md font-medium text-gray-500 mr-2">A.</span>
              <b className="rounded text-lg bg-blue-50 px-2 py-1 text-blue-600">
                {quiz.answer}
              </b>
            </h6>

            {quiz.nickname && (
              <span className="text-gray-300 text-xs">
                Thanks to
                <b className="ml-2 text-gray-400 text-sm">
                  ✨{quiz.nickname}✨
                </b>
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;

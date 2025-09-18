import type { Result } from "@/types/result";

interface SearchResultsProps {
  results: Result[];
}

const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <ul className="mt-6 space-y-4">
      {results.map((quiz) => (
        <li
          key={quiz.id}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <p className="text-sm font-medium text-gray-500">Q.</p>
          <p className="mt-1 text-lg font-semibold text-gray-800">
            {quiz.question}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">A.</span>
            <b className="rounded bg-blue-50 px-2 py-1 text-blue-600">
              {quiz.answer}
            </b>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;

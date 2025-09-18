import type { Result } from "@/types/result";

interface SearchResultsProps {
  results: Result[];
}

const SearchResults = ({ results }: SearchResultsProps) => {
  return (
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
  );
};

export default SearchResults;

interface ContributorListProps {
  contributors: string[];
}

const ContributorList = ({ contributors }: ContributorListProps) => {
  return (
    <div className="max-h-[308px] overflow-y-auto space-y-1 text-sm">
      {contributors.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-2">
          {contributors.map((name) => (
            <li
              key={name}
              className="flex items-center gap-2 rounded-xl transition-colors text-sm font-medium truncate"
            >
              <span className="truncate">💙 {name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 text-sm">로딩중...</p>
      )}
    </div>
  );
};

export default ContributorList;

import type { ReactNode } from "react";
import { escapeRegExp } from "@/lib/escapeRegExp";

export const highlightWords = (
  question: string,
  keyword: string
): ReactNode[] => {
  if (!keyword.trim()) return [question];

  // 공백 기준 키워드 분리
  const words = keyword
    .trim()
    .split(/\s+/)
    .map((word) => escapeRegExp(word));

  // 각 단어마다 정규식 생성 (대소문자 무시)
  const regex = new RegExp(`(${words.join("|")})`, "gi");

  const parts = question.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="text-blue-500 font-bold">
        {part}
      </span>
    ) : (
      part
    )
  );
};

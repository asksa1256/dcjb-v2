import { useMemo } from "react";
import { type Record } from "@/types";

export function useFilteredResults(
  results: Record[],
  debouncedKeyword: string
): Record[] {
  return useMemo(() => {
    const trimmedKeyword = debouncedKeyword.trim().toLowerCase();
    if (trimmedKeyword.length === 0) return [];

    // 공백 제거 후 글자 단위 분리
    const normalizedKeyword = trimmedKeyword.replace(/\s+/g, "");
    const keywordChars = [...normalizedKeyword].filter(Boolean);

    type ScoredItem = Record & { score: number };

    const scoredResults: ScoredItem[] = results
      .map((item) => {
        const question = item.question?.toLowerCase() ?? "";

        // 1️⃣ 필터링: 입력된 모든 글자가 포함되어야 함
        const isMatch = keywordChars.every((char) => question.includes(char));
        if (!isMatch) return null;

        // 2️⃣ 점수 계산
        let score = 0;

        // (1) 전체 키워드(공백 제거)가 그대로 들어있으면 가산점
        if (question.replace(/\s+/g, "").includes(normalizedKeyword)) {
          score += 3;
        }

        // (2) 포함된 글자 수에 따라 점수
        const matchedCount = keywordChars.filter((char) =>
          question.includes(char)
        ).length;
        score += matchedCount;

        // (3) 일치 비율에 따른 약간의 보정
        score += matchedCount / keywordChars.length / 2;

        return { ...item, score };
      })
      .filter((item): item is ScoredItem => item !== null)
      // 3️⃣ 점수 내림차순 정렬
      .sort((a, b) => b.score - a.score);

    return scoredResults;
  }, [results, debouncedKeyword]);
}

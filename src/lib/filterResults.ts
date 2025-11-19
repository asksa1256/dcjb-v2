import { getChosung, isChosung } from "@/lib/getChosung";
import type { Database } from "@/types/supabase";

type TableNames = keyof Database["public"]["Tables"];
type Record = Database["public"]["Tables"][TableNames]["Row"];

const filterResults = (results: Record[], keyword: string) => {
  const trimmedKeyword = keyword.trim();
  if (!trimmedKeyword || trimmedKeyword.length < 2) return []; // 최소 2글자 이상부터 검색

  const keywords = trimmedKeyword.toLowerCase().split(/\s+/).filter(Boolean); // 공백 기준 키워드 분리

  return results.filter((item) => {
    const fullText = `${item.question?.toLowerCase()}`;

    return keywords.every((keyword) => {
      if (isChosung(keyword)) {
        const chosungText = getChosung(fullText);
        const keywordNoSpace = keyword.replace(/\s+/g, "");
        const chosungNoSpace = chosungText.replace(/\s+/g, "");
        return chosungNoSpace.includes(keywordNoSpace);
      }
      return fullText.includes(keyword);
    });
  });
};

export default filterResults;

import supabase from "@/lib/supabase";
import type { Database } from "@/types/supabase";

type TableNames = keyof Database["public"]["Tables"];

const getResults = async (ctg: TableNames) => {
  // 1️⃣ 전체 개수 조회
  const { count } = await supabase
    .from(ctg)
    .select("*", { count: "exact", head: true });

  const totalCount = count || 0;

  // 2️⃣ RPC로 데이터 가져오기
  const { data, error } = await supabase.rpc("get_questions_sorted_by_length", {
    table_name: ctg,
  });

  if (error) {
    console.error("Error fetching data:", error);
    throw error;
  }

  const allData = data ?? [];

  // 3️⃣ 총 개수 대비 로딩 퍼센트 반환 (필요하면)
  const loadingPercent = Math.floor((allData.length / totalCount) * 100);

  return { allData, totalCount, loadingPercent };
};

export default getResults;

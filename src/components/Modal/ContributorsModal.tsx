import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Heart } from "lucide-react";
import supabase from "@/lib/supabase";
import { useState } from "react";
import { QUIZ_TABLES } from "@/constants";
import ContributorList from "@/components/ContributorList";
import { useQuery } from "@tanstack/react-query";

async function fetchContributors(): Promise<string[]> {
  const allNicknames: string[] = [];

  for (const table of QUIZ_TABLES) {
    const { data, error } = await supabase
      .from(table)
      .select("nickname")
      .not("nickname", "is", null)
      .limit(100);

    if (!error && data) {
      allNicknames.push(...data.map((d) => d.nickname));
    }
  }

  return Array.from(new Set(allNicknames));
}

const ContributorsModal = () => {
  const [open, setOpen] = useState(false);

  const {
    data: contributors,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contributors"],
    queryFn: fetchContributors,
    staleTime: Infinity, // 페이지 새로고침 전까지 재요청 안 함
    gcTime: Infinity,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-auto mx-auto">
          <Heart className="-mr-0.5" /> Thanks to...
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thanks to...</DialogTitle>
          <DialogDescription className="text-xs">
            기여해주신 분들께 감사드립니다! 🎉 <br />
            문제를 등록해주시면 이곳에 닉네임이 등록됩니다.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <p className="text-center text-gray-500 text-sm py-8">로딩중...</p>
        ) : isError ? (
          <p className="text-center text-sm text-red-500 py-8">
            데이터를 불러오지 못했습니다.
          </p>
        ) : contributors && contributors.length > 0 ? (
          <ContributorList contributors={contributors} open={open} />
        ) : (
          <p className="text-center text-gray-500 text-sm py-8">
            아직 기여자가 없어요. 문제를 등록하고 첫 번째 기여자가 되어주세요!
          </p>
        )}

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContributorsModal;

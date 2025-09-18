import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import CategorySelect from "./CategorySelect"
import { useState, type FormEvent } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import supabase from "@/lib/supabase"

const CreateQuizModal = () => {
  const queryClient = useQueryClient();

  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!category || !question || !answer) {
      toast.error("모든 항목을 입력해주세요.");
      return;
    }

    const tableName = `quiz_${category}`;

    const { data, error } = await supabase
      .from(tableName)
      .insert([{ question, answer }]);
    console.log(data);

    if (error) {
      toast.error(`문제 추가 실패: ${error.message}`);
      console.error(error);
      return;
    }

    toast.success("문제가 성공적으로 추가되었습니다!");

    // React Query 캐시 갱신
    queryClient.invalidateQueries({ queryKey: ['quiz', category] });

    setCategory("");
    setQuestion("");
    setAnswer("");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">문제 추가하기</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>문제 추가하기</DialogTitle>
          <DialogDescription>
            카테고리를 선택한 후, 문제와 답을 입력해주세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="category">카테고리</label>
              <CategorySelect id="category" value={category} onChange={(v) => setCategory(v)}/>
            </div>
            <div className="grid gap-3">
              <label htmlFor="question">문제</label>
              <Textarea id="question" name="question" placeholder="문제 입력" value={question} onChange={(e) => setQuestion(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <label htmlFor="answer">답</label>
              <Input id="answer" name="answer" placeholder="답 입력" value={answer} onChange={(e) => setAnswer(e.target.value)} />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button type="submit">추가하기</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateQuizModal;
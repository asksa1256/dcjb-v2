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
import { useState } from "react"

const CreateQuizModal = () => {
  const [category, setCategory] = useState("");

  return (
    <Dialog>
      <form>
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

          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="category">카테고리</label>
              <CategorySelect id="category" value={category} onChange={(v) => setCategory(v)}/>
            </div>
            <div className="grid gap-3">
              <label htmlFor="question">문제</label>
              <Textarea id="question" placeholder="문제 입력" />
            </div>
            <div className="grid gap-3">
              <label htmlFor="answer">답</label>
              <Input id="answer" name="answer" placeholder="답 입력" />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button type="submit">추가하기</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CreateQuizModal;
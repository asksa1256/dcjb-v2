import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CategorySelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="퀴즈 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ox">OX/XO</SelectItem>
          <SelectItem value="olla">올라/꼬로록</SelectItem>
          <SelectItem value="kkong">꽁꽁</SelectItem>
          <SelectItem value="garo">가로세로</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;

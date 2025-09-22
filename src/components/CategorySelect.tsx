import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY } from "@/constants";

interface CategorySelectProps {
  id?: string;
  value?: string;
  className?: string;
  onChange: (v: string) => void;
}

const CategorySelect = ({
  id,
  value,
  className,
  onChange,
}: CategorySelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-[180px] ${className}`} id={id}>
        <SelectValue placeholder="퀴즈 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup id={id}>
          <SelectItem value={CATEGORY.OX}>OX/XO</SelectItem>
          <SelectItem value={CATEGORY.KKOROROK}>꼬로록/올라</SelectItem>
          <SelectItem value={CATEGORY.KKONG}>꽁꽁</SelectItem>
          <SelectItem value={CATEGORY.GARO}>가로세로</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;

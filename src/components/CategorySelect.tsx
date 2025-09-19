import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
          <SelectItem value="ox">OX/XO</SelectItem>
          <SelectItem value="kkororok">꼬로록/올라</SelectItem>
          <SelectItem value="kkong">꽁꽁</SelectItem>
          <SelectItem value="garo">가로세로</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;

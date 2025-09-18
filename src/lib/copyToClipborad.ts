import { toast } from "sonner";

export const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success(`복사 완료: ${text}`);
    })
    .catch((err) => {
      toast.error(`복사 실패: ${err}`);
    });
};

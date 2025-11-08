import { toast } from "sonner";

export const copyToClipboard = (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`복사 완료: ${text}`);
      })
      .catch((err) => {
        toast.error(`복사 실패: 다른 방법으로 복사를 시도합니다.`);
        console.error(err);
        // Clipboard API 실패 시 폴백 시도
        fallbackCopy(text);
      });
  } else {
    // fallback: execCommand (구형 브라우저 지원)
    fallbackCopy(text);
  }
};

const fallbackCopy = (text: string) => {
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);

    if (successful) {
      toast.success(`복사 완료: ${text}`);
    } else {
      toast.error("복사 실패: 브라우저가 텍스트 복사를 지원하지 않습니다.");
    }
  } catch (err) {
    toast.error(`복사 실패: ${err}`);
  }
};

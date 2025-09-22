export const normalize = (text: string) =>
  text
    .replace(/[()（）]/g, "") // 괄호 제거
    .replace(/[一-龥]/g, ""); // 한자 제거

export interface Result {
  id?: number;
  question: string;
  answer: string;
}

type Record =
  | {
      answer: string | null;
      question: string | null;
    }
  | {
      answer: string | null;
      question: string | null;
    }
  | {
      answer: string | null;
      id?: number;
      question: string;
    }
  | {
      answer: string | null;
      question: string | null;
    };

export type Records = Record[];

export type Category = "quiz_garo" | "quiz_kkong" | "quiz_kkororok" | "quiz_ox";

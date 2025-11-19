import { Toaster } from "sonner";
import CreateQuizModal from "./components/Modal/CreateQuizModal";
import SearchContainer from "./components/SearchContainer";
import CreateInquiryModal from "./components/Modal/CreateInquiryModal";
import { Analytics } from "@vercel/analytics/react";
import ContributorsModal from "./components/Modal/ContributorsModal";
import DarkModeToggleButton from "./components/DarkModeToggleButton";

export default function App() {
  return (
    <>
      <main className="relative flex min-h-screen flex-col items-center justify-start md:px-6 pt-5.5 md:pt-6 pb-10 bg-secondary">
        <DarkModeToggleButton className="absolute top-4 right-4" />

        <section className="flex flex-col w-full items-center justify-start max-w-[640px]">
          <h2 className="text-gray-400 text-lg text-left mb-6">
            🧀 심플족보 🐱
          </h2>
          <SearchContainer />

          <Toaster
            position="bottom-center"
            richColors
            toastOptions={{
              className: "font-pretendard",
            }}
          />

          <CreateQuizModal />

          <div className="h-[1px] w-full bg-border my-6"></div>

          <div className="flex gap-2">
            <CreateInquiryModal />
            <ContributorsModal />
          </div>
        </section>

        {/* Vercel Analytics */}
        <Analytics />
      </main>
    </>
  );
}

import { Toaster } from "sonner";
import CreateQuizModal from "./components/Modal/CreateQuizModal";
import SearchContainer from "./components/SearchContainer";
import CreateInquiryModal from "./components/Modal/CreateInquiryModal";

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-6 pt-20 pb-10 bg-gray-50">
      <div className="flex flex-col w-full items-center justify-start max-w-[640px]">
        <h2 className="text-gray-400 text-lg text-left mb-8">🧀 심플족보 🐱</h2>
        <SearchContainer />
        <Toaster
          position="bottom-center"
          richColors
          toastOptions={{
            className: "font-pretendard",
          }}
        />
        <CreateQuizModal />

        <div className="h-[1px] w-full bg-gray-200 my-6"></div>

        <CreateInquiryModal />
      </div>
    </main>
  );
}

export default App;

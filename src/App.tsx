import { Toaster } from "sonner";
import CreateQuizModal from "./components/Modal/CreateQuizModal";
import SearchContainer from "./components/SearchContainer";
import CreateInquiryModal from "./components/Modal/CreateInquiryModal";

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-6 pt-20 pb-10 bg-gray-50">
      <h2 className="text-gray-400 text-lg text-left mb-8">🧀 대충족보 🐱</h2>
      <SearchContainer />
      <Toaster
        position="bottom-center"
        richColors
        toastOptions={{
          className: "font-pretendard",
        }}
      />
      <CreateQuizModal />
      <br />
      <p className="text-gray-400 text-sm mb-4">
        문의사항은 아래 버튼을 클릭해주세요.
      </p>
      <CreateInquiryModal />
    </main>
  );
}

export default App;

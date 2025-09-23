import { Toaster } from "sonner";
import CreateQuizModal from "./components/CreateQuizModal";
import SearchContainer from "./components/SearchContainer";

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
    </main>
  );
}

export default App;

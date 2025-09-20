import { Toaster } from "sonner";
import CreateQuizModal from "./components/CreateQuizModal";
import SearchContainer from "./components/SearchContainer";

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-10 bg-gray-50">
      <h2 className="text-gray-400 text-lg text-left mb-8">대충족보</h2>
      <SearchContainer />
      <Toaster
        position="bottom-center"
        richColors
        toastOptions={{
          className: "font-pretendard",
        }}
      />
      <p className="my-4 text-center text-xs text-gray-300">&copy; 치즈꾸</p>
      <CreateQuizModal />
    </main>
  );
}

export default App;

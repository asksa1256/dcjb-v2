import { Toaster } from "sonner";
import CreateQuizModal from "./components/CreateQuizModal";
import SearchContainer from "./components/SearchContainer";

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-10 bg-gray-50">
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

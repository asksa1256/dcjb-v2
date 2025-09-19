import { Toaster } from "sonner";
import CreateQuizModal from "./components/CreateQuizModal";
import SearchContainer from "./components/SearchContainer";

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-10">
      <SearchContainer />
      <Toaster position="bottom-center" richColors />
      <CreateQuizModal />
    </main>
  );
}

export default App;

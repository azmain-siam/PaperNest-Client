import { ThemeProvider } from "./components/ui/themeProvider";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <MainLayout />
      </ThemeProvider>
    </>
  );
}

export default App;

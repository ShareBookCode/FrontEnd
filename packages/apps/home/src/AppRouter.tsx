import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/home/Home";
import { BookPage } from "./pages/book";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/book" element={<BookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

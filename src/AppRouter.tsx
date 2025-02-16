import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  StaticRouter,
} from "react-router";
import { Home } from "./pages/home/Home.tsx";
import { HeaderComponent } from "./components/Header";
import { Favourites } from "./pages/favourites/Favourites.tsx";
import { CreateBook } from "./pages/createBook";
import { BookPage } from "./pages/book";
import { Chat } from "./pages/chat/Chat.tsx";
import { Profile } from "./pages/profile";
import {
  useFindAllGenreQuery,
  useGetProfileQuery,
} from "./services/api/sharebookApi.ts";
import { useTranslation } from "react-i18next";
import { Genre } from "./pages/genre";
import { Auth } from "./pages/auth";
import { SignIn } from "./pages/auth/SignIn";
import { SignUp } from "./pages/auth/SignUp";
import { SignUpName } from "./pages/auth/SignUpName";
import { SignUpPassword } from "./pages/auth/SignUpPassword";
import { GoToEmail } from "./pages/auth/GoToEmail";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { Search } from "./pages/search";

const Router = import.meta.env.SSR ? StaticRouter : BrowserRouter;

export function AppRouter({ location }: { location: string }) {
  const { i18n } = useTranslation();

  useFindAllGenreQuery({ locale: i18n.language.split("-")[0] });
  useGetProfileQuery({
    userId: "-1",
    zone: new Date().getTimezoneOffset() / -60,
  });

  return (
    <Router location={location}>
      <HeaderComponent />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/genre/:genreId" element={<Genre />} />
        <Route path="/search/:title?" element={<Search />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/createBook" element={<CreateBook />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/chats" element={<Chat />} />
        <Route path="/auth" element={<Auth />}>
          <Route index element={<Navigate to="signUp" replace />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="signUpName" element={<SignUpName />} />
          <Route path="signUpPassword" element={<SignUpPassword />} />
          <Route path="goToEmail" element={<GoToEmail />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
        </Route>
        <Route path="/profile/:userId?" element={<Profile />} />
        <Route path={"*"} element={<div>404 page not found</div>} />
      </Routes>
    </Router>
  );
}

import { BrowserRouter, Route, Routes, StaticRouter } from "react-router";
import { Home } from "./pages/home/Home.tsx";
import { HeaderComponent } from "./components/Header";
import { Favourites } from "./pages/favourites/Favourites.tsx";
import { CreateBook } from "./pages/createBook";
import { Chat } from "./pages/chat/Chat.tsx";
import { Profile } from "./pages/profile";
import { Auth } from "./pages/auth";
import { SignIn } from "./pages/auth/SignIn";
import { SignUp } from "./pages/auth/SignUp";
import { SignUpName } from "./pages/auth/SignUpName";
import { SignUpPassword } from "./pages/auth/SignUpPassword";

const Router = import.meta.env.SSR ? StaticRouter : BrowserRouter;

export function AppRouter({ location }: { location: string }) {
  return (
    <Router location={location}>
      <HeaderComponent />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/filter/:genre" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/createBook" element={<CreateBook />} />
        <Route path="/chats" element={<Chat />} />
        <Route path="/auth" element={<Auth />}>
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="signUpName" element={<SignUpName />} />
          <Route path="signUpPassword" element={<SignUpPassword />} />
        </Route>
        <Route path="/profile/:userId?" element={<Profile />} />
        <Route path={"*"} element={<div>404 page not found</div>} />
      </Routes>
      <Auth />
    </Router>
  );
}

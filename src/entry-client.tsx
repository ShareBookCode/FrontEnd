import { hydrateRoot } from "react-dom/client";
import { App } from "./App.tsx";
import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { setupStore } from "./store.ts";

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init(
    {
      ns: [
        "common",
        "auth",
        "chat",
        "home",
        "header",
        "search",
        "profile",
        "createBook",
      ],
      defaultNS: "common",
      fallbackLng: window.initialLanguage,
      react: {
        useSuspense: false,
      },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      detection: {
        caches: ["cookie"],
      },
      pluralSeparator: "_",
    },
    () => {
      const preloadedState = window.__PRELOADED_STATE__ || {};
      const store = setupStore(preloadedState);

      hydrateRoot(
        document.getElementById("sharebook") as HTMLElement,
        <App location={location.href} i18n={i18next} store={store} />,
      );
    },
  );

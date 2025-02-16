import i18next from "i18next";
import Backend from "i18next-fs-backend";
import { LanguageDetector } from "i18next-http-middleware";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function createI18nInstance() {
  const instance = i18next.createInstance();

  instance
    .use(Backend)
    .use(LanguageDetector)
    .init({
      fallbackLng: "en",
      preload: ["en", "ru"],
      ns: ["common", "auth", "chat"],
      defaultNS: "common",
      backend: {
        loadPath: __dirname + "/locales/{{lng}}/{{ns}}.json",
      },
      react: {
        useSuspense: false,
      },
    });

  return instance;
}

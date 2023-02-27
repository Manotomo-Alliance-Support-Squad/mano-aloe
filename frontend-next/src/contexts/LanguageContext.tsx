import { createContext, useContext, useState } from "react";

export enum LANGUAGE {
  ORIGINAL = "ORIGINAL",
  JP = "JAPANESE",
}

export const useLanguageContext = () => {
  const [language, setLanguage] = useState(LANGUAGE.ORIGINAL);
  return {
    language,
    setLanguage,
  };
};

export const LanguageContext = createContext<
  ReturnType<typeof useLanguageContext> | undefined
>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "Missing Language Provider. Make sure it is included in the render tree somewhere."
    );
  }
  return context;
};

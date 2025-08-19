import { ReactNode, createContext, useState } from "react";

type LanguageContextType = {
  language: string;
  setLanguageHandler: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "id",
  setLanguageHandler: () => {},
});

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>("id");
  const setLanguageHandler = (lang: string) => setLanguage(lang);

  return (
    <LanguageContext.Provider value={{ language, setLanguageHandler }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };

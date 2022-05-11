import React, { useContext, useEffect } from "react";
import MainPageLayout from "./MainPageLayout";
import { IntlProvider } from "react-intl";
import { Routes, Route } from "react-router-dom";
import en from "../assets/localization/en.json";
import ru from "../assets/localization/ru.json";
import { LanguageContext } from "./LanguageContext";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotificationContext } from "./Notifications/NotificationContext";
import { NotificationStore } from "./Notifications/NotificationStore";

type Props = {};
const localizationLanguage = { en, ru };

const MainPageContainer: React.FC<Props> = observer(() => {
  const languageStore = useContext(LanguageContext);
  const notificationStore = new NotificationStore();
  useEffect(() => {
    languageStore.init();
  }, []);
  return (
    <IntlProvider
      messages={localizationLanguage[languageStore.lang]}
      locale={languageStore.lang}
    >
      <NotificationContext.Provider value={notificationStore}>
        <Routes>
          <Route path="/*" element={<MainPageLayout />} />
        </Routes>
        <ToastContainer />
      </NotificationContext.Provider>
    </IntlProvider>
  );
});

export default MainPageContainer;

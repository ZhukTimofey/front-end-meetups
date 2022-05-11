import React, { ReactElement, FC } from "react";
import { render as rtlRender } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import CustomRouter from "../CustomRouter";
import customHistory from "../historyObject";

function render(ui: ReactElement, { locale = "en", ...renderOptions } = {}) {
  const Wrapper: FC = function ({ children }) {
    return (
      <CustomRouter history={customHistory}>
        <IntlProvider locale={locale}>{children}</IntlProvider>
      </CustomRouter>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };

//CSSObjectWithLabel
export const reactSelect = {
  multiValueRemove: (base: {}) => ({
    ...base,
    ":active": {
      ...base,
      "& svg": { color: "#FF380C" },
    },
    ":hover": {
      ...base,

      "& svg": { color: "#FF380C" },
    },
    "& svg": {
      color: "#3C4861",
    },
  }),
  multiValueLabel: (base: {}) => ({
    ...base,
    fontSize: "100%",
  }),
  control: (base: {}) => ({
    ...base,
    padding: "3px",
    border: "0px",
    outline: "1px solid #D5DCE7",
    fontSize: "14px",
    ":hover": {
      outline: "2px solid #8065EC",
      boxShadow: "none",
    },
    ":active": {
      outline: "2px solid #8065EC",
      boxShadow: "none",
    },
    ":focus": {
      outline: "2px solid #8065EC",
      boxShadow: "none",
    },
  }),
};
export const reactSelectThemes = (theme: any) => ({
  ...theme,
  colors: {
    ...theme.colors,
    danger: "#FF380C",
    dangerLight: "#FFEBE5",
    neutral20: "#D5DCE7",
    neutral80: "#5B6887",
    primary25: "#D5DCE7",
    primary50: "#C2CBDA",
    neutral0: "#FBFBFE",
    neutral10: "#FBFBFE",
    primary: "#8065EC",
  },
});

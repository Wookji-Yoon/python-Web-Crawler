import { atom } from "recoil";

export const searchAtom = atom({
  key: "search",
  default: "",
});

export const pageAtom = atom({
  key: "page",
  default: 0,
});

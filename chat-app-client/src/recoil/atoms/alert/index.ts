// atoms.ts

import { atom } from "recoil";
import {
  generateSuccessAlert,
  generateErrorAlert,
  generateInfoAlert,
} from "../../../utils/alert";

export const alertState = atom<string | null>({
  key: "alertState",
  default: null,
});

export const showAlert = (
  message: string,
  type: "success" | "error" | "info"
) => {
  switch (type) {
    case "success":
      return generateSuccessAlert(message);
    case "error":
      return generateErrorAlert(message);
    case "info":
      return generateInfoAlert(message);
    default:
      return null;
  }
};

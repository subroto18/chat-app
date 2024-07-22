import { truncateSync } from "fs";
import { atom } from "recoil";

export const mediaAtom = atom({
  key: "media",
  default: {
    loading: false,
    data: "",
    error: "",
  },
});

export const mediaLoadingAtom = atom({
  key: "mediaLoading",
  default: false,
});

export const mediaPreviewAtom = atom({
  key: "mediaPreview",
  default: true,
});

export const mediaProgressAtom = atom({
  key: "mediaProgress",
  default: 0,
});

export const mediaPreviewImageAtom = atom({
  key: "mediaPreviewImage",
  default:
    "https://res.cloudinary.com/dnkivz36g/image/upload/v1721669299/l1zvs71lzomrq7znbx9j.png",
});

export const mediaFileListAtom = atom({
  key: "fileList",
  default: [],
});

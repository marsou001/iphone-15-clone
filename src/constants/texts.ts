import { HightlightsSlide, Model, Size } from "@/types";
import { blackImgPath, blueImgPath, highlightFirstVideoPath, highlightFourthVideoPath, highlightSecondVideoPath, highlightThirdVideoPath, whiteImgPath, yellowImgPath } from "./paths";

export const navLists = ["Store", "Mac", "iPhone", "Support"];

export const hightlightsSlides: HightlightsSlide[] = [
  {
    id: 1,
    textLists: [
      "Enter A17 Pro.",
      "Game‑changing chip.",
      "Groundbreaking performance.",
    ],
    videoPath: highlightFirstVideoPath,
  },
  {
    id: 2,
    textLists: ["Titanium.", "So strong. So light. So Pro."],
    videoPath: highlightSecondVideoPath,
  },
  {
    id: 3,
    textLists: [
      "iPhone 15 Pro Max has the",
      "longest optical zoom in",
      "iPhone ever. Far out.",
    ],
    videoPath: highlightThirdVideoPath,
  },
  {
    id: 4,
    textLists: ["All-new Action button.", "What will yours do?."],
    videoPath: highlightFourthVideoPath,
  },
];

export const models: Model[] = [
  {
    id: 1,
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    imgPath: yellowImgPath,
  },
  {
    id: 2,
    title: "iPhone 15 Pro in Blue Titanium",
    color: ["#53596E", "#6395ff", "#21242e"],
    imgPath: blueImgPath,
  },
  {
    id: 3,
    title: "iPhone 15 Pro in White Titanium",
    color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
    imgPath: whiteImgPath,
  },
  {
    id: 4,
    title: "iPhone 15 Pro in Black Titanium",
    color: ["#454749", "#3b3b3b", "#181819"],
    imgPath: blackImgPath,
  },
];

export const sizes: Size[] = [
  { label: '6.1"', value: "small" },
  { label: '6.7"', value: "large" },
];

export const footerLinks: string[] = [
  "Privacy Policy",
  "Terms of Use",
  "Sales Policy",
  "Legal",
  "Site Map",
];
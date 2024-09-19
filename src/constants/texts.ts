import { HightlightsSlide, Model, Size } from "@/types";

export const navLists = ["Store", "Mac", "iPhone", "Support"];

export const hightlightsSlides: HightlightsSlide[] = [
  {
    id: 1,
    textLists: [
      "Enter A17 Pro.",
      "Game‑changing chip.",
      "Groundbreaking performance.",
    ],
    videoPath: '/assets/video/highlight-first.mp4',
    videoDuration: 4,
  },
  {
    id: 2,
    textLists: ["Titanium.", "So strong. So light. So Pro."],
    videoPath: '/assets/video/highlight-sec.mp4',
    videoDuration: 5,
  },
  {
    id: 3,
    textLists: [
      "iPhone 15 Pro Max has the",
      "longest optical zoom in",
      "iPhone ever. Far out.",
    ],
    videoPath: '/assets/video/highlight-third.mp4',
    videoDuration: 2,
  },
  {
    id: 4,
    textLists: ["All-new Action button.", "What will yours do?."],
    videoPath: '/assets/video/highlight-fourth.mp4',
    videoDuration: 3.63,
  },
];

export const models: Model[] = [
  {
    id: 1,
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    imgPath: "/assets/images/yellow.jpg",
  },
  {
    id: 2,
    title: "iPhone 15 Pro in Blue Titanium",
    color: ["#53596E", "#6395ff", "#21242e"],
    imgPath: "/assets/images/blue.jpg",
  },
  {
    id: 3,
    title: "iPhone 15 Pro in White Titanium",
    color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
    imgPath: "/assets/images/white.jpg",
  },
  {
    id: 4,
    title: "iPhone 15 Pro in Black Titanium",
    color: ["#454749", "#3b3b3b", "#181819"],
    imgPath: "/assets/images/black.jpg",
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
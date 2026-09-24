import {
  Bricolage_Grotesque,
  DM_Sans,
  Inter,
  Nunito,
  Nunito_Sans,
  Outfit,
  Plus_Jakarta_Sans,
} from "next/font/google";

// Every pairing we tried, loaded only on this page so the decision is visible.
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const nunitoSans = Nunito_Sans({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });

export type FontStatus = "chosen" | "candidate" | "considered";

export const fontPairs: {
  name: string;
  status: FontStatus;
  note: string;
  heading: string;
  body: string;
}[] = [
  {
    name: "Plus Jakarta Sans + Nunito Sans",
    status: "chosen",
    note: "Clean, warm headings with soft, friendly body text.",
    heading: "var(--font-heading-face)",
    body: "var(--font-body-face)",
  },
  {
    name: "Nunito + Nunito Sans",
    status: "candidate",
    note: "Rounded and friendly. Nunito is the rounded sibling of Nunito Sans.",
    heading: nunito.style.fontFamily,
    body: nunitoSans.style.fontFamily,
  },
  {
    name: "Plus Jakarta Sans + Inter",
    status: "considered",
    note: "Inter is excellent, but already used in recent apps.",
    heading: plusJakarta.style.fontFamily,
    body: inter.style.fontFamily,
  },
  {
    name: "Plus Jakarta Sans + DM Sans",
    status: "considered",
    note: "DM Sans is also great, and also used in recent apps.",
    heading: plusJakarta.style.fontFamily,
    body: dmSans.style.fontFamily,
  },
  {
    name: "Bricolage Grotesque + Nunito Sans",
    status: "considered",
    note: "Characterful, but too busy once it was everywhere.",
    heading: bricolage.style.fontFamily,
    body: nunitoSans.style.fontFamily,
  },
  {
    name: "Outfit + Nunito Sans",
    status: "considered",
    note: "A little too heavy, and less friendly than it first looks.",
    heading: outfit.style.fontFamily,
    body: nunitoSans.style.fontFamily,
  },
];

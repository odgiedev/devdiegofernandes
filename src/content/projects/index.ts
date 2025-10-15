import type { ProjectContentFactory } from "@/lib/types";
import trackrr from "./trackrr";
import byro from "./byro";
import reservvo from "./reservvo";
import hackernewsPlus from "./hackernews-plus";
import neosrate from "./neosrate";
import linkiess from "./linkiess";
import cryptoProfit from "./crypto-profit";

export const projectContent: Record<string, ProjectContentFactory> = {
  trackrr,
  byro,
  reservvo,
  "hackernews-plus": hackernewsPlus,
  neosrate,
  linkiess,
  "crypto-profit": cryptoProfit,
};

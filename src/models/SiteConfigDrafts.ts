import { Schema, model, models } from "mongoose";

const SiteConfigDraftsSchema = new Schema(
  {
    theme: {
      brand: {
        primary: { type: String, default: "hsla(40,54%,56%,1)" },
        hover: { type: String, default: "#CBA532" },
        alpha35: { type: String, default: "hsla(40,54%,56%,0.35)" },
      },
    },
    branding: {
      logoUrl: { type: String, default: "/logo.png" },
      faviconUrl: { type: String, default: "/favicon.ico" },
      siteName: { type: String, default: "HyipLab" },
    },
    seo: {
      defaultTitle: String,
      defaultDescription: String,
      defaultKeywords: [String],
    },
    components: {
      priceCard: {
        bgPosition: { type: String, default: "left -10%" },
      },
    },
  },
  { timestamps: true }
);

export default models.SiteConfigDrafts ||
  model("SiteConfigDrafts", SiteConfigDraftsSchema);

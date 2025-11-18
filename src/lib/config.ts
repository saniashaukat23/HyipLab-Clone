import dbConnect from "@/lib/dbConnect";
import SiteConfigPublished from "@/models/SiteConfigPublished";
import SiteConfigDrafts from "@/models/SiteConfigPublished";

export type SiteConfig = any;

const DEFAULTS: SiteConfig = {
  theme: {
    brand: {
      primary: "hsla(40,54%,56%,1)",
      hover: "#CBA532",
      alpha35: "hsla(40,54%,56%,0.35)",
    },
  },
  branding: {
    logoUrl: "/logo.png",
    faviconUrl: "/favicon.ico",
    siteName: "HyipLab",
  },
  seo: {
    defaultTitle: "HyipLab",
    defaultDescription: "Invest smart.",
    defaultKeywords: [],
  },
  components: { priceCard: { bgPosition: "left -10%" } },
};

export async function getPublishedConfig(): Promise<SiteConfig> {
  await dbConnect();
  const doc = await SiteConfigPublished.findOne().lean();
  return doc ?? DEFAULTS;
}

export async function getDraftConfig(): Promise<SiteConfig> {
  await dbConnect();
  const doc = await SiteConfigDrafts.findOne().lean();
  if (doc) return doc;
  const created = await SiteConfigDrafts.create(DEFAULTS);
  return created.toObject();
}

export async function updateDraftConfig(patch: Partial<SiteConfig>) {
  await dbConnect();
  const doc = await SiteConfigDrafts.findOne();
  if (!doc) return await SiteConfigDrafts.create({ ...DEFAULTS, ...patch });
  Object.assign(doc, mergeDeep(doc.toObject(), patch));
  await doc.save();
  return doc;
}

export async function publishDraft() {
  await dbConnect();
  const draft = await SiteConfigDrafts.findOne();
  if (!draft) throw new Error("No draft to publish");
  await SiteConfigPublished.deleteMany({});
  await SiteConfigPublished.create(draft.toObject());
}

function mergeDeep(target: any, source: any) {
  for (const k of Object.keys(source)) {
    if (
      source[k] &&
      typeof source[k] === "object" &&
      !Array.isArray(source[k])
    ) {
      target[k] = mergeDeep(target[k] || {}, source[k]);
    } else {
      target[k] = source[k];
    }
  }
  return target;
}

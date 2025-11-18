"use client";

import { useEffect, useState } from "react";

type Settings = Record<string, any>;

export default function SystemSettingPage() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<Settings>({});

  useEffect(() => {
    fetch("/api/admin/settings", { credentials: "include" })
      .then((r) => r.json())
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  async function saveKey(key: string, value: any) {
    await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ key, value }),
    });
  }

  async function onSaveTheme(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const value = {
      primary: String(form.get("primary") || "hsla(40,54%,56%,1)"),
      radius: Number(form.get("radius") || 12),
      starfield: !!form.get("starfield"),
    };
    await saveKey("theme", value);
    alert("Theme saved to draft.");
  }

  async function onSaveHero(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const value = {
      headline: String(form.get("headline") || "Invest smarter, grow faster"),
      subhead: String(form.get("subhead") || ""),
      ctaLabel: String(form.get("ctaLabel") || "Get Started"),
      image: String(form.get("image") || "/frontend/banner/hero.jpg"),
    };
    await saveKey("homepage.hero", value);
    alert("Hero saved to draft.");
  }

  async function onPublish() {
    const res = await fetch("/api/admin/publish", {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) alert("Published! Public site revalidated.");
    else alert("Publish failed");
  }

  if (loading) return <div>Loading settings…</div>;

  const theme = settings["theme"] ?? {};
  const hero = settings["homepage.hero"] ?? {};

  return (
    <div style={{ display: "grid", gap: 24, maxWidth: 800 }}>
      <h1>System Setting</h1>

      <form
        onSubmit={onSaveTheme}
        style={{ background: "#fff", padding: 16, borderRadius: 8 }}
      >
        <h2>Theme</h2>
        <label>
          Primary Color
          <input
            name="primary"
            defaultValue={theme.primary ?? "hsla(40,54%,56%,1)"}
            style={{ marginLeft: 8 }}
          />
        </label>
        <br />
        <label>
          Radius
          <input
            type="number"
            name="radius"
            defaultValue={theme.radius ?? 12}
            style={{ marginLeft: 8 }}
          />
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="starfield"
            defaultChecked={!!theme.starfield}
          />{" "}
          Enable starfield background
        </label>
        <br />
        <button type="submit">Save Theme (Draft)</button>
      </form>

      <form
        onSubmit={onSaveHero}
        style={{ background: "#fff", padding: 16, borderRadius: 8 }}
      >
        <h2>Homepage Hero</h2>
        <label>
          Headline
          <input
            name="headline"
            defaultValue={hero.headline ?? ""}
            style={{ marginLeft: 8, width: "100%" }}
          />
        </label>
        <br />
        <label>
          Subhead
          <input
            name="subhead"
            defaultValue={hero.subhead ?? ""}
            style={{ marginLeft: 8, width: "100%" }}
          />
        </label>
        <br />
        <label>
          CTA Label
          <input
            name="ctaLabel"
            defaultValue={hero.ctaLabel ?? "Get Started"}
            style={{ marginLeft: 8 }}
          />
        </label>
        <br />
        <label>
          Image URL
          <input
            name="image"
            defaultValue={hero.image ?? "/frontend/banner/hero.jpg"}
            style={{ marginLeft: 8, width: "100%" }}
          />
        </label>
        <br />
        <button type="submit">Save Hero (Draft)</button>
      </form>

      <div style={{ display: "flex", gap: 12 }}>
        <a href="/?preview=1" target="_blank" rel="noreferrer">
          Preview Draft
        </a>
        <button onClick={onPublish}>Publish to Live</button>
      </div>
    </div>
  );
}

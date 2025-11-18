"use client";
import { useEffect, useState } from "react";

export function useAdminAnalytics() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);
  return data;
}

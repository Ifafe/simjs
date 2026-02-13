"use client";

import { useEffect } from "react";

export default function ThemeRegistry() {
      useEffect(() => {
            fetch("/api/theme")
                  .then((res) => res.json())
                  .then((data) => {
                        if (data && Object.keys(data).length > 0) {
                              const root = document.documentElement;
                              if (data.theme_primary) root.style.setProperty("--primary", data.theme_primary);
                              if (data.theme_primary_dark) root.style.setProperty("--primary-dark", data.theme_primary_dark);
                              if (data.theme_header_bg) root.style.setProperty("--bg-header", data.theme_header_bg);
                              if (data.theme_body_bg) root.style.setProperty("--bg-body", data.theme_body_bg);
                        }
                  })
                  .catch((err) => console.error("Theme load failed", err));
      }, []);

      return null;
}

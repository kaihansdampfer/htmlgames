(function () {
  const root = (window.HTMLGAMES = window.HTMLGAMES || {});
  const prefs = root.prefs;
  const core = root.core;

  const THEMES = {
    dark: {
      name: "Dark",
      colorScheme: "dark",
      vars: {
        "--bg": "#05070f",
        "--panel": "rgba(14, 18, 30, 0.9)",
        "--accent": "#6cf5ff",
        "--warn": "#ff8f6c",
        "--text": "#e6f3ff",
        "--muted": "rgba(230, 243, 255, 0.65)",
      },
    },
    light: {
      name: "Light",
      colorScheme: "light",
      vars: {
        "--bg": "#f5f7fb",
        "--panel": "rgba(255, 255, 255, 0.9)",
        "--accent": "#1658ff",
        "--warn": "#c62f1d",
        "--text": "#1d2637",
        "--muted": "rgba(29, 38, 55, 0.6)",
      },
    },
    crt: {
      name: "CRT",
      colorScheme: "dark",
      vars: {
        "--bg": "#060b07",
        "--panel": "rgba(10, 28, 18, 0.85)",
        "--accent": "#7dff9d",
        "--warn": "#ff4f7a",
        "--text": "#d6ffd9",
        "--muted": "rgba(214, 255, 217, 0.65)",
      },
    },
  };

  function applyTheme(name) {
    const theme = THEMES[name] || THEMES.dark;
    const rootEl = document.documentElement;
    rootEl.style.colorScheme = theme.colorScheme;
    Object.entries(theme.vars).forEach(([key, value]) => {
      rootEl.style.setProperty(key, value);
    });
    rootEl.dataset.theme = name;
  }

  function getTheme() {
    const override = core.getQueryParam("theme");
    if (override && THEMES[override]) {
      return override;
    }
    const stored = prefs.get("theme", "dark");
    return THEMES[stored] ? stored : "dark";
  }

  function setTheme(name) {
    if (!THEMES[name]) return;
    prefs.set("theme", name);
    applyTheme(name);
  }

  function listThemes() {
    return Object.keys(THEMES).map((key) => ({ key, name: THEMES[key].name }));
  }

  root.themes = {
    applyTheme,
    getTheme,
    setTheme,
    listThemes,
  };

  applyTheme(getTheme());
})();

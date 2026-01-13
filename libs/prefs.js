(function () {
  const root = (window.HTMLGAMES = window.HTMLGAMES || {});
  const PREFIX = "htmlgames:";

  function storageKey(key) {
    return `${PREFIX}${key}`;
  }

  root.prefs = {
    get(key, defaultValue) {
      const raw = localStorage.getItem(storageKey(key));
      if (raw === null || raw === undefined) {
        return defaultValue;
      }
      try {
        return JSON.parse(raw);
      } catch (error) {
        return raw;
      }
    },
    set(key, value) {
      localStorage.setItem(storageKey(key), JSON.stringify(value));
    },
    remove(key) {
      localStorage.removeItem(storageKey(key));
    },
    prefix: PREFIX,
  };
})();

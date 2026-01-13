(function () {
  const root = (window.HTMLGAMES = window.HTMLGAMES || {});
  const prefs = root.prefs;
  const core = root.core;

  function resolveDebugFlag() {
    const override = core.getQueryParam("debug");
    if (override === "1") return true;
    if (override === "0") return false;
    return Boolean(prefs.get("debug", 0));
  }

  function setDebug(value) {
    prefs.set("debug", value ? 1 : 0);
  }

  function isDebug() {
    return resolveDebugFlag();
  }

  root.debug = {
    isDebug,
    setDebug,
    log(...args) {
      if (isDebug()) {
        console.log(...args);
      }
    },
  };
})();

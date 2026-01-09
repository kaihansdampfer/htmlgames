(function () {
  const root = (window.HTMLGAMES = window.HTMLGAMES || {});

  root.core = {
    getQueryParam(name) {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    },
  };
})();

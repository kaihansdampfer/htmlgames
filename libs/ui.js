(function () {
  const root = (window.HTMLGAMES = window.HTMLGAMES || {});
  const themes = root.themes;
  const debug = root.debug;

  function renderThemeSelector(container) {
    if (!container) return;
    container.innerHTML = "";
    const label = document.createElement("label");
    label.className = "control";
    const text = document.createElement("span");
    text.textContent = "Theme";
    const select = document.createElement("select");
    select.setAttribute("aria-label", "Select theme");

    themes.listThemes().forEach((theme) => {
      const option = document.createElement("option");
      option.value = theme.key;
      option.textContent = theme.name;
      select.appendChild(option);
    });

    select.value = themes.getTheme();
    select.addEventListener("change", () => {
      themes.setTheme(select.value);
    });

    label.appendChild(text);
    label.appendChild(select);
    container.appendChild(label);
  }

  function renderDebugToggle(container) {
    if (!container) return;
    container.innerHTML = "";
    const label = document.createElement("label");
    label.className = "control";
    const text = document.createElement("span");
    text.textContent = "Debug";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = debug.isDebug();
    checkbox.setAttribute("aria-label", "Toggle debug mode");
    checkbox.addEventListener("change", () => {
      debug.setDebug(checkbox.checked);
    });

    label.appendChild(text);
    label.appendChild(checkbox);
    container.appendChild(label);
  }

  root.ui = {
    renderThemeSelector,
    renderDebugToggle,
  };
})();

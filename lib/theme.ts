export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/**
 * Runs inline in <head> before first paint so the page never flashes the
 * wrong theme. Uses the visitor's saved choice, otherwise the system setting,
 * and keeps following the system until they pick a theme themselves.
 */
export const themeInitScript = `(function () {
  var key = "${THEME_STORAGE_KEY}";
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  function saved() {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function apply() {
    var choice = saved();
    var theme = choice === "light" || choice === "dark" ? choice : media.matches ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
  }
  apply();
  media.addEventListener("change", function () { if (!saved()) apply(); });
})();`;

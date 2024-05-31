export function loadTheme() {
  if (currentThemeIsDark()) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function setDark() {
  localStorage.setItem("theme", "dark");
  loadTheme();
}

export function unsetDark() {
  localStorage.setItem("theme", "light");
  loadTheme();
}

export function disableTheme() {
  localStorage.removeItem("theme");
}

export function currentThemeIsDark() {
  return (
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
}

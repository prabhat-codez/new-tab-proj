const lsData = localStorage.getItem("data-theme")

const isLightModeEnabled = JSON.parse(lsData).state.isLightMode
document.documentElement.setAttribute(
  "data-theme",
  isLightModeEnabled ? "light" : "dark",
)

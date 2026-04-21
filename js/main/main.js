import { initUI } from "../ui/ui.js";

document.addEventListener("DOMContentLoaded", () => {
    initUI().catch(err => console.error("Error iniciando RincónFlix:", err));
});

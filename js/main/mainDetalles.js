import { initDetalleUI } from "../ui/uiDetalles.js";

document.addEventListener("DOMContentLoaded", () => {
    initDetalleUI().catch(err => console.error("Error iniciando detalles:", err));
});

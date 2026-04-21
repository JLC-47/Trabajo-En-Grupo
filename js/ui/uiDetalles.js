import { getShows } from "./service.js";

export async function initDetalleUI(){
    const id=new URLSearchParams(location.search).get("id");
    const shows=await getShows();
    const s=shows.find(x=>x.id==id);

    document.getElementById("detalle").innerHTML=`
    <h1>${s.name}</h1>
    <img src="${s.image?.medium}">
    <p>${s.summary||""}</p>
    `;
}
import { getShows, searchShows } from "./service.js";
import { getState, setState } from "./state.js";
import { guardarFavorito, eliminarFavorito, esFavorito } from "./storage.js";

export async function initUI(){

 const cont=document.getElementById("contenedorShows");
 const input=document.getElementById("inputBuscar");
 const boton=document.getElementById("botonBuscar");
 const prev=document.getElementById("prev");
 const next=document.getElementById("next");
 const pagina=document.getElementById("pagina");
 const inputLimite=document.getElementById("inputLimite");
 const error=document.getElementById("mensajeError");

 const shows=await getShows();
 setState("filtered",shows);

 function render(){
  const data=getState("filtered");
  const start=(getState("page")-1)*getState("limit");
  const end=start+getState("limit");

  cont.innerHTML="";

  data.slice(start,end).forEach(s=>{
   const c=document.createElement("div");
   c.className="card";

   c.innerHTML=`
    <img src="${s.image?.medium||""}">
    <button class="fav-btn">${esFavorito(s.id)?"❤️":"🤍"}</button>
    <h3>${s.name}</h3>
   `;

   c.querySelector("button").addEventListener("click",(e)=>{
    e.stopPropagation();
    esFavorito(s.id)?eliminarFavorito(s.id):guardarFavorito(s);
    render();
   });

   cont.appendChild(c);
  });

  pagina.textContent=`Página ${getState("page")}`;
 }

 inputLimite.addEventListener("change",()=>{
  const v=parseInt(inputLimite.value);

  if(isNaN(v)||v<=0){
   error.textContent="Número inválido";
   error.classList.remove("hidden");
   return;
  }

  if(v>50){
   error.textContent="Máximo 50";
   error.classList.remove("hidden");
   return;
  }

  error.classList.add("hidden");

  setState("limit",v);
  setState("page",1);
  render();
 });

 boton.addEventListener("click",async()=>{
  const res=await searchShows(input.value);
  setState("filtered",res);
  setState("page",1);
  render();
 });

 next.addEventListener("click",()=>{
  setState("page",getState("page")+1);
  render();
 });

 prev.addEventListener("click",()=>{
  if(getState("page")>1){
   setState("page",getState("page")-1);
   render();
  }
 });

 render();
}
let addNoteBtn = document.querySelector(".add-note");
let cancelBtn = document.querySelector(".cancelar");
let agregarBtn = document.querySelector(".agregar");
let modificarBtn = document.querySelector(".modificar");
let crear = document.querySelector(".crear");
let inicio = document.querySelector(".inicio");

let idMod= null

let cantNotas = document.querySelectorAll('div[class^="nota-"]').length;
console.log(cantNotas);

let btnsModificar = document.querySelectorAll(".btn-modificar");

function actualizarDatos() {
  btnsModificar = document.querySelectorAll(".btn-modificar");
  cantNotas = document.querySelectorAll('div[class^="nota-"]').length;
  btnsModificar.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      VentEmerg("modificar");
      leer(idx);
      idMod = idx
    });
  });
}
actualizarDatos();

function VentEmerg(vent) {
  console.log(vent);
  let ventEmergente = document.querySelector(`.vent-emergente-${vent}`);
  ventEmergente.classList.toggle("active");

  ventEmergente.addEventListener("click", (e) => {
    if (
      !document.querySelector(`.add-form-${vent}`).contains(e.target) &&
      ventEmergente.classList.contains("active")
    ) {
      ventEmergente.classList.toggle("active");
    }
  });
}

function modificar(id){
  let title = document.querySelector(`.nota-${id} .note-title`);
  let cont = document.querySelector(`.nota-${id} .note-cont`);
  let inpTitulo = document.querySelector("#Nota-modificar");
  let inpCont = document.querySelector("#Contenido-modificar");

  title.textContent = inpTitulo.value
  cont.textContent = inpCont.value
}

function leer(id) {
  let title = document.querySelector(`.nota-${id} .note-title`);
  let cont = document.querySelector(`.nota-${id} .note-cont`);
  let inpTitulo = document.querySelector("#Nota-modificar");
  let inpCont = document.querySelector("#Contenido-modificar");

  inpCont.value = cont.textContent;
  inpTitulo.value = title.textContent;

  document.querySelector(".vent-emergente-modificar").classList.add("active");
}

addNoteBtn.addEventListener("click", () => VentEmerg("agregar"));
cancelBtn.addEventListener("click", () => VentEmerg("agregar"));
crear.addEventListener("click", () => VentEmerg("agregar"));

inicio.addEventListener("click", () => {});

agregarBtn.addEventListener("click", () => {
  const date = new Date();
  let fecha = `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth()
  ).padStart(2, "0")}/${String(date.getFullYear())} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

  let inpTitulo = document.querySelector("#Nota-agregar");
  let inpDesc = document.querySelector("#Contenido-agregar");

  let nota = document.createElement("div");
  nota.classList.add(`nota-${cantNotas}`);

  let spans = document.createElement("div");
  spans.classList.add("spans");

  let noteTitle = document.createElement("span");
  noteTitle.classList.add("note-title");
  noteTitle.textContent = inpTitulo.value;
  let noteCont = document.createElement("span");
  noteCont.classList.add("note-cont");
  noteCont.textContent = inpDesc.value;

  spans.append(noteTitle, noteCont);

  let btns = document.createElement("div");
  btns.classList.add("note-btns");

  let icon1 = document.createElement("i");
  let icon2 = document.createElement("i");
  let icon3 = document.createElement("i");

  icon1.classList = ["btn-agregar fa-regular fa-circle-check"];
  btns.append(icon1);
  icon2.classList = ["btn-eliminar fa-regular fa-trash-can"];
  btns.append(icon2);
  icon3.classList = ["btn-modificar fa-regular fa-pen-to-square"];
  btns.append(icon3);

  nota.append(spans, btns);

  let container = document.querySelector(".note-container");
  container.appendChild(nota);

  
  inpTitulo.value = "";
  inpDesc.value = "";

  actualizarDatos();
  VentEmerg("agregar");
});

modificarBtn.addEventListener("click", () => {
  modificar(idMod)
  VentEmerg('modificar')
});

let addNoteBtn = document.querySelector(".add-note");
let cancelBtn = document.querySelectorAll(".cancelar");
let agregarBtn = document.querySelector(".agregar");
let modificarBtn = document.querySelector(".modificar");
let eliminarBtn = document.querySelector(".eliminar");
let crear = document.querySelector(".crear");
let inicio = document.querySelector(".inicio");
let ventActive = "";
let idMod = null;

let notas = [];

function crearNota(titulo, contenido, creacion) {
  return { titulo, contenido, creacion, finalizacion: null };
}

function limpiarLista() {
  let contenedor = document.querySelector(".note-container");
  contenedor.innerHTML = "";
}

let cantNotas = document.querySelectorAll('div[class^="nota-"]').length;

let btnsModificar = document.querySelectorAll(".btn-modificar");
let btnsEliminar = document.querySelectorAll(".btn-eliminar");

function actualizarDatos() {
  console.log(notas)
  btnsModificar = document.querySelectorAll(".btn-modificar");
  btnsEliminar = document.querySelectorAll(".btn-eliminar");
  let formAgregar = document.querySelector(".container-agregar form");
  formAgregar.reset();
  btnsModificar.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      VentEmerg("modificar");
      leer(idx);
      idMod = idx;
    });
  });
  btnsEliminar.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      VentEmerg("eliminar");
      idMod = idx;
    });
  });
}
actualizarDatos();

function VentEmerg(vent) {
  actualizarDatos();
  ventActive = vent;

  let ventEmergente = document.querySelector(`.vent-emergente-${vent}`);
  ventEmergente.classList.toggle("active");

  ventEmergente.addEventListener("click", (e) => {
    if (
      !document.querySelector(`.container-${vent}`).contains(e.target) &&
      ventEmergente.classList.contains("active")
    ) {
      ventEmergente.classList.toggle("active");
    }
  });
}

function modificar(id) {
  let title = document.querySelector(`.nota-${id} .note-title`);
  let cont = document.querySelector(`.nota-${id} .note-cont`);
  let inpTitulo = document.querySelector("#Nota-modificar");
  let inpCont = document.querySelector("#Contenido-modificar");

  title.textContent = inpTitulo.value;
  cont.textContent = inpCont.value;
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

function getDate() {
  const date = new Date();
  let fecha = `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth()
  ).padStart(2, "0")}/${String(date.getFullYear())} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

  return fecha;
}

function agregarNota(notaParametro) {
  let nota = document.createElement("div");
  nota.classList.add(`nota-${cantNotas}`);
  nota.id = `nota-${cantNotas}`;

  let spans = document.createElement("div");
  spans.classList.add("spans");

  let noteTitle = document.createElement("h4");
  noteTitle.classList.add("note-title");
  noteTitle.textContent = notaParametro.titulo;
  let noteCont = document.createElement("p");
  noteCont.classList.add("note-cont");
  noteCont.textContent = notaParametro.contenido;

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

  cantNotas++

  VentEmerg("agregar");
}

addNoteBtn.addEventListener("click", () => VentEmerg("agregar"));

cancelBtn.forEach((btn) => {
  btn.addEventListener("click", () => VentEmerg(ventActive));
});

crear.addEventListener("click", () => VentEmerg("agregar"));

inicio.addEventListener("click", () => {});

agregarBtn.addEventListener("click", () => {
  let titulo = document.querySelector("#Nota-agregar").value;
  let cont = document.querySelector("#Contenido-agregar").value;
  let nota = crearNota(titulo, cont, getDate());
  notas.push(nota);
  agregarNota(nota);
});

modificarBtn.addEventListener("click", () => {
  modificar(idMod);
  VentEmerg("modificar");
});

eliminarBtn.addEventListener("click", () => {
  let nota = document.getElementById(`nota-${idMod}`);
  nota.remove();
  VentEmerg("eliminar");
});

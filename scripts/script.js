let addNoteBtn = document.querySelector(".add-note");
let cancelBtn = document.querySelectorAll(".cancelar");
let agregarBtn = document.querySelector(".agregar");
let modificarBtn = document.querySelector(".modificar");
let eliminarBtn = document.querySelector(".eliminar");
let finalizarBtn = document.querySelector(".finalizar");
let crear = document.querySelector(".crear");
let misNotas = document.querySelector(".mis-notas");
let notasFinalizadas = document.querySelector(".notas-fin");
let cantNotas = document.querySelectorAll('div[class^="nota-"]').length;
let btnsModificar = document.querySelectorAll("[class^='btn-modificar-']");
let btnsEliminar = document.querySelectorAll("[class^='btn-eliminar-']");
let btnsFinalizar = document.querySelectorAll("[class^='btn-finalizar-']");
let container = document.querySelector(".note-container");

let ventActive = "";
let idTarget = null;
let notas = [];

const c = console.log

function actualizarDatos() {
  btnsModificar = document.querySelectorAll("[class^='btn-modificar-']");
  btnsEliminar = document.querySelectorAll("[class^='btn-eliminar-']");
  btnsFinalizar = document.querySelectorAll("[class^='btn-finalizar-']");

  let formAgregar = document.querySelector(".container-agregar form");
  formAgregar.reset();

  btnsModificar.forEach((btn) => {
    btn.addEventListener("click", () => {
      VentEmerg("modificar");
      idTarget = btn.classList[0].split("-")[2];
      leer(idTarget);
      actualizarDatos();

    });
  });

  btnsEliminar.forEach((btn) => {
    btn.addEventListener("click", () => {
      idTarget = btn.classList[0].split("-")[2];
      VentEmerg("eliminar");
      actualizarDatos();
    });
  });

  btnsFinalizar.forEach((btn) => {
    btn.addEventListener("click", () => {
      VentEmerg("finalizar");
      idTarget = btn.classList[0].split("-")[2];
      actualizarDatos();
    });
  });
}
actualizarDatos();

function crearNota(id, titulo, contenido, creacion) {
  return {
    id,
    titulo,
    contenido,
    creacion,
    finalizacion: null,
    finished: false,
  };
}

function limpiarLista() {
  let contenedor = document.querySelector(".note-container");
  contenedor.innerHTML = "";
}

function VentEmerg(vent) {
  ventActive = vent;

  let ventEmergente = document.querySelector(`.vent-emergente-${vent}`);
  ventEmergente.classList.toggle("active");

  ventEmergente.addEventListener("click", (e) => {
    if (
      !document.querySelector(`.container-${vent}`).contains(e.target) &&
      ventEmergente.classList.contains("active")
    ) {
      ventEmergente.classList.toggle("active");
      actualizarDatos()
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

function constructNota(ObjNota, id) {
  let nota = document.createElement("div");
  nota.classList.add(`nota-${id}`);
  nota.id = `nota-${id}`;

  let spans = document.createElement("div");
  spans.classList.add("spans");

  let noteTitle = document.createElement("h4");
  noteTitle.classList.add("note-title");
  noteTitle.textContent = ObjNota.titulo;
  let noteCont = document.createElement("p");
  noteCont.classList.add("note-cont");
  noteCont.textContent = ObjNota.contenido;

  spans.append(noteTitle, noteCont);

  let btns = document.createElement("div");
  btns.classList.add("note-btns");

  let icon1 = document.createElement("i");
  let icon2 = document.createElement("i");
  let icon3 = document.createElement("i");

  icon1.classList = [`btn-finalizar-${id} fa-regular fa-circle-check`];
  btns.append(icon1);
  icon2.classList = [`btn-eliminar-${id} fa-regular fa-trash-can`];
  btns.append(icon2);
  icon3.classList = [`btn-modificar-${id} fa-regular fa-pen-to-square`];
  btns.append(icon3);

  nota.append(spans, btns);

  container.appendChild(nota);
}

function agregarNota(notaParametro) {
  constructNota(notaParametro, cantNotas);
  cantNotas++;
  VentEmerg("agregar");
}

function cargarNotas(state) {
  limpiarLista();
  notas.forEach((nota) => {
    if (nota.finished === state) {
      constructNota(nota, nota.id)
    }
  });
  actualizarDatos();
}
cargarNotas(false);

function finalizarNota(id) {
  let nota = notas.find((nota) => nota.id == id);
  nota.finished = true
  nota.finalizacion = getDate()
}

function eliminarNota(id){
  let nota = document.getElementById(`nota-${id}`);
  nota.remove();
  let idNota = notas.findIndex(n => n.id == id)
  notas.splice(idNota,1)
}

addNoteBtn.addEventListener("click", () => {
  VentEmerg("agregar");
  actualizarDatos();
});

cancelBtn.forEach((btn) => {
  btn.addEventListener("click", () => VentEmerg(ventActive));
  actualizarDatos();
});

crear.addEventListener("click", () => {
  VentEmerg("agregar");
  actualizarDatos();
});

agregarBtn.addEventListener("click", () => {
  let titulo = document.querySelector("#Nota-agregar").value;
  let cont = document.querySelector("#Contenido-agregar").value;

  if(titulo == '' || cont == ''){
    alert("El titulo y el contenido no pueden estar vacios")
  }else{
    let nota = crearNota(cantNotas, titulo, cont, getDate());
    notas.push(nota);
    agregarNota(nota);
  }
  actualizarDatos();
});

modificarBtn.addEventListener("click", () => {
  modificar(idTarget);
  VentEmerg("modificar");
  actualizarDatos();
});

eliminarBtn.addEventListener("click", () => {
  eliminarNota(idTarget)
  VentEmerg("eliminar");
  actualizarDatos();
});

finalizarBtn.addEventListener("click", () => {
  VentEmerg("finalizar");
  finalizarNota(idTarget)
  cargarNotas(false);
});

misNotas.addEventListener("click", () => {
  let titulo = document.querySelector(".title-notas");
  titulo.textContent = "Mis Notas";
  cargarNotas(false);
});

notasFinalizadas.addEventListener("click", () => {
  let titulo = document.querySelector(".title-notas");
  titulo.textContent = "Notas Finalizadas";
  cargarNotas(true);
});


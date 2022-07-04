let addNoteBtn = document.querySelector(".add-note");
let ventEmergente = document.querySelector(".vent-emergente");
let cancelBtn = document.querySelector(".cancelar");
let agregarBtn = document.querySelector(".agregar");
let crear = document.querySelector(".crear");
let inicio = document.querySelector('.inicio')

function VentEmerg() {
  ventEmergente.classList.toggle("active");
}

ventEmergente.addEventListener("click", (e) => {
  if (
    !document.querySelector(".add-form").contains(e.target) &&
    ventEmergente.classList.contains("active")
  ) {
    ventEmergente.classList.toggle("active");
  }
});

addNoteBtn.addEventListener("click", VentEmerg);
cancelBtn.addEventListener("click", VentEmerg);
crear.addEventListener("click", VentEmerg);

inicio.addEventListener('click', () => {
  
})

agregarBtn.addEventListener("click", () => {
  let tr = document.createElement("tr");
  let checkbox = document.createElement("td");
  let titulo = document.createElement("td");
  let descripcion = document.createElement("td");
  let creacion = document.createElement("td");
  let finalizacion = document.createElement("td");
  let input = document.createElement("input");

  const date = new Date();
  let fecha = `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth()
  ).padStart(2, "0")}/${String(date.getFullYear())} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

  let inpTitulo = document.querySelector("#Nota");
  let inpDesc = document.querySelector("#Descripcion");

  input.type = "checkbox";

  checkbox.appendChild(input);
  titulo.textContent = inpTitulo.value;
  descripcion.textContent = inpDesc.value;
  creacion.textContent = fecha;
  finalizacion.textContent = "";

  tr.appendChild(checkbox);
  tr.appendChild(titulo);
  tr.appendChild(descripcion);
  tr.appendChild(creacion);
  tr.appendChild(finalizacion);

  document.querySelector(".notas tbody").appendChild(tr);

  ventEmergente.classList.remove("active");

  inpTitulo.value = "";
  inpDesc.value = "";
});

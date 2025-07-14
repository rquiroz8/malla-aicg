
document.addEventListener("DOMContentLoaded", () => {
  const colores = ["color-0", "color-1", "color-2", "color-3", "color-4", "color-5", "color-6"];
  const malla = {
    "I Semestre": [
      ["Introducción a la Carrera", "Ninguno"],
      ["Fundamento de la Contabilidad", "Ninguno"],
      ["Comunicación Oral y Escrita I", "Ninguno"],
      ["Administración", "Ninguno"],
      ["Economía", "Ninguno"],
      ["Matemática", "Ninguno"],
      ["Inglés I", "Ninguno"]
    ],
    "II Semestre": [
      ["Sistemas de Información Contable", "Fundamento de la Contabilidad"],
      ["Comunicación Oral y Escrita II", "Comunicación Oral y Escrita I"],
      ["Introducción al Derecho y Derecho Comercial", "Ninguno"],
      ["Entorno Económico de los Negocios", "Economía"],
      ["Estadística I", "Matemática"],
      ["Inglés II", "Inglés I"]
    ]
  };

  const estado = {}; // nombre => tachado o no
  const prerrequisitos = {}; // nombre => [prerrequisitos]
  const elementos = {}; // nombre => elemento DOM

  const container = document.createElement("div");
  container.className = "container";
  document.body.appendChild(container);

  let colorMap = {};
  let colorIndex = 0;

  for (const [semestre, ramos] of Object.entries(malla)) {
    const col = document.createElement("div");
    col.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.textContent = semestre;
    col.appendChild(titulo);

    for (const [nombre, req] of ramos) {
      const ramo = document.createElement("div");
      ramo.className = "ramo";
      ramo.textContent = nombre;

      const detalle = document.createElement("div");
      detalle.className = "detalle";
      detalle.innerHTML = `<strong>Prerrequisito:</strong> ${req}`;
      ramo.appendChild(detalle);

      if (!(req in colorMap) && req !== "Ninguno") {
        colorMap[req] = colores[colorIndex % colores.length];
        colorIndex++;
      }

      const color = req === "Ninguno" ? colores[colorIndex++ % colores.length] : colorMap[req];
      ramo.classList.add(color);

      estado[nombre] = false;
      prerrequisitos[nombre] = req === "Ninguno" ? [] : req.split(",").map(r => r.trim());
      elementos[nombre] = ramo;

      ramo.addEventListener("click", () => {
        if (!ramo.classList.contains("activo")) return;
        ramo.classList.toggle("tachado");
        estado[nombre] = ramo.classList.contains("tachado");
        actualizarEstado();
      });

      col.appendChild(ramo);
    }

    container.appendChild(col);
  }

  function actualizarEstado() {
    for (const [nombre, reqs] of Object.entries(prerrequisitos)) {
      const activo = reqs.every(r => estado[r]);
      const el = elementos[nombre];
      if (!estado[nombre]) {
        el.classList.toggle("activo", activo);
      }
    }
  }

  actualizarEstado(); // activar los iniciales
});

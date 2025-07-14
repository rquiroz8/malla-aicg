
document.addEventListener("DOMContentLoaded", () => {
  const colores = ["color-0", "color-1", "color-2", "color-3", "color-4", "color-5", "color-6"];
  const malla = {
  "I Semestre": [
    [
      "Introducción a la Carrera",
      "Ninguno"
    ],
    [
      "Fundamento de la Contabilidad",
      "Ninguno"
    ],
    [
      "Comunicación Oral y Escrita I",
      "Ninguno"
    ],
    [
      "Administración",
      "Ninguno"
    ],
    [
      "Economía",
      "Ninguno"
    ],
    [
      "Matemática",
      "Ninguno"
    ],
    [
      "Inglés I",
      "Ninguno"
    ]
  ],
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

  const estado = {};            // Estado de cada ramo: tachado o no
  const prerrequisitos = {};    // Prerrequisitos por ramo
  const elementos = {};         // Elementos DOM por ramo
  const colorMap = {};          // Mapa de prerrequisitos a colores
  let colorIndex = 0;

  // Crear contenedor principal
  const container = document.createElement("div");
  container.className = "container";
  
  const legend = document.createElement("div");
  legend.style.marginBottom = "20px";
  legend.innerHTML = "<h3>🔑 Leyenda de colores (según prerrequisito)</h3><ul style='list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:10px;'>";
  for (const [req, color] of Object.entries(colorMap)) {
    if (req === 'Ninguno') continue;
    legend.innerHTML += `<li style='padding:5px 10px;border-radius:5px;background-color:${getComputedStyle(document.documentElement).getPropertyValue('--' + color)};color:#fff;'>${req}</li>`;
  }
  legend.innerHTML += "</ul>";
  document.body.insertBefore(legend, container);

  document.body.appendChild(container);

  // Recorrer malla y crear ramos
  for (const [semestre, ramos] of Object.entries(malla)) {
    const col = document.createElement("div");
    col.className = "semestre";

    const h2 = document.createElement("h2");
    h2.textContent = semestre;
    col.appendChild(h2);

    for (const [nombre, req] of ramos) {
      const ramo = document.createElement("div");
      ramo.className = "ramo";
      ramo.textContent = nombre;

      const detalle = document.createElement("div");
      detalle.className = "detalle";
      detalle.innerHTML = `<strong>Prerrequisito:</strong> ${req}`;
      ramo.appendChild(detalle);

      // Mapear colores
      const key = req === "Ninguno" ? nombre : req;
      if (!(key in colorMap)) {
        colorMap[key] = colores[colorIndex % colores.length];
        colorIndex++;
      }
      ramo.classList.add(colorMap[key]);

      estado[nombre] = false;
      prerrequisitos[nombre] = req === "Ninguno" ? [] : req.split(",").map(r => r.trim());
      elementos[nombre] = ramo;

      // Evento de clic
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

  // Función que desbloquea ramos con prerrequisitos cumplidos
  function actualizarEstado() {
    for (const [nombre, reqs] of Object.entries(prerrequisitos)) {
      const puedeActivarse = reqs.every(r => estado[r]);
      const el = elementos[nombre];
      if (!estado[nombre]) {
        el.classList.toggle("activo", puedeActivarse);
      }
    }
  }

  actualizarEstado(); // Activar los iniciales
});

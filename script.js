document.addEventListener("DOMContentLoaded", () => {
  const colores = ["color-0", "color-1", "color-2", "color-3", "color-4", "color-5", "color-6"];
  const colorMap = {};
  let colorIndex = 0;

  const estado = {};
  const prerrequisitos = {};
  const elementos = {};

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
    ],
    "III Semestre": [
      ["Metodología Contable Específica", "Sistemas de Información Contable"],
      ["Autogestión del Aprendizaje", "Comunicación Oral y Escrita II"],
      ["Cálculo", "Matemática"],
      ["Inglés III", "Inglés II"]
    ],
    "IV Semestre": [
      ["Módulo de Integración", "Introducción a la Carrera, Metodología Contable Específica"],
      ["Estados Financieros para Decisiones Estratégicas", "Metodología Contable Específica"],
      ["Trabajo en Equipo y Desarrollo de Habilidades Sociales", "Autogestión del Aprendizaje"],
      ["Derecho Laboral", "Introducción al Derecho y Derecho Comercial"],
      ["Optimización", "Entorno Económico de los Negocios"],
      ["Estadística II", "Estadística I"],
      ["Inglés IV", "Inglés III"]
    ],
    "V Semestre": [
      ["Diseño y Desarrollo de Sistemas de Información", "Sistemas de Información Contable"],
      ["Diagnóstico Financiero", "Metodología Contable Específica"],
      ["Procedimientos de Auditoría", "Metodología Contable Específica"],
      ["Comprensión de Contextos Sociales", "Trabajo en Equipo y Desarrollo de Habilidades Sociales"],
      ["Fundamentos de Costos", "Metodología Contable Específica"],
      ["Fundamentos de los Impuestos", "Introducción al Derecho y Derecho Comercial"],
      ["Inglés V", "Inglés IV"]
    ],
    "VI Semestre": [
      ["Implementación de Sistemas de Información", "Diseño y Desarrollo de Sistemas de Información"],
      ["Valorización de Instrumentos Financieros", "Diagnóstico Financiero"],
      ["Control Interno", "Procedimientos de Auditoría"],
      ["Comprensión de Contextos Culturales", "Comprensión de Contextos Sociales"],
      ["Costo para Decisiones Estratégicas", "Fundamentos de Costos"],
      ["Aplicación de los Impuestos", "Fundamentos de los Impuestos"],
      ["Inglés VI", "Inglés V"]
    ],
    "VII Semestre": [
      ["Valor Económico e Inversión Real", "Valorización de Instrumentos Financieros"],
      ["Auditoría Financiera", "Control Interno"],
      ["Ética y Responsabilidad Social", "Comprensión de Contextos Culturales"],
      ["Gestión de RR.HH", "Administración"],
      ["Planificación Tributaria", "Aplicación de los Impuestos"],
      ["Formulación e Implementación Estratégica", "Costo para Decisiones Estratégicas"]
    ],
    "VIII Semestre": [
      ["Módulo de Integración II", "Módulo de Integración, Valor Económico e Inversión Real"],
      ["Auditoría de Sistemas", "Auditoría Financiera, Implementación de Sistemas de Información"],
      ["Valorización de Activos", "Valor Económico e Inversión Real"],
      ["Responsabilidad Social", "Ética y Responsabilidad Social"],
      ["Auditoría y Reclamaciones Tributarias", "Planificación Tributaria"],
      ["Sistemas de Control de Gestión", "Formulación e Implementación Estratégica"]
    ],
    "IX Semestre": [
      ["Gestión Estratégica de Sistemas de Información", "Auditoría de Sistemas"],
      ["Formulación y Evaluación de Proyectos", "Valor Económico e Inversión Real"],
      ["Gestión de Procesos de Negocios", "Formulación e Implementación Estratégica"],
      ["Control de Gestión Estratégico", "Sistemas de Control de Gestión"]
    ],
    "X Semestre": [
      ["Electivo I", "Módulo de Integración II"],
      ["Proyecto Memoria", "Módulo de Integración II"],
      ["Control de Proyectos", "Formulación y Evaluación de Proyectos"],
      ["Marketing Estratégico", "Formulación e Implementación Estratégica"]
    ],
    "XI Semestre": [
      ["Electivo II", "Electivo I"],
      ["Memoria", "Control de Proyectos"],
      ["Deportivo I", "Ninguno"],
      ["Deportivo II", "Ninguno"]
    ]
  };

  const container = document.createElement("div");
  container.className = "container";

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

      const clave = req === "Ninguno" ? nombre : req;
      if (!colorMap[clave]) {
        colorMap[clave] = colores[colorIndex % colores.length];
        colorIndex++;
      }
      ramo.classList.add(colorMap[clave]);

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

  document.body.appendChild(container);

  function actualizarEstado() {
    for (const [nombre, requisitos] of Object.entries(prerrequisitos)) {
      const desbloqueado = requisitos.every(r => estado[r]);
      const el = elementos[nombre];
      if (!estado[nombre]) {
        el.classList.toggle("activo", desbloqueado);
      }
    }
  }

  actualizarEstado();
});


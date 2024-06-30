checkLocalStorageUsage();

//////////////////////////////////////////////////////////////////////////////

function checkLocalStorageUsage() {
  var total = 0;
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    total += (key.length + value.length) * 2; // Cada carácter en UTF-16 ocupa 2 bytes
  }
  // Tamaño total del Local Storage permitido por el navegador (generalmente alrededor de 5 MB a 10 MB)
  var totalAllowed = 1024 * 1024 * 5; // Por ejemplo, 5 MB

  // Convertir bytes a megabytes (MB)
  var totalUsedMB = (total / (1024 * 1024)).toFixed(2);
  var totalAllowedMB = (totalAllowed / (1024 * 1024)).toFixed(2);

  // Calcular el espacio disponible
  var availableSpaceMB = (totalAllowedMB - totalUsedMB).toFixed(2);

  if (totalUsedMB >= totalAllowedMB * 0.9) {
    // Si se ha utilizado más del 90% del espacio permitido
    alert(
      "¡Atención! Has utilizado " +
        totalUsedMB +
        " MB de un total de " +
        totalAllowedMB +
        " MB en el Local Storage. Quedan disponibles " +
        availableSpaceMB +
        " MB."
    );
  } else {
    console.log(
      "Espacio utilizado en el LocalStorage: " +
        totalUsedMB +
        "/" +
        totalAllowedMB +
        "MBs"
    );
    console.log(
      "Espacio disponible en el LocalStorage: " + availableSpaceMB + " MB"
    );
  }
}

//////////////////////////////////////////////////////////////////////////////

const initialData = [
  { dia: "L", rendimiento: 0 },
  { dia: "M", rendimiento: 0 },
  { dia: "Mi", rendimiento: 0 },
  { dia: "J", rendimiento: 0 },
  { dia: "V", rendimiento: 0 },
  { dia: "S", rendimiento: 0 },
  { dia: "D", rendimiento: 0 },
];

// Cargar datos de localStorage o usar datos iniciales
const data = JSON.parse(localStorage.getItem("medicionSemanal")) || initialData;

const container = document.getElementById("chart-container");

function renderChart(data) {
  const diasSemana = ["d", "l", "m", "mi", "j", "v", "s"];
  const diaActual = diasSemana[new Date().getDay()];

  container.innerHTML = "";

  // Calcular el promedio de rendimiento
  let sumRendimiento = 0;
  data.forEach((item) => {
    sumRendimiento += item.rendimiento;
  });
  const promedioRendimiento = sumRendimiento / data.length;

  // Calcular el porcentaje exacto del promedio semanal
  const porcentajePromedio = promedioRendimiento.toFixed(0); // Redondear a 2 decimales

  // Definir la clasificación según el promedio
  let clasificacion;
  if (promedioRendimiento >= 95) {
    clasificacion = { letra: "SS", porcentaje: porcentajePromedio };
  } else if (promedioRendimiento >= 90) {
    clasificacion = { letra: "S", porcentaje: porcentajePromedio };
  } else if (promedioRendimiento >= 80) {
    clasificacion = { letra: "A", porcentaje: porcentajePromedio };
  } else if (promedioRendimiento >= 70) {
    clasificacion = { letra: "B", porcentaje: porcentajePromedio };
  } else if (promedioRendimiento >= 66) {
    clasificacion = { letra: "C", porcentaje: porcentajePromedio };
  } else if (promedioRendimiento >= 33) {
    clasificacion = { letra: "D", porcentaje: porcentajePromedio };
  } else if (promedioRendimiento >= 10) {
    clasificacion = { letra: "E", porcentaje: porcentajePromedio };
  } else {
    clasificacion = { letra: "F", porcentaje: porcentajePromedio };
  }

  // Crear el elemento de clasificación con formato especial
  const classificationContainer = document.createElement("div");
  classificationContainer.style.fontWeight = "bold";
  classificationContainer.style.fontSize = "36px";

  // Asignar color según la clasificación
  switch (clasificacion.letra) {
    case "SS":
      classificationContainer.style.color = "#4CAF50"; // Verde
      classificationContainer.style.marginRight = "8px";
      classificationContainer.style.height = "9rem";
      classificationContainer.style.alignItems = "baseline";
      classificationContainer.style.display = "flex";
      break;
    case "S":
      classificationContainer.style.color = "#8BC34A"; // Verde claro
      classificationContainer.style.marginRight = "8px";
      classificationContainer.style.height = "9rem";
      classificationContainer.style.alignItems = "baseline";
      classificationContainer.style.display = "flex";
      break;
    case "A":
      classificationContainer.style.color = "#FFEB3B"; // Amarillo
      classificationContainer.style.marginRight = "8px";
      classificationContainer.style.height = "9rem";
      classificationContainer.style.alignItems = "baseline";
      classificationContainer.style.display = "flex";
      break;
    case "B":
      classificationContainer.style.color = "#FFC107"; // Naranja
      classificationContainer.style.marginRight = "8px";
      classificationContainer.style.height = "9rem";
      classificationContainer.style.alignItems = "baseline";
      classificationContainer.style.display = "flex";
      break;
    case "C":
      classificationContainer.style.color = "#FF9800"; // Naranja oscuro
      classificationContainer.style.marginRight = "8px";
      classificationContainer.style.height = "9rem";
      classificationContainer.style.alignItems = "baseline";
      classificationContainer.style.display = "flex";
      break;
    case "D":
      classificationContainer.style.color = "#FF5722"; // Rojo anaranjado
      classificationContainer.style.marginRight = "8px";
      classificationContainer.style.height = "9rem";
      classificationContainer.style.alignItems = "baseline";
      classificationContainer.style.display = "flex";
      break;
    case "E":
      classificationContainer.style.color = "#f44336"; // Rojo
      classificationContainer.style.marginRight = "8px";
      classificationContainer.style.height = "9rem";
      classificationContainer.style.alignItems = "baseline";
      classificationContainer.style.display = "flex";
      break;
    case "F":
      classificationContainer.style.color = "#f44336"; // Rojo
      classificationContainer.style.marginRight = "8px";
      classificationContainer.style.height = "9rem";
      classificationContainer.style.alignItems = "baseline";
      classificationContainer.style.display = "flex";
      break;
    default:
      classificationContainer.style.color = "black";
      classificationContainer.style.marginRight = "8px";
      classificationContainer.style.height = "9rem";
      classificationContainer.style.alignItems = "baseline";
      classificationContainer.style.display = "flex";
  }

  classificationContainer.textContent = clasificacion.letra;

  // Crear el elemento para el porcentaje
  const percentageText = document.createElement("div");
  //percentageText.textContent = `${clasificacion.porcentaje}% `;
  percentageText.style.fontSize = "16px";
  percentageText.style.color = "white";

  // Agregar ambos elementos al contenedor principal
  container.appendChild(classificationContainer);
  container.appendChild(percentageText);

  // Generar gráficos para cada día
  data.forEach((item) => {
    const barContainer = document.createElement("div");
    barContainer.style.display = "flex";
    barContainer.style.flexDirection = "column";
    barContainer.style.alignItems = "center";

    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${item.rendimiento * 1}px`;

    if (item.rendimiento <= 34) {
      bar.style.background = "#f8312f"; // Rojo
    } else if (item.rendimiento <= 69) {
      bar.style.background =
        "linear-gradient(180deg, rgb(255 120 0) 0%, rgb(255 165 0) 80%)"; // Naranja
    } else {
      bar.style.background = ""; // Puedes definir otro color por defecto
    }

    const label = document.createElement("div");
    label.className = "bar-label";
    label.textContent = item.dia;

    if (item.dia.toLowerCase() === diaActual) {
      label.style.color = "yellow";
    }

    barContainer.appendChild(bar);
    barContainer.appendChild(label);
    container.appendChild(barContainer);
  });
}

renderChart(data);

//////////////////////////////////////////////////////////////////////////////
/*
function verOCrearTarea() {
  var tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  var fechaActual = new Date();
  var diaSemana = fechaActual.getDay();
  var diaActual = "";

  switch (diaSemana) {
    case 0:
      diaActual = "d";
      break; // Domingo
    case 1:
      diaActual = "l";
      break; // Lunes
    case 2:
      diaActual = "m";
      break; // Martes
    case 3:
      diaActual = "mi";
      break; // Miércoles
    case 4:
      diaActual = "j";
      break; // Jueves
    case 5:
      diaActual = "v";
      break; // Viernes
    case 6:
      diaActual = "s";
      break; // Sábado
  }

  var dias = {
    s: "📆-Sábado-",
    d: "📆-Domingo-",
    l: "📆-Lunes-",
    m: "📆-Martes-",
    mi: "📆-Miércoles-",
    j: "📆-Jueves-",
    v: "📆-Viernes-",
    x: "📆-Sin asignar-",
  };

  var diaActualEmoji = "📆⭐";

  // Verificar si la hora actual es antes de las 6 am
  var horaActual = fechaActual.getHours();
  var minutosActual = fechaActual.getMinutes();

  if (horaActual < 6) {
    moverTareasDelDiaAnterior(tareas, diaActual);
  }

  // Guardar las tareas actualizadas en localStorage
  localStorage.setItem("tareas", JSON.stringify(tareas));

  var totalTareas = tareas.length;
  var tareasCompletadas = tareas.filter(
    (tarea) => tarea.estado === "🟢"
  ).length;
  var progreso =
    totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0;

  var progresoBarra = "";
  for (var i = 0; i < 10; i++) {
    progresoBarra += i < progreso / 10 ? "█" : "░";
  }

  var mensaje = `📝Tareas disponibles - ✅Tu progreso ${progresoBarra} ${progreso}%\n`;
  for (var dia in dias) {
    var diaMensaje =
      dia === diaActual ? dias[dia].replace("📆", diaActualEmoji) : dias[dia];
    var tareasDia = tareas.filter(
      (tarea) => tarea.dia === dia && tarea.prioridad === 1
    );
    if (tareasDia.length > 0) {
      mensaje += `${diaMensaje}\n`;
      tareasDia.forEach((tarea) => {
        mensaje += `${tarea.estado}${tarea.descripcion}\n`;
      });
    }
  }

  var nuevaTarea = prompt(`${mensaje}`);

  if (nuevaTarea === null) {
    return;
  } else if (nuevaTarea.trim() === "") {
    alert("⚠️Tarea inválida. Debes ingresar una tarea válida.");
    return;
  } else if (nuevaTarea === "actualizar") {
    moverTareasDelDiaAnterior(tareas, diaActual);
    // Guardar las tareas actualizadas en localStorage
    localStorage.setItem("tareas", JSON.stringify(tareas));
    alert("📝Tareas actualizadas exitosamente.");
    return;
  } else if (nuevaTarea === "mover") {
    moverTareasAlDiaSiguiente(tareas, diaActual);
    // Guardar las tareas actualizadas en localStorage
    localStorage.setItem("tareas", JSON.stringify(tareas));
    alert("📝Tareas movidas exitosamente.");
    return;
  } else if (nuevaTarea === "crear") {
    // Crear uueva tarea con asistencia guiada
    crearNuevaTareaConAsistenciaGuiada(tareas, diaActual);
    return;
  }

  if (nuevaTarea.length > 70) {
    alert(
      "⚠️Tarea demasiado larga. La tarea debe tener 70 caracteres o menos."
    );
    return;
  }

  var partesTarea = nuevaTarea.split(",");

  if (partesTarea.length < 4) {
    alert("⚠️Formato de tarea inválido. La tarea no se creará.");
    return;
  }

  var prioridad = parseInt(partesTarea[0]);
  var estado = partesTarea[1].toLowerCase();
  var descripcion = partesTarea.slice(2, -1).join(",");
  var dia = partesTarea[partesTarea.length - 1].toLowerCase();

  var estadoEmoji;
  switch (estado) {
    case "p":
      estadoEmoji = "🔴";
      break;
    case "e":
      estadoEmoji = "🟡";
      break;
    case "f":
      estadoEmoji = "🟢";
      break;
    default:
      alert("⚠️Estado inválido. La tarea no se creará.");
      return;
  }

  if (isNaN(prioridad) || prioridad < 1 || prioridad > 3) {
    alert("⚠️Prioridad inválida. La tarea no se creará.");
    return;
  }

  var diasValidos = ["l", "m", "mi", "j", "v", "s", "d", "x"];
  if (!diasValidos.includes(dia)) {
    alert("⚠️Día inválido. La tarea no se creará.");
    return;
  }

  var nuevaTareaObj = {
    prioridad: prioridad,
    estado: estadoEmoji,
    descripcion: descripcion,
    dia: dia,
  };
  tareas.push(nuevaTareaObj);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  alert("📝Tarea creada exitosamente.");
}
*/

function verOCrearTarea() {
  var tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  // Función para obtener el nombre del mes desde su número
  function obtenerNombreMes(numeroMes) {
    var meses = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    return meses[numeroMes - 1];
  }

  // Función para extraer la fecha del inicio de la descripción
  function extraerFecha(descripcion) {
    var match = descripcion.match(/^M(\d+) (\w+) (\d+)/);
    if (match) {
      var numeroMes = parseInt(match[1]);
      var nombreMes = obtenerNombreMes(numeroMes);
      var dia = parseInt(match[3]);
      var fecha = new Date(new Date().getFullYear(), numeroMes - 1, dia); // Crear objeto Date con el año actual
      return fecha;
    }
    return null;
  }

  // Ordenar tareas por fecha
  tareas.sort((a, b) => {
    var fechaA = extraerFecha(a.descripcion);
    var fechaB = extraerFecha(b.descripcion);

    if (fechaA && fechaB) {
      return fechaA - fechaB; // Ordenar por fecha
    } else {
      return a.descripcion.localeCompare(b.descripcion); // Ordenar alfabéticamente si no se puede extraer la fecha
    }
  });

  // Obtener el día de la semana actual
  var fechaActual = new Date();
  var diaSemana = fechaActual.getDay();
  var diaActual = "";

  switch (diaSemana) {
    case 0:
      diaActual = "d";
      break; // Domingo
    case 1:
      diaActual = "l";
      break; // Lunes
    case 2:
      diaActual = "m";
      break; // Martes
    case 3:
      diaActual = "mi";
      break; // Miércoles
    case 4:
      diaActual = "j";
      break; // Jueves
    case 5:
      diaActual = "v";
      break; // Viernes
    case 6:
      diaActual = "s";
      break; // Sábado
  }

  var dias = {
    s: "📆-Sábado-",
    d: "📆-Domingo-",
    l: "📆-Lunes-",
    m: "📆-Martes-",
    mi: "📆-Miércoles-",
    j: "📆-Jueves-",
    v: "📆-Viernes-",
    x: "📆-Sin asignar-",
  };

  var diaActualEmoji = "📆⭐";

  var mensaje = `📝Tareas disponibles - Tu progreso `;

  // Calcular progreso del día actual
  var tareasDiaActual = tareas.filter((tarea) => tarea.dia === diaActual);
  var totalTareasDiaActual = tareasDiaActual.length;
  var tareasCompletadasDiaActual = tareasDiaActual.filter(
    (tarea) => tarea.estado === "🟢"
  ).length;
  var progresoDiaActual =
    totalTareasDiaActual > 0
      ? Math.round((tareasCompletadasDiaActual / totalTareasDiaActual) * 100)
      : 0;

  // Construir barra de progreso
  var progresoBarra = "";
  for (var i = 0; i < 10; i++) {
    progresoBarra += i < progresoDiaActual / 10 ? "█" : "░";
  }

  mensaje += `${progresoBarra} ${progresoDiaActual}%\n`;

  // Convertir los días a un arreglo y ordenarlos numéricamente
  var diasOrdenados = Object.keys(dias).sort((a, b) => {
    if (a === "x") return 1; // "Sin asignar" debe ir al final
    if (b === "x") return -1;
    return parseInt(a) - parseInt(b); // Orden numérico
  });

  diasOrdenados.forEach((diaKey) => {
    var diaMensaje =
      diaKey === diaActual
        ? dias[diaKey].replace("📆", diaActualEmoji)
        : dias[diaKey];
    var tareasDia = tareas.filter(
      (tarea) => tarea.dia === diaKey && tarea.prioridad === 1
    );
    if (tareasDia.length > 0) {
      mensaje += `${diaMensaje}\n`;
      tareasDia.forEach((tarea) => {
        mensaje += `${tarea.estado}${tarea.descripcion}\n`;
      });
    }
  });

  var nuevaTarea = prompt(`${mensaje}`);

  if (!nuevaTarea) {
    return;
  } else if (nuevaTarea.trim() === "") {
    alert("⚠️Tarea inválida. Debes ingresar una tarea válida.");
    return;
  } else if (nuevaTarea === "actualizar") {
    moverTareasAlDiaActual(tareas); // Función para mover tareas 🟡🔴 al día actual
    localStorage.setItem("tareas", JSON.stringify(tareas)); // Guardar las tareas actualizadas
    alert("📝Tareas movidas al día actual exitosamente."); // Mensaje de confirmación
    return;
  } else if (nuevaTarea === "mover") {
    moverTareasAlDiaSiguiente(tareas, diaActual);

    return;
  } else if (nuevaTarea === "crear") {
    // Crear nueva tarea con asistencia guiada
    crearNuevaTareaConAsistenciaGuiada(tareas, diaActual);
    return;
  }

  if (nuevaTarea.length > 70) {
    alert(
      "⚠️Tarea demasiado larga. La tarea debe tener 70 caracteres o menos."
    );
    return;
  }

  var partesTarea = nuevaTarea.split(",");

  if (partesTarea.length < 4) {
    alert("⚠️Formato de tarea inválido. La tarea no se creará.");
    return;
  }

  var prioridad = parseInt(partesTarea[0]);
  var estado = partesTarea[1].toLowerCase();
  var descripcion = partesTarea.slice(2, -1).join(",");
  var dia = partesTarea[partesTarea.length - 1].toLowerCase();

  var estadoEmoji;
  switch (estado) {
    case "p":
      estadoEmoji = "🔴";
      break;
    case "e":
      estadoEmoji = "🟡";
      break;
    case "f":
      estadoEmoji = "🟢";
      break;
    default:
      alert("⚠️Estado inválido. La tarea no se creará.");
      return;
  }

  if (isNaN(prioridad) || prioridad < 1 || prioridad > 3) {
    alert("⚠️Prioridad inválida. La tarea no se creará.");
    return;
  }

  var diasValidos = ["l", "m", "mi", "j", "v", "s", "d", "x"];
  if (!diasValidos.includes(dia)) {
    alert("⚠️Día inválido. La tarea no se creará.");
    return;
  }

  var nuevaTareaObj = {
    prioridad: prioridad,
    estado: estadoEmoji,
    descripcion: descripcion,
    dia: dia,
  };
  tareas.push(nuevaTareaObj);
  localStorage.setItem("tareas", JSON.stringify(tareas));

  // Actualizar rendimiento diario en localStorage después de agregar una nueva tarea
  var tareasActualizadas = JSON.parse(localStorage.getItem("tareas")) || [];
  var tareasDiaActualizadas = tareasActualizadas.filter(
    (tarea) => tarea.dia === diaActual
  );
  var totalTareasDiaActualizadas = tareasDiaActualizadas.length;
  var tareasCompletadasDiaActualizadas = tareasDiaActualizadas.filter(
    (tarea) => tarea.estado === "🟢"
  ).length;
  var progresoDiaActualizado =
    totalTareasDiaActualizadas > 0
      ? Math.round(
          (tareasCompletadasDiaActualizadas / totalTareasDiaActualizadas) * 100
        )
      : 0;

  var medicionSemanalActualizada =
    JSON.parse(localStorage.getItem("medicionSemanal")) || initialData;
  var diaDataActualizada = medicionSemanalActualizada.find(
    (item) => item.dia.toLowerCase() === diaActual
  );
  if (diaDataActualizada) {
    diaDataActualizada.rendimiento = progresoDiaActualizado;
  }
  localStorage.setItem(
    "medicionSemanal",
    JSON.stringify(medicionSemanalActualizada)
  );

  alert("📝Tarea creada exitosamente.");
  renderChart(medicionSemanalActualizada);
}

function moverTareasDelDiaAnterior(tareas, diaActual) {
  var diaAnterior = anteriorDia(diaActual);

  tareas.forEach((tarea) => {
    if (
      tarea.dia === diaAnterior &&
      (tarea.estado === "🔴" || tarea.estado === "🟡")
    ) {
      tarea.dia = diaActual;
    }
  });
}

function moverTareasAlDiaActual(tareas) {
  var fechaActual = new Date();
  var diaSemana = fechaActual.getDay();
  var diaActual = "";

  // Generación de números aleatorios para la suma de verificación
  var num1 = Math.floor(Math.random() * 10 + 1);
  var num2 = Math.floor(Math.random() * 10 + 1);
  var num3 = Math.floor(Math.random() * 10 + 1);
  var resultado = num1 + num2 + num3;

  // Solicitar al usuario que realice la suma de verificación
  var respuesta = prompt(
    `Realiza la siguiente suma para confirmar el mover tareas\n${num1} + ${num2} + ${num3}`
  );

  // Validar la respuesta ingresada por el usuario
  if (respuesta === resultado.toString()) {
    // Asignar el día actual según el día de la semana
    switch (diaSemana) {
      case 0:
        diaActual = "d";
        break;
      case 1:
        diaActual = "l";
        break;
      case 2:
        diaActual = "m";
        break;
      case 3:
        diaActual = "mi";
        break;
      case 4:
        diaActual = "j";
        break;
      case 5:
        diaActual = "v";
        break;
      case 6:
        diaActual = "s";
        break;
    }

    // Filtrar y mover tareas con estado 🟡 o 🔴 al día actual, ignorando las que tienen día "x"
    tareas.forEach((tarea) => {
      if (
        (tarea.estado === "🟡" || tarea.estado === "🔴") &&
        tarea.dia !== "x"
      ) {
        tarea.dia = diaActual;
      }
    });

    // Guardar las tareas actualizadas en localStorage u otro método de persistencia
    localStorage.setItem("tareas", JSON.stringify(tareas));

    // Mensaje de confirmación de que las tareas se han movido correctamente
    alert("📝Tareas movidas al día actual exitosamente.");
  } else {
    // Mensaje de error si la suma no es correcta
    alert("Tareas no movidas. No has completado la suma correctamente.");
  }
}

function moverTareasAlDiaSiguiente(tareas, diaActual) {
  var num1 = Math.floor(Math.random() * 10 + 1);
  var num2 = Math.floor(Math.random() * 10 + 1);
  var num3 = Math.floor(Math.random() * 10 + 1);
  var respuesta;
  var respultado = num1 + num2 + num3;

  respuesta = prompt(
    `Realiza la siguiente suma para confirmar el mover tareas\n${num1} + ${num2} + ${num3}`
  );

  if (respuesta == respultado) {
    var diaSiguiente = siguienteDia(diaActual);

    tareas.forEach((tarea) => {
      if (
        tarea.dia === diaActual &&
        (tarea.estado === "🔴" || tarea.estado === "🟡")
      ) {
        tarea.dia = diaSiguiente;
      }
    });

    // Guardar las tareas actualizadas en localStorage
    localStorage.setItem("tareas", JSON.stringify(tareas));
    alert("📝Tareas movidas exitosamente.");
  } else {
    alert("Taraas no movidas\nNo has completado la suma");
  }
}

function crearNuevaTareaConAsistenciaGuiada(tareas, diaActual) {
  // Prompt para descripción
  var descripcion = prompt("Escribe la tarea a realizar:");
  if (!descripcion) {
    alert("⚠️ Tarea inválida. Debes ingresar una descripción válida.");
    return;
  }

  // Preguntar si es urgente
  var esUrgente = confirm("¿Es urgente?");
  var prioridad = esUrgente ? 1 : 2;

  // Preguntar si es importante
  var esImportante = confirm("¿Es importante?");
  if (esImportante) {
    descripcion = `📌${descripcion}`;
  }

  // Establecer la fecha
  var dias = {
    l: "Lunes",
    m: "Martes",
    mi: "Miércoles",
    j: "Jueves",
    v: "Viernes",
    s: "Sábado",
    d: "Domingo",
    x: "Fecha específica",
  };

  var opcionDia = prompt(
    `Establece una fecha (l, m, mi, j, v, s, d, x)\nDeja vacío para hoy:`
  );
  var diaSeleccionado = diaActual;
  var mes = "";
  var diaMes = "";

  if (opcionDia && dias[opcionDia]) {
    if (opcionDia === "x") {
      // Elije el mes
      mes = prompt("Elije el mes (1-12):");
      if (!mes || mes < 1 || mes > 12) {
        alert("⚠️ Mes inválido. La tarea no se creará.");
        return;
      }

      var meses = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ];
      mes = `M${mes} ${meses[mes - 1]}`;

      // Elije el día
      diaMes = prompt("Elije el día (1-31):");
      if (!diaMes || diaMes < 1 || diaMes > 31) {
        alert("⚠️ Día inválido. La tarea no se creará.");
        return;
      }

      diaSeleccionado = `${mes} ${diaMes}`;
    } else {
      diaSeleccionado = opcionDia;
    }
  } else if (opcionDia !== "") {
    alert("⚠️ Opción inválida. La tarea no se creará.");
    return;
  }

  // Crear nueva tarea
  var nuevaTareaObj = {
    prioridad: prioridad,
    descripcion: descripcion,
    dia: diaSeleccionado,
  };

  tareas.push(nuevaTareaObj);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  alert("📝 Tarea creada exitosamente.");
}

function crearNuevaTareaConAsistenciaGuiada(tareas, diaActual) {
  // Solicitar descripción de la tarea
  var descripcion = prompt("Escribe la tarea a realizar:");
  if (!descripcion) {
    alert("⚠️ Tarea inválida. Debes ingresar una descripción válida.");
    return;
  }

  // Preguntar si es urgente y establecer prioridad
  var esUrgente = confirm(`¿Es urgente "${descripcion}"?`);
  var prioridad = esUrgente ? 1 : 2;

  // Preguntar si es importante y agregar estrella si lo es
  var esImportante = confirm(`¿Es importante "${descripcion}"?`);
  if (esImportante) {
    descripcion = `⭐${descripcion}`;
  }

  // Establecer fecha
  var opcionDia = prompt(
    `Establece una fecha (l,m,mi,j,v,s,d,x)\nDeja vacío para hoy:`
  );
  var diaSeleccionado = "";

  switch (opcionDia) {
    case "l":
      diaSeleccionado = `M1 Ene ${descripcion}`;
      break;
    case "m":
      diaSeleccionado = `M2 Feb ${descripcion}`;
      break;
    case "mi":
      diaSeleccionado = `M3 Mar ${descripcion}`;
      break;
    case "j":
      diaSeleccionado = `M4 Abr ${descripcion}`;
      break;
    case "v":
      diaSeleccionado = `M5 May ${descripcion}`;
      break;
    case "s":
      diaSeleccionado = `M6 Jun ${descripcion}`;
      break;
    case "d":
      diaSeleccionado = `M7 Jul ${descripcion}`;
      break;
    case "x":
      var mes = prompt("Elije el mes (1 al 12):");
      var diaMes = prompt("Elije el día (1 al 31):");

      if (!mes || !diaMes || mes < 1 || mes > 12 || diaMes < 1 || diaMes > 31) {
        alert("⚠️ Fecha inválida. La tarea no se creará.");
        return;
      }

      var meses = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ];
      diaSeleccionado = `M${mes} ${meses[mes - 1]} ${diaMes}, ${descripcion}`;
      break;
    default:
      diaSeleccionado = `${descripcion}`;
      break;
  }

  // Crear objeto de nueva tarea
  var nuevaTareaObj = {
    prioridad: prioridad,
    descripcion: descripcion,
    dia: diaSeleccionado,
  };

  // Agregar tarea a la lista y guardar en localStorage
  tareas.push(nuevaTareaObj);
  localStorage.setItem("tareas", JSON.stringify(tareas));

  // Confirmación de tarea creada
  alert("📝 Tarea creada exitosamente.");
}
function crearNuevaTareaConAsistenciaGuiada(tareas, diaActual) {
  // Solicitar descripción de la tarea
  var descripcion = prompt("Escribe la tarea a realizar:");
  if (!descripcion) {
    alert("⚠️ Tarea inválida. Debes ingresar una descripción válida.");
    return;
  }

  // Preguntar si es urgente y establecer prioridad
  var esUrgente = confirm(`¿Es urgente "${descripcion}"?`);
  var prioridad = esUrgente ? 1 : 2;

  // Preguntar si es importante y agregar estrella si lo es
  var esImportante = confirm(`¿Es importante "${descripcion}"?`);
  if (esImportante) {
    descripcion = `⭐${descripcion}`;
  }

  // Establecer fecha
  var opcionDia = prompt(
    `Establece una fecha (l,m,mi,j,v,s,d,x)\nDeja vacío para hoy:`
  );
  var diaSeleccionado = "";

  switch (opcionDia) {
    case "l":
      diaSeleccionado = `M1 Ene ${descripcion}`;
      break;
    case "m":
      diaSeleccionado = `M2 Feb ${descripcion}`;
      break;
    case "mi":
      diaSeleccionado = `M3 Mar ${descripcion}`;
      break;
    case "j":
      diaSeleccionado = `M4 Abr ${descripcion}`;
      break;
    case "v":
      diaSeleccionado = `M5 May ${descripcion}`;
      break;
    case "s":
      diaSeleccionado = `M6 Jun ${descripcion}`;
      break;
    case "d":
      diaSeleccionado = `M7 Jul ${descripcion}`;
      break;
    case "x":
      var mes = prompt("Elije el mes (1 al 12):");
      var diaMes = prompt("Elije el día (1 al 31):");

      if (!mes || !diaMes || mes < 1 || mes > 12 || diaMes < 1 || diaMes > 31) {
        alert("⚠️ Fecha inválida. La tarea no se creará.");
        return;
      }

      var meses = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ];
      diaSeleccionado = `M${mes} ${meses[mes - 1]} ${diaMes}, ${descripcion}`;
      break;
    default:
      diaSeleccionado = `${descripcion}`;
      break;
  }

  // Crear objeto de nueva tarea
  var nuevaTareaObj = {
    prioridad: prioridad,
    descripcion: diaSeleccionado,
    dia: diaSeleccionado,
  };

  // Agregar tarea a la lista y guardar en localStorage
  tareas.push(nuevaTareaObj);
  localStorage.setItem("tareas", JSON.stringify(tareas));

  // Confirmación de tarea creada
  alert("📝 Tarea creada exitosamente.");
}
function crearNuevaTareaConAsistenciaGuiada(tareas, diaActual) {
  // Solicitar descripción de la tarea
  var descripcion = prompt("Escribe la tarea a realizar:");
  if (!descripcion) {
    alert("⚠️ Tarea inválida. Debes ingresar una descripción válida.");
    return;
  }

  // Preguntar si es urgente y establecer prioridad
  var esUrgente = confirm(`¿Es urgente "${descripcion}"?`);
  var prioridad = esUrgente ? 1 : 2;

  // Preguntar si es importante y agregar estrella si lo es
  var esImportante = confirm(`¿Es importante "${descripcion}"?`);
  if (esImportante) {
    descripcion = `⭐${descripcion}`;
  }

  // Establecer fecha
  var opcionDia = prompt(
    `Establece una fecha (l,m,mi,j,v,s,d,x)\nDeja vacío para hoy:`
  );
  var diaSeleccionado = "";

  switch (opcionDia) {
    case "l":
      diaSeleccionado = `M1 Ene ${descripcion}`;
      break;
    case "m":
      diaSeleccionado = `M2 Feb ${descripcion}`;
      break;
    case "mi":
      diaSeleccionado = `M3 Mar ${descripcion}`;
      break;
    case "j":
      diaSeleccionado = `M4 Abr ${descripcion}`;
      break;
    case "v":
      diaSeleccionado = `M5 May ${descripcion}`;
      break;
    case "s":
      diaSeleccionado = `M6 Jun ${descripcion}`;
      break;
    case "d":
      diaSeleccionado = `M7 Jul ${descripcion}`;
      break;
    case "x":
      var mes = prompt("Elije el mes (1 al 12):");
      var diaMes = prompt("Elije el día (1 al 31):");

      if (!mes || !diaMes || mes < 1 || mes > 12 || diaMes < 1 || diaMes > 31) {
        alert("⚠️ Fecha inválida. La tarea no se creará.");
        return;
      }

      var meses = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ];
      diaSeleccionado = `M${mes} ${meses[mes - 1]} ${diaMes}, ${descripcion}`;
      break;
    default:
      diaSeleccionado = `${descripcion}`;
      break;
  }

  // Crear objeto de nueva tarea
  var nuevaTareaObj = {
    prioridad: prioridad,
    descripcion: diaSeleccionado,
    dia: diaSeleccionado,
  };

  // Agregar tarea a la lista y guardar en localStorage
  tareas.push(nuevaTareaObj);
  localStorage.setItem("tareas", JSON.stringify(tareas));

  // Confirmación de tarea creada
  alert("📝 Tarea creada exitosamente.");
}

function crearNuevaTareaConAsistenciaGuiada(tareas, diaActual) {
  // Solicitar descripción de la tarea
  var descripcion = prompt("Escribe la tarea a realizar:");
  if (!descripcion) {
    alert("⚠️ Tarea inválida. Debes ingresar una descripción válida.");
    return;
  }

  // Preguntar si es urgente y establecer prioridad
  var esUrgente = confirm(`¿Es urgente "${descripcion}"?`);
  var prioridad = esUrgente ? 1 : 2;

  // Preguntar si es importante y agregar estrella si lo es
  var esImportante = confirm(`¿Es importante "${descripcion}"?`);
  if (esImportante) {
    descripcion = `⭐${descripcion}`;
  }

  // Establecer fecha
  var opcionDia = prompt(
    `Establece una fecha (l,m,mi,j,v,s,d,x)\nDeja vacío para hoy:`
  );
  var diaSeleccionado = "";

  switch (opcionDia) {
    case "l":
      diaSeleccionado = `M1 Ene ${descripcion}`;
      break;
    case "m":
      diaSeleccionado = `M2 Feb ${descripcion}`;
      break;
    case "mi":
      diaSeleccionado = `M3 Mar ${descripcion}`;
      break;
    case "j":
      diaSeleccionado = `M4 Abr ${descripcion}`;
      break;
    case "v":
      diaSeleccionado = `M5 May ${descripcion}`;
      break;
    case "s":
      diaSeleccionado = `M6 Jun ${descripcion}`;
      break;
    case "d":
      diaSeleccionado = `M7 Jul ${descripcion}`;
      break;
    case "x":
      var mes = prompt("Elije el mes (1 al 12):");
      var diaMes = prompt("Elije el día (1 al 31):");

      if (!mes || !diaMes || mes < 1 || mes > 12 || diaMes < 1 || diaMes > 31) {
        alert("⚠️ Fecha inválida. La tarea no se creará.");
        return;
      }

      var meses = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ];
      diaSeleccionado = `M${mes} ${meses[mes - 1]} ${diaMes}, ${descripcion}`;
      break;
    default:
      diaSeleccionado = `${descripcion}`;
      break;
  }

  // Crear objeto de nueva tarea
  var nuevaTareaObj = {
    prioridad: prioridad,
    descripcion: descripcion,
    dia: diaSeleccionado,
    estado: esUrgente ? "🔴" : "🟡", // Establecer estado según urgencia
  };

  // Agregar tarea a la lista y guardar en localStorage
  tareas.push(nuevaTareaObj);
  localStorage.setItem("tareas", JSON.stringify(tareas));

  // Confirmación de tarea creada
  alert("📝 Tarea creada exitosamente.");
}

function crearNuevaTareaConAsistenciaGuiada(tareas, diaActual) {
  // Solicitar descripción de la tarea
  var descripcion = prompt("Escribe la tarea a realizar:");
  if (!descripcion) {
    alert("⚠️ Tarea inválida. Debes ingresar una descripción válida.");
    return;
  }

  // Preguntar si es importante y establecer la prioridad y la descripción final
  var esImportante = confirm(`¿Es importante "${descripcion}"?`);
  var prioridad = esImportante ? 1 : 2;

  // Si es importante, agregar la estrella al inicio de la descripción
  if (esImportante) {
    descripcion = `⭐${descripcion}`;
  }

  // Preguntar si se desea establecer una fecha específica
  var establecerFecha = confirm(
    `¿Deseas establecer una fecha específica para "${descripcion}"?`
  );
  if (establecerFecha) {
    var mes = prompt("Elije el mes (1 al 12):");
    var dia = prompt("Elije el día (1 al 31):");

    if (!mes || !dia || mes < 1 || mes > 12 || dia < 1 || dia > 31) {
      alert("⚠️ Fecha inválida. La tarea no se creará.");
      return;
    }

    var meses = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];

    descripcion = `${descripcion}, M${mes} ${meses[mes - 1]} ${dia}`;
  }

  // Crear objeto de nueva tarea
  var nuevaTareaObj = {
    prioridad: prioridad,
    descripcion: descripcion,
    dia: diaActual,
  };

  // Agregar tarea a la lista y guardar en localStorage
  tareas.push(nuevaTareaObj);
  localStorage.setItem("tareas", JSON.stringify(tareas));

  // Confirmación de tarea creada
  alert("📝 Tarea creada exitosamente.");
}

function crearNuevaTareaConAsistenciaGuiada(tareas, diaActual) {
  var descripcion = prompt("Describe la tarea a realizar:");
  if (!descripcion) {
    alert("⚠️ Tarea inválida. Debes ingresar una descripción válida.");
    return;
  }

  // Preguntar por la urgencia (prioridad 1 o 2)
  var confirmacionUrgencia = confirm(`¿"${descripcion}" es urgente?`);
  var prioridad = confirmacionUrgencia ? 1 : 2;

  // Preguntar por la fecha específica
  var opcionesDia = `(l: Lunes),(m: Martes),(mi: Miércoles),(j: Jueves),(v: Viernes),(s: Sábado),(d: Domingo),(x: Fecha especifica)\n*Deja este campo vacio para asignar hoy`;
  var opcionDia = prompt(
    `¿Cuándo harás la tarea "${descripcion}"?\n${opcionesDia}`
  );
  var diaSeleccionado;

  switch (opcionDia) {
    case "":
      diaSeleccionado = diaActual;
      break;
    case "l":
      diaSeleccionado = "l";
      break;
    case "m":
      diaSeleccionado = "m";
      break;
    case "mi":
      diaSeleccionado = "mi";
      break;
    case "j":
      diaSeleccionado = "j";
      break;
    case "v":
      diaSeleccionado = "v";
      break;
    case "s":
      diaSeleccionado = "s";
      break;
    case "d":
      diaSeleccionado = "d";
      break;
    case "x":
      var mes = prompt("Elije el mes (1 al 12):");
      if (
        !mes ||
        isNaN(parseInt(mes)) ||
        parseInt(mes) < 1 ||
        parseInt(mes) > 12
      ) {
        alert("⚠️ Mes inválido. La tarea no se creará.");
        return;
      }
      var dia = prompt("Elije el día (1 al 31):");
      if (
        !dia ||
        isNaN(parseInt(dia)) ||
        parseInt(dia) < 1 ||
        parseInt(dia) > 31
      ) {
        alert("⚠️ Día inválido. La tarea no se creará.");
        return;
      }
      // Formar la fecha específica en el formato deseado
      descripcion = `M${mes} ${obtenerNombreMes(
        parseInt(mes)
      )} ${dia},${descripcion}`;
      diaSeleccionado = "x";
      break;
    default:
      alert("⚠️ Opción inválida. La tarea no se creará.");
      return;
  }

  if (descripcion.length > 70) {
    alert(
      "⚠️ Tarea demasiado larga. La tarea debe tener 70 caracteres o menos."
    );
    return;
  }

  // Preguntar por la importancia (añadir estrella al inicio)
  var confirmacionImportancia = confirm(`¿"${descripcion}" es importante?`);
  if (confirmacionImportancia) {
    descripcion = `⭐${descripcion}`;
  }

  var estadoEmoji = prioridad === 1 ? "🟡" : "🔴";

  var nuevaTareaObj = {
    prioridad: prioridad,
    estado: estadoEmoji,
    descripcion: descripcion,
    dia: diaSeleccionado,
  };

  tareas.push(nuevaTareaObj);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  alert("📝 Tarea creada exitosamente.");
}

// Función auxiliar para obtener el nombre del mes
function obtenerNombreMes(numeroMes) {
  var meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  return meses[numeroMes - 1];
}

function anteriorDia(diaActual) {
  var ordenDias = ["d", "l", "m", "mi", "j", "v", "s"];
  var indice = ordenDias.indexOf(diaActual);
  return indice === -1 || indice === 0 ? "s" : ordenDias[indice - 1];
}

function siguienteDia(diaActual) {
  var ordenDias = ["d", "l", "m", "mi", "j", "v", "s"];
  var indice = ordenDias.indexOf(diaActual);
  return indice === -1 || indice === ordenDias.length - 1
    ? "d"
    : ordenDias[indice + 1];
}

///////////////////////////////////////////////////////////////////////

function verOCrearRutina() {
  // Cargar la rutina existente, si la hay
  var rutina = localStorage.getItem("rutina") || "";

  // Definir los mapeos para estados y días
  var estadoMap = {
    p: "🔴",
    e: "🟡",
    f: "🟢",
  };

  var diaMap = {
    l: "Lunes.",
    m: "Martes.",
    mi: "Miércoles.",
    j: "Jueves.",
    v: "Viernes.",
    s: "Sábado.",
    d: "Domingo.",
    x: "",
  };

  // Definir el mapeo para prioridades
  var prioridadMap = {
    1: 1,
    2: 2,
    3: 3,
  };

  // Función para convertir el formato abreviado a uno más descriptivo
  function convertirRutinaFormateada(rutina) {
    var partesRutina = rutina.split(";").filter((t) => t.trim() !== "");
    var rutinaFormateada = partesRutina
      .map((tarea) => {
        var partesTarea = tarea.split(",");
        if (partesTarea.length < 4) {
          return ""; // Ignorar las tareas con formato incorrecto
        }
        var prioridad = prioridadMap[partesTarea[0]] || partesTarea[0];
        var estado = estadoMap[partesTarea[1].toLowerCase()] || partesTarea[1];
        var descripcion = partesTarea.slice(2, -1).join(",");
        var dia =
          diaMap[partesTarea[partesTarea.length - 1].toLowerCase()] ||
          partesTarea[partesTarea.length - 1];
        return `${prioridad}${estado}${descripcion},${dia}`;
      })
      .join("\n");
    return rutinaFormateada;
  }

  // Convertir la rutina a un formato más descriptivo
  var rutinaFormateada = convertirRutinaFormateada(rutina);
  var nuevaRutina = prompt(
    "🔃Rutina actual:\n" +
      rutinaFormateada +
      "\n\n*Ingresa la nueva rutina con el formato: 'Prioridad,Estado,Descripción,Día;Prioridad,Estado,Descripción,Día;...'",
    rutina
  );

  // Verificar si el usuario presionó "Cancelar"
  if (nuevaRutina === null) {
    return; // Salir de la función sin hacer nada
  }

  // Si el usuario ingresó una rutina vacía, solicitar confirmación
  if (nuevaRutina.trim() === "") {
    alert("⚠️Creación rutina inválida");
    return;
  }

  // Procesar las tareas de la rutina y validar
  var partesRutina = nuevaRutina.split(";").filter((t) => t.trim() !== ""); // Filtrar para eliminar cualquier tarea vacía

  // Verificar si la palabra clave "crear" está al final
  var ultimaParte = partesRutina[partesRutina.length - 1].trim().toLowerCase();
  var crearAlFinal = ultimaParte === "crear";

  // Si "crear" está al final, eliminarlo de las partes de la rutina
  if (crearAlFinal) {
    partesRutina.pop();
  }

  // Validar las tareas
  for (var tarea of partesRutina) {
    var partesTarea = tarea.split(",");
    if (partesTarea.length < 4) {
      alert("⚠️Formato de tarea inválido. La tarea no se creará.");
      return;
    }

    var prioridad = parseInt(partesTarea[0]);
    var estado = partesTarea[1].toLowerCase();
    var descripcion = partesTarea.slice(2, -1).join(","); // Seleccionar solo las partes de la descripción, excluyendo el último elemento (que es el día)
    var dia = partesTarea[partesTarea.length - 1].toLowerCase();

    // Verificar la longitud de la descripción
    if (descripcion.length > 64) {
      alert(
        "⚠️Descripción demasiado larga. La descripción debe tener 64 caracteres o menos."
      );
      return; // Descripción demasiado larga
    }

    // Verificar si el estado es válido
    var estadoEmoji;
    switch (estado) {
      case "p":
        estadoEmoji = "🔴";
        break;
      case "e":
        estadoEmoji = "🟡";
        break;
      case "f":
        estadoEmoji = "🟢";
        break;
      default:
        alert("⚠️Estado inválido. La tarea no se creará.");
        return;
    }

    // Verificar si la prioridad es válida
    if (isNaN(prioridad) || prioridad < 1 || prioridad > 3) {
      alert("⚠️Prioridad inválida. La tarea no se creará.");
      return;
    }

    // Verificar si el día es válido
    var diasValidos = ["l", "m", "mi", "j", "v", "s", "d", "x"];
    if (!diasValidos.includes(dia)) {
      alert("⚠️Día inválido. La tarea no se creará.");
      return;
    }
  }

  // Guardar la rutina actualizada solo si ha cambiado y es válida
  if (nuevaRutina !== rutina) {
    localStorage.setItem("rutina", partesRutina.join(";"));
    alert("✅Rutina guardada exitosamente.");

    // Si "crear" estaba al final, confirmar la creación de las tareas a partir de la rutina
    if (crearAlFinal) {
      // Confirmar la creación de las tareas a partir de la rutina
      var confirmacion = confirm(
        "⚠️¿Estás seguro de que deseas crear las tareas a partir de la rutina?"
      );
      if (!confirmacion) {
        return; // Salir de la función sin hacer nada si el usuario cancela
      }

      // Generar tres números aleatorios para la suma
      var num1 = Math.floor(Math.random() * 10);
      var num2 = Math.floor(Math.random() * 10);
      var num3 = Math.floor(Math.random() * 10);
      var sumaCorrecta = num1 + num2 + num3;
      var sumaUsuario = parseInt(
        prompt(
          `Para confirmar, resuelve la siguiente suma: ${num1} + ${num2} + ${num3}`
        )
      );
      if (sumaUsuario === sumaCorrecta) {
        // Procesar y agregar las tareas a las tareas existentes
        var tareas = JSON.parse(localStorage.getItem("tareas")) || [];
        for (var tarea of partesRutina) {
          var partesTarea = tarea.split(",");
          var prioridad = parseInt(partesTarea[0]);
          var estado = partesTarea[1].toLowerCase();
          var descripcion = partesTarea.slice(2, -1).join(",");
          var dia = partesTarea[partesTarea.length - 1].toLowerCase();
          var estadoEmoji;
          switch (estado) {
            case "p":
              estadoEmoji = "🔴";
              break;
            case "e":
              estadoEmoji = "🟡";
              break;
            case "f":
              estadoEmoji = "🟢";
              break;
          }
          var prioridadEmoji = prioridadMap[prioridad.toString()] || prioridad;
          var nuevaTareaObj = {
            prioridad: prioridadEmoji,
            estado: estadoEmoji,
            descripcion: descripcion,
            dia: dia,
          };
          tareas.push(nuevaTareaObj);
        }
        // Guardar las tareas actualizadas en localStorage
        localStorage.setItem("tareas", JSON.stringify(tareas));
        alert("✅Tareas creadas exitosamente a partir de la rutina.");
      } else {
        alert("⚠️Respuesta incorrecta. Las tareas no se crearán.");
      }
    }
  }
}

//////////////////////////////////////////////////////////////////////////////
/*
function editarTarea() {
  var tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  if (tareas.length === 0) {
    alert("⚠️Actualmente, no tienes tareas para gestionar.");
    return;
  }

  var mensaje =
    "Selecciona la tarea a gestionar. escribe 'aplazar' para aplazar tareas\n";
  for (var index = tareas.length - 1; index >= 0; index--) {
    var tarea = tareas[index];
    mensaje += `${index + 1}. ${convertirPrioridad(tarea.prioridad)} ${
      tarea.estado
    } ${tarea.descripcion}, ${obtenerNombreDia(tarea.dia)}.\n`;
  }

  var tareaSeleccionada = prompt(mensaje);

  // Nueva característica
  if (tareaSeleccionada === "aplazar") {
    for (var i = 0; i < tareas.length; i++) {
      if (tareas[i].prioridad === 2) {
        tareas[i].prioridad = 3; // Cambiar la prioridad a 3
      }
    }
    console.log("Estás intentando aplazar las tareas");
    alert(
      "🕒Todas las tareas con prioridad 2 han sido aplazadas a prioridad 3."
    );
    localStorage.setItem("tareas", JSON.stringify(tareas));
    return;
  }

  if (tareaSeleccionada === null) return; // Usuario canceló
  tareaSeleccionada = parseInt(tareaSeleccionada) - 1;

  if (
    isNaN(tareaSeleccionada) ||
    tareaSeleccionada < 0 ||
    tareaSeleccionada >= tareas.length
  ) {
    alert("⚠️Tarea inválida.");
    return;
  }

  var nuevaPrioridad = prompt(
    "Ingresa la nueva prioridad (1: 🔥, 2: 🔔, 3: 📆):",
    tareas[tareaSeleccionada].prioridad
  );
  if (nuevaPrioridad === null) return; // Usuario canceló
  nuevaPrioridad = parseInt(nuevaPrioridad);

  var nuevoEstado = prompt(
    "Ingresa el nuevo estado (p: 🔴, e: 🟡, f: 🟢):",
    "p"
  );
  if (nuevoEstado === null) return; // Usuario canceló

  var nuevaDescripcion = prompt(
    "Ingresa la nueva descripción:",
    tareas[tareaSeleccionada].descripcion
  );
  if (nuevaDescripcion === null) return; // Usuario canceló

  // Verificar la longitud de la nueva descripción
  if (nuevaDescripcion.length > 64) {
    alert(
      "⚠️Descripción demasiado larga. La descripción debe tener 64 caracteres o menos."
    );
    return; // Descripción demasiado larga
  }

  var nuevoDia = prompt(
    "Ingresa el nuevo día (l: Lunes, m: Martes, mi: Miércoles, j: Jueves, v: Viernes, s: Sábado, d: Domingo, x: Sin asignar)\n*Escribe 'borrar' para eliminar la tarea:",
    tareas[tareaSeleccionada].dia
  );
  if (nuevoDia === null) return; // Usuario canceló

  if (isNaN(nuevaPrioridad) || nuevaPrioridad < 1 || nuevaPrioridad > 3) {
    alert("⚠️Prioridad inválida.");
    return;
  }

  var estadoEmoji;
  switch (nuevoEstado.toLowerCase()) {
    case "p":
      estadoEmoji = "🔴";
      break;
    case "e":
      estadoEmoji = "🟡";
      break;
    case "f":
      estadoEmoji = "🟢";
      break;
    default:
      alert("⚠️Estado inválido.");
      return;
  }

  if (nuevoDia.toLowerCase() === "borrar") {
    tareas.splice(tareaSeleccionada, 1);
    alert("🗑️Tarea borrada exitosamente.");
  } else {
    var diaTexto;
    switch (nuevoDia.toLowerCase()) {
      case "l":
        diaTexto = "l";
        break;
      case "m":
        diaTexto = "m";
        break;
      case "mi":
        diaTexto = "mi";
        break;
      case "j":
        diaTexto = "j";
        break;
      case "v":
        diaTexto = "v";
        break;
      case "s":
        diaTexto = "s";
        break;
      case "d":
        diaTexto = "d";
        break;
      case "x":
        diaTexto = "x";
        break;
      default:
        alert("⚠️Día inválido.");
        return;
    }

    tareas[tareaSeleccionada].prioridad = nuevaPrioridad;
    tareas[tareaSeleccionada].estado = estadoEmoji;
    tareas[tareaSeleccionada].descripcion = nuevaDescripcion;
    tareas[tareaSeleccionada].dia = diaTexto;

    alert("✏️Tarea editada exitosamente.");
    renderChart(medicionSemanalActualizada);
  }

  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function obtenerNombreDia(abreviaturaDia) {
  switch (abreviaturaDia.toLowerCase()) {
    case "s":
      return "S";
    case "d":
      return "D";
    case "l":
      return "L";
    case "m":
      return "M";
    case "mi":
      return "Mi";
    case "j":
      return "J";
    case "v":
      return "V";
    case "x":
      return "X";
    default:
      return "?";
  }
}

function convertirPrioridad(prioridad) {
  var prioridadMap = {
    1: "🔥",
    2: "🔔",
    3: "📆",
  };
  return prioridadMap[prioridad] || prioridad;
}
*/

function editarTarea() {
  var tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  if (tareas.length === 0) {
    alert("⚠️Actualmente, no tienes tareas para gestionar.");
    return;
  }

  var mensaje =
    "Selecciona la tarea a gestionar. Escribe 'aplazar' para aplazar tareas\n";
  for (var index = tareas.length - 1; index >= 0; index--) {
    var tarea = tareas[index];
    mensaje += `${index + 1}.${convertirPrioridad(
      tarea.prioridad
    )}${obtenerNombreDia(tarea.dia)}${tarea.estado}${tarea.descripcion}.\n`;
  }

  var tareaSeleccionada = prompt(mensaje);

  // Nueva característica
  if (tareaSeleccionada === "aplazar") {
    for (var i = 0; i < tareas.length; i++) {
      if (tareas[i].prioridad === 2) {
        tareas[i].prioridad = 3; // Cambiar la prioridad a 3
      }
    }
    console.log("Estás intentando aplazar las tareas");
    alert(
      "🕒Todas las tareas con prioridad 2 han sido aplazadas a prioridad 3."
    );
    localStorage.setItem("tareas", JSON.stringify(tareas));
    renderChart(medicionSemanalActualizada);
    return;
  }

  if (tareaSeleccionada === null) return; // Usuario canceló
  tareaSeleccionada = parseInt(tareaSeleccionada) - 1;

  if (
    isNaN(tareaSeleccionada) ||
    tareaSeleccionada < 0 ||
    tareaSeleccionada >= tareas.length
  ) {
    alert("⚠️Tarea inválida.");
    return;
  }

  var nuevaPrioridad = prompt(
    "Ingresa la nueva prioridad (1: 🔥, 2: 🔔, 3: 📆):",
    tareas[tareaSeleccionada].prioridad
  );
  if (nuevaPrioridad === null) return; // Usuario canceló
  nuevaPrioridad = parseInt(nuevaPrioridad);

  var nuevoEstado = prompt(
    "Ingresa el nuevo estado (p: 🔴, e: 🟡, f: 🟢):",
    tareas[tareaSeleccionada].estado === "🔴"
      ? "p"
      : tareas[tareaSeleccionada].estado === "🟡"
      ? "e"
      : "f"
  );
  if (nuevoEstado === null) return; // Usuario canceló

  var nuevaDescripcion = prompt(
    "Ingresa la nueva descripción:",
    tareas[tareaSeleccionada].descripcion
  );
  if (nuevaDescripcion === null) return; // Usuario canceló

  // Verificar la longitud de la nueva descripción
  if (nuevaDescripcion.length > 64) {
    alert(
      "⚠️Descripción demasiado larga. La descripción debe tener 64 caracteres o menos."
    );
    return; // Descripción demasiado larga
  }

  var nuevoDia = prompt(
    "Ingresa el nuevo día (l: Lunes, m: Martes, mi: Miércoles, j: Jueves, v: Viernes, s: Sábado, d: Domingo, x: Sin asignar)\n*Escribe 'borrar' para eliminar la tarea:",
    tareas[tareaSeleccionada].dia
  );
  if (nuevoDia === null) return; // Usuario canceló

  if (isNaN(nuevaPrioridad) || nuevaPrioridad < 1 || nuevaPrioridad > 3) {
    alert("⚠️Prioridad inválida.");
    return;
  }

  var estadoEmoji;
  switch (nuevoEstado.toLowerCase()) {
    case "p":
      estadoEmoji = "🔴";
      break;
    case "e":
      estadoEmoji = "🟡";
      break;
    case "f":
      estadoEmoji = "🟢";
      break;
    default:
      alert("⚠️Estado inválido.");
      return;
  }

  if (nuevoDia.toLowerCase() === "borrar") {
    tareas.splice(tareaSeleccionada, 1);
    alert("🗑️Tarea borrada exitosamente.");
  } else {
    var diaTexto;
    switch (nuevoDia.toLowerCase()) {
      case "l":
        diaTexto = "l";
        break;
      case "m":
        diaTexto = "m";
        break;
      case "mi":
        diaTexto = "mi";
        break;
      case "j":
        diaTexto = "j";
        break;
      case "v":
        diaTexto = "v";
        break;
      case "s":
        diaTexto = "s";
        break;
      case "d":
        diaTexto = "d";
        break;
      case "x":
        diaTexto = "x";
        break;
      default:
        alert("⚠️Día inválido.");
        return;
    }

    tareas[tareaSeleccionada].prioridad = nuevaPrioridad;
    tareas[tareaSeleccionada].estado = estadoEmoji;
    tareas[tareaSeleccionada].descripcion = nuevaDescripcion;
    tareas[tareaSeleccionada].dia = diaTexto;

    alert("✏️Tarea editada exitosamente.");
    localStorage.setItem("tareas", JSON.stringify(tareas));

    // Actualizar el progreso y la gráfica después de editar la tarea
    var tareasDiaActualizadas = tareas.filter(
      (tarea) => tarea.dia === diaTexto
    );
    var totalTareasDiaActualizadas = tareasDiaActualizadas.length;
    var tareasCompletadasDiaActualizadas = tareasDiaActualizadas.filter(
      (tarea) => tarea.estado === "🟢"
    ).length;
    var progresoDiaActualizado =
      totalTareasDiaActualizadas > 0
        ? Math.round(
            (tareasCompletadasDiaActualizadas / totalTareasDiaActualizadas) *
              100
          )
        : 0;

    const medicionSemanalActualizada =
      JSON.parse(localStorage.getItem("medicionSemanal")) || initialData;
    const diaDataActualizada = medicionSemanalActualizada.find(
      (item) => item.dia.toLowerCase() === diaTexto
    );
    if (diaDataActualizada) {
      diaDataActualizada.rendimiento = progresoDiaActualizado;
    }
    localStorage.setItem(
      "medicionSemanal",
      JSON.stringify(medicionSemanalActualizada)
    );

    renderChart(medicionSemanalActualizada);
  }
}

function obtenerNombreDia(abreviaturaDia) {
  switch (abreviaturaDia.toLowerCase()) {
    case "s":
      return "S";
    case "d":
      return "D";
    case "l":
      return "L";
    case "m":
      return "M";
    case "mi":
      return "Mi";
    case "j":
      return "J";
    case "v":
      return "V";
    case "x":
      return "X";
    default:
      return "?";
  }
}

function convertirPrioridad(prioridad) {
  var prioridadMap = {
    1: "🔥",
    2: "🔔",
    3: "📆",
  };
  return prioridadMap[prioridad] || prioridad;
}

//////////////////////////////////////////////////////////////////////////////

function actualizarTareas() {
  // Generar dos números aleatorios entre 1 y 10
  var numero1 = Math.floor(Math.random() * 10) + 1;
  var numero2 = Math.floor(Math.random() * 10) + 1;
  var numero3 = Math.floor(Math.random() * 10) + 1;

  // Pedir al usuario que resuelva la suma
  var respuestaUsuario = prompt(
    `¿Está seguro de actualizar las tareas?\n*Para confirmar la actualización de las tareas\nresuelve la siguiente suma: ${numero1} + ${numero2} + ${numero3}`
  );

  // Verificar si el usuario presionó "Cancelar"
  if (respuestaUsuario === null) {
    return; // Salir de la función sin hacer nada
  }

  // Verificar si la respuesta es correcta
  var sumaCorrecta = numero1 + numero2 + numero3;

  if (parseInt(respuestaUsuario) === sumaCorrecta) {
    var tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    var tareasCompletadas =
      JSON.parse(localStorage.getItem("tareasCompletadas")) || [];

    // Filtrar las tareas completadas y añadirlas a tareasCompletadas
    var nuevasTareas = tareas.filter((tarea) => {
      if (tarea.prioridad === 1 && tarea.estado === "🟢") {
        tareasCompletadas.push(tarea); // Añadir la tarea a tareasCompletadas
        return false; // No añadir la tarea a nuevasTareas
      }
      // Verificar si la tarea tiene prioridad 2
      if (tarea.prioridad === 2) {
        tarea.prioridad = 1; // Cambiar la prioridad a 1
      }
      // Verificar si la tarea tiene prioridad 3
      if (tarea.prioridad === 3) {
        tarea.prioridad = 2; // Cambiar la prioridad a 2
      }
      return true; // Mantener la tarea en nuevasTareas
    });

    // Actualizar el LocalStorage con las tareas filtradas
    localStorage.setItem("tareas", JSON.stringify(nuevasTareas));
    localStorage.removeItem("medicionSemanal");
    location.reload();

    // Actualizar el registro de tareas completadas en el LocalStorage
    localStorage.setItem(
      "tareasCompletadas",
      JSON.stringify(tareasCompletadas)
    );

    alert("🪄Tareas actualizadas exitosamente.");
  } else {
    alert("⚠️Las tareas no han sido actualizadas.");
  }
}

//////////////////////////////////////////////////////////////////////////////

function calcularNivel(numTareasCompletadas) {
  if (numTareasCompletadas >= 1000) {
    return "14🌌";
  } else if (numTareasCompletadas >= 500) {
    return "13💫";
  } else if (numTareasCompletadas >= 200) {
    return "12🔥";
  } else if (numTareasCompletadas >= 150) {
    return "11👑";
  } else {
    return obtenerEmojiNivel(Math.floor(numTareasCompletadas / 10) + 1);
  }
}

function obtenerEmojiNivel(nivel) {
  var emojis = [
    "1🐭",
    "2🐸",
    "3🐵",
    "4🦊",
    "5🐺",
    "6🐯",
    "7🦁",
    "8🐻",
    "9🐼",
    "10🐉",
  ];
  return emojis[Math.min(nivel - 1, emojis.length - 1)];
}

function calcularTareasRestantes(numTareasCompletadas) {
  return 10 - (numTareasCompletadas % 10);
}

function verTareasCompletadas() {
  var tareasCompletadas =
    JSON.parse(localStorage.getItem("tareasCompletadas")) || [];

  // Verificar si no hay tareas completadas
  if (tareasCompletadas.length === 0) {
    alert("⚠️Actualmente, no hay ninguna tarea completada para mostrar.");
    return;
  }

  // Invertir el orden de las tareas completadas
  tareasCompletadas.reverse();

  var numTareasCompletadas = tareasCompletadas.length;
  var nivel = calcularNivel(numTareasCompletadas);
  var numTareasRestantes = calcularTareasRestantes(numTareasCompletadas);

  var mensaje = `🟢Tareas completadas - Tu nivel: ${nivel}\n*Tienes (${numTareasCompletadas}🟢), requieres (${numTareasRestantes}🟢) más para subir de nivel.\n`;
  tareasCompletadas.forEach((tarea) => {
    mensaje += `${tarea.estado} ${tarea.descripcion}, ${convertirDiaCompletadas(
      tarea.dia
    )}.\n`;
  });

  // Pedir al usuario que resuelva la suma para confirmar la eliminación de las tareas completadas
  var respuestaUsuario = prompt(
    `${mensaje}*Para la eliminación de las tareas completadas, escribe "borrar"`
  );

  // Verificar si el usuario ha ingresado una respuesta
  if (respuestaUsuario !== null) {
    // Verificar si la respuesta es correcta
    if (respuestaUsuario.trim().toLowerCase() === "borrar") {
      var confirmacion = confirm(
        "⚠️¿Estás seguro de que deseas eliminar el registro de tareas completadas?"
      );
      if (confirmacion) {
        // Generar tres números aleatorios entre 1 y 10
        var numero1 = Math.floor(Math.random() * 10) + 1;
        var numero2 = Math.floor(Math.random() * 10) + 1;
        var numero3 = Math.floor(Math.random() * 10) + 1;
        var sumaCorrecta = numero1 + numero2 + numero3;

        // Pedir al usuario que resuelva la suma
        var respuestaSuma = prompt(
          `Para confirmar, resuelve la siguiente suma: ${numero1} + ${numero2} + ${numero3}`
        );

        // Verificar si el usuario ha ingresado una respuesta
        if (respuestaSuma !== null) {
          // Verificar si la respuesta es correcta
          if (
            !isNaN(parseInt(respuestaSuma)) &&
            parseInt(respuestaSuma) === sumaCorrecta
          ) {
            localStorage.removeItem("tareasCompletadas"); // Eliminar el registro de tareas completadas
            alert("🗑️Registro de tareas completadas eliminado exitosamente.");
          } else {
            alert(
              "⚠️Respuesta incorrecta. El registro de tareas completadas no ha sido eliminado."
            );
          }
        }
      }
    }
  }
}

function convertirDiaCompletadas(dia) {
  var diaMap = {
    l: "Lunes",
    m: "Martes",
    mi: "Miércoles",
    j: "Jueves",
    v: "Viernes",
    s: "Sábado",
    d: "Domingo",
    x: "",
  };
  return diaMap[dia.toLowerCase()] || dia;
}

//////////////////////////////////////////////////////////////////////////////
/*
async function verOEscribirNota() {
  // Cargar la nota existente, si la hay
  var nota = localStorage.getItem("nota") || "";

  // Reemplazar todas las comas por saltos de línea para mostrar la nota formateada
  var notaFormateada = nota.replace(/;/g, "\n");
  var nuevaNota = prompt("📋Nota:\n" + notaFormateada + "", nota);

  // Verificar si el usuario presionó "Cancelar"
  if (nuevaNota === null) {
    return; // Salir de la función sin hacer nada
  }

  // Verificar si la entrada contiene la palabra "exportar"
  if (nuevaNota.endsWith(";exportar")) {
    // Remover ";exportar" de la entrada
    nuevaNota = nuevaNota.replace(";exportar", "");

    // Generar el nombre del archivo basado en la fecha y hora actuales
    var fecha = new Date();
    var dia = String(fecha.getDate()).padStart(2, "0");
    var mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
    var año = fecha.getFullYear();
    var horas = String(fecha.getHours()).padStart(2, "0");
    var minutos = String(fecha.getMinutes()).padStart(2, "0");
    var nombreArchivo = `Todo.html Notes - ${dia}-${mes}-${año} ${horas}.${minutos}.txt`;

    // Crear un blob con las notas
    var blob = new Blob([nuevaNota.replace(/;/g, "\n")], {
      type: "text/plain",
    });

    // Configurar las opciones del diálogo de guardado
    const options = {
      suggestedName: nombreArchivo,
      types: [
        {
          description: "Text Files",
          accept: {
            "text/plain": [".txt"],
          },
        },
      ],
    };

    try {
      // Mostrar el diálogo de guardado de archivos
      const handle = await window.showSaveFilePicker(options);
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();

      alert("✅Notas exportadas exitosamente.");
    } catch (err) {
      console.error("Error al guardar el archivo:", err);
      alert("❌Error al exportar las notas.");
    }

    return; // Salir de la función después de exportar
  }

  // Si el usuario ingresó una nota vacía, solicitar confirmación
  if (nuevaNota.trim() === "") {
    var confirmacion = confirm(
      "⚠️¿Estás seguro de que deseas guardar la nota en blanco?"
    );
    if (!confirmacion) {
      return; // Salir de la función sin hacer nada si el usuario cancela
    }
  }

  // Guardar la nota actualizada o nueva
  localStorage.setItem("nota", nuevaNota);
  alert("✅Nota guardada exitosamente.");
}
*/
//////////////////////////////////////////////////////////////////////////////

function aleatorio() {
  numero = prompt(
    "Ingresa un numero\n*El numero aleatorio se calculará entre 1 y el numero ingresado."
  );

  // Verificar si el usuario presionó "Cancelar" o ingresó un valor no válido
  if (numero === null || isNaN(numero)) {
    alert("⚠️Ingresa un valor numérico válido para el rango inicial.");
    return;
  }

  alert(`🎲El número aleatorio es ${Math.floor(Math.random() * numero + 1)}`);
}

//////////////////////////////////////////////////////////////////////////////

function porcentaje() {
  // Solicitar el número de partes
  var numero_porcentaje_partes = parseInt(
    prompt(
      "Ingresa el número de partes\n*Si tienes 3 partes de algo, ingresa 3."
    )
  );

  // Verificar si el usuario presionó "Cancelar" o ingresó un valor no válido
  if (numero_porcentaje_partes === null || isNaN(numero_porcentaje_partes)) {
    alert("⚠️Ingresa un valor numérico válido para las partes.");
    return;
  }

  // Solicitar el número total
  var numero_porcentaje_total = parseInt(
    prompt("Ingresa el número total\n*Si el total es 10, ingresa 10.")
  );

  // Verificar si el usuario presionó "Cancelar" o ingresó un valor no válido
  if (numero_porcentaje_total === null || isNaN(numero_porcentaje_total)) {
    alert("⚠️Ingresa un valor numérico válido para el total.");
    return;
  }

  // Calcular el porcentaje
  var porcentaje_operacion =
    (numero_porcentaje_partes / numero_porcentaje_total) * 100;

  // Mostrar el resultado
  alert(
    "📊El porcentaje de " +
      numero_porcentaje_partes +
      "/" +
      numero_porcentaje_total +
      " es: " +
      Math.floor(porcentaje_operacion) +
      "%"
  );
}

//////////////////////////////////////////////////////////////////////////////

function importarDatos() {
  var input = document.createElement("input");
  input.type = "file";
  input.accept = ".json"; // Aceptar solo archivos de texto (.json)

  input.onchange = function (e) {
    var file = e.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function (readerEvent) {
      var content = readerEvent.target.result;
      if (!content) {
        alert("⚠️El archivo seleccionado está vacío.");
        return;
      }

      try {
        var datos = JSON.parse(content);
        if (!datos || !Array.isArray(datos.tareas)) {
          throw new Error("El formato del archivo no es válido.");
        }

        localStorage.setItem("tareas", JSON.stringify(datos.tareas));
        localStorage.setItem(
          "tareasCompletadas",
          JSON.stringify(datos.tareasCompletadas || [])
        ); // Incluir tareasCompletadas

        localStorage.setItem("nota", datos.nota || "");
        localStorage.setItem("rutina", datos.rutina || ""); // Incluir la rutina
        localStorage.setItem(
          "medicionSemanal",
          datos.medicionSemanal || initialData
        ); // Incluir la rutina
        alert("📥Datos importados exitosamente.");
        location.reload(); // Recargar la página para reflejar los cambios en el LocalStorage
      } catch (error) {
        alert("⚠️Error al importar el archivo: " + error.message);
      }
    };

    reader.readAsText(file);
  };

  input.click();
}

//////////////////////////////////////////////////////////////////////////////

function exportarDatos() {
  var datos = {
    tareas: JSON.parse(localStorage.getItem("tareas")) || [],
    tareasCompletadas:
      JSON.parse(localStorage.getItem("tareasCompletadas")) || [], // Incluir tareasCompletadas
    nota: localStorage.getItem("nota") || "",
    rutina: localStorage.getItem("rutina") || "", // Incluir la rutina
    medicionSemanal: localStorage.getItem("medicionSemanal") || initialData,
  };

  var jsonContent = JSON.stringify(datos);

  // Obtener la fecha y hora actual
  var fecha = new Date();
  var dia = String(fecha.getDate()).padStart(2, "0");
  var mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Enero es 0
  var anio = fecha.getFullYear();
  var horas = String(fecha.getHours()).padStart(2, "0");
  var minutos = String(fecha.getMinutes()).padStart(2, "0");
  var segundos = String(fecha.getSeconds()).padStart(2, "0");

  // Formatear la fecha y hora como DD-MM-YYYY HH-MM-SS
  var fechaFormateada = `${dia}-${mes}-${anio} ${horas}.${minutos}`;

  // Crear el nombre del archivo con la fecha y hora
  var nombreArchivo = `Todo.html - ${fechaFormateada}.json`;

  var encodedUri =
    "data:text/json;charset=utf-8," + encodeURIComponent(jsonContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", nombreArchivo);
  document.body.appendChild(link);
  link.click();

  alert("💾Datos exportados exitosamente.");
}

//////////////////////////////////////////////////////////////////////////////

function borrarDatos() {
  // Generar dos números aleatorios entre 1 y 10
  var numero1 = Math.floor(Math.random() * 10) + 1;
  var numero2 = Math.floor(Math.random() * 10) + 1;

  // Pedir al usuario que resuelva la suma
  var respuestaUsuario = prompt(
    `Para confirmar el formateo de datos\nresuelve la siguiente suma: ${numero1} + ${numero2}`
  );

  // Verificar si la respuesta es correcta
  var sumaCorrecta = numero1 + numero2;

  if (parseInt(respuestaUsuario) === sumaCorrecta) {
    localStorage.clear();
    alert("🗑️Datos formateados exitosamente.");
    location.reload();
  } else {
    alert("⚠️Los datos no han sido borrados.");
  }
}

//////////////////////////////////////////////////////////////////////////////

function textToHtml() {
  var ubicacionActual = window.location.origin;
  // Agregar la ruta o el nombre del archivo que deseas
  var nuevaUbicacion = ubicacionActual + "/miniprograma/textto.html";
  // Redirigir a la nueva ubicación
  window.location.href = nuevaUbicacion;
}

//////////////////////////////////////////////////////////////////////////////

function walllist() {
  var ubicacionActual = window.location.origin;
  // Agregar la ruta o el nombre del archivo que deseas
  var nuevaUbicacion = ubicacionActual + "/walllist/walllist";
  // Redirigir a la nueva ubicación
  window.location.href = nuevaUbicacion;
}

//////////////////////////////////////////////////////////////////////////////

function comoUsar() {
  window.open("https://adolfsan99.github.io/miniprograma/", "_blank");
}

//////////////////////////////////////////////////////////////////////////////

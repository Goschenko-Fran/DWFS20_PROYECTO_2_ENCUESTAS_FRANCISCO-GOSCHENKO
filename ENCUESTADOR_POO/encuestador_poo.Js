// SISTEMA DE ENCUESTAS (Programación Orientada a Objetos)
// Pedimos el nombre de la empresa u organización al usuario
const nombreEmpresa = prompt("Hola, ingrese el nombre de la empresa u organizacion:");
alert("CONTINUA TODO POR CONSOLA (F-12)"); // Solo alerta, todo el manejo será por consola

// Mensaje de bienvenida
console.log("====================================");
console.log(" Plataforma de encuestas - Bienvenido");
console.log(" Empresa u Organizacion: " + nombreEmpresa);
console.log("====================================");

// CLASE OPCION 
// Representa cada opción de respuesta en una pregunta
class Opcion {
  constructor(texto) {
    this.texto = texto;
    this.cantidadDeVotos = 0;
  }

  votar() {
    this.cantidadDeVotos++;
  }
}

// CLASE PREGUNTA
// Representa una pregunta de la encuesta con sus opciones
class Pregunta {
  constructor(texto, listaDeOpciones) {
    // Validamos máximo 3 opciones
    if (listaDeOpciones.length === 0 || listaDeOpciones.length > 3) {
      throw new Error(" ALERTA: Cada pregunta debe tener minimo 1 y máximo 3 opciones de respuesta.");
    }

    this.texto = texto;
    this.opciones = listaDeOpciones.map(textoDeOpcion => new Opcion(textoDeOpcion));
  }

  votar(indiceDeLaOpcion) {
    if (indiceDeLaOpcion >= 0 && indiceDeLaOpcion < this.opciones.length) {
      this.opciones[indiceDeLaOpcion].votar();
      console.log(`OK. Tu voto fue registrado en la pregunta "${this.texto}" → opcion "${this.opciones[indiceDeLaOpcion].texto}"`);
    } else {
      console.log("ERROR: La opción seleccionada no es válida.");
    }
  }

  mostrarResultados() {
    console.log(`Resultados de la pregunta: ${this.texto}`);
    this.opciones.forEach((opcion, indice) => {
      console.log(`   [${indice}] ${opcion.texto} → ${opcion.cantidadDeVotos} voto(s)`);
    });
    this.mostrarOpcionGanadora();
    console.log("====================================");
  }

  mostrarOpcionGanadora() {
    if (this.opciones.every(opcion => opcion.cantidadDeVotos === 0)) {
      console.log("ALERTA: Nadie ha emitido votos todavía en esta pregunta.");
      return;
    }

    const opcionGanadora = this.opciones.reduce((opcionConMasVotos, opcion) =>
      opcion.cantidadDeVotos > opcionConMasVotos.cantidadDeVotos ? opcion : opcionConMasVotos
    );

    console.log(`🏆Opcion ganadora🏆: "${opcionGanadora.texto}" con ${opcionGanadora.cantidadDeVotos} voto(s).`);
  }
}

// CLASE ENCUESTA
// Encuesta con varias preguntas
class Encuesta {
  constructor(nombre) {
    this.nombre = nombre;
    this.preguntas = [];
    this.limiteMaximoDePreguntas = 8; // Cada encuesta puede tener hasta 8 preguntas
  }

  agregarPregunta(textoDeLaPregunta, listaDeOpciones) {
    if (this.preguntas.length >= this.limiteMaximoDePreguntas) {
      console.log("ALERTA: No se pueden agregar mas de 8 preguntas a esta encuesta.");
      return;
    }

    try {
      const nuevaPregunta = new Pregunta(textoDeLaPregunta, listaDeOpciones);
      this.preguntas.push(nuevaPregunta);
      console.log(`OK: Se agrego tu pregunta: "${textoDeLaPregunta}"`);
    } catch (error) {
      console.log("ERROR: " + error.message);
    }
  }

  listarPreguntas() {
    if (this.preguntas.length === 0) {
      console.log("ALERTA: No hay preguntas en esta encuesta.");
      return;
    }

    console.log(`Preguntas de la encuesta "${this.nombre}":`);
    this.preguntas.forEach((pregunta, indice) => {
      console.log(`   [${indice}] ${pregunta.texto}`);
    });
    console.log("====================================");
  }

  votarEnPregunta(indiceDeLaPregunta, indiceDeLaOpcion) {
    if (indiceDeLaPregunta < 0 || indiceDeLaPregunta >= this.preguntas.length) {
      console.log("ALERTA: Pregunta no válida.");
      return;
    }

    this.preguntas[indiceDeLaPregunta].votar(indiceDeLaOpcion);
  }

  mostrarResultados() {
    if (this.preguntas.length === 0) {
      console.log("ALERTA: No hay preguntas para mostrar resultados");
      return;
    }

    console.log(`*** RESULTADOS DE LA ENCUESTA: ${this.nombre} ***`);
    this.preguntas.forEach(pregunta => pregunta.mostrarResultados());
  }

  mostrarTotalDePreguntas() {
    console.log(`Total de preguntas en la encuesta: ${this.preguntas.length}`);
    return this.preguntas.length;
  }
}

// CLASE SISTEMA DE ENCUESTAS
// Permite administrar muchas encuestas diferentes
class SistemaDeEncuestas {
  constructor() {
    this.encuestas = [];
  }

  crearEncuesta(nombre) {
    const nuevaEncuesta = new Encuesta(nombre);
    this.encuestas.push(nuevaEncuesta);
    console.log(`OK: Se creO la encuesta: "${nombre}"`);
    return nuevaEncuesta; // Retornamos para poder agregar preguntas
  }

  listarEncuestas() {
    if (this.encuestas.length === 0) {
      console.log("ALERTA: No hay encuestas creadas");
      return;
    }

    console.log("Encuestas disponibles:");
    this.encuestas.forEach((encuesta, indice) => {
      console.log(`   [${indice}] ${encuesta.nombre}`);
    });
    console.log("====================================");
  }

  mostrarResultadosDeTodasLasEncuestas() {
    if (this.encuestas.length === 0) {
      console.log("ALERTA: No hay encuestas para mostrar resultados.");
      return;
    }

    this.encuestas.forEach(encuesta => encuesta.mostrarResultados());
  }

  mostrarTotalDeEncuestas() {
    console.log(`Total de encuestas creadas: ${this.encuestas.length}`);
    return this.encuestas.length;
  }
}
//EJEMPLOS DE USO 
const sistema = new SistemaDeEncuestas();

//CREAR ENCUESTAS
const encuestaColores = sistema.crearEncuesta("Encuesta de Colores");

// Agregar preguntas (max 8 preguntas)
encuestaColores.agregarPregunta("¿Cuál es tu color favorito?", ["Rojo", "Azul", "Verde"]);
encuestaColores.agregarPregunta("¿Qué color evitas?", ["Negro", "Blanco", "Amarillo"]);
encuestaColores.agregarPregunta("¿Qué color usarías en tu ropa?", ["Azul", "Rojo", "Negro"]);
encuestaColores.agregarPregunta("¿Qué color representa alegría?", ["Amarillo", "Verde", "Azul"]);
encuestaColores.agregarPregunta("¿Qué color prefieres para decoración?", ["Blanco", "Negro", "Gris"]);
encuestaColores.agregarPregunta("¿Qué color te relaja?", ["Azul", "Verde", "Blanco"]);
encuestaColores.agregarPregunta("¿Qué color te irrita?", ["Rojo", "Naranja", "Negro"]);
encuestaColores.agregarPregunta("¿Qué color prefieres para accesorios?", ["Negro", "Plateado", "Dorado"]);

//Agregar una pregunta mas. (Debe dar alerta)
encuestaColores.agregarPregunta("Pregunta extra no válida", ["Sí", "No", "Tal vez"]);

//CREAR OTRA ENCUESTA
const encuestaFrutas = sistema.crearEncuesta("Encuesta de Frutas");

// Agregar preguntas
encuestaFrutas.agregarPregunta("¿Cuál es tu fruta preferida?", ["Manzana", "Plátano", "Naranja"]);
encuestaFrutas.agregarPregunta("¿Cuál fruta comes menos?", ["Uva", "Kiwi", "Mango"]);

// Intento de agregar más de 3 opciones (debe dar error)
encuestaFrutas.agregarPregunta("Pregunta inválida", ["Opción 1", "Opción 2", "Opción 3", "Opción 4"]);

//LISTAR ENCUESTA
sistema.listarEncuestas();

// VOTAR EN PREGUNTAS
// Encuesta Colores
encuestaColores.votarEnPregunta(0, 1); // Azul
encuestaColores.votarEnPregunta(0, 1); // Azul 
encuestaColores.votarEnPregunta(1, 0); // Negro
encuestaColores.votarEnPregunta(2, 2); // Negro
encuestaColores.votarEnPregunta(3, 0); // Amarillo

// Encuesta Frutas
encuestaFrutas.votarEnPregunta(0, 2); // Naranja
encuestaFrutas.votarEnPregunta(0, 2); // Naranja 
encuestaFrutas.votarEnPregunta(1, 1); // Kiwi

//MOSTRAR RESULTADOS
sistema.mostrarResultadosDeTodasLasEncuestas();

//MOSTRAR TOTAL DE ENCUESTAS Y PREGUNTAS
sistema.mostrarTotalDeEncuestas(); // resp. 2
encuestaColores.mostrarTotalDePreguntas(); // resp. 8
encuestaFrutas.mostrarTotalDePreguntas(); // resp. 2
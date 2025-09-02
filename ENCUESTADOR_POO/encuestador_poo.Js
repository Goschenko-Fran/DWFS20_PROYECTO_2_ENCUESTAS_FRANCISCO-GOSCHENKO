// SISTEMA DE ENCUESTAS (Programacion Orientada a Objetos)
// Pedimos el nombre de la empresa u organización al usuario
const nombreEmpresa = prompt("Hola, ingrese el nombre de la empresa u organización:");
alert("CONTINUA TODO POR CONSOLA (F-12)"); // Alert para no generar cuadro de texto.

// Mostramos mensaje de bienvenida
console.log("====================================");
console.log(" Plataforma de encuestas - Bienvenido");
console.log(" Empresa u Organizacion: " + nombreEmpresa);
console.log("====================================");

// Clase Opcion: representa cada posible respuesta
class Opcion {
  constructor(texto) {
    this.texto = texto; // Texto de la opción que verá el usuario
    this.cantidadDeVotos = 0; // Inicialmente empieza con cero votos
  }

  // Suma de votos a una resp.
  votar() {
    this.cantidadDeVotos++; 
  }
}

// Clase Encuesta, pregunta con sus opciones
class Encuesta {
  constructor(pregunta, listaDeOpciones) {
    if (listaDeOpciones.length !== 3) {
      throw new Error("Cada encuesta debe tener maximo 3 opciones de respuesta.");
    }
    // Validamos 3 respuestas max. posibles

    this.pregunta = pregunta; 
    this.opciones = listaDeOpciones.map(textoDeOpcion => new Opcion(textoDeOpcion));
  } //  Opcion para cada texto recibido en la lista

  // Votar en la encuesta
  votar(indiceDeLaOpcion) {
    if (indiceDeLaOpcion >= 0 && indiceDeLaOpcion < this.opciones.length) {
      this.opciones[indiceDeLaOpcion].votar();
      console.log(`OK. Tu voto fue registrado en la encuesta "${this.pregunta}" → opción "${this.opciones[indiceDeLaOpcion].texto}"`);
    } else {
      console.log("ERROR: La opcion no es valida, selecciona una respuesta correcta.");
    }
  }

  // Mostrar resultados de la encuesta
  mostrarResultados() {
    console.log(`Resultados de la encuesta: ${this.pregunta}`);
    this.opciones.forEach((opcion, indice) => {
      console.log(`   [${indice}] ${opcion.texto} → ${opcion.cantidadDeVotos} voto(s)`);
    });

    // Mostrar la opcion ganadora
    this.mostrarOpcionGanadora();
    console.log("====================================");
  }

  // Mostrar la opcion ganadora de la encuesta
  mostrarOpcionGanadora() {
    // Validamos si aún no hay votos
    if (this.opciones.every(opcion => opcion.cantidadDeVotos === 0)) {
      console.log("ALERTA: Nadie ha emitido votos por esta encuesta todavía, se el primero en votar");
      return;
    }

    // Opcion con más votos
    const opcionGanadora = this.opciones.reduce((opcionConMasVotos, opcion) => 
      opcion.cantidadDeVotos > opcionConMasVotos.cantidadDeVotos ? opcion : opcionConMasVotos
    );

    console.log(`🏆Opción ganadora🏆: "${opcionGanadora.texto}" con ${opcionGanadora.cantidadDeVotos} voto(s).`);
  }
}

// Admin de todas las encuestas
class SistemaDeEncuestas {
  constructor() {
    this.encuestas = []; // almacen de encuestas
    this.limiteMaximoDeEncuestas = 8; // MAX. 8 preguntas
  }

  // Crear una nueva encuesta
  crearEncuesta(pregunta, arregloDeOpciones) {
    // Verificamos que no se supere el límite máximo de encuestas
    if (this.encuestas.length >= this.limiteMaximoDeEncuestas) {
      console.log("ALERTA: No se pueden crear más de 8 preguntas");
      return;
    }

    // Agregamos a la lista
    try {
      const nuevaEncuesta = new Encuesta(pregunta, arregloDeOpciones);
      this.encuestas.push(nuevaEncuesta);
      console.log(`Se creo la ecuesta: "${pregunta}"`);
    } catch (error) {
      console.log("ERROR: " + error.message);
    }
  }

  // Lista de todas las encuestas disponibles
  listarEncuestas() {
    if (this.encuestas.length === 0) {
      console.log("No hay encuestas creadas.");
      return;
    }
    console.log("Encuestas disponibles:");
    this.encuestas.forEach((encuesta, indice) => {
      console.log(`   [${indice}] ${encuesta.pregunta}`);
    });
    console.log("====================================");
  }

  // Votar en encuesta especifica
  votarEnEncuesta(indiceDeLaEncuesta, indiceDeLaOpcion) {
    if (indiceDeLaEncuesta < 0 || indiceDeLaEncuesta >= this.encuestas.length) {
      console.log("ALERTA: Encuesta no válida.");
      return;
    }
    this.encuestas[indiceDeLaEncuesta].votar(indiceDeLaOpcion);
  }

  // Mostrar resultados todas las encuestas
  mostrarResultadosDeTodasLasEncuestas() {
    if (this.encuestas.length === 0) {
      console.log("No hay encuestas para mostrar, crea una primero.");
      return;
    }
    console.log("*** RESULTADOS DE TODAS LAS ENCUESTAS ***");
    this.encuestas.forEach(encuesta => encuesta.mostrarResultados());
  }

  // Mostrar cuantas encuestas existen
  mostrarTotalDeEncuestas() {
    console.log(`Total de encuestas: ${this.encuestas.length}`);
    return this.encuestas.length;
  }
}

// EJEMPLOS DE USO
// Creamos el sistema de encuestas
const sistemaDeEncuestas = new SistemaDeEncuestas();

// Creamos 3 encuestas
sistemaDeEncuestas.crearEncuesta("¿Qué color te gusta?", ["Rojo", "Azul", "Verde"]); // PARA VOTAR ENCUETA 0 OP. 0,1,2
sistemaDeEncuestas.crearEncuesta("¿Qué automóvil prefieres?", ["Toyota", "Mazda", "Hyundai"]); // PARA VOTAR ENCUETA 1 OP. 0,1,2
sistemaDeEncuestas.crearEncuesta("¿Cuántos años tienes?", ["Menos de 18", "De 18 a 30", "Más de 30"]); // PARA VOTAR ENCUETA 2 OP. 0,1,2

// Listamos encuestas disponibles
sistemaDeEncuestas.listarEncuestas();

// Votamos en encuesta
sistemaDeEncuestas.votarEnEncuesta(0, 1); // Azul
sistemaDeEncuestas.votarEnEncuesta(0, 1); // Azul
sistemaDeEncuestas.votarEnEncuesta(0, 2); // Verde

sistemaDeEncuestas.votarEnEncuesta(1, 0); // Toyota
sistemaDeEncuestas.votarEnEncuesta(1, 1); // Mazda
sistemaDeEncuestas.votarEnEncuesta(1, 1); // Mazda
sistemaDeEncuestas.votarEnEncuesta(1, 2); // Hyundai

sistemaDeEncuestas.votarEnEncuesta(2, 0); // Menos de 18
sistemaDeEncuestas.votarEnEncuesta(2, 2); // Más de 30
sistemaDeEncuestas.votarEnEncuesta(2, 1); // De 18 a 30
sistemaDeEncuestas.votarEnEncuesta(2, 2); // Más de 30
sistemaDeEncuestas.votarEnEncuesta(2, 2); // Más de 30

// Encuestas existen
sistemaDeEncuestas.mostrarTotalDeEncuestas();

// Resultados de todas las encuestas, muestra op. ganadora.
sistemaDeEncuestas.mostrarResultadosDeTodasLasEncuestas();
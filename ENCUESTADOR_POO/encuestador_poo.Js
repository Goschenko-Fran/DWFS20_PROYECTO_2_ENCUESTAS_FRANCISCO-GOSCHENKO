// Sistema de encuestas (Programación Orientada a Objetos)
const nombreEmpresa = prompt("Hola, ingrese el nombre de la empresa u organización:");

console.log("====================================");
console.log(" Plataforma de encuestas - Bienvenido");
console.log(" Empresa u Organizacion: " + nombreEmpresa);
console.log("====================================");


class Opcion {
  constructor(texto) {
    this.texto = texto; 
    this.cantidadDeVotos = 0; 
  }

  votar() {
    this.cantidadDeVotos++; 
  }
}

class Encuesta {
  constructor(pregunta, listaDeOpciones) {
    this.pregunta = pregunta; 
    this.opciones = listaDeOpciones.map(textoDeOpcion => new Opcion(textoDeOpcion));
  }


  votar(indiceDeLaOpcion) {
    if (indiceDeLaOpcion >= 0 && indiceDeLaOpcion < this.opciones.length) {
      this.opciones[indiceDeLaOpcion].votar();
      console.log(`OK. Tu voto fue registrado en la encuesta "${this.pregunta}" → opción "${this.opciones[indiceDeLaOpcion].texto}"`);
    } else {
      console.log("ERROR: La opción no es válida, selecciona una respuesta correcta");
    }
  }

  mostrarResultados() {
    console.log(`Resultados de la encuesta: ${this.pregunta}`);
    this.opciones.forEach((opcion, indice) => {
      console.log(`   [${indice}] ${opcion.texto} → ${opcion.cantidadDeVotos} voto(s)`);
    });

    this.mostrarOpcionGanadora();
    console.log("====================================");
  }

  mostrarOpcionGanadora() {
    if (this.opciones.every(opcion => opcion.cantidadDeVotos === 0)) {
      console.log("ALERTA: Nadie ha emitido votos por esta encuesta");
      return;
    }

    const opcionGanadora = this.opciones.reduce((opcionConMasVotos, opcion) => 
      opcion.cantidadDeVotos > opcionConMasVotos.cantidadDeVotos ? opcion : opcionConMasVotos
    );

    console.log(`🏆Opcion ganadora🏆 "${opcionGanadora.texto}" con ${opcionGanadora.cantidadDeVotos} voto(s).`);
  }
}

class SistemaDeEncuestas {
  constructor() {
    this.encuestas = [];
  }

 crearEncuesta(pregunta, arregloDeOpciones) {
    const nuevaEncuesta = new Encuesta(pregunta, arregloDeOpciones);
    this.encuestas.push(nuevaEncuesta);
    console.log(`Se creó la encuesta: "${pregunta}"`);
  }

  listarEncuestas() {
    if (this.encuestas.length === 0) {
      console.log("No hay encuestas creadas.");
      return;
    }
    console.log("Encuestas disponibles:");
    this.encuestas.forEach((encuesta, indice) => {
      console.log(`[${indice}] ${encuesta.pregunta}`);
    });
    console.log("====================================");
  }

   mostrarResultadosDeTodasLasEncuestas() {
    if (this.encuestas.length === 0) {
      console.log("No hay encuestas para mostrar, crea una primero.");
      return;
    }
    console.log("*** RESULTADOS DE TODAS LAS ENCUESTAS ***");
    this.encuestas.forEach(encuesta => encuesta.mostrarResultados());
  }

  mostrarTotalDeEncuestas() {
    console.log(`Total de encuestas: ${this.encuestas.length}`);
    return this.encuestas.length;
  }
}

// EJEMPLO
const sistemaDeEncuestas = new SistemaDeEncuestas();

sistemaDeEncuestas.crearEncuesta("¿Que color te gusta?", ["Rojo", "Azul", "Verde"]);

sistemaDeEncuestas.listarEncuestas();

sistemaDeEncuestas.votarEnEncuesta(0, 1); 

sistemaDeEncuestas.mostrarTotalDeEncuestas();

sistemaDeEncuestas.mostrarResultadosDeTodasLasEncuestas();

const empresa = prompt("Hola, ingrese el nombre de la empresa u organización:");

console.log("====================================");
console.log(" Plataforma de encuestas - Bienvenido");
console.log(" Empresa u Organización: " + empresa);
console.log("====================================");

class Opcion {
  constructor(texto) {
    this.texto = texto
    this.votos = 0;    
  }

  votar() {
    this.votos++
    
  }
}

class Encuesta {
  constructor(pregunta, listaDeOpciones) 
    this.pregunta = pregunta; 
    this.opciones = listaDeOpciones.map(textoDeOpcion => new Opcion(textoDeOpcion));
  }

   votar(posicionDeLaOpcion) {
    if (posicionDeLaOpcion >= 0 && posicionDeLaOpcion < this.opciones.length) {
      this.opciones[posicionDeLaOpcion].votar();
      console.log(`OK. Tu voto fue registrado en encuesta "${this.pregunta}" → opción "${this.opciones[posicionDeLaOpcion].texto}"`);
    } else {
      console.log("ERROR: Opción no es valida, usa una respuesta correcta")
    }
  }

    mostrarResultados() {
    console.log(`Resultados de la encuesta: ${this.pregunta}`);
    this.opciones.forEach((opcion, posicion) => {
      console.log(`[${posicion}] ${opcion.texto} → ${opcion.votos} voto(s)`);
    });
    console.log("------------------------------------")
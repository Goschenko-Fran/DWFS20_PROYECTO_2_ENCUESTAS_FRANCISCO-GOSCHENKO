// SISTEMA DE ENCUESTAS (Programacion Funcional)
// Pedimos el nombre de la empresa al usuario
const nombreDeLaEmpresa = prompt("Hola, ingresa el nombre de la empresa o la organizacion:");
alert("CONTINUA TODO POR CONSOLA (F12)");

console.log("======================================");
console.log(" Bienvenido al sistema de encuestas ");
console.log(" Empresa: " + nombreDeLaEmpresa);
console.log("======================================");

// Guardamos encuestas en un arreglo
let listaDeEncuestas = [];

//FUNCIONES 
// Crear encuesta nueva
function crearNuevaEncuesta(nombreDeLaEncuesta, arregloDePreguntas) {
  // Encuesta con máximo 8 preguntas
  if (arregloDePreguntas.length > 8) {
    console.log("ERROR: Una encuesta no puede tener mas de 8 preguntas");
    return;
  }

  // Preguntas de máximo 3 respuestas
  for (let i = 0; i < arregloDePreguntas.length; i++) {
    if (arregloDePreguntas[i].respuestas.length > 3) {
      console.log("ERROR: La pregunta '" + arregloDePreguntas[i].texto + "' tiene mas de 3 respuestas.");
      return;
    }
  }

  // Crear encuesta
  let nuevaEncuesta = {
    nombre: nombreDeLaEncuesta,
    preguntas: arregloDePreguntas.map(function(pregunta) {
      return {
        texto: pregunta.texto,
        respuestas: pregunta.respuestas.map(function(textoRespuesta) {
          return { texto: textoRespuesta, cantidadDeVotos: 0 };
        })
      };
    })
  };

  listaDeEncuestas.push(nuevaEncuesta);
  console.log("OK: Se creo encuesta: " + nombreDeLaEncuesta);
}

// Votar por pregunta en encuesta
function registrarVoto(numeroDeEncuesta, numeroDePregunta, numeroDeRespuesta) {
  let encuesta = listaDeEncuestas[numeroDeEncuesta];
  if (!encuesta) {
    console.log("ALERTA: La encuesta seleccionada no existe");
    return;
  }

  let pregunta = encuesta.preguntas[numeroDePregunta];
  if (!pregunta) {
    console.log("ALERTA:La pregunta seleccionada no existe");
    return;
  }

  let respuesta = pregunta.respuestas[numeroDeRespuesta];
  if (!respuesta) {
    console.log("ALERTA: La respuesta seleccionada no existe");
    return;
  }

  respuesta.cantidadDeVotos++;
  console.log("OK: voto registrado en pregunta: " + pregunta.texto);
}

// Mostrar todas las encuestas y resultados
function mostrarTodosLosResultados() {
  if (listaDeEncuestas.length === 0) {
    console.log("ALERTA: No hay encuestas creadas, crea una");
    return;
  }

  listaDeEncuestas.forEach(function(encuesta) {
    console.log("Encuesta: " + encuesta.nombre);
    encuesta.preguntas.forEach(function(pregunta, iPregunta) {
      console.log(" Pregunta " + iPregunta + ": " + pregunta.texto);
      pregunta.respuestas.forEach(function(respuesta, iRespuesta) {
        console.log("   Respuesta " + iRespuesta + ": " + respuesta.texto + " → " + respuesta.cantidadDeVotos + " voto(s)");
      });
    });
    console.log("======================================");
  });
}

// Mostrar opción ganadora de cada pregunta
function mostrarOpcionesGanadoras() {
  listaDeEncuestas.forEach(function(encuesta) {
    console.log("Encuesta: " + encuesta.nombre);
    encuesta.preguntas.forEach(function(pregunta) {
      let respuestaGanadora = pregunta.respuestas[0];
      pregunta.respuestas.forEach(function(respuesta) {
        if (respuesta.cantidadDeVotos > respuestaGanadora.cantidadDeVotos) {
          respuestaGanadora = respuesta;
        }
      });

      if (respuestaGanadora.cantidadDeVotos === 0) {
        console.log(" La pregunta '" + pregunta.texto + "' todavía no tiene votos.");
      } else {
        console.log(" La pregunta '" + pregunta.texto + "' tiene como opcion ganadora: 🏆 " + respuestaGanadora.texto);
      }
    });
    console.log("======================================");
  });
}

//EJEMPLO DE USO

// Creamos una encuesta.
crearNuevaEncuesta("Encuesta de preferencias", [
  { texto: "¿Cuál es tu color favorito?", respuestas: ["Rojo", "Azul", "Verde"] },
  { texto: "¿Qué mascota prefieres?", respuestas: ["Perro", "Gato", "Pez"] },
  { texto: "¿Qué bebida prefieres?", respuestas: ["Agua", "Jugo", "Refresco"] }
]);

// Encuesta con más de 8 preguntas.
crearNuevaEncuesta("Encuesta muy grande", [
  { texto: "Pregunta 1", respuestas: ["a", "b", "c"] },
  { texto: "Pregunta 2", respuestas: ["a", "b", "c"] },
  { texto: "Pregunta 3", respuestas: ["a", "b", "c"] },
  { texto: "Pregunta 4", respuestas: ["a", "b", "c"] },
  { texto: "Pregunta 5", respuestas: ["a", "b", "c"] },
  { texto: "Pregunta 6", respuestas: ["a", "b", "c"] },
  { texto: "Pregunta 7", respuestas: ["a", "b", "c"] },
  { texto: "Pregunta 8", respuestas: ["a", "b", "c"] },
  { texto: "Pregunta 9", respuestas: ["a", "b", "c"] }
]);

// Pregunta con más de 3 respuestas (fallará)
crearNuevaEncuesta("Encuesta con pregunta incorrecta", [
  { texto: "Pregunta 1", respuestas: ["a", "b", "c", "d"] }
]);

// Votar en algunas respuestas
registrarVoto(0, 0, 1); // Color Azul
registrarVoto(0, 1, 0); // Mascota Perro
registrarVoto(0, 2, 2); // Bebida Refresco

// Mostrar resultados y ganadores
mostrarTodosLosResultados();
mostrarOpcionesGanadoras();
📝 Sistema de Encuestas - JavaScript (Orientado a Objetos)

Este proyecto permite crear y gestionar múltiples encuestas de forma sencilla usando programación orientada a objetos en JavaScript.

✨ Características principales

📊 Crear varias encuestas diferentes.

📝 Cada encuesta puede tener máximo 8 preguntas.

✅ Cada pregunta puede tener máximo 3 opciones de respuesta.

🗳 Registro de votos para cada opción.

📈 Mostrar resultados por pregunta y opción ganadora.

⚠ Alertas y validaciones si se exceden límites de preguntas o opciones.

🏷 Clases principales

Opcion: 🎯 Representa cada posible respuesta con contador de votos.

Pregunta: ❓ Contiene la pregunta y sus opciones, permite votar y mostrar resultados.

Encuesta: 📋 Contiene varias preguntas, permite agregarlas, votar y mostrar resultados.

SistemaDeEncuestas: 🛠 Administra todas las encuestas, permite crearlas, listarlas y mostrar resultados generales.

💡 Ejemplo de uso: En archivo Js.

📝 Notas

🔒 Se controla el máximo de 8 preguntas por encuesta.

🔒 Se controla el máximo de 3 opciones por pregunta.

💻 Todo el manejo se realiza por consola.
document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los elementos HTML necesarios
    const orderResultDiv = document.getElementById('orderResult');
    const controlTexto = document.getElementById("controlTexto");

    // Verificar la compatibilidad del navegador
    if ('webkitSpeechRecognition' in window) {
        let recognition; // Variable para almacenar la instancia de reconocimiento

        // Función para iniciar el reconocimiento de voz
        function startRecognition() {
            // Verificar si el reconocimiento ya está en curso
            if (recognition && recognition.running) {
                console.log("El reconocimiento ya está en curso.");
                return; // No hacer nada si el reconocimiento ya está en curso
            }

            // Crear una nueva instancia de reconocimiento de voz
            recognition = new webkitSpeechRecognition();
            recognition.lang = 'es-ES'; // Establecer el idioma del reconocimiento

            // Definir el comportamiento cuando se detecta un resultado de reconocimiento de voz
            recognition.onresult = function (event) {
                // Obtener el texto reconocido y convertirlo a minúsculas para simplificar las comparaciones
                const result = event.results[0][0].transcript.toLowerCase();
                console.log('Orden identificada:', result);

                // Realizar acciones según el texto reconocido
                switch (true) {
                    // Caso: "Verdana"
                    case result.includes("verdana"):
                        orderResultDiv.innerHTML = <p>Orden identificada: <strong>${result}</strong></p>;
                        controlTexto.style.fontFamily = 'Verdana';
                        insertarJson("Tipo de letra Verdana");
                        break;
                    // Caso: "Gmail"
                    case result.includes("gmail") || result.includes("Gmail"):
                        orderResultDiv.innerHTML = <p>Orden identificada: <strong>${result}</strong></p>;
                        window.open('https://mail.google.com/');
                        insertarJson("Abrir Gmail");
                        break;
                    // Caso: "Quitar"
                    case result.includes("quitar"):
                        orderResultDiv.innerHTML = <p>Orden identificada: <strong>${result}</strong></p>;
                        closeCurrentTab(); // Llamar a la función para cerrar la pestaña actual
                        break;
                    // Caso: "Cerrar"
                    case result.includes("cerrar"):
                        orderResultDiv.innerHTML = <p>Orden identificada: <strong>${result}</strong></p>;
                        closeBrowser(); // Llamar a la función para cerrar el navegador
                        break;
                    // Caso: "Youtube"
                    case result.includes("youtube"):
                        orderResultDiv.innerHTML = <p>Orden identificada: <strong>${result}</strong></p>;
                        window.open('https://www.youtube.com/');
                        insertarJson("Abrir YouTube");
                        break;
                    // Agregar más casos según sea necesario
                    default:
                        console.log("Orden no reconocida:", result);
                        break;
                }
            };

            // Definir el comportamiento cuando no se detectan resultados durante 2 segundos
            recognition.onnomatch = function (event) {
                console.log('No se detectó ninguna orden.');
            };

            // Iniciar el reconocimiento de voz
            recognition.start();
        }

        // Llamar a la función para iniciar el reconocimiento de voz
        startRecognition();

        // Reiniciar el reconocimiento de voz cada 2 segundos si no se detectan resultados
        setInterval(function () {
            recognition.stop(); // Detener el reconocimiento actual
            startRecognition(); // Iniciar un nuevo reconocimiento
        }, 2000);
    } else {
        console.log('El reconocimiento de voz no es soportado por este navegador.');
    }

    // Función para cerrar la pestaña actual
    function closeCurrentTab() {
        window.close();
    }

    // Función para cerrar el navegador
    function closeBrowser() {
        window.top.close();
    }

    // Función para enviar los datos a la API
    function insertarJson(ingresos) {
        return fetch('https://66176aa2ed6b8fa43482988c.mockapi.io/Voz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Pagina })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al subir el recurso');
            }
            return response.json();
        })
        .then(data => console.log('Recurso subido exitosamente:', data))
        .catch(error => console.error('Error:', error));
    }
});
import {insertarJson} from './Mockapi.js';

// Función para interpretar los comandos de voz
function interpretCommand(command) {
    if (command.includes("yasmín") || command.includes("jasmine") ) {
        // Aquí puedes agregar el código para abrir Google en una nueva pestaña
        if (command.includes('abre google')){
            window.open("https://www.google.com", "_blank"); 
            insertarJson('se abrio una nueva pestaña con google')
        }
        if (command.includes('abre youtube')){
            window.open("https://www.youtube.com", "_blank");
            insertarJson('se abrio youtube exitosamente') 
        }
        if (command.includes('abre una ventana y ciérrala en 3 segundos')){
            const ventana = window.open('');
            // Cerrar la ventana después de 3 segundos
            setTimeout(function () {
                ventana.close();
            }, 3000);
            insertarJson('Se abrio una ventana nueva y se cerro a los 3 segundos') 
        }
        if (command.includes("abre una nueva ventana con un tamaño de 1000 por 800") || command.includes('abre una nueva ventana con un tamaño de 1000 x 800')){
            // Abrir una nueva ventana con dimensiones específicas y sin barras de herramientas
            window.open('https://www.google.com', '_blank', 'width=1000,height=800,toolbar=no');
            insertarJson('Se abrio la nueva pagina en el tamaño solicitado') 
        }
        if (command.includes("abre una nueva ventana con un tamaño de 350 por 500") || command.includes('abre una nueva ventana con un tamaño de 150 x 300')){
            // Abrir una njueva ventana con dimensiones específicas y sin barras de herramientas
            window.open('https://www.youtube.com', '_blank', 'width=150,height=300,toolbar=no');
            insertarJson('se abrio youtube en el tamaño solicitado') 
        }
    }
}

// Función para iniciar el reconocimiento de voz
function startSpeechRecognition() {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'es-ES'; // Configura el idioma de reconocimiento

    recognition.onresult = function(event) {
        const result = event.results[event.results.length - 1];
        const command = result[0].transcript.trim().toLowerCase();
        console.log("Comando reconocido:", command);
        interpretCommand(command);
    }

    recognition.onend = function() {
        console.log("Reconocimiento de voz detenido. Reiniciando...");
        startSpeechRecognition(); // Reinicia el reconocimiento de voz para que esté siempre escuchando
    }

    recognition.start();
    console.log("Escuchando...");
}

// Iniciar el reconocimiento de voz al cargar la página
window.onload = startSpeechRecognition;

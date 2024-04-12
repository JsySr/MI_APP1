//Funcion para guarda ordenes o acciones realizadas de acuerdo a la accion definida en el parametro

export function insertarJson(accion) {
    //La funcion trabaja con promesas para asegurar que los datos se inserten antes de que se realice la acción ya que si no
    //al cerrar una ventana esto ocurrira antes de que se envien los datos a MockApi
    return new Promise((resolve, reject) => {
        //Definicion de la fecha actual formateandola al formato local de la PC
        const fechaHoraActual = new Date();
        const fechaHoraFormateada = fechaHoraActual.toLocaleString();

        //Se crea un objeto que almacena la fecha obtenida y la accion del parametro
        const recurso = {
            id: 1,
            accion: accion,
            fecha: fechaHoraFormateada
        };

        // Se confierte el objeto a JSON
        const recursoJSON = JSON.stringify(recurso);

        // Se envia la solicitud HTTP a MockAPi usando el metodo POST, cabecera que indica que es Json y el cuerpo del json del objeto
        fetch('https://66176aa2ed6b8fa43482988c.mockapi.io/Voz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: recursoJSON
        })
            //Operacion asincrona en la que se espera a la respuesta de MockApi, si esta es invalida se indica que no se subio el archivo
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al subir el recurso');
                }
                return response.json();
            })
            //Operacion asincrona en la que si la informacion se subio correctamente se devuelve a la consola y la promesa se resuelve
            .then(data => {
                console.log('Recurso subido exitosamente:', data);
                resolve(data);
            })
            //Operacion asincrona en la que si la informacion no subio correctamente se devuelve un error en la consola y se rechaza la promesa
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

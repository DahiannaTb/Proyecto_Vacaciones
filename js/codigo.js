//en esta variable voy a poner el acumulador de la cantidad de los gastos totales
let acumulador_gastos_totales = 0;

//agregar presupuesto inicial
let presupuesto_inicial = localStorage.getItem('presupuesto');
let span_valor_inicial = document.getElementById('valor_presupuesto_inicial');
let span_valor_restante = document.getElementById('valor_presupuesto_restante');
span_valor_restante.textContent = presupuesto_inicial - acumulador_gastos_totales;
span_valor_inicial.textContent = presupuesto_inicial;

// Function para crear cada fila de un nuevo gasto
function crear_gasto() {
    let nombre_gasto = document.getElementById('nombre_gasto').value.trim();
    let cantidad_gasto = parseInt(document.getElementById('cantidad_gasto').value.trim());

    // Validar que los campos estén completos y cantidad sea un número válido
    if (!nombre_gasto || isNaN(cantidad_gasto)) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    // Verificar si el gasto a ingresar es mayor al presupuesto restante
    if (cantidad_gasto > (presupuesto_inicial - acumulador_gastos_totales)) {
        alert("El gasto a ingresar supera el presupuesto restante.");
        return;
    }

    let table = document.querySelector('.gastos');
    let filas = table.getElementsByClassName('fila_gasto');
    let gastoExiste = false;

    // Iterar sobre las filas de la tabla para buscar si el gasto ya existe
    for (let fila of filas) {
        let cellNombre = fila.querySelector('.nombre_gasto');
        let cellCantidad = fila.querySelector('.cantidad_gasto');

        if (cellNombre.textContent === nombre_gasto) {
            // Si el gasto ya existe, actualiza la cantidad
            let nuevaCantidad = parseInt(cellCantidad.textContent) + cantidad_gasto;
            cellCantidad.textContent = nuevaCantidad;
            gastoExiste = true;
            break;
        }
    }

    // Si el gasto no existe, crear una nueva fila
    if (!gastoExiste) {
        let nuevaFila = table.insertRow();

        // Insertar celdas en la nueva fila
        let cellNombre = nuevaFila.insertCell(0);
        let cellCantidad = nuevaFila.insertCell(1);
        let cellEditar = nuevaFila.insertCell(2);
        let cellEliminar = nuevaFila.insertCell(3);

        cellNombre.textContent = nombre_gasto;
        cellCantidad.textContent = cantidad_gasto;

        // Crear el botón de editar
        let editIcon = document.createElement('span');
        editIcon.innerHTML = '✏️';
        cellEditar.appendChild(editIcon);
        editIcon.onclick = function(){
            let popup = document.createElement('div');
            popup.classList.add('popup');  // Se añade una clase para el popup
             // Campo de texto para modificar el valor
            let input = document.createElement('input');
            let input2 = document.createElement('input')
            input.value = cellNombre.innerText;  //Uso el valor actual de la celda con el innerText
            input2.value = cellCantidad.innerText;
            input.classList.add('popup-input');
            input2.classList.add('popup-input');
              //Se añade una clase para el input
              // Botón para guardar los cambios
            let btn_guardar = document.createElement('button');
            btn_guardar.innerText = 'Guardar';
            btn_guardar.classList.add('popup-button');  // Clase para el botón
            
            // Función para guardar los cambios
            btn_guardar.onclick = function() {
                cellNombre.innerText = input.value; // Modificar el valor de la celda
                cellCantidad.innerText = input2.value;
                if(parseInt(input2.value) > cantidad_gasto){
                    // Actualizar el presupuesto restante
                    span_valor_restante.textContent = presupuesto_inicial - parseInt(input2.value);
                }
                document.body.removeChild(popup);   // Cerrar el popup
            };

            // Botón para cancelar y cerrar el popup
            let btn_cancelar = document.createElement('button');
            btn_cancelar.innerText = 'Cancelar';
            btn_cancelar.classList.add('popup-button');  // Clase para el botón
            btn_cancelar.style.marginLeft = '10px';

            // Función para cerrar el popup sin hacer cambios
            btn_cancelar.onclick = function() {
                document.body.removeChild(popup); // Cerrar el popup sin hacer cambios
            };

            // Agregar los elementos al popup
            popup.appendChild(input);
            popup.appendChild(input2);
            popup.appendChild(btn_guardar);
            popup.appendChild(btn_cancelar);
            
            // Agregar el popup al body del documento
            document.body.appendChild(popup);

        };

        // Crear botón de eliminar
        let boton_eliminar = document.createElement('span');
        boton_eliminar.innerHTML = '🗑️';
        boton_eliminar.onclick = function() {
            // Restar la cantidad del gasto eliminado al acumulador de gastos totales
            acumulador_gastos_totales -= parseInt(cellCantidad.textContent);
            // Actualizar el presupuesto restante
            span_valor_restante.textContent = presupuesto_inicial - acumulador_gastos_totales;
            table.deleteRow(nuevaFila.rowIndex);
        };
        cellEliminar.appendChild(boton_eliminar);

        // Asignar clases a la nueva fila y sus celdas
        nuevaFila.classList.add('fila_gasto');
        cellNombre.classList.add('nombre_gasto');
        cellCantidad.classList.add('cantidad_gasto');
        cellEditar.classList.add('editar_gasto');
        cellEliminar.classList.add('eliminar_gasto');
    }

    // Limpiar los inputs
    document.getElementById('nombre_gasto').value = '';
    document.getElementById('cantidad_gasto').value = '';

    // Actualizar presupuesto actual
    acumulador_gastos_totales += cantidad_gasto;
    span_valor_restante.textContent = presupuesto_inicial - acumulador_gastos_totales;
}

//agregar valor del presupuesto inicial al span en la ventana emergente
const span_presupuesto_inicial = document.getElementById('span_presupuesto_inicial');
span_presupuesto_inicial.textContent = presupuesto_inicial;

//variable global de nuevo presupuesto
// let nuevo_presupuesto = parseInt(document.getElementById('nuevo_presupuesto').value.trim());


// Función para confirmar el cambio de presupuesto
function confirmar_cambio_presupuesto() {
    let nuevo_presupuesto = parseInt(document.getElementById('nuevo_presupuesto').value.trim());

    // Validar que el nuevo presupuesto sea un número válido
    if (isNaN(nuevo_presupuesto) || nuevo_presupuesto <= 0) {
        alert("Por favor, ingrese un presupuesto válido.");
        return;
    }

    if (acumulador_gastos_totales>nuevo_presupuesto){
        const ventana_presupuesto_modificado=document.querySelector('.ventana_presupuesto_modificado');
        const h3_presupuesto_modificado=document.querySelector('.h3_presupuesto_modificado')
        h3_presupuesto_modificado.style.display='none';
        const h4_presupuesto_no_modificado=document.createElement('h4');
        h4_presupuesto_no_modificado.textContent='No hay suficiente presupuesto para realizar el cambio';
        h4_presupuesto_no_modificado.style.color='red';
        ventana_presupuesto_modificado.appendChild(h4_presupuesto_no_modificado);
        
    }else{
            // Actualizar el presupuesto inicial
    presupuesto_inicial = nuevo_presupuesto;
    span_presupuesto_inicial.textContent = presupuesto_inicial;
    span_valor_inicial.textContent = presupuesto_inicial;
    span_valor_restante.textContent = presupuesto_inicial - acumulador_gastos_totales;

    // Guardar el nuevo presupuesto en localStorage
    localStorage.setItem('presupuesto', presupuesto_inicial);

    // Limpiar el input de nuevo presupuesto
    document.getElementById('nuevo_presupuesto').value = '';
    }
}

// Asignar la función crear_gasto al botón de guardar gasto que trajimos de la web principal 
document.getElementById('boton_guardar_gasto').addEventListener('click', crear_gasto);

// Asignar la función confirmar_cambio_presupuesto al botón de confrimar cambio que trajimos de la principal
document.getElementById('boton_confirmar_cambio').addEventListener('click', confirmar_cambio_presupuesto);

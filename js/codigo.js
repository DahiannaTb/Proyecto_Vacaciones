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

//modificar presupuesto inicial
//agregar valor del presupuesto inicial al span en la ventana emergente
const span_presupuesto_inicial = document.getElementById('span_presupuesto_inicial');
span_presupuesto_inicial.textContent = presupuesto_inicial;

//traer input de presupuesto nuevo
const input_nuevo_presupuesto = document.getElementById('input_nuevo_presupuesto');


// Asignarle la función crear_gasto al botón
document.getElementById('boton_guardar_gasto').addEventListener('click', crear_gasto);

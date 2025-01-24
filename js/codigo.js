//en estast variables se almacenan lo que son: el nombre de gasto y la cantidad
//ya que como hay que tene en cuenta si se registra el mismo tipo de gasto con otro monto, 
//se debe almacenar NO en una nueva fila sino en la misma fila pero con un nuevo monto.
let nombres_gastos=[]
let cantidades_gastos=[]


// Function para crear cada fila de un nuevo gasto
function crear_gasto() {
    let nombre_gasto = document.getElementById('nombre_gasto').value.trim();
    let cantidad_gasto = parseInt(document.getElementById('cantidad_gasto').value.trim());
    
    // Validar que los campos estén completos y cantidad sea un número válido
    if (!nombre_gasto || isNaN(cantidad_gasto)) {
        alert("Por favor, complete todos los campos correctamente.");
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
    if (gastoExiste===false) {
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
}


// asignarle la funcion crear_gasto al botón
document.getElementById('boton_guardar_gasto').addEventListener('click', crear_gasto);

//agregar presupuesto inicial

let presupuesto_inicial = localStorage.getItem('presupuesto');
let span_valor=document.getElementById('valor_presupuesto_inicial');
// let presupuesto=presupuesto_inicial.value;

console.log(presupuesto_inicial);
span_valor.textContent=presupuesto_inicial;
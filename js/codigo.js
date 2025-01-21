
// Function to create a new expense entry
function crear_gasto() {
    let nombre_gasto = document.getElementById('nombre_gasto').value;
    let cantidad_gasto = document.getElementById('cantidad_gasto').value;

    // Validar que el input este lleno
    if (!nombre_gasto || !cantidad_gasto) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Crear nueva fila
    let table = document.querySelector('.gastos');
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

    // limpiar inputs
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
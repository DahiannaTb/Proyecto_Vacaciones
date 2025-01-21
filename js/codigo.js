
// Function to create a new expense entry
function crear_gasto() {
    let nombre_gasto = document.getElementById('nombre_gasto').value;
    let cantidad_gasto = document.getElementById('cantidad_gasto').value;

    // Validate input
    if (!nombre_gasto || !cantidad_gasto) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Create a new row in the table
    let table = document.querySelector('.gastos');
    let newRow = table.insertRow();

    // Insert cells for name, amount, edit icon, and delete icon
    let cellNombre = newRow.insertCell(0);
    let cellCantidad = newRow.insertCell(1);
    let cellEditar = newRow.insertCell(2);
    let cellEliminar = newRow.insertCell(3);

    cellNombre.textContent = nombre_gasto;
    cellCantidad.textContent = cantidad_gasto;

    // Create edit icon
    let editIcon = document.createElement('span');
    editIcon.innerHTML = '✏️'; // You can replace this with an actual icon
    cellEditar.appendChild(editIcon);

    // Create delete icon
    let deleteIcon = document.createElement('span');
    deleteIcon.innerHTML = '🗑️'; // You can replace this with an actual icon
    deleteIcon.onclick = function() {
        table.deleteRow(newRow.rowIndex);
    };
    cellEliminar.appendChild(deleteIcon);

    // Clear input fields
    document.getElementById('nombre_gasto').value = '';
    document.getElementById('cantidad_gasto').value = '';
}

// Attach the crear_gasto function to the button
document.getElementById('boton_guardar_gasto').addEventListener('click', crear_gasto);

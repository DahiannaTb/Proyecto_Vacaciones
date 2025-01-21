//capturar el input en donde se pide el presupuesto inicial
let presupuesto_inicial = document.getElementById('presupuesto_inicial');

//capturar el boton en el que se continúa a la siguiente página
let boton_continuar = document.getElementById('boton_continuar');

//que el valor del input se guarde solo si el usuario hace click en continuar
boton_continuar.addEventListener('click', () => {
    let presupuesto = parseInt(presupuesto_inicial.value);
    
    // Validate input
    if (isNaN(presupuesto) || presupuesto <= 0) {
        alert("Por favor, ingrese un presupuesto válido.");
    } else {
        // Navigate to the next page
        window.location.href = "principal.html"; // Adjust the path if necessary
    }
});

// ====================================
// VARIABLES GLOBALES
// ====================================

// Array para almacenar todos los clientes registrados
// Se inicializa cargando los datos guardados en localStorage o un array vacío si no hay datos
let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

// ====================================
// EVENTO DE CARGA DE LA PÁGINA
// ====================================

// Este evento se ejecuta cuando el DOM (estructura HTML) está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia al formulario usando su ID
    const form = document.getElementById('clienteForm');
    
    // Agregar un "listener" (escuchador) para el evento submit del formulario
    // Esto se ejecuta cuando el usuario hace clic en "Guardar Cliente"
    form.addEventListener('submit', guardarCliente);
    
    // Mostrar los clientes que ya están guardados (si hay alguno)
    mostrarClientes();
});

// ====================================
// FUNCIÓN PARA GUARDAR CLIENTE
// ====================================

function guardarCliente(evento) {
    // Prevenir el comportamiento por defecto del formulario (que recarga la página)
    evento.preventDefault();
    
    // Limpiar mensajes de error previos
    limpiarErrores();
    
    // Obtener los valores de todos los campos del formulario
    const nombres = document.getElementById('nombres').value.trim(); // trim() elimina espacios al inicio y final
    const apellidos = document.getElementById('apellidos').value.trim();
    const cedula = document.getElementById('cedula').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    
    // Validar los datos ingresados
    // Si la validación falla, se detiene la ejecución de la función
    if (!validarFormulario(nombres, apellidos, cedula, correo, direccion)) {
        return; // Sale de la función sin guardar
    }
    
    // Verificar si el correo ya está registrado
    const correoExiste = clientes.some(cliente => cliente.correo.toLowerCase() === correo.toLowerCase());
    if (correoExiste) {
        mostrarError('correo', 'Este correo electrónico ya está registrado');
        return;
    }
    
    // Verificar si la cédula ya está registrada
    const cedulaExiste = clientes.some(cliente => cliente.cedula === cedula);
    if (cedulaExiste) {
        mostrarError('cedula', 'Esta cédula ya está registrada');
        return;
    }
    
    // Crear un objeto con los datos del cliente
    const cliente = {
        id: Date.now(), // Genera un ID único usando el timestamp actual
        nombres: nombres,
        apellidos: apellidos,
        cedula: cedula,
        correo: correo,
        direccion: direccion
    };
    
    // Agregar el nuevo cliente al array de clientes
    clientes.push(cliente);
    
    // Guardar el array actualizado en localStorage
    // localStorage solo acepta strings, por eso usamos JSON.stringify
    localStorage.setItem('clientes', JSON.stringify(clientes));
    
    // Mostrar mensaje de éxito al usuario
    mostrarMensajeExito('¡Cliente guardado exitosamente! ✅');
    
    // Limpiar el formulario
    document.getElementById('clienteForm').reset();
    
    // Actualizar la tabla de clientes mostrada
    mostrarClientes();
}

// ====================================
// FUNCIÓN PARA VALIDAR EL FORMULARIO
// ====================================

function validarFormulario(nombres, apellidos, cedula, correo, direccion) {
    // Variable para rastrear si el formulario es válido
    let esValido = true;
    
    // Validar nombres (mínimo 2 caracteres)
    if (nombres.length < 2) {
        mostrarError('nombres', 'Los nombres deben tener al menos 2 caracteres');
        esValido = false;
    }
    
    // Validar apellidos (mínimo 2 caracteres)
    if (apellidos.length < 2) {
        mostrarError('apellidos', 'Los apellidos deben tener al menos 2 caracteres');
        esValido = false;
    }
    
    // Validar cédula (formato ecuatoriano: 10 dígitos)
    const regexCedula = /^\d{10}$/;
    if (!regexCedula.test(cedula)) {
        mostrarError('cedula', 'La cédula debe tener exactamente 10 dígitos');
        esValido = false;
    }
    
    // Validar correo usando una expresión regular (regex)
    // Esta regex verifica el formato básico de un email: algo@algo.algo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
        mostrarError('correo', 'Ingrese un correo electrónico válido');
        esValido = false;
    }
    
    // Validar dirección (mínimo 10 caracteres para dirección completa)
    if (direccion.length < 10) {
        mostrarError('direccion', 'La dirección debe tener al menos 10 caracteres');
        esValido = false;
    }
    
    // Retornar true si todas las validaciones pasaron, false si alguna falló
    return esValido;
}

// ====================================
// FUNCIÓN PARA MOSTRAR ERRORES
// ====================================

function mostrarError(campo, mensaje) {
    // Obtener el elemento input por su ID
    const inputElement = document.getElementById(campo);
    // Obtener el span de error correspondiente
    const errorElement = document.getElementById(`error-${campo}`);
    
    // Agregar la clase 'error' al input (esto cambia su estilo según el CSS)
    inputElement.classList.add('error');
    // Mostrar el mensaje de error en el span
    errorElement.textContent = mensaje;
}

// ====================================
// FUNCIÓN PARA LIMPIAR ERRORES
// ====================================

function limpiarErrores() {
    // Obtener todos los elementos con la clase 'error-message'
    const errores = document.querySelectorAll('.error-message');
    // Recorrer cada uno y limpiar su contenido
    errores.forEach(error => {
        error.textContent = '';
    });
    
    // Obtener todos los inputs y selects que tienen la clase 'error'
    const inputs = document.querySelectorAll('.error');
    // Recorrer cada uno y remover la clase 'error'
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}

// ====================================
// FUNCIÓN PARA MOSTRAR MENSAJE DE ÉXITO
// ====================================

function mostrarMensajeExito(mensaje) {
    // Crear un elemento div para el mensaje
    const mensajeDiv = document.createElement('div');
    
    // Agregar estilos inline al mensaje
    mensajeDiv.style.position = 'fixed'; // Posición fija en la pantalla
    mensajeDiv.style.top = '20px'; // 20px desde arriba
    mensajeDiv.style.right = '20px'; // 20px desde la derecha
    mensajeDiv.style.backgroundColor = '#27ae60'; // Color verde
    mensajeDiv.style.color = 'white'; // Texto blanco
    mensajeDiv.style.padding = '15px 25px'; // Espacio interno
    mensajeDiv.style.borderRadius = '8px'; // Bordes redondeados
    mensajeDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'; // Sombra
    mensajeDiv.style.zIndex = '1000'; // Por encima de otros elementos
    mensajeDiv.style.fontSize = '1em'; // Tamaño de fuente
    mensajeDiv.textContent = mensaje; // Contenido del mensaje
    
    // Agregar el mensaje al body de la página
    document.body.appendChild(mensajeDiv);
    
    // Remover el mensaje automáticamente después de 3 segundos
    setTimeout(() => {
        mensajeDiv.remove();
    }, 3000);
}

// ====================================
// FUNCIÓN PARA MOSTRAR CLIENTES EN LA TABLA
// ====================================

function mostrarClientes() {
    // Obtener referencia al cuerpo de la tabla
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    // Obtener referencia al mensaje vacío
    const mensajeVacio = document.getElementById('mensajeVacio');
    // Obtener referencia al contador de clientes
    const totalClientes = document.getElementById('totalClientes');
    
    // Limpiar el contenido actual de la tabla
    cuerpoTabla.innerHTML = '';
    
    // Actualizar el contador de clientes
    totalClientes.textContent = clientes.length;
    
    // Si no hay clientes, mostrar el mensaje vacío y ocultar la tabla
    if (clientes.length === 0) {
        mensajeVacio.style.display = 'block'; // Mostrar mensaje
        document.querySelector('.table-container').style.display = 'none'; // Ocultar tabla
        return; // Salir de la función
    }
    
    // Si hay clientes, ocultar el mensaje vacío y mostrar la tabla
    mensajeVacio.style.display = 'none';
    document.querySelector('.table-container').style.display = 'block';
    
    // Recorrer el array de clientes y crear una fila para cada uno
    clientes.forEach((cliente, index) => {
        // Crear un elemento tr (fila de tabla)
        const fila = document.createElement('tr');
        
        // Establecer el contenido HTML de la fila
        // Cada td representa una celda de la tabla
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${cliente.nombres}</td>
            <td>${cliente.apellidos}</td>
            <td>${cliente.cedula}</td>
            <td>${cliente.correo}</td>
            <td>${cliente.direccion}</td>
            <td>
                <button class="btn-eliminar" onclick="eliminarCliente(${cliente.id})">
                    🗑️ Eliminar
                </button>
            </td>
        `;
        
        // Agregar la fila al cuerpo de la tabla
        cuerpoTabla.appendChild(fila);
    });
}

// ====================================
// FUNCIÓN PARA ELIMINAR CLIENTE
// ====================================

function eliminarCliente(id) {
    // Mostrar un cuadro de confirmación al usuario
    // confirm() retorna true si el usuario hace clic en "Aceptar", false si hace clic en "Cancelar"
    const confirmacion = confirm('¿Está seguro de que desea eliminar este cliente?');
    
    // Si el usuario cancela, no hacer nada
    if (!confirmacion) {
        return;
    }
    
    // Filtrar el array de clientes, removiendo el cliente con el ID especificado
    // filter() crea un nuevo array con todos los elementos que cumplen la condición
    clientes = clientes.filter(cliente => cliente.id !== id);
    
    // Actualizar localStorage con el array modificado
    localStorage.setItem('clientes', JSON.stringify(clientes));
    
    // Mostrar mensaje de confirmación
    mostrarMensajeExito('Cliente eliminado exitosamente 🗑️');
    
    // Actualizar la tabla
    mostrarClientes();
}

// ====================================
// INFORMACIÓN ADICIONAL
// ====================================

/*
 * STORAGE (ALMACENAMIENTO):
 * - localStorage: Permite guardar datos en el navegador del usuario
 * - Los datos persisten incluso después de cerrar el navegador
 * - Solo puede almacenar strings, por eso usamos JSON.stringify() y JSON.parse()
 * - JSON.stringify() convierte objetos JavaScript a texto
 * - JSON.parse() convierte texto a objetos JavaScript
 * 
 * EVENTOS:
 * - addEventListener: Escucha eventos en elementos HTML
 * - 'DOMContentLoaded': Se dispara cuando el HTML está completamente cargado
 * - 'submit': Se dispara cuando se envía un formulario
 * - preventDefault(): Previene el comportamiento por defecto de un evento
 * 
 * MANIPULACIÓN DEL DOM:
 * - getElementById(): Obtiene un elemento por su ID
 * - createElement(): Crea un nuevo elemento HTML
 * - appendChild(): Agrega un elemento hijo a otro elemento
 * - innerHTML: Establece o obtiene el HTML interno de un elemento
 * - textContent: Establece o obtiene el texto de un elemento
 * - classList.add/remove(): Agrega o remueve clases CSS
 * 
 * VALIDACIÓN:
 * - Regex (expresiones regulares): Patrones para validar texto
 * - trim(): Elimina espacios en blanco al inicio y final de un string
 * - test(): Método de regex que verifica si un string cumple el patrón
 */
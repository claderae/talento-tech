const menuToggle = document.querySelector('.menu-toggle');
const navHeader = document.querySelector('.nav-header');

menuToggle.addEventListener('click', () => {
    navHeader.classList.toggle('active');
});

// Función para mostrar la notificación
function mostrarNotificacion(mensaje) {
    // Crear el elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.classList.add('notificacion');
    notificacion.textContent = mensaje;

    // Añadir la notificación al cuerpo del documento
    document.body.appendChild(notificacion);

    // Estilos básicos para la notificación
    notificacion.style.position = 'fixed';
    notificacion.style.bottom = '20px';
    notificacion.style.right = '20px';
    notificacion.style.backgroundColor = '#4caf50';
    notificacion.style.color = 'white';
    notificacion.style.padding = '10px 20px';
    notificacion.style.borderRadius = '5px';
    notificacion.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    notificacion.style.zIndex = '1000';

    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

// Función para guardar productos en el carrito (localStorage)
function guardarEnCarrito(producto) {
    // Obtener el carrito actual del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Agregar el nuevo producto al carrito
    carrito.push(producto);

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

fetch('db/productos.json')
    .then(response => response.json())
    .then(productos => {
        // Seleccionamos el contenedor de productos
        const container = document.querySelector('.productos-container');
        
        // Recorremos cada producto y creamos el HTML correspondiente
        productos.forEach(producto => {
            // Creamos el artículo para cada producto
            const productoElement = document.createElement('article');
            productoElement.classList.add('producto');
            
            // Añadimos el contenido HTML al artículo
            productoElement.innerHTML = `
                <img src="${producto.src}" alt="${producto.nombre}" class="producto-imagen">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>Precio: $${producto.precio}</p>
                <a href="#comprar" class="btn">Comprar</a>
            `;
            
            // Añadimos el producto al contenedor
            container.appendChild(productoElement);

            // Seleccionar todos los botones con href="#comprar"
            const botonesComprar = document.querySelectorAll('a[href="#comprar"]');
            
            // Añadimos el evento click al botón
            comprarBtn.addEventListener('click', (event) => {
                event.preventDefault(); // Evitar el comportamiento por defecto
                mostrarNotificacion(`${producto.nombre} ha sido agregado al carrito`);
                
                // Guardar en localStorage
                guardarEnCarrito(producto);

                mostrarNotificacion(`${producto.nombre} ha sido agregado al carrito`);
            
            });
        });
    })
    .catch(error => console.error('Error al cargar los productos:', error));
    
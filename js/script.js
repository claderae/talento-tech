const menuToggle = document.querySelector('.menu-toggle');
const navHeader = document.querySelector('.nav-header');

// Verificar si los elementos existen
if (menuToggle && navHeader) {
    menuToggle.addEventListener('click', () => {
        navHeader.classList.toggle('active');
    });
}

// Función para mostrar la notificación
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.classList.add('notificacion');
    notificacion.textContent = mensaje;

    document.body.appendChild(notificacion);

    notificacion.style.position = 'fixed';
    notificacion.style.bottom = '20px';
    notificacion.style.right = '20px';
    notificacion.style.backgroundColor = '#4caf50';
    notificacion.style.color = 'white';
    notificacion.style.padding = '10px 20px';
    notificacion.style.borderRadius = '5px';
    notificacion.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    notificacion.style.zIndex = '1000';

    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

// Función para guardar productos en el carrito (localStorage)
function guardarEnCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Fetch para cargar los productos
fetch('db/productos.json')
    .then(response => response.json())
    .then(productos => {
        const container = document.querySelector('.productos-container');
        productos.forEach(producto => {
            const productoElement = document.createElement('article');
            productoElement.classList.add('producto');
            productoElement.innerHTML = `
                <img src="${producto.src}" alt="${producto.nombre}" class="producto-imagen">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>Precio: $${producto.precio}</p>
                <a href="#comprar" class="btn">Comprar</a>
            `;
            container.appendChild(productoElement);
        });

        const comprarBtns = document.querySelectorAll('a[href="#comprar"]');
        comprarBtns.forEach((boton, index) => {
            boton.addEventListener('click', (event) => {
                event.preventDefault();
                mostrarNotificacion(`${productos[index].nombre} ha sido agregado al carrito`);
                guardarEnCarrito(productos[index]);
            });
        });
    })
    .catch(error => console.error('Error al cargar los productos:', error));

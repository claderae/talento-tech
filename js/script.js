const menuToggle = document.querySelector('.menu-toggle');
const navHeader = document.querySelector('.nav-header');

menuToggle.addEventListener('click', () => {
    navHeader.classList.toggle('active');
});

fetch('db/productos.json')
    .then(response => response.json())
    .then(productos => {
        // Seleccionamos el contenedor de productos
        const container = document.getElementById('productos-container');
        
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
        });
    })
    .catch(error => console.error('Error al cargar los productos:', error));
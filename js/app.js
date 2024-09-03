// app.js

// Cargar productos desde el archivo JSON
fetch('products.json')
    .then(response => response.json())
    .then(products => {
        displayProducts(products);
    });

let cart = loadCart();

// Mostrar productos en la interfaz
function displayProducts(products) {
    const productContainer = document.getElementById('products');
    products.forEach(product => {
        const productElement = document.createElement('li');

        // Crear el contenedor del carrusel
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'carousel';

        // Añadir imágenes al carrusel
        product.images.forEach((image, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.alt = `${product.name} - Image ${index + 1}`;
            imgElement.className = 'carousel-image';
            if (index === 0) imgElement.classList.add('active'); // Solo la primera imagen es visible al inicio
            carouselContainer.appendChild(imgElement);
        });

        // Controles de carrusel
        const prevButton = document.createElement('button');
        prevButton.textContent = '<';
        prevButton.className = 'carousel-control prev';
        prevButton.onclick = () => showPrevImage(carouselContainer);

        const nextButton = document.createElement('button');
        nextButton.textContent = '>';
        nextButton.className = 'carousel-control next';
        nextButton.onclick = () => showNextImage(carouselContainer);

        // Añadir controles al carrusel
        productElement.appendChild(prevButton);
        productElement.appendChild(carouselContainer);
        productElement.appendChild(nextButton);

        // Crear título y precio
        const productInfo = document.createElement('div');
        productInfo.textContent = `${product.name} - $${product.price}`;

        // Crear descripción
        const descriptionElement = document.createElement('div');
        descriptionElement.className = 'product-description';
        descriptionElement.textContent = product.description;

        // Botón para agregar al carrito
        const addButton = document.createElement('button');
        addButton.textContent = 'Agregar al carrito';
        addButton.onclick = () => addToCart(product);

        // Añadir todo al elemento del producto
        productElement.appendChild(productInfo);
        productElement.appendChild(descriptionElement);
        productElement.appendChild(addButton);

        // Añadir el producto al contenedor
        productContainer.appendChild(productElement);
    });
}

// Mostrar la imagen anterior en el carrusel
function showPrevImage(carouselContainer) {
    const activeImage = carouselContainer.querySelector('.carousel-image.active');
    activeImage.classList.remove('active');
    if (activeImage.previousElementSibling) {
        activeImage.previousElementSibling.classList.add('active');
    } else {
        carouselContainer.lastElementChild.classList.add('active');
    }
}

// Mostrar la siguiente imagen en el carrusel
function showNextImage(carouselContainer) {
    const activeImage = carouselContainer.querySelector('.carousel-image.active');
    activeImage.classList.remove('active');
    if (activeImage.nextElementSibling) {
        activeImage.nextElementSibling.classList.add('active');
    } else {
        carouselContainer.firstElementChild.classList.add('active');
    }
}

// Agregar productos al carrito
function addToCart(product) {
    cart.push(product);
    saveCart(cart);
    updateCart();
}

// Actualizar la interfaz del carrito
function updateCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((product, index) => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${product.name} - $${product.price}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => {
            cart.splice(index, 1);
            saveCart(cart);
            updateCart();
        };
        cartItem.appendChild(removeButton);
        cartContainer.appendChild(cartItem);
        total += product.price;
    });

    document.getElementById('total-price').textContent = total;
}

// Finalizar la compra
document.getElementById('checkout-btn').onclick = (event) => {
    alert('Gracias por tu compra!');
    clearCart();
    updateCart();
};
document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('checkout-btn');
    if (checkoutButton) {
        checkoutButton.onclick = () => {
            alert('Gracias por tu compra!');
            clearCart();
            updateCart();
        };
    }
});


// Inicializa el carrito al cargar la página
updateCart();

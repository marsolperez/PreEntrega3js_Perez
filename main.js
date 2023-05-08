// // capturo info del formulario dom
// const loginForm = document.getElementById('login-form');

// // Agregamos el evento 'submit' al formulario
// loginForm.addEventListener('submit', (event) => {
//     event.preventDefault();// Prevenir la que se borren los datos 

//     // Obtenemos los valores de los campos de entrada
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;


//     //Verificar si los campos están llenos
//     if (username && password) {
//         const nombreUsuario = document.querySelector('#nombreUsuario');
//         nombreUsuario.textContent = `${username}!`;

//     } else {
//         //mensaje de error
//         const nombreUsuario = document.querySelector('#nombreUsuario');
//         nombreUsuario.textContent = 'Ingrese su nombre de usuario y contraseña';
//     }

//     //  objeto JSON con los valores de los campos de entrada
//     const user = {
//         username: username,
//         password: password
//     };


//     // Almacenar el objeto JSON en el localStorage
//     localStorage.setItem('user', JSON.stringify(user));
// });

// Verificar si el usuario ya ha iniciado sesión
window.addEventListener('DOMContentLoaded', () => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
        const user = JSON.parse(storedUser);
        const nombreUsuario = document.querySelector('#nombreUsuario');
        nombreUsuario.textContent = `${user.username}!`;

        // Ocultar el formulario de inicio de sesión
        const loginForm = document.getElementById('login-form');
        loginForm.style.display = 'none';
    }
});

// Capturar información del formulario DOM
const loginForm = document.getElementById('login-form');

// Agregar el evento 'submit' al formulario
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir que se borren los datos 

    // Obtener los valores de los campos de entrada
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificar si los campos están llenos
    if (username && password) {
        const nombreUsuario = document.querySelector('#nombreUsuario');
        nombreUsuario.textContent = `${username}!`;

        // Crear objeto JSON con los valores de los campos de entrada
        const user = {
            username: username,
            password: password
        };

        // Almacenar el objeto JSON en el localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // Ocultar el formulario de inicio de sesión
        loginForm.style.display = 'none';
    } else {
        // Mostrar mensaje de error
        const nombreUsuario = document.querySelector('#nombreUsuario');
        nombreUsuario.textContent = 'Ingrese su nombre de usuario y contraseña';
    }
});

// Agregar el botón para cerrar sesión
const logoutButton = document.getElementById('logout-button');

// Agregar el evento 'click' al botón
logoutButton.addEventListener('click', () => {
    // Eliminar el usuario del localStorage
    localStorage.removeItem('user');

    // Mostrar el formulario de inicio de sesión
    loginForm.style.display = 'block';

    // Limpiar el campo de nombre de usuario
    const nombreUsuario = document.querySelector('#nombreUsuario');
    nombreUsuario.textContent = '';
});



//nivel de experiencia

// Capturamos el elemento select
const nivelSelect = document.getElementById('nivel');

// Agregamos un evento 'change' al elemento select
nivelSelect.addEventListener('change', () => {
    // Obtenemos el valor seleccionado del elemento select
    const nivelValue = nivelSelect.value;

    // Almacenamos el valor seleccionado en el localStorage
    localStorage.setItem('nivel', nivelValue);
});


// Carrito de Compras
//obtener archivos del dom

const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

//crear Variables /comprar.sumar carrito 

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector( '.shoppingCartItemsContainer');
// funcion agregar al carrito

function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.item');

    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.item-image').src;

    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}
// crear funcion que sume todos los elementos
function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
        'shoppingCartItemTitle'
    );
    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle) {
            let elementQuantity = elementsTitle[
                i
            ].parentElement.parentElement.parentElement.querySelector(
                '.shoppingCartItemQuantity'
            );
            elementQuantity.value++;
            $('.toast').toast('show');
            updateShoppingCartTotal();
            return;
        }
    }

    const filaCarrito = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
    filaCarrito.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(filaCarrito);

    // crear funcion para eliminar item del caarrito

    filaCarrito
        .querySelector('.buttonDelete')
        .addEventListener('click', borrarItemCarrito);

        filaCarrito
        .querySelector('.shoppingCartItemQuantity')
        .addEventListener('change', quantityChanged);

    updateShoppingCartTotal();

    //Crear Funcion que sume los totales de los items seleccionados
}

function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
            '.shoppingCartItemPrice'
        );
        const shoppingCartItemPrice = Number(
            shoppingCartItemPriceElement.textContent.replace('$', '')
        );
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
            '.shoppingCartItemQuantity'
        );
        const shoppingCartItemQuantity = Number(
            shoppingCartItemQuantityElement.value
        );
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}

//funcion remover items
function borrarItemCarrito(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
}

//Funcion modificar cantidades

function quantityChanged(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
}

//crear funcion comprar

function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
}

// capturo info del formulario dom
const loginForm = document.getElementById('login-form');

// Agregamos el evento 'submit' al formulario
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();// Preveniir la que se borren los datos 

    // Obtenemos los valores de los campos de entrada
    // const nombreUsuario = document.querySelector('#nombreUsuario');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    //Verificar si los campos están llenos
    if (username && password) {
        const nombreUsuario = document.querySelector('#nombreUsuario');
        nombreUsuario.textContent = `${username}!`;

    } else {
        //mensaje de error
        const nombreUsuario = document.querySelector('#nombreUsuario');
        nombreUsuario.textContent = 'Ingrese su nombre de usuario y contraseña';
    }

    //  objeto JSON con los valores de los campos de entrada
    const user = {
        username: username,
        password: password
    };


    // Almacenar el objeto JSON en el localStorage
    localStorage.setItem('user', JSON.stringify(user));
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

const agregarAlCarritoBtns = document.querySelectorAll('.addCarrito');

agregarAlCarritoBtns.forEach(addCarritoButton => {
    addCarritoButton.addEventListener('click', addCarritoClicked);
});

//crear Variables /comprar.sumar carrito 

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);


const shoppingCartItemsContainer = document.querySelector( '.shoppingCartItemsContainer');

// funcion agregar al carrito

function addCarritoClicked(event) {
    const button = event.target;
    const item = button.closest('.item');

    const itemTitulo = item.querySelector('.item-titulo').textContent;
    const itemPrecio = item.querySelector('.item-precio').textContent;
    const itemImage = item.querySelector('.item-image').src;

    addItemCarrito(itemTitulo, itemPrecio, itemImage);

}

// crear funcion que sume todos los elementos
function addItemCarrito(itemTitulo, itemPrecio, itemImage) {
    const elementosTitulo = shoppingCartItemsContainer.getElementsByClassName(
        'shoppingCartItemTitle'
    );
    for (let i = 0; i < elementosTitulo.length; i++) {
        if (elementosTitulo[i].innerText === itemTitle) {
            let elementQuantity = elementosTitulo[
                i
            ].parentElement.parentElement.parentElement.querySelector(
                '.shoppingCartItemQuantity'
            );
            elementQuantity.value++;
            $('.toast').toast('show');
            sumarCarritoTotal();
            return;
        }
    }

    const filaCarritoDeCompra = document.createElement('div');
    const carritoComprasContenido = `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitulo}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrecio}</p>
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
    filaCarritoDeCompra.innerHTML = carritoComprasContenido;
    shoppingCartItemsContainer.append(filaCarritoDeCompra);
}
// crear funcion para eliminar item del caarrito

    filaCarritoDeCompra
        .querySelector('.buttonDelete')
        .addEventListener('click', eliminarItemCarrito);

    
    filaCarritoDeCompra 
        .querySelector('.shoppingCartItemQuantity')
        .addEventListener('change', cantidadModificada);

        sumarCarritoTotal();



//Crear Funcion que sume los totales de los items seleccionados

function sumarCarritoTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    const itemsCarritoCompras = document.querySelectorAll('.shoppingCartItem');

    itemsCarritoCompras.forEach((shoppingCartItem) => {
        const carritoItemPrecioElemento = shoppingCartItem.querySelector(
            '.carritoItemPrecio'
        );
        const carritoItemPrecio = Number(
            carritoItemPrecioElemento.textContent.replace('$', '')
        );

        const carritoItemCantidadElemento = shoppingCartItem.querySelector(
            'carritoItemCantidad'
        );
        const carritoItemCantidad = Number(
            carritoItemCantidadElemento.value
        );
        total = total + carritoItemPrecio * carritoItemCantidad;
    });
    shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;


}

//funcion remover items
function eliminarItemCarrito(event) {
    const buttonclicked = event.target;
    buttonclicked.closest ('.shoppingCartItem').remove(); 
    sumarCarritoTotal();
}

//Funcion modificar cantidades

function cantidadModificada(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    sumarCarritoTotal();
}

//crear funcion comprar

function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';
    sumarCarritoTotal();
}
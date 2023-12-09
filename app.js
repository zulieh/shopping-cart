let cartIcon = document.querySelector('.cart-icon');
let closeCart = document.querySelector('.close')
let body = document.querySelector('body');
let productListHTML = document.querySelector('.productList');
let cartListHTML = document.querySelector('.cartList'); 
let spanCart = document.querySelector('.cart-icon span')

let productList = [];
let carts = [];

cartIcon.addEventListener('click', () => {
    body.classList.toggle('showCart')
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

const addDataToHTML = () => {
    productListHTML.innerHTML = '';
    if(productList.length > 0){
        productList.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = `
            <img src=${product.image} alt="">
            <h2>${product.name}</h2>
            <div class="price">£${product.price}</div>
            <button class="addCart">
                Add To Cart
            </button>
            `;
            productListHTML.appendChild(newProduct);
        })
    }
}
productListHTML.addEventListener('click', (event) => {
    let clickPosition = event.target;
    if(clickPosition.classList.contains('addCart')){
        let product_id = clickPosition.parentElement.dataset.id;
        addToCart(product_id);

    }
})

const addToCart = (product_id) => {
    let productInCart = carts.findIndex((value) => value.product_id == product_id)
    if(carts.length <= 0){
        carts =[{
            product_id: product_id,
            quantity: 1
        }]
    }else if (productInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        })
    }else {
        carts[productInCart].quantity =  carts[productInCart].quantity + 1;
    }
    addCartToHTML();   
}
const addCartToHTML = () => {
    cartListHTML.innerHTML = '';
    let totalQuantity = 0;
    if(carts.length > 0){
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item')
    let productPosition = productList.findIndex((value) => value.id == cart.product_id)
    let info = productList[productPosition];
            newCart.innerHTML = `
            <div class="image">
                <img src="${info.image}" alt="">
            </div>
            <div class="name">
                ${info.name}
            </div>
            <div class="totalPrice">
                £${info.price * cart.quantity}
            </div>
            <div class="quantity">
                <span class="minus"><</span>
                <span>${cart.quantity}</span>
                <span class="plus">></span>
            </div>   
            `;
            cartListHTML.appendChild(newCart);
        })   
    }
    spanCart.innerText = totalQuantity;
}

const initApp = () => {
    fetch('productList.json')
    .then(response => response.json())
    .then(data =>{
        productList = data;
        addDataToHTML();
    })

}
initApp();
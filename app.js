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
    if(clickPosition.classList.contain('addCart')){
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
        carts[productInCart].quantity =   carts[productInCart].quantity + 1;
    }
    addCartToHTML();   
}
const addCartToHTML = () =>{
    cartListHTML.innerHTML = '';
    if(carts.length > 0){
        carts.forEach(cart =>{
            let newCart = document.createElement('div');
            newCart.classList.add('item')
            newCart.innerHTML = `
            <div class="images">
            <img src=${cart.image} alt="">
                </div>
                <div class="name">${cart.name}</div>
                <div class="totalPrice">£${cart.price}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>1</span>
                    <span class="plus">></span>
                </div>   
            `
            cartListHTML.appendChild(newCart);
        })
        
    }

}

const initApp = () => {
    fetch('productList.json')
    .then(response => response.json())
    .then(data =>{
        productList = data;
        console.log(productList);
    })

}
initApp();
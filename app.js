let cartIcon = document.querySelector('.cart-icon');
let closeCart = document.querySelector('.close')
let body = document.querySelector('body');
let productListHTML = document.querySelector('.productList');

let productList = [];

cartIcon.addEventListener('click', () => {
    body.classList.toggle('showCart')
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

const addHTMLData = () => {
    productListHTML.innerHTML = '';
    if(productList.length > 0){
        productList.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = `
            <img src="images/coffeetable.jpg" alt="">
            <h2>Product Name</h2>
            <div class="price">£200</div>
            <button class="addCart">
                Add To Cart
            </button>
            `;
            productListHTML.appendChild(newProduct);
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
let cartIcon = document.querySelector('.cart-icon');
let body = document.querySelector('body');

cartIcon.addEventListener('click', () => {
    body.classList.toggle('showCart')
});
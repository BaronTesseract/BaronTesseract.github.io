let products = [{
    title: 'Пакет видеопрограмм',
    description: 'Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвртируйте в любые форматы. Создавайте слайдшоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray.',
    price: 1990,
    img: 'img/card1.png',
},
{
    title: 'Фотостудия Movavi',
    description: 'Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвртируйте в любые форматы. Создавайте слайдшоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray.',
    price: 1890,
    img: 'img/card2.png',
},
{
    title: 'Movavi фоторедактор',
    description: 'Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвртируйте в любые форматы. Создавайте слайдшоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray.',
    price: 990,
    img: 'img/card3.png',
},
{
    title: 'Movavi Пакетный фоторедактор',
    description: 'Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвртируйте в любые форматы. Создавайте слайдшоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray.',
    price: 490,
    img: 'img/card4.png',
},
{
    title: 'Захват видео с экрана',
    description: 'Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвртируйте в любые форматы. Создавайте слайдшоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray.',
    price: 1490,
    img: 'img/card5.png',
},];


let cart = document.querySelector('.cart');
let cartItems = []; //массив с индексами (из массива products) продуктов в корзине
let section = document.querySelector('.section');

if (sessionStorage.cartItems) {
    cartItems = JSON.parse(sessionStorage.cartItems);
    cartItems.map((elem) => {
        elem = Number(elem);
    })
    showItems(cartItems); //отображение продукта в корзине
    cartPrice(cartItems);
}

section.addEventListener('click', addToCart);
cart.addEventListener('click', cartClick);

createProductList(products);

function cartClick(event) {
    if (event.target.tagName == 'IMG' && event.target.closest('.item__close')) {
        let closeElem = event.target.closest('.item__close');
        let index = closeElem.dataset.cartitemsindex; //получение индекса для удаления из cartItems[]
        delItem(index);
    }
    if (event.target.closest('button')) {
        showMessage();
    }
}

function showMessage() {
    if (cartItems.length) {
        let str = '';
        let sum = 0;
        for (let i = 0; i < cartItems.length; i++) {
            str +='     ' + products[cartItems[i]].title +  '\n';
            sum += products[cartItems[i]].price;
        }
        let message = `Вы добавили в корзину:\n${str}на сумму ${sum} руб.`
        alert(message)
    }
    else {
        alert('Вы ничего не выбрали')
    }
}

function delItem(index) {
    cartItems.splice(index, 1);//удаляем индекс продукта из массива cartEtems
    showItems(cartItems)//обновление корзины
    cartPrice(cartItems);//обновление суммы покупок
}
function cartPrice(items) { //отображение суммы покупок
    let cartPrice = cart.querySelector('.cart__price');
    let sum = 0;
    for (let i = 0; i < cartItems.length; i++) {
        sum += products[cartItems[i]].price;
    }
    cartPrice.innerHTML = `Всего: <span class="bold">${sum} руб.</span>`;
}
function addToCart(event) {
    let btn = event.target.closest('BUTTON');
    if (btn) {
        cartItems.push(btn.dataset.index); //добавление индекса, выбранного продукта
        showItems(cartItems); //отображение продукта в корзине
        cartPrice(cartItems);
    }
}

function showItems(items) {
    let list = cart.querySelector('ul');
    list.innerHTML = "";
    for (let i = 0; i < items.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = `
                    <div class="item__close" data-cartitemsindex="${i}">
                        <img src="img/X.png" alt="#">
                    </div>
                    <div class="item__title">
                        ${products[items[i]].title}
                    </div>
                    <div class="item__price bold">
                    ${products[items[i]].price} руб.
                    </div>`;
        li.classList.add('cart__item')
        list.appendChild(li);
    }
    sessionStorage.cartItems = JSON.stringify(cartItems);
}

function createProductList(products) {

    for (let i = 0; i < products.length; i++) {
        let div = document.createElement('div');
        div.classList.add('product');

        div.innerHTML = `
            <div class="product__img">
                <img src="${products[i].img}" alt="#">
            </div>
            <div class="product__content">
                <div class="product__title bold">
                    ${products[i].title}
                </div>
                <div class="product__description">
                    ${products[i].description}
                </div>
            </div>
            <div class="product__cart">
                <div class="product__price bold">
                    ${products[i].price} руб.
                </div>
                <button class="btn" data-index="${i}">
                    В корзину!
                </button>
            </div>`;
        section.insertAdjacentElement('beforeend', div)
    }
}
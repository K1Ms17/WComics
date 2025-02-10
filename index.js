let book = document.querySelector('.book');
let options = {
    width: 25, // base page width
    height: 38, // base page height
    size: "stretch",
    flippingTime: 500,
    minWidth: 315,
    maxWidth: 1000,
    maxShadowOpacity: 0.5, // Half shadow intensity
    mobileScrollSupport: true,
    swipeDistance: 30
}

let pageN = 0;

const flip = new St.PageFlip(book, options);
let pages = document.querySelectorAll('.page');
flip.loadFromHTML(pages);

let pageInput = document.querySelector('.page-input');

// Обработчик ввода номера страницы
pageInput.addEventListener('input', (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
        e.target.value = ''; // Очищаем поле, если ввод не является числом
        return;
    }

    // Ограничение на минимальное и максимальное значение
    if (value < 1) {
        value = 1;
        pageN = value;
    } else if (value > (flip.getPageCount())/2) {
        value = flip.getPageCount()/2;
        pageN = value;
    }
    else {
        pageN = value;
    }
    console.log(value,pageN);
    // Обновляем значение в поле ввода
    e.target.value = pageN;

    // Перелистываем на указанную страницу (индексация с 0)
    flip.flip(value*2-1, 'top');
});

// Обработчик кнопки "Назад"
let prev = document.querySelector('.prev');
prev.addEventListener('click', () => {
    flip.flipPrev('top');
    if (pageN-1 < 1) {
        return;
    }
    else {
        pageN = pageN - 1;
        pageInput.value = pageN;
    }
});

// Обработчик кнопки "Вперед"
let next = document.querySelector('.next');
next.addEventListener('click', () => {
    flip.flipNext('bottom');
    if (pageN+1 > flip.getPageCount()/2) {
        return;
    }
    else {
        pageN = pageN + 1;
        pageInput.value = pageN;
    }
});

// Инициализация поля ввода текущей страницей
pageInput.value = flip.getCurrentPageIndex() + 1;
pageN = flip.getCurrentPageIndex() + 1;

flip.on('flip', (e) => {
    // alert(e.data);
    pageInput.value = e.data/2 + 1;
    pageN = e.data/2 + 1;
});
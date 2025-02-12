// Проверяем размер экрана
function setHardPages() {
    const pages = document.querySelectorAll('.book .page');
    
    // Если ширина экрана меньше 768px (мобильное устройство)
    if (window.innerWidth < 768) {
        pages.forEach(page => {
            page.setAttribute('data-density', 'hard');
        });
        console.log('mobile');
    } else {
        // Убираем 'hard' на больших экранах
        pages.forEach(page => {
            page.removeAttribute('data-density');
        });
        // Добавляем жесткие только для первой и последней страницы
        pages[0].setAttribute('data-density', 'hard');
        pages[pages.length - 1].setAttribute('data-density', 'hard');
    }
}

// Вызываем функцию при загрузке страницы
setHardPages();
// Вызываем при изменении размера окна
window.addEventListener('resize', setHardPages);

let book = document.querySelector('.book');
let options = {
    width: 656, // base page width
    height: 992, // base page height

    size: "stretch",
    // set threshold values:
    minWidth: 328,
    maxWidth: 496,
    minHeight: 330,
    maxHeight: 218,
    flippingTime: 500,
    maxShadowOpacity: 0.5, // Half shadow intensity
    mobileScrollSupport: true,
    swipeDistance: 30,
    showCover: true
}

let pageN = 0;

const flip = new St.PageFlip(book, options);
let pages = document.querySelectorAll('.page');
flip.loadFromHTML(pages);

let pageInput = document.querySelector('.page-input');

// Обработчик ввода номера страницы
pageInput.addEventListener('change', (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
        e.target.value = ''; // Очищаем поле, если ввод не является числом
        return;
    }

    // Ограничение на минимальное и максимальное значение
    if (value < 1) {
        value = 1;
        pageN = value;
    } else if (value > (flip.getPageCount())) {
        value = flip.getPageCount();
        pageN = value;
    }
    else {
        pageN = value;
    }
    console.log(value,pageN);
    // Обновляем значение в поле ввода
    e.target.value = pageN;

    // Перелистываем на указанную страницу (индексация с 0)
    flip.flip(value-1, 'top');
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
    if (pageN+1 > flip.getPageCount()) {
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
    pageInput.value = e.data + 1;
    pageN = e.data + 1;
});
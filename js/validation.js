'use strict';

let formTag = document.querySelectorAll('form.form');
let formSubscribe = document.querySelectorAll('form.form-subscribe');
let formSearch = document.querySelectorAll('form.form-search');


const stars = document.querySelectorAll('.review-raiting__item');

// Звезды в отзывах
stars.forEach(star => {
    const ratingInput = document.getElementById('rating');
    star.addEventListener('click', () => {
        const value = star.getAttribute('data-value');
        ratingInput.value = value;

        // Удаляем активный класс со всех звезд
        stars.forEach(s => s.classList.remove('__active'));

        // Добавляем активный класс для выбранных звезд
        for (let i = 0; i < value; i++) {
        stars[i].classList.add('__active');
        }
    });
});

// форма 
formTag.forEach((form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        formVal(form);
    });
});
formSubscribe.forEach((form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        formValJr(form);
    });
});
formSearch.forEach((form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        formValJr(form);
    });
});
// валидация формы
function formVal(form) {
    let formReq = form.querySelectorAll('.__req');
    let err = 0;
    let firstErrorElement = null;

    formReq.forEach((formItem) => {
        let input = formItem.querySelector('input.form__input');
        if (!input) {
            input = formItem.querySelector('textarea.form__textarea');
        }
        formItem.classList.remove('__error');
        input.classList.remove('__error');
        let hasError = false; 

        if (input.classList.contains('__login')) {
            if (!LoginTest(input)) {
                hasError = true;
            }
        } else if (input.classList.contains('__email')) {
            if (!EmailTest(input)) {
                hasError = true;
            }
        } else if (input.classList.contains('__pass')) {
            if (!PassTest(input)) {
                hasError = true;
            }
        } else if (input.classList.contains('__phone')) {
            if (!PhoneTest(input)) {
                hasError = true;
            }
        } else if (input.classList.contains('__date')) {
            if (!DateTest(input)) {
                hasError = true;
            }
        } else {
            if (input.value == '') {
                hasError = true;
            }
        }

        if (hasError) {
            formItem.classList.add('__error');
            input.classList.add('__error');
            input.value = '';
            err++;
            if (!firstErrorElement) {
                firstErrorElement = formItem; 
            }
        }
    });

    if (err === 0) {
        submitForm(form, form.action);
    } else if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
// младшая валидация формы 
function formValJr(form) {
    let formReq = form.querySelectorAll('.__req');
    let err = 0;
    let firstErrorElement = null;
    
    formReq.forEach((input) => {
        input.classList.remove('__error');
        input.parentElement.classList.remove('__error');
        let hasError = false; 

        if (input.classList.contains('__email')) {
            if (!EmailTest(input)) {
                hasError = true;
            }
        } else {
            if (input.value == '') {
                hasError = true;
            }
        }

        if (hasError) {
            input.classList.add('__error');
            input.parentElement.classList.add('__error');
            input.value = '';
            err++;
            if (!firstErrorElement) {
                // firstErrorElement = formItem; 
            }
        }
    });
    if (err === 0) {
        submitForm(form, form.action);
    } else if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Обработчик формы
function submitForm(formId, url) {
    document.location.reload(); // убрать и написать функцию для post запроса
}


//login validation
function LoginTest(input) {
    return /^[0-9a-zA-Z_-]{3,16}$/.test(input.value);
}
//email validation
function EmailTest(input) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
//password validation
function PassTest(input) {
    return /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}/.test(input.value);
}
//Phone number validation
function PhoneTest(input) {
    return /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(input.value);
}
//Date validation
function DateTest(input) {
    return /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/.test(input.value);
}


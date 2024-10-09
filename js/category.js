'use strict';

const selectedFilters = {
    category: new Set(),
    brand: new Set(),
    type: new Set(),
    city: new Set(),
    price: { min: 0, max: 2000 }
};
document.addEventListener('DOMContentLoaded', function() {
    updateHighlight();
});

// document.querySelectorAll('.list-brand__checkbox').forEach(filterElement => {
//     filterElement.addEventListener('click', (event) => {
//         event.preventDefault();
//         const filterType = event.target.dataset.filterType;
//         const filterValue = event.target.name;

//         if (selectedFilters[filterType].has(filterValue)) {
//             selectedFilters[filterType].delete(filterValue);
//             event.target.classList.remove('__active');
//             removeTag(filterType, filterValue);
//         } else {
//             selectedFilters[filterType].add(filterValue);
//             event.target.classList.add('__active');
//             addTag(filterType, filterValue);
//         }

//         filterProducts();
//     });
// });
document.querySelectorAll('.list-category-data__name').forEach(categoryLink => {
    categoryLink.addEventListener('click', (event) => {
        event.preventDefault();
        // нужно заменить весь этот бред в нормальный dataset
        const category = event.target.textContent;

        if (selectedFilters["category"].has(category)) {
            selectedFilters["category"].delete(category);
            removeTag("category", category);
        } else {
            selectedFilters["category"].add(category);
            addTag("category", category);
        }

        filterProducts();
    });
});

function updatePriceFilter(e) {
    let startValue = 0;
    let endValue = 0;
    if (e.dataset.rangeType === "slider") {
        startValue = parseInt(document.getElementById('slider-range-start').value);
        endValue = parseInt(document.getElementById('slider-range-end').value);
    } else {
        startValue = parseInt(document.getElementById('range-start').value);
        endValue = parseInt(document.getElementById('range-end').value);
    }
    if(startValue > endValue) {
        if (e.dataset.slider === "left") {
            startValue = endValue;
        } else {
            endValue = startValue;
        }
    }
    e.value = endValue;

    document.getElementById('slider-range-start').value = startValue;
    document.getElementById('slider-range-end').value = endValue;
    
    document.getElementById('range-start').value = startValue;
    document.getElementById('range-end').value = endValue;

    selectedFilters.price.min = startValue;
    selectedFilters.price.max = endValue;

    // Update tags and filter products
    updateHighlight();
    updatePriceTags();
    filterProducts();
}

function updateHighlight() {
    const startValue = parseInt(document.getElementById('slider-range-start').value);
    const endValue = parseInt(document.getElementById('slider-range-end').value);
    const min = parseInt(document.getElementById('slider-range-start').min);
    const max = parseInt(document.getElementById('slider-range-start').max);

    const highlight = document.querySelector('.range-filter-track__highlight');
    const startPercent = ((startValue - min) / (max - min)) * 100;
    const endPercent = ((endValue - min) / (max - min)) * 100;

    highlight.style.left = startPercent + '%';
    highlight.style.width = (endPercent - startPercent) + '%';
}

document.querySelector('.link-reset').addEventListener('click', (event) => {
    event.preventDefault();
    selectedFilters.category.clear();
    selectedFilters.brand.clear();
    selectedFilters.type.clear();
    selectedFilters.city.clear();
    selectedFilters.price = { min: 0, max: 2000 };
    document.getElementById('range-start').value = '30';
    document.getElementById('range-end').value = '1800';
    document.getElementById('slider-range-start').value = 30;
    document.getElementById('slider-range-end').value = 1800;
    updateHighlight();

    document.querySelector('.list-tags-result').innerHTML = '';
    // document.querySelectorAll('.list-brand__checkbox').forEach(el => {
    //     el.classList.remove('__active');
    // });
    filterProducts();
});

function updatePriceTags() {
    const tagsContainer = document.querySelector('.list-tags-result');
    const existingPriceTag = tagsContainer.querySelector('[data-filter-type="price"]');

    if (existingPriceTag) {
        tagsContainer.removeChild(existingPriceTag);
    }

    const tagElement = document.createElement('div');
    tagElement.classList.add('list-tags-result__item');
    tagElement.dataset.filterType = 'price';
    tagElement.innerHTML = `
        <span class="list-tags-result__value">Цена: от ${selectedFilters.price.min} до ${selectedFilters.price.max}</span>
        <span class="list-tags-result__actions">
            <svg class="icon icon-reset">
                <use xlink:href="svg/symbols.svg#icon-reset"></use>
            </svg>
        </span>
    `;
    tagElement.querySelector('.icon-reset').addEventListener('click', () => {
        selectedFilters.price = { min: 0, max: 100000 };
        document.getElementById('range-start').value = '30';
        document.getElementById('range-end').value = '1800';
        document.getElementById('slider-range-start').value = 30;
        document.getElementById('slider-range-end').value = 1800;

        document.querySelector('.list-tags-result').removeChild(document.querySelector('.list-tags-result').querySelector('[data-filter-type="price"]'));

        updateHighlight();
        filterProducts();
    });

    document.querySelector('.list-tags-result').appendChild(tagElement);
}

function addTag(filterType, filterValue) {
    const tagElement = document.createElement('div');
    tagElement.classList.add('list-tags-result__item');
    tagElement.dataset.filterType = filterType;
    tagElement.dataset.filterValue = filterValue;
    tagElement.innerHTML = `
        <span class="list-tags-result__value">${filterValue}</span>
        <span class="list-tags-result__actions">
            <svg class="icon icon-reset">
                <use xlink:href="svg/symbols.svg#icon-reset"></use>
            </svg>
        </span>
    `;
    tagElement.querySelector('.list-tags-result__actions').addEventListener('click', () => {
        selectedFilters[filterType].delete(filterValue);
        removeTag(filterType, filterValue);
        filterProducts();
    });

    document.querySelector('.list-tags-result').appendChild(tagElement);
}

function removeTag(filterType, filterValue) {
    const tagsContainer = document.querySelector('.list-tags-result');
    const tags = tagsContainer.querySelectorAll('.list-tags-result__item');

    tags.forEach(tag => {
        if (tag.dataset.filterType === filterType && tag.dataset.filterValue === filterValue) {
            tagsContainer.removeChild(tag);
        }
    });
    // document.querySelectorAll('.list-brand__checkbox').forEach(el => {
    //     if (!selectedFilters[el.dataset.filterType].has(el.name)) el.classList.remove('__active');
    // });
}

function filterProducts() {
    const products = document.querySelectorAll('.list-product__item');
    products.forEach(product => {
        let productCategory = '';
        let productBrand = '';
        let productType = '';
        const productCity = product.querySelector('.list-product__city-name').textContent;
        const productPrice = parseFloat(product.dataset.productPrice);
        const { min, max } = selectedFilters.price;
        const isWithinPriceRange = productPrice >= min && productPrice <= max;
        product.querySelectorAll('.list-product-characteristics__item').forEach(characteristics => {
            if (characteristics.querySelector('.list-product-characteristics__name').innerHTML === 'Каталог:') {
                productCategory = characteristics.querySelector('.list-product-characteristics__value').textContent;
            }
            else if (characteristics.querySelector('.list-product-characteristics__name').innerHTML === 'Бренд:') {
                productBrand = characteristics.querySelector('.list-product-characteristics__value').textContent;
            }
            else if (characteristics.querySelector('.list-product-characteristics__name').innerHTML === 'Тип:') {
                productType = characteristics.querySelector('.list-product-characteristics__value').textContent;
            }
        }); 
        const matchesCategory = selectedFilters.category.size === 0 || selectedFilters.category.has(productCategory);
        const matchesBrand = selectedFilters.brand.size === 0 || selectedFilters.brand.has(productBrand);
        const matchesType = selectedFilters.type.size === 0 || selectedFilters.type.has(productType);
        const matchesCity = selectedFilters.city.size === 0 || selectedFilters.city.has(productCity);


        if (matchesCategory && matchesBrand && matchesType && matchesCity && isWithinPriceRange) {
            product.classList.remove('__hidden');
        } else {
            product.classList.add('__hidden');
        }
    });
}


const head = document.querySelectorAll('.category-filter__head')
const ic = document.querySelectorAll('.category-filter__change .icon')
for (let i = 0; i < head.length; i++) {
    head[i].addEventListener('click', () => {
        const body = head[i].nextElementSibling;
        head[i].classList.toggle('__open');
        body.classList.toggle('__open');
        ic[i].classList.toggle('icon_actives')
    });
    
}


"use strict";

function init() {
    if (document.getElementById('map')) {
        const map = new ymaps.Map('map', {
            center: [59.94480848799107, 30.30846818945307],
            zoom: 12
        });
    
        map.controls.remove('geolocationControl');
        map.controls.remove('searchControl');
        map.controls.remove('trafficControl');
        map.controls.remove('typeSelector');
        map.controls.remove('fullscreenControl');
        map.controls.remove('zoomControl');
        map.controls.remove('rulerControl');
    
        let clusterer = new ymaps.Clusterer({
            gridSize: 64, 
            groupByCoordinates: false,
            hasBalloon: false,
            hasHint: false,
            margin: 10,
            maxZoom: 12,
            minClusterSize: 2,
            showInAlphabeticalOrder: false,
            viewportMargin: 128,
            zoomMargin: 0, 
            clusterDisableClickZoom: false 
        });
    
        let placemarks = [];
        let shopPlacemarkMap = new Map();
        let placemarkShopMap = new Map();
    
        let shopsItems = document.querySelectorAll('.list-shops__item');
        shopsItems.forEach((shop, index) => {
            const shopName = shop.dataset.shopName;
            const shopAddress = shop.dataset.shopAddress;
            const shopLocationLat = parseFloat(shop.dataset.shopLocationLat);
            const shopLocationLon = parseFloat(shop.dataset.shopLocationLon);
            const shopWorkTime = shop.dataset.shopWorkTime;
    
            const placemark = new ymaps.Placemark([shopLocationLat, shopLocationLon], {
                hintContent: shopName,
                balloonContent: `
                    <div class="shop-balloon-item">
                        <div class="shop-balloon-item__name">${shopName}</div>
                        <div class="shop-balloon-item__address">${shopAddress}</div>
                        <div class="shop-balloon-item__time-work">Режим работы: ${shopWorkTime}</div>
                    </div>
                `
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'img/map-marker.svg',
                iconImageSize: [30, 38],
                iconImageOffset: [-10, -38]
            });
    
            placemarks.push(placemark);
            shopPlacemarkMap.set(shop, placemark);
            placemarkShopMap.set(placemark, shop); // Связываем метку с элементом списка
    
            // Обработчик клика на кнопке .list-shops__item
            shop.addEventListener('click', () => {
                // Сбрасываем иконки всех меток и классы у элементов списка
                placemarks.forEach(pm => pm.options.set('iconImageHref', 'img/map-marker.svg'));
                shopsItems.forEach(item => item.classList.remove('list-shops__item--active'));
    
                // Обновляем иконку выбранной метки и добавляем класс к элементу списка
                placemark.options.set('iconImageHref', 'img/map-marker-active.svg');
                shop.classList.add('list-shops__item--active');
    
                // Центрируем и зумируем карту на выбранную метку
                map.setCenter([shopLocationLat, shopLocationLon], 16, {
                    checkZoomRange: true
                });
            });
    
            // Обработчик клика на метке
            placemark.events.add('click', () => {
                // Сбрасываем иконки всех меток и классы у элементов списка
                placemarks.forEach(pm => pm.options.set('iconImageHref', 'img/map-marker.svg'));
                shopsItems.forEach(item => item.classList.remove('list-shops__item--active'));
    
                // Обновляем иконку выбранной метки и добавляем класс к соответствующему элементу списка
                placemark.options.set('iconImageHref', 'img/map-marker-active.svg');
                shop.classList.add('list-shops__item--active');
    
                // Центрируем и зумируем карту на метку
                map.setCenter([shopLocationLat, shopLocationLon], 16, {
                    checkZoomRange: true
                });
            });
    
            map.geoObjects.add(placemark);
        });
    
        clusterer.add(placemarks); // Добавляем метки в кластеризатор
        map.geoObjects.add(clusterer); // Добавляем кластеризатор на карту
    } else if (document.getElementById('singleMarkMap')) {
        const mapMark = document.getElementById('mapMark');
        const markLat = parseFloat(mapMark.dataset.locationLat);
        const markLon = parseFloat(mapMark.dataset.locationLon);
        const map = new ymaps.Map('singleMarkMap', {
            center: [markLat, markLon],
            zoom: 16
        });
    
        map.controls.remove('geolocationControl');
        map.controls.remove('searchControl');
        map.controls.remove('trafficControl');
        map.controls.remove('typeSelector');
        map.controls.remove('fullscreenControl');
        map.controls.remove('zoomControl');
        map.controls.remove('rulerControl');
    
        const placemark = new ymaps.Placemark([markLat, markLon], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-marker-active.svg',
            iconImageSize: [30, 38],
            iconImageOffset: [-10, -38]
        });
        map.geoObjects.add(placemark);
    }

    if (document.getElementById('mapPanelShops')) {
        const map = new ymaps.Map('mapPanelShops', {
            center: [59.94480848799107, 30.30846818945307],
            zoom: 12
        });
    
        map.controls.remove('geolocationControl');
        map.controls.remove('searchControl');
        map.controls.remove('trafficControl');
        map.controls.remove('typeSelector');
        map.controls.remove('fullscreenControl');
        map.controls.remove('zoomControl');
        map.controls.remove('rulerControl');
    
        let clusterer = new ymaps.Clusterer({
            gridSize: 64, 
            groupByCoordinates: false,
            hasBalloon: false,
            hasHint: false,
            margin: 10,
            maxZoom: 12,
            minClusterSize: 2,
            showInAlphabeticalOrder: false,
            viewportMargin: 128,
            zoomMargin: 0, 
            clusterDisableClickZoom: false 
        });
    
        let placemarks = [];
        let shopPlacemarkMap = new Map();
        let placemarkShopMap = new Map();
    
        let shopsItems = document.querySelectorAll('.list-shops__item');
        shopsItems.forEach((shop, index) => {
            const shopName = shop.dataset.shopName;
            const shopAddress = shop.dataset.shopAddress;
            const shopLocationLat = parseFloat(shop.dataset.shopLocationLat);
            const shopLocationLon = parseFloat(shop.dataset.shopLocationLon);
            const shopWorkTime = shop.dataset.shopWorkTime;
    
            const placemark = new ymaps.Placemark([shopLocationLat, shopLocationLon], {
                hintContent: shopName,
                balloonContent: `
                    <div class="shop-balloon-item">
                        <div class="shop-balloon-item__name">${shopName}</div>
                        <div class="shop-balloon-item__address">${shopAddress}</div>
                        <div class="shop-balloon-item__time-work">Режим работы: ${shopWorkTime}</div>
                    </div>
                `
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'img/map-marker.svg',
                iconImageSize: [30, 38],
                iconImageOffset: [-10, -38]
            });
    
            placemarks.push(placemark);
            shopPlacemarkMap.set(shop, placemark);
            placemarkShopMap.set(placemark, shop); // Связываем метку с элементом списка
    
            // Обработчик клика на кнопке .list-shops__item
            shop.addEventListener('click', () => {
                // Сбрасываем иконки всех меток и классы у элементов списка
                placemarks.forEach(pm => pm.options.set('iconImageHref', 'img/map-marker.svg'));
                shopsItems.forEach(item => item.classList.remove('list-shops__item--active'));
    
                // Обновляем иконку выбранной метки и добавляем класс к элементу списка
                placemark.options.set('iconImageHref', 'img/map-marker-active.svg');
                shop.classList.add('list-shops__item--active');
    
                // Центрируем и зумируем карту на выбранную метку
                map.setCenter([shopLocationLat, shopLocationLon], 16, {
                    checkZoomRange: true
                });
            });
    
            // Обработчик клика на метке
            placemark.events.add('click', () => {
                // Сбрасываем иконки всех меток и классы у элементов списка
                placemarks.forEach(pm => pm.options.set('iconImageHref', 'img/map-marker.svg'));
                shopsItems.forEach(item => item.classList.remove('list-shops__item--active'));
    
                // Обновляем иконку выбранной метки и добавляем класс к соответствующему элементу списка
                placemark.options.set('iconImageHref', 'img/map-marker-active.svg');
                shop.classList.add('list-shops__item--active');
    
                // Центрируем и зумируем карту на метку
                map.setCenter([shopLocationLat, shopLocationLon], 16, {
                    checkZoomRange: true
                });
            });
    
            map.geoObjects.add(placemark);
        });
    
        clusterer.add(placemarks); // Добавляем метки в кластеризатор
        map.geoObjects.add(clusterer); // Добавляем кластеризатор на карту
    }
}

ymaps.ready(init);
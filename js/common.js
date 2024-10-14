"use strict";
function updateWidth() {
  const fixedElement = document.querySelector('header.header .container');
  const fixedElement2 = document.querySelector('.wrapper__nav .button-menu');
  const fixedElement3 = document.querySelector('.main__aside--home');
  const parentElement = fixedElement.parentElement;
  // fixedElement.style.width = `${parentRect.width}px`;
  const parentRect = parentElement.getBoundingClientRect();
  fixedElement.style.padding = `0 ${parentRect.left - 80}px 0 ${parentRect.left - 80}px`;
  if (fixedElement2) {
    const parentElement2 = fixedElement2.parentElement;
    const parentRect2 = parentElement2.getBoundingClientRect();
    const navBlock = parentElement2.querySelector('.list-nav-category');
    const navPanelBlock = parentElement2.querySelector('.nav_panel_block');
    fixedElement2.style.width = `${parentRect2.width}px`;
    fixedElement2.style.left = `${parentRect2.left}px`;
    if (navBlock !== null) {
      navBlock.style.width = `${window.innerWidth * 0.2}px`;
      navBlock.style.transform = `translateX(${parentRect2.left + parentRect2.width}px)`;
    }
    navPanelBlock.style.width = `${parentRect2.left + parentRect2.width}px`;;
  } else if (fixedElement3) {
    fixedElement.style.padding = `0 ${parentRect.left}px 0 ${parentRect.left}px`;
    const parentElement3 = fixedElement3.parentElement;
    const fixedElement3Rect2 = fixedElement3.getBoundingClientRect();
    const asidePanelBlock = parentElement3.querySelector('.aside_panel_block');
    asidePanelBlock.style.width = `${fixedElement3Rect2.left + fixedElement3Rect2.width/2}px`;
  }

  let subMenuBoxes = document.querySelectorAll('.wrapper-sub-menu__box');
  subMenuBoxes.forEach(box => {
    if (fixedElement2) {
      if (window.innerWidth >= 1279) {
        const parentElement2 = fixedElement2.parentElement;
        const parentRect2 = parentElement2.getBoundingClientRect();
        const translateValue = parentRect2.left + parentRect2.width + (window.innerWidth * 0.2);
        box.style.transform = `translateX(${translateValue}px)`;
      }
    } else {
      const aside = document.querySelector('.main__aside--home');
      const asideRect = aside.getBoundingClientRect();
      box.style.transform = `translateX(${asideRect.left + asideRect.width}px)`;
    }
  });
  
}
function updateHeight() {
  const header = document.querySelector('header.header .container');
  const headerRect = header.getBoundingClientRect();
  let autoHeightElements = document.querySelectorAll('.__autoHeight');
  autoHeightElements.forEach(el => {
    if (el.classList.contains('header')) {
      el.style.height = `${headerRect.height > 80 ? 64.8 : headerRect.height}px`;
    } else if (el.classList.contains('menu-mobile__body') && window.innerWidth < 1279) {
      const mobileEl1 = document.querySelector('.menu-mobile__city');
      const mobileEl2 = document.querySelector('.menu-mobile__actions');
      const mobileEl1Rect = mobileEl1.getBoundingClientRect();
      const mobileEl2Rect = mobileEl2.getBoundingClientRect();
      // el.style.height = `calc(100vh - ${headerRect.height}px - ${mobileEl1Rect.height}px - ${mobileEl2Rect.height}px - 58px)`;
    } else if (el.classList.contains('header__logo')) {
      // el.style.height = `${headerRect.height}px`;
      // console.log(`${headerRect.height > 80 ? 64.8 : headerRect.height}px`);
    } else {
      el.style.height = `calc(100vh - ${headerRect.height}px)`;
    }
  });
}

// Обновляем размер и положение при загрузке страницы и при изменении размера окна
window.addEventListener('resize', function() {
  updateWidth();
  updateHeight();
});
window.addEventListener('scroll', function() {
  updateWidth();
  updateHeight();
});



document.addEventListener("DOMContentLoaded", function () {
  updateWidth();
  updateHeight();
  var _document$querySelect,
    _this = this,
    _document$querySelect2,
    _document$querySelect3,
    _document$querySelect4,
    _document$querySelect5,
    _document,
    _document43,
    _document$querySelect30,
    _document$querySelect31,
    _document$querySelect32,
    _document$querySelect33,
    _document$querySelect34,
    _document$querySelect35,
    _document$querySelect36,
    _document44,
    _document46,
    _document47,
    _document48,
    _document49,
    _document50,
    _document$querySelect34;
  // input mask
  document.querySelectorAll(".js-form-phone").forEach(function (e) {
    var phoneMask = IMask(e, {
      mask: "+{7}(000)000-00-00"
    });
  });

  // input file
  // (_document$querySelect = document.querySelector(".form__input-file")) === null || _document$querySelect === void 0 || _document$querySelect.addEventListener("change", function () {
  //   document.querySelector(".form__label-text").innerHTML = _this.value;
  // });
  const inputFile = document.querySelector(".form__input-file");
  if (inputFile) {
    inputFile.addEventListener("change", function () {
      const fileName = this.files.length > 0 ? this.files[0].name : '';
      document.querySelector(".form__label-text").innerHTML = fileName;
    });
  }


  var buttonEdit = (_document$querySelect2 = document.querySelector(".form--lk")) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.querySelectorAll(".form__item-edit");
  buttonEdit === null || buttonEdit === void 0 || buttonEdit.forEach(function (button) {
    button.addEventListener("click", function () {
      this.closest(".form__item").querySelector(".form__input").removeAttribute("readonly");
      this.closest(".form__item").querySelector(".form__input").focus();
    });
  });

  // footer column change mobile
  var buttonChange = document.querySelectorAll(".footer__column");
  buttonChange === null || buttonChange === void 0 || buttonChange.forEach(function (button) {
    button.addEventListener("click", function () {
      this.classList.toggle("footer__column-change--active");
      this.closest(".footer__column").querySelector(".footer__column-box").classList.toggle("footer__column-box--active");
    });
  });

  // search mobile .js-search-mobile
  (_document$querySelect3 = document.querySelector(".js-search-mobile")) === null || _document$querySelect3 === void 0 || _document$querySelect3.addEventListener("click", function () {
    document.querySelector(".header__search").classList.add("header__search--active");
    document.querySelector("body").classList.add("body-fixed");
    document.querySelector(".header__blur").classList.add("header__blur--active");
  });

  // close search mobile
  (_document$querySelect4 = document.querySelector(".js-search-close")) === null || _document$querySelect4 === void 0 || _document$querySelect4.addEventListener("click", function () {
    document.querySelector(".header__search").classList.remove("header__search--active");
    document.querySelector("body").classList.remove("body-fixed");
    document.querySelector(".header__blur").classList.remove("header__blur--active");
  });

  (_document$querySelect5 = document.querySelector(".header__blur")) === null || _document$querySelect5 === void 0 || _document$querySelect5.addEventListener("click", function () {
    document.querySelector(".header__blur").classList.remove("header__blur--active");
    document.querySelector(".header__search").classList.remove("header__search--active");
    document.querySelector("body").classList.remove("body-fixed");
  });

  // select
  function fadeOutEffect() {
    var fadeTarget = document.getElementById("target");
    var fadeEffect = setInterval(function () {
      if (!fadeTarget.style.opacity) {
        fadeTarget.style.opacity = 1;
      }
      if (fadeTarget.style.opacity > 0) {
        fadeTarget.style.opacity -= 0.1;
      } else {
        clearInterval(fadeEffect);
      }
    }, 200);
  }
  (_document = document) === null || _document === void 0 || _document.querySelectorAll(".select").forEach(function (select) {
    select === null || select === void 0 || select.querySelector(".select__head").addEventListener("click", function () {
      if (this.classList.contains("open")) {
        this.classList.remove("open");
        this.nextElementSibling.style.display = "none";
        this.closest(".select").nextElementSibling.classList.add("sorting__list-label--active");
      } else {
        document.querySelector(".select").querySelector(".select__head").classList.remove("open");
        // .fadeOutEffect();
        document.querySelector(".select").querySelector(".select__list").style.display = "none";
        this.classList.toggle("open");
        this.nextElementSibling.style.display = "block";
        this.closest(".select").nextElementSibling.classList.toggle("sorting__list-label--active");
      }
    });
  });

  // close select click document
  var selectList = document.querySelector(".select");
  document.addEventListener("click", function (e) {
    var withinBoundaries = e.composedPath().includes(selectList);
    if (!withinBoundaries) {
      var _document$querySelect5;
      if (!selectList) {
        return;
      }
      selectList.querySelector(".select__list").style.display = "none"; // скрываем элемент т к клик был за его пределами
      document.querySelector(".sorting__list-label").classList.remove("sorting__list-label--active");
      (_document$querySelect5 = document.querySelector(".select")) === null || _document$querySelect5 === void 0 || _document$querySelect5.querySelector(".select__head").classList.remove("open");
    }
  });
  document.querySelectorAll(".select").forEach(function (select) {
    select === null || select === void 0 || select.querySelector(".select__list").querySelectorAll(".select__item").forEach(function (item) {
      item.addEventListener("click", function () {
        this.closest(".select").querySelector(".select__head").classList.remove("open");
        this.closest(".select__list").style.display = "none";
        // let textOption = this.innerHTML;
        this.closest(".sorting__list").querySelector(".sorting__list-label").querySelector(".sorting__list-label-text").innerHTML = this.innerHTML;
        this.closest(".select").querySelector(".select__input").value = this.innerHTML;
      });
    });
  });

  // code pin modal
  var pinContainer = document.querySelector(".pin-code");
  pinContainer === null || pinContainer === void 0 || pinContainer.addEventListener("keyup", function (event) {
    // const target = event.srcElement;
    var target = event.target;
    var maxLength = parseInt(target.attributes["maxlength"].value, 10);
    var myLength = target.value.length;
    if (myLength >= maxLength) {
      var next = target;
      while (next = next.nextElementSibling) {
        if (next == null) break;
        if (next.tagName.toLowerCase() == "input") {
          next.focus();
          break;
        }
      }
    }
    if (myLength === 0) {
      var next = target;
      while (next = next.previousElementSibling) {
        if (next == null) break;
        if (next.tagName.toLowerCase() == "input") {
          next.focus();
          break;
        }
      }
    }
  }, false);
  pinContainer === null || pinContainer === void 0 || pinContainer.addEventListener("keydown", function (event) {
    // var target = event.srcElement;
    var target = event.target;
    target.value = "";
  }, false);

  // clone element < 1280
  (function () {
    // Условие для viewport шириной 1279
    var mediaQuery = window.matchMedia("(max-width: 1279px)");
    function handleTabletChange(e) {
      // Проверить, что media query будет true
      if (e.matches) {
        var _document2, _document3, _document$querySelect6, _document4, _document5, _document6, _document$querySelect7, _document7;
        var headerAuth = document.querySelector(".header__authorization").querySelector(".link-user-authorization");
        var menuMobileLk = (_document2 = document) === null || _document2 === void 0 || (_document2 = _document2.querySelector(".menu-mobile")) === null || _document2 === void 0 ? void 0 : _document2.querySelector(".menu-mobile__actions-lk");
        menuMobileLk === null || menuMobileLk === void 0 || menuMobileLk.append(headerAuth);
        var headerFav = document.querySelector(".header__favorites").querySelector(".link-favorites");
        var menuMobileFav = (_document3 = document) === null || _document3 === void 0 || (_document3 = _document3.querySelector(".menu-mobile")) === null || _document3 === void 0 ? void 0 : _document3.querySelector(".menu-mobile__actions-favorite");
        menuMobileFav === null || menuMobileFav === void 0 || menuMobileFav.append(headerFav);
        var listNavCategory = ((_document$querySelect6 = document.querySelector(".aside")) === null || _document$querySelect6 === void 0 ? void 0 : _document$querySelect6.querySelector(".list-nav-category")) || " ";
        var menuMobileBody = (_document4 = document) === null || _document4 === void 0 || (_document4 = _document4.querySelector(".menu-mobile")) === null || _document4 === void 0 ? void 0 : _document4.querySelector(".menu-mobile__body");
        menuMobileBody === null || menuMobileBody === void 0 || menuMobileBody.append(listNavCategory);
        var listNavCategoryInner = ((_document5 = document) === null || _document5 === void 0 || (_document5 = _document5.querySelector(".wrapper__nav")) === null || _document5 === void 0 ? void 0 : _document5.querySelector(".list-nav-category")) || " ";
        var menuMobileBodyInner = (_document6 = document) === null || _document6 === void 0 || (_document6 = _document6.querySelector(".menu-mobile")) === null || _document6 === void 0 ? void 0 : _document6.querySelector(".menu-mobile__body");
        menuMobileBodyInner === null || menuMobileBodyInner === void 0 || menuMobileBodyInner.append(listNavCategoryInner);
        var headerInfo = document.querySelector(".header").querySelector(".header-info");
        headerInfo === null || headerInfo === void 0 || headerInfo.classList.remove("header__info");
        var menuMobileCity = (_document$querySelect7 = document.querySelector(".menu-mobile")) === null || _document$querySelect7 === void 0 ? void 0 : _document$querySelect7.querySelector(".menu-mobile__city");
        menuMobileCity === null || menuMobileCity === void 0 || menuMobileCity.append(headerInfo);
        var wrapperSubMenu = ((_document7 = document) === null || _document7 === void 0 || (_document7 = _document7.querySelector(".main")) === null || _document7 === void 0 ? void 0 : _document7.querySelector(".wrapper-sub-menu")) || " ";
        menuMobileBody === null || menuMobileBody === void 0 || menuMobileBody.append(wrapperSubMenu);
      } else {
        var _document$querySelect8, _document8, _document$querySelect9, _document$querySelect10, _document9, _document10, _document11, _document12;
        (_document$querySelect8 = document.querySelector(".menu-mobile")) === null || _document$querySelect8 === void 0 || _document$querySelect8.classList.remove("menu-mobile--active");
        document.querySelector("body").classList.remove("body-fixed");
        var menuAuth = ((_document8 = document) === null || _document8 === void 0 || (_document8 = _document8.querySelector(".menu-mobile")) === null || _document8 === void 0 ? void 0 : _document8.querySelector(".link-user-authorization")) || " ";
        var _headerAuth = (_document$querySelect9 = document.querySelector(".header")) === null || _document$querySelect9 === void 0 ? void 0 : _document$querySelect9.querySelector(".header__authorization");
        _headerAuth === null || _headerAuth === void 0 || _headerAuth.append(menuAuth);
        var menuFav = document.querySelector(".menu-mobile").querySelector(".link-favorites") || " ";
        var _headerFav = ((_document$querySelect10 = document.querySelector(".header")) === null || _document$querySelect10 === void 0 ? void 0 : _document$querySelect10.querySelector(".header__favorites")) || " ";
        _headerFav === null || _headerFav === void 0 || _headerFav.append(menuFav);
        var menuMobileInfo = ((_document9 = document) === null || _document9 === void 0 || (_document9 = _document9.querySelector(".menu-mobile")) === null || _document9 === void 0 ? void 0 : _document9.querySelector(".header-info")) || " ";

        // menuMobileInfo?.classList.add("header__info");
        var headerLogo = document.querySelector(".header").querySelector(".logo");
        headerLogo.after(menuMobileInfo);
        var mobileNavCategory = ((_document10 = document) === null || _document10 === void 0 || (_document10 = _document10.querySelector(".menu-mobile")) === null || _document10 === void 0 ? void 0 : _document10.querySelector(".list-nav-category")) || " ";
        var aside = document.querySelector(".aside");
        aside === null || aside === void 0 || aside.append(mobileNavCategory);
        var wrapperNav = document.querySelector(".wrapper__nav");
        wrapperNav === null || wrapperNav === void 0 || wrapperNav.append(mobileNavCategory);
        var menuMobileSubMenu = ((_document11 = document) === null || _document11 === void 0 || (_document11 = _document11.querySelector(".menu-mobile")) === null || _document11 === void 0 ? void 0 : _document11.querySelector(".wrapper-sub-menu")) || " ";
        var mainBody = (_document12 = document) === null || _document12 === void 0 ? void 0 : _document12.querySelector(".main");
        mainBody === null || mainBody === void 0 || mainBody.prepend(menuMobileSubMenu);
      }
    }
    window.onload = function () {
      handleTabletChange
    };
    // Слушать события
    mediaQuery.addListener(handleTabletChange);

    // Начальная проверка
    handleTabletChange(mediaQuery);
  })();

  // clone element < 1024
  (function () {
    // Условие для viewport шириной 1023
    var mediaQuery = window.matchMedia("(max-width: 1023px)");
    function handleTabletChange(e) {
      // Проверить, что media query будет true
      if (e.matches) {
        var _document$querySelect11, _document$querySelect12, _document$querySelect13, _document$querySelect14, _document$querySelect15, _document$querySelect16, _document13, _document14, _document$querySelect17, _document$querySelect18, _document$querySelect19, _document15, _document16;
        var basketHead = ((_document$querySelect11 = document.querySelector(".basket-order")) === null || _document$querySelect11 === void 0 ? void 0 : _document$querySelect11.querySelector(".basket-order__head")) || " ";
        var placingOrder = document.querySelector(".placing-order");
        placingOrder === null || placingOrder === void 0 || placingOrder.before(basketHead);
        var listBasketOrder = ((_document$querySelect12 = document.querySelector(".basket-order")) === null || _document$querySelect12 === void 0 ? void 0 : _document$querySelect12.querySelector(".list-basket-order")) || " ";
        var contentBasketHead = (_document$querySelect13 = document.querySelector(".content")) === null || _document$querySelect13 === void 0 ? void 0 : _document$querySelect13.querySelector(".basket-order__head");
        contentBasketHead === null || contentBasketHead === void 0 || contentBasketHead.after(listBasketOrder);
        var basketOrderBonus = ((_document$querySelect14 = document.querySelector(".basket-order")) === null || _document$querySelect14 === void 0 ? void 0 : _document$querySelect14.querySelector(".basket-order-bonus")) || " ";
        placingOrder === null || placingOrder === void 0 || placingOrder.after(basketOrderBonus);
        var basketOrderResult = ((_document$querySelect15 = document.querySelector(".basket-order")) === null || _document$querySelect15 === void 0 ? void 0 : _document$querySelect15.querySelector(".basket-order-result")) || " ";
        var contentBasketOrderBonus = (_document$querySelect16 = document.querySelector(".content")) === null || _document$querySelect16 === void 0 ? void 0 : _document$querySelect16.querySelector(".basket-order-bonus");
        contentBasketOrderBonus === null || contentBasketOrderBonus === void 0 || contentBasketOrderBonus.after(basketOrderResult);
        var blockFilter = ((_document13 = document) === null || _document13 === void 0 || (_document13 = _document13.querySelector(".main__aside-content")) === null || _document13 === void 0 ? void 0 : _document13.querySelector(".block-filter")) || " ";
        var panelFilteContent = document.querySelector(".panel-filter__content");
        panelFilteContent === null || panelFilteContent === void 0 || panelFilteContent.append(blockFilter);
        var mapFrame = ((_document14 = document) === null || _document14 === void 0 || (_document14 = _document14.querySelector(".panel-shops__frame")) === null || _document14 === void 0 ? void 0 : _document14.querySelector(".map")) || " ";
        var panelTabContentMap = (_document$querySelect17 = document.querySelector(".panel-tabs-content")) === null || _document$querySelect17 === void 0 ? void 0 : _document$querySelect17.querySelector(".panel-tabs-content__box--map");
        panelTabContentMap === null || panelTabContentMap === void 0 || panelTabContentMap.append(mapFrame);
        var boxListShops = ((_document$querySelect18 = document.querySelector(".box-shops__list")) === null || _document$querySelect18 === void 0 ? void 0 : _document$querySelect18.querySelector(".list-shops")) || " ";
        var panelTabContentList = (_document$querySelect19 = document.querySelector(".panel-tabs-content")) === null || _document$querySelect19 === void 0 ? void 0 : _document$querySelect19.querySelector(".panel-tabs-content__box--list");
        panelTabContentList === null || panelTabContentList === void 0 || panelTabContentList.append(boxListShops);
        var basketCard = ((_document15 = document) === null || _document15 === void 0 || (_document15 = _document15.querySelector(".main__aside-content")) === null || _document15 === void 0 ? void 0 : _document15.querySelector(".basket-card")) || " ";
        var cardData = (_document16 = document) === null || _document16 === void 0 || (_document16 = _document16.querySelector(".block-card")) === null || _document16 === void 0 ? void 0 : _document16.querySelector(".card-data");
        cardData === null || cardData === void 0 || cardData.after(basketCard);
      } else {
        var _document$querySelect20, _document$querySelect21, _document$querySelect22, _document$querySelect23, _document$querySelect24, _document$querySelect25, _document$querySelect26, _document$querySelect27, _document$querySelect28, _document$querySelect29, _document17, _document18, _document19, _document20, _document21, _document22;
        (_document$querySelect20 = document.querySelector(".panel-filter")) === null || _document$querySelect20 === void 0 || _document$querySelect20.classList.remove("panel-filter--active");
        (_document$querySelect21 = document.querySelector(".wrapper-panel-shops")) === null || _document$querySelect21 === void 0 || _document$querySelect21.classList.remove("wrapper-panel-shops--active");
        var _contentBasketHead = ((_document$querySelect22 = document.querySelector(".content")) === null || _document$querySelect22 === void 0 ? void 0 : _document$querySelect22.querySelector(".basket-order__head")) || " ";
        var basketOrder = document.querySelector(".basket-order");
        basketOrder === null || basketOrder === void 0 || basketOrder.append(_contentBasketHead);
        var contentListBasketOrder = ((_document$querySelect23 = document.querySelector(".content")) === null || _document$querySelect23 === void 0 ? void 0 : _document$querySelect23.querySelector(".list-basket-order")) || " ";
        var _basketHead = (_document$querySelect24 = document.querySelector(".basket-order")) === null || _document$querySelect24 === void 0 ? void 0 : _document$querySelect24.querySelector(".basket-order__head");
        _basketHead === null || _basketHead === void 0 || _basketHead.after(contentListBasketOrder);
        var _contentBasketOrderBonus = ((_document$querySelect25 = document.querySelector(".content")) === null || _document$querySelect25 === void 0 ? void 0 : _document$querySelect25.querySelector(".basket-order-bonus")) || " ";
        var basketOrderList = (_document$querySelect26 = document.querySelector(".basket-order")) === null || _document$querySelect26 === void 0 ? void 0 : _document$querySelect26.querySelector(".list-basket-order");
        basketOrderList === null || basketOrderList === void 0 || basketOrderList.after(_contentBasketOrderBonus);
        var contentBasketOrderResult = ((_document$querySelect27 = document.querySelector(".content")) === null || _document$querySelect27 === void 0 ? void 0 : _document$querySelect27.querySelector(".basket-order-result")) || " ";
        var _basketOrderBonus = (_document$querySelect28 = document.querySelector(".basket-order")) === null || _document$querySelect28 === void 0 ? void 0 : _document$querySelect28.querySelector(".basket-order-bonus");
        _basketOrderBonus === null || _basketOrderBonus === void 0 || _basketOrderBonus.after(contentBasketOrderResult);
        var blockFilterPanel = ((_document$querySelect29 = document.querySelector(".panel-filter__content")) === null || _document$querySelect29 === void 0 ? void 0 : _document$querySelect29.querySelector(".block-filter")) || " ";
        var mainAsideContent = (_document17 = document) === null || _document17 === void 0 ? void 0 : _document17.querySelector(".main__aside-content");
        mainAsideContent === null || mainAsideContent === void 0 || mainAsideContent.append(blockFilterPanel);
        var mapTabsContent = ((_document18 = document) === null || _document18 === void 0 || (_document18 = _document18.querySelector(".panel-tabs-content")) === null || _document18 === void 0 ? void 0 : _document18.querySelector(".map")) || " ";
        var _mapFrame = (_document19 = document) === null || _document19 === void 0 || (_document19 = _document19.querySelector(".panel-shops")) === null || _document19 === void 0 ? void 0 : _document19.querySelector(".panel-shops__frame");
        _mapFrame === null || _mapFrame === void 0 || _mapFrame.append(mapTabsContent);
        var listShopsContent = ((_document20 = document) === null || _document20 === void 0 || (_document20 = _document20.querySelector(".panel-tabs-content")) === null || _document20 === void 0 ? void 0 : _document20.querySelector(".list-shops")) || " ";
        var listBoxShops = (_document21 = document) === null || _document21 === void 0 || (_document21 = _document21.querySelector(".panel-shops")) === null || _document21 === void 0 ? void 0 : _document21.querySelector(".box-shops__list");
        listBoxShops === null || listBoxShops === void 0 || listBoxShops.append(listShopsContent);
        var basketCardContent = ((_document22 = document) === null || _document22 === void 0 || (_document22 = _document22.querySelector(".block-card__box")) === null || _document22 === void 0 ? void 0 : _document22.querySelector(".basket-card")) || " ";
        var mainAsideContentBasket = document.querySelector(".main__aside-content");
        mainAsideContentBasket === null || mainAsideContentBasket === void 0 || mainAsideContentBasket.append(basketCardContent);
      }
    }
    window.onload = function () {
        handleTabletChange
    };
    // Слушать события
    mediaQuery.addListener(handleTabletChange);

    // Начальная проверка
    handleTabletChange(mediaQuery);
  })();

  // clone element < 768
  (function () {
    // Условие для viewport шириной 767
    var mediaQuery = window.matchMedia("(max-width: 767px)");
    function handleTabletChange(e) {
      // Проверить, что media query будет true
      if (e.matches) {
        var _document23, _document24, _document25, _document26, _document27, _document28, _document29, _document30, _document31, _document32;
        var tabContent_0 = (_document23 = document) === null || _document23 === void 0 || (_document23 = _document23.querySelector('.card-tabs-content__box[data-id = "0"]')) === null || _document23 === void 0 ? void 0 : _document23.querySelector(".card-tabs-content__box-wrap");
        var tabNavBody_0 = (_document24 = document) === null || _document24 === void 0 || (_document24 = _document24.querySelector('.card-tabs-nav__item[data-target-id = "0"]')) === null || _document24 === void 0 ? void 0 : _document24.querySelector(".card-tabs-nav__body");
        tabNavBody_0 === null || tabNavBody_0 === void 0 || tabNavBody_0.append(tabContent_0);
        var tabContent_1 = (_document25 = document) === null || _document25 === void 0 || (_document25 = _document25.querySelector('.card-tabs-content__box[data-id = "1"]')) === null || _document25 === void 0 ? void 0 : _document25.querySelector(".card-tabs-content__box-wrap");
        var tabNavBody_1 = (_document26 = document) === null || _document26 === void 0 || (_document26 = _document26.querySelector('.card-tabs-nav__item[data-target-id = "1"]')) === null || _document26 === void 0 ? void 0 : _document26.querySelector(".card-tabs-nav__body");
        tabNavBody_1 === null || tabNavBody_1 === void 0 || tabNavBody_1.append(tabContent_1);
        var tabContent_2 = (_document27 = document) === null || _document27 === void 0 || (_document27 = _document27.querySelector('.card-tabs-content__box[data-id = "2"]')) === null || _document27 === void 0 ? void 0 : _document27.querySelector(".card-tabs-content__box-wrap");
        var tabNavBody_2 = (_document28 = document) === null || _document28 === void 0 || (_document28 = _document28.querySelector('.card-tabs-nav__item[data-target-id = "2"]')) === null || _document28 === void 0 ? void 0 : _document28.querySelector(".card-tabs-nav__body");
        tabNavBody_2 === null || tabNavBody_2 === void 0 || tabNavBody_2.append(tabContent_2);
        var tabContent_3 = (_document29 = document) === null || _document29 === void 0 || (_document29 = _document29.querySelector('.card-tabs-content__box[data-id = "3"]')) === null || _document29 === void 0 ? void 0 : _document29.querySelector(".card-tabs-content__box-wrap");
        var tabNavBody_3 = (_document30 = document) === null || _document30 === void 0 || (_document30 = _document30.querySelector('.card-tabs-nav__item[data-target-id = "3"]')) === null || _document30 === void 0 ? void 0 : _document30.querySelector(".card-tabs-nav__body");
        tabNavBody_3 === null || tabNavBody_3 === void 0 || tabNavBody_3.append(tabContent_3);
        var tabContent_4 = (_document31 = document) === null || _document31 === void 0 || (_document31 = _document31.querySelector('.card-tabs-content__box[data-id = "4"]')) === null || _document31 === void 0 ? void 0 : _document31.querySelector(".card-tabs-content__box-wrap");
        var tabNavBody_4 = (_document32 = document) === null || _document32 === void 0 || (_document32 = _document32.querySelector('.card-tabs-nav__item[data-target-id = "4"]')) === null || _document32 === void 0 ? void 0 : _document32.querySelector(".card-tabs-nav__body");
        tabNavBody_4 === null || tabNavBody_4 === void 0 || tabNavBody_4.append(tabContent_4);
      } else {
        var _document33, _document34, _document35, _document36, _document37, _document38, _document39, _document40, _document41, _document42;
        var tabContentNav_0 = ((_document33 = document) === null || _document33 === void 0 || (_document33 = _document33.querySelector('.card-tabs-nav__item[data-target-id = "0"]')) === null || _document33 === void 0 ? void 0 : _document33.querySelector(".card-tabs-content__box-wrap")) || " ";
        var _tabNavBody_ = (_document34 = document) === null || _document34 === void 0 ? void 0 : _document34.querySelector('.card-tabs-content__box[data-id = "0"]');
        _tabNavBody_ === null || _tabNavBody_ === void 0 || _tabNavBody_.append(tabContentNav_0);
        var _tabContent_ = ((_document35 = document) === null || _document35 === void 0 || (_document35 = _document35.querySelector('.card-tabs-nav__item[data-target-id = "1"]')) === null || _document35 === void 0 ? void 0 : _document35.querySelector(".card-tabs-content__box-wrap")) || " ";
        var _tabNavBody_2 = (_document36 = document) === null || _document36 === void 0 ? void 0 : _document36.querySelector('.card-tabs-content__box[data-id = "1"]');
        _tabNavBody_2 === null || _tabNavBody_2 === void 0 || _tabNavBody_2.append(_tabContent_);
        var _tabContent_2 = ((_document37 = document) === null || _document37 === void 0 || (_document37 = _document37.querySelector('.card-tabs-nav__item[data-target-id = "2"]')) === null || _document37 === void 0 ? void 0 : _document37.querySelector(".card-tabs-content__box-wrap")) || " ";
        var _tabNavBody_3 = (_document38 = document) === null || _document38 === void 0 ? void 0 : _document38.querySelector('.card-tabs-content__box[data-id = "2"]');
        _tabNavBody_3 === null || _tabNavBody_3 === void 0 || _tabNavBody_3.append(_tabContent_2);
        var _tabContent_3 = ((_document39 = document) === null || _document39 === void 0 || (_document39 = _document39.querySelector('.card-tabs-nav__item[data-target-id = "3"]')) === null || _document39 === void 0 ? void 0 : _document39.querySelector(".card-tabs-content__box-wrap")) || " ";
        var _tabNavBody_4 = (_document40 = document) === null || _document40 === void 0 ? void 0 : _document40.querySelector('.card-tabs-content__box[data-id = "3"]');
        _tabNavBody_4 === null || _tabNavBody_4 === void 0 || _tabNavBody_4.append(_tabContent_3);
        var _tabContent_4 = ((_document41 = document) === null || _document41 === void 0 || (_document41 = _document41.querySelector('.card-tabs-nav__item[data-target-id = "4"]')) === null || _document41 === void 0 ? void 0 : _document41.querySelector(".card-tabs-content__box-wrap")) || " ";
        var _tabNavBody_5 = (_document42 = document) === null || _document42 === void 0 ? void 0 : _document42.querySelector('.card-tabs-content__box[data-id = "4"]');
        _tabNavBody_5 === null || _tabNavBody_5 === void 0 || _tabNavBody_5.append(_tabContent_4);
      }
    }
    window.onload = function () {
      handleTabletChange
    };
    // Слушать события
    mediaQuery.addListener(handleTabletChange);

    // Начальная проверка
    handleTabletChange(mediaQuery);
  })();

  // menu mobile
  var buttonMenu = document.querySelector(".js-mobile-button");
  let buttonDMenu = document.querySelector(".js_menu")
  var blockMenu = document.querySelector(".menu-mobile")
  var body = document.querySelector("body")
  var buttonMenuClose = document.querySelector(".js-menu-close");
  var openMenu = function openMenu() {
    blockMenu.classList.add("menu-mobile--active");
  };
  var closeMenu = function closeMenu() {
    blockMenu.classList.remove("menu-mobile--active");
  };
  buttonMenu.addEventListener("click", function () {
    openMenu();
    this.classList.add("mobile-button--close");
    this.nextElementSibling.classList.remove("mobile-button--close");
    document.querySelector("body").classList.add("body-fixed");
  });

  buttonMenuClose === null || buttonMenuClose === void 0 || buttonMenuClose.addEventListener("click", function () {
    closeMenu();
    this.classList.add("mobile-button--close");
    this.previousElementSibling.classList.remove("mobile-button--close");
    document.querySelector("body").classList.remove("body-fixed");
  });

  // // menu inner
  // (_document43 = document) === null || _document43 === void 0 || (_document43 = _document43.querySelector(".button-menu")) === null || _document43 === void 0 || _document43.addEventListener("click", function (e) {
  //   e.preventDefault();
  //   this === null || this === void 0 || this.classList.toggle("button-menu--active");
  //   this === null || this === void 0 || this.nextElementSibling.classList.toggle("list-nav-category--active");
  // });

  // filter
  (_document$querySelect30 = document.querySelector(".js-filter")) === null || _document$querySelect30 === void 0 || _document$querySelect30.addEventListener("click", function () {
    document.querySelector(".panel-filter").classList.add("panel-filter--active");
  });

  // filter close
  (_document$querySelect31 = document.querySelector(".js-close-panel-filter")) === null || _document$querySelect31 === void 0 || _document$querySelect31.addEventListener("click", function () {
    document.querySelector(".panel-filter").classList.remove("panel-filter--active");
  });

  (_document$querySelect34 = document.querySelector(".filter_btn")) === null || _document$querySelect34 === void 0 || _document$querySelect34.addEventListener("click", function () {
    document.querySelector(".panel-filter").classList.remove("panel-filter--active");
  });

  // card tabs
  var showTabCharact = function showTabCharact(elTabBtn) {
    var elTab = elTabBtn.closest(".card-tabs");
    if (elTabBtn.classList.contains("card-tabs-nav__item--active")) {
      return;
    }
    var targetId = elTabBtn.dataset.targetId;
    var elTabPane = elTab.querySelector('.card-tabs-content__box[data-id="'.concat(targetId, '"]'));
    if (elTabPane) {
      var elTabBtnActive = elTab.querySelector(".card-tabs-nav__item--active");
      elTabBtnActive.classList.remove("card-tabs-nav__item--active");
      var elTabPaneShow = elTab.querySelector(".card-tabs-content__box--active");
      elTabPaneShow.classList.remove("card-tabs-content__box--active");
      elTabBtn.classList.add("card-tabs-nav__item--active");
      elTabPane.classList.add("card-tabs-content__box--active");
    }
  };
  document.addEventListener("click", function (e) {
    if (e.target && !e.target.closest(".card-tabs-nav__item")) {
      return;
    }
    var elTabBtn = e.target.closest(".card-tabs-nav__item");
    showTabCharact(elTabBtn);
  });

  // tabs panel shops
  var showTabPanel = function showTabPanel(elTabBtn) {
    var elTab = elTabBtn.closest(".panel-shops");
    if (elTabBtn.classList.contains("panel-tabs-nav__item--active")) {
      return;
    }
    var targetId = elTabBtn.dataset.targetId;
    var elTabPane = elTab.querySelector('.panel-tabs-content__box[data-id="'.concat(targetId, '"]'));
    if (elTabPane) {
      var elTabBtnActive = elTab.querySelector(".panel-tabs-nav__item--active");
      elTabBtnActive.classList.remove("panel-tabs-nav__item--active");
      var elTabPaneShow = elTab.querySelector(".panel-tabs-content__box--active");
      elTabPaneShow.classList.remove("panel-tabs-content__box--active");
      elTabBtn.classList.add("panel-tabs-nav__item--active");
      elTabPane.classList.add("panel-tabs-content__box--active");
    }
  };
  document.addEventListener("click", function (e) {
    if (e.target && !e.target.closest(".panel-tabs-nav__item")) {
      return;
    }
    var elTabBtn = e.target.closest(".panel-tabs-nav__item");
    showTabPanel(elTabBtn);
  });

  // open panel shops
  (_document$querySelect32 = document.querySelector(".js-open-panel-shops")) === null || _document$querySelect32 === void 0 || _document$querySelect32.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".wrapper-panel-shops").classList.add("wrapper-panel-shops--active");
  });
  // close panel shops
  (_document$querySelect33 = document.querySelector(".js-close-panel-shops")) === null || _document$querySelect33 === void 0 || _document$querySelect33.addEventListener("click", function () {
    document.querySelector(".wrapper-panel-shops").classList.remove("wrapper-panel-shops--active");
  });

  (_document$querySelect35 = document.querySelector(".panel_close")) === null || _document$querySelect35 === void 0 || _document$querySelect35.addEventListener("click", function () {
    document.querySelector(".wrapper-panel-shops").classList.remove("wrapper-panel-shops--active");
  });

  (_document$querySelect36 = document.querySelector(".js_open_panel_shops")) === null || _document$querySelect36 === void 0 || _document$querySelect36.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".wrapper-panel-shops").classList.add("wrapper-panel-shops--active");
  });

  // basket panel
  (_document44 = document) === null || _document44 === void 0 || (_document44 = _document44.querySelector(".js-basket-actions")) === null || _document44 === void 0 || _document44.addEventListener("click", function (e) {
    var _document45;
    e.preventDefault();
    (_document45 = document) === null || _document45 === void 0 || (_document45 = _document45.querySelector(".wrapper-panel-basket")) === null || _document45 === void 0 || _document45.classList.add("wrapper-panel-basket--active");
    document.querySelector("body").classList.add("body-fixed");
  });

  // close basket panel
  (_document46 = document) === null || _document46 === void 0 || (_document46 = _document46.querySelector(".js-close-panel-basket")) === null || _document46 === void 0 || _document46.addEventListener("click", function () {
    document.querySelector(".wrapper-panel-basket").classList.remove("wrapper-panel-basket--active");
    document.querySelector("body").classList.remove("body-fixed");
  });

  (_document50 = document) === null || _document50 === void 0 || (_document50 = _document50.querySelector(".panel_close")) === null || _document50 === void 0 || _document50.addEventListener("click", function () {
    document.querySelector(".wrapper-panel-basket").classList.remove("wrapper-panel-basket--active");
    document.querySelector("body").classList.remove("body-fixed");
  });

  // calc
  (_document47 = document) === null || _document47 === void 0 || _document47.querySelectorAll(".js-calc-minus").forEach(function (item) {
    item === null || item === void 0 || item.addEventListener("click", function () {
      var $input = this.nextElementSibling;
      var count = parseInt($input.value) - 1;
      count = count < 1 ? 1 : count;
      if (count === 1) {
        this.classList.add("list-basket-calc__item--disabled");
      } else {
        this.classList.remove("list-basket-calc__item--disabled");
      }
      $input.value = count;
      $input.dispatchEvent(new Event("change", {
        bubbles: true
      }));
      return false;
    });
  });
  (_document48 = document) === null || _document48 === void 0 || _document48.querySelectorAll(".js-calc-plus").forEach(function (item) {
    item === null || item === void 0 || item.addEventListener("click", function () {
      var $input = this.previousElementSibling;
      var count = parseInt($input.value) + 1;
      if (count > 1) {
        this.previousElementSibling.previousElementSibling.classList.remove("list-basket-calc__item--disabled");
      }
      $input.value = count;
      $input.dispatchEvent(new Event("change", {
        bubbles: true
      }));
      return false;
    });
  });

  // tabs change mobile
  var tabsChangeButton = (_document49 = document) === null || _document49 === void 0 ? void 0 : _document49.querySelectorAll(".card-tabs-nav__head");
  tabsChangeButton === null || tabsChangeButton === void 0 || tabsChangeButton.forEach(function (button) {
    button.addEventListener("click", function () {
      this.classList.toggle("card-tabs-nav__change--active");
      this.closest(".card-tabs-nav__item").querySelector(".card-tabs-nav__body").classList.toggle("card-tabs-nav__body--active");
    });
  });

  const addFavorites = document.querySelector('.basket-card__actions')

  if(addFavorites){
    addFavorites.addEventListener('click', () =>{
      addFavorites.classList.toggle('basket-card__actions--active')
    })
  }

  const showMore = document.querySelectorAll('.list-brand-add');
  const showMoreContent = document.querySelectorAll('.list-brand');

  showMore.forEach((item, i) => {
    item.addEventListener('click', () => {
      if(item.textContent == 'Показать ещё'){
        item.textContent = 'Cкрыть'
        showMoreContent[i].classList.add('list-brand_open')
      } else{
        item.textContent = 'Показать ещё'
        showMoreContent[i].classList.remove('list-brand_open')
      }
    })
  })

  const cardTab = document.querySelectorAll('.main--card .card-tabs-content__box')
  const cardTabContent = document.querySelectorAll('.main--card .card-tabs-nav__item')
  const cardTabSelect = document.querySelector('.main--card .basket-delivery__link')

    if(cardTab){
      cardTabSelect.addEventListener('click', () => {
        cardTab.forEach((item, i) => {
          item.classList.remove('card-tabs-content__box--active')
          cardTabContent[i].classList.remove('card-tabs-nav__item--active')
          console.log(cardTabContent[i].classList.remove('card-tabs-nav__item--active'))
        })
        cardTab[3].classList.add('card-tabs-content__box--active')
        cardTabContent[3].classList.add('card-tabs-nav__item--active')
        console.log(cardTabContent[3].classList.add('card-tabs-nav__item--active'))
      })
    }


});


// Получаем элементы списка
let listNavCategoryItems = document.querySelectorAll(".wrapper__nav .list-nav-category__item, .main__aside .list-nav-category__item");

// Функция для добавления активного класса
function activateSubMenu(valueDataId) {
  let subMenu = document.querySelector(".wrapper-sub-menu");
  subMenu.classList.add("wrapper-sub-menu--active");

  let subMenuBoxes = subMenu.querySelectorAll('.wrapper-sub-menu__box');
  let targetBox = null;

  subMenuBoxes.forEach(el => {
    if (el.dataset.id == valueDataId) {
      targetBox = el;
    } else {
      el.classList.remove("wrapper-sub-menu__box--active");
    }
  });

  if (targetBox) {
    if (targetBox.classList.contains("wrapper-sub-menu__box--active") && window.innerWidth <= 1279) {
      deactivateSubMenu(); // If already active, close it
    } else {
      targetBox.classList.add("wrapper-sub-menu__box--active"); // Otherwise, activate it
    }
  }
}

// Добавляем события для элементов списка
listNavCategoryItems.forEach(function (item) {
  let valueDataId = item.dataset.targetId;
  var wrapperMenu = document.querySelector(".wrapper-sub-menu");  
  
  item.addEventListener("click", function () {
    if (valueDataId === valueDataId && wrapperMenu.classList.contains("wrapper-sub-menu--active")) {
      deactivateSubMenu(valueDataId);
    } else {
      activateSubMenu(valueDataId);
    }
  });

  if (window.innerWidth >= 1279) {
    item.addEventListener("mouseenter", function () {
        activateSubMenu(valueDataId);
    });
  }
});

// menu sub back
document.querySelectorAll(".sub-category__back").forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    this.closest(".wrapper-sub-menu").classList.remove("wrapper-sub-menu--active");
    this.closest(".wrapper-sub-menu__box").classList.remove("wrapper-sub-menu__box--active");
  });
});

function deactivateSubMenu() {
  let subMenu = document.querySelector(".wrapper-sub-menu");
  subMenu.classList.remove("wrapper-sub-menu--active");
  let subMenuBox = subMenu.querySelectorAll('.wrapper-sub-menu__box');
  subMenuBox.forEach(el => {
    el.classList.remove("wrapper-sub-menu__box--active");
  });
}
const black_blur = document.querySelector(".black_blur")
const modal_age_small = document.querySelector(".modal--age_small")
const modal_age = document.querySelector(".modal--age")
const body = document.querySelector("body")

function closeSubMenu() {
  deactivateSubMenu();
    let menu = document.querySelector('.list-nav-category');
    let burgerBtn = document.querySelector('.button-menu');
    burgerBtn.classList.toggle("button-menu--active");
    menu.classList.toggle("list-nav-category--active");
}

function openOld(){
  modal_age.style.display = "block"
  black_blur.classList.add("black_blur_vis")
  body.style.overflow = "hidden"
}

function closeOld(){
  modal_age.style.display = "none"
  black_blur.classList.remove("black_blur_vis")
  body.style.overflow = "visible"
}

function openSmall(){
  modal_age.style.display = "none"
  modal_age_small.style.display = "block"
  body.style.overflow = "hidden"
}


  // document.addEventListener("click", function () {
  //   const element = document.querySelector('.carousel__button');
  //   if (element) {
  //     const beforeStyles = window.getComputedStyle(element, '::before');
  //     const content = beforeStyles.getPropertyValue('content').replace(/["']/g, "") == "none" ? "":beforeStyles.getPropertyValue('content').replace(/["']/g, ""); // Удаляем кавычки
  //     const contentElement = document.createElement('div');
  //     contentElement.classList.add("contentElement")
  //     contentElement.textContent = content;
  //     const body = document.querySelector("body")
  //     element.appendChild(contentElement);
  //       // Например, получаем значение свойства content
  //       contentElement.addEventListener("click", function (){
  //         black_blur.classList.add("black_blur_vis")
  //         body.style.overflow = "hidden"
  //         modal_age_small.classList.add("modal_age_small")
  //       })
  //   } 
  // })

  window.addEventListener('scroll', function() {
    let main__aside = document.querySelector(".main__aside")
    let main__aside_content = document.querySelector(".main__aside-content")
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (main__aside !== null) {
      main__aside.style.top = scrollTop >= 640? "143px" : "143px"
    }
    if (main__aside_content) {
      main__aside_content.style.top = scrollTop >= 95? "80px" : "63px"
    }
  })

  
"use strict";

!function () {
  // 作品集的轮播
  var view = View('#siteWorks');
  var controller = Controller({
    swiper: null,
    swiperOptions: {
      direction: "horizontal",
      // 垂直切换选项
      loop: true,
      // 循环模式选项
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicMainBullets: 1,
        renderBullet: function renderBullet(index, className) {
          return '<span class="' + className + '"><image src="./dist/img/portfolio-' + (index + 1) + '.jpg"></span>';
        }
      }
    },
    bindEvents: function bindEvents() {
      var _this = this;

      var barview = this.view.querySelector('#portfolioBar');

      this.view.querySelector('#portfolio1').onclick = function (e) {
        _this.setState(barview, 1);
      };

      this.view.querySelector('#portfolio2').onclick = function (e) {
        _this.setState(barview, 2);
      };

      this.view.querySelector('#portfolio3').onclick = function (e) {
        _this.setState(barview, 3);
      };

      this.initSwiper();
    },
    setState: function setState(elem, stateNumber) {
      elem.className = "bar state-" + stateNumber;
    },
    initSwiper: function initSwiper() {
      this.swiper = new Swiper(view.querySelector('.swiper-container'), this.swiperOptions);
    }
  });

  try {
    controller.init(view);
  } catch (error) {
    window.reloadScriptObj.add('./dist/js/portfolio-switch.js');
  }
}.call();
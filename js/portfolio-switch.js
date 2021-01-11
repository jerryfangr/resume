/**** 作品集，的轮播 ***/
!function () {
  let view = document.querySelector('#siteWorks');
  let controller = {
    view: null,
    swiper: null,
    swiperOptions: {
      direction: "horizontal", // 垂直切换选项
      loop: true, // 循环模式选项
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicMainBullets: 1,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"><image src="./img/portfolio-' + (index + 1) + '.jpg"></span>';
        },
      },
    },
    init (view) {
      this.view = view;
      this.bindEvents(); // this.bindEvents.call(this)
    },
    bindEvents () {
      var barview = this.view.querySelector('#portfolioBar');
      this.view.querySelector('#portfolio1').onclick =  e => {
        this.setState(barview, 1);
      };
      this.view.querySelector('#portfolio2').onclick =  e => {
        this.setState(barview, 2);
      };
      this.view.querySelector('#portfolio3').onclick =  e => {
        this.setState(barview, 3);
      };

      this.initSwiper();
    },
    setState ( elem, stateNumber) {
      elem.className = "bar state-" + stateNumber;
    },
    initSwiper() {
      this.swiper = new Swiper(view.querySelector('.swiper-container'), this.swiperOptions);
    },
  }
  try {
    controller.init(view); 
  } catch (error) {
    window.reloadScriptObj.add('./js/portfolio-switch.js');
  }
}.call();


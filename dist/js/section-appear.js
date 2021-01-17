"use strict";

!function () {
  var view = View('html > body');
  var controller = Controller({
    jumpSelectors: null,
    jumpAnchors: null,
    init: function init(view) {
      this.jumpSelectors = view.querySelectorAll('nav > ul > li > a');
      this.jumpAnchors = view.querySelectorAll('[data-scroll-anchor]');
    },
    bindEvents: function bindEvents() {
      var _this = this;

      // 页面载入事件，标记出现在屏幕内的部分，添加出现动画(一次性) 
      window.addEventListener('load', function () {
        _this.jumpAnchors.forEach(function (a) {
          _this.updateApearState(a);
        });
      }); // 页面滚动事件，随着滚动自动切换当前显示的模块名

      window.addEventListener('scroll', function () {
        var scrollY = window.scrollY;
        var recentMenu = _this.jumpAnchors[0];

        for (var index = 1; index < _this.jumpAnchors.length; index++) {
          var distance1 = Math.abs(recentMenu.offsetTop - scrollY);
          var distance2 = Math.abs(_this.jumpAnchors[index].offsetTop - scrollY);

          if (distance1 > distance2) {
            recentMenu = _this.jumpAnchors[index];
          }

          _this.updateApearState(_this.jumpAnchors[index]);
        }

        var activeMenu = _this.view.querySelector('nav > ul > li > a[href="#' + recentMenu.id + '"]');

        _this.switchActiveTo(activeMenu);
      });
    },
    inScreen: function inScreen(element) {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var windowHeight = window.innerHeight;
      return element.offsetTop < scrollTop + windowHeight - 20;
    },
    updateApearState: function updateApearState(elem) {
      if (this.inScreen(elem)) {
        elem.classList.add('appear');
      }
    },
    switchActiveTo: function switchActiveTo(elem) {
      if (!elem.classList.contains('active')) {
        this.jumpSelectors.forEach(function (a) {
          a.classList.remove('active');
        });
        elem.classList.add('active');
      }
    }
  });

  try {
    controller.init(view);
  } catch (error) {
    window.reloadScriptObj.add('./dist/js/section-appear.js');
  }
}.call();
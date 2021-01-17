"use strict";

!function () {
  // 导航点击事件，点击后，随着规定的easing速度曲线滚动到对应模块位置
  var view = View('#topNavBar');
  var controller = Controller({
    menuViews: null,
    init: function init(view) {
      this.menuViews = view.querySelectorAll('nav > ul > li > a');
      TWEEN && this.initTWEENFrames();
    },
    initTWEENFrames: function initTWEENFrames() {
      function animate(time) {
        // 函数是异步的无法直接catch
        requestAnimationFrame(animate); // time 是执行函数时的当前时间

        TWEEN.update(time);
      }

      requestAnimationFrame(animate);
    },
    bindEvents: function bindEvents() {
      var _this = this;

      this.menuViews.forEach(function (a) {
        a.onclick = function (e) {
          var id = a.getAttribute('href');

          if (!!id && id.length > 1 && id[0] === '#') {
            e.preventDefault();
            var targetY = document.querySelector(id).offsetTop - 70;

            _this.slideScrollTo(targetY, 8);
          }
        };
      });
    },
    slideScrollTo: function slideScrollTo(targetY, speed, callback) {
      var yValue = window.scrollY;
      var timeLength = Math.floor(Math.abs(targetY - yValue) / Math.abs(speed)) * 13;
      timeLength = timeLength > 2500 ? 2500 : timeLength;
      var coords = {
        y: yValue
      };
      new TWEEN.Tween(coords).to({
        y: targetY
      }, timeLength) // Linear, Quadratic, Cubic, Quartic, Back and Bounce...
      // In, Out and InOut
      .easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
        window.scrollTo(0, coords.y);
      }).onComplete(function () {
        callback && callback();
      }).start();
    }
  });

  try {
    controller.init(view);
  } catch (error) {
    window.reloadScriptObj.add('./dist/js/scroll-jump.js');
  }
}.call();
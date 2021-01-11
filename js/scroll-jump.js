  /*** 导航点击事件，点击后，随着规定的easing曲线速度滚动到对应模块位置 ***/
!function () {
  let view = document.querySelectorAll('nav > ul > li > a');
  let controller = {
    view: null,
    init: function (view) {
      this.view = view;
      TWEEN && this.initTWEENFrames();
      this.bindEvents();
    },
    initTWEENFrames () {
      function animate(time) { // 函数是异步的无法直接catch
        // time 是执行函数时的当前时间
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      requestAnimationFrame(animate)
    },
    bindEvents () {
      this.view.forEach(a => {
        a.onclick = e => {
          let id = a.getAttribute('href');
          if (!!id && id.length > 1 && id[0] === '#') {
            e.preventDefault();
            let targetY = document.querySelector(id).offsetTop - 70;
            this.slideScrollTo(targetY, 8);
          }
        }
      })
    },
    slideScrollTo(targetY, speed, callback) {
      let yValue = window.scrollY;
      let timeLength = Math.floor(Math.abs(targetY - yValue) / Math.abs(speed)) * 13;
      timeLength = timeLength > 2500 ? 2500 : timeLength;
      const coords = { y: yValue };
      new TWEEN.Tween(coords)
        .to({ y: targetY }, timeLength)
        // Linear, Quadratic, Cubic, Quartic, Quintic, Sinusoidal, Exponential, Circular, Elastic, Back and Bounce
        // In, Out and InOut
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
          window.scrollTo(0, coords.y);
        })
        .onComplete(() => {
          callback && callback();
        })
        .start();
    }
  }
  try {
    controller.init(view);
  } catch (error) {
    window.reloadScriptObj.add('./js/scroll-jump.js');
  }
}.call();



!function () {
  // 导航点击事件，点击后，随着规定的easing速度曲线滚动到对应模块位置
  let view = View('#topNavBar')

  let controller = Controller({
    menuViews: null,
    init: function (view) {
      this.menuViews = view.querySelectorAll('nav > ul > li > a')
      TWEEN && this.initTWEENFrames()
    },
    initTWEENFrames () {
      function animate(time) { // 函数是异步的无法直接catch
        requestAnimationFrame(animate)// time 是执行函数时的当前时间
        TWEEN.update(time)
      }
      requestAnimationFrame(animate)
    },
    bindEvents () {
      this.menuViews.forEach(a => {
        a.onclick = e => {
          let id = a.getAttribute('href')
          if (!!id && id.length > 1 && id[0] === '#') {
            e.preventDefault()
            let targetY = document.querySelector(id).offsetTop - 70
            this.slideScrollTo(targetY, 8)
          }
        }
      })
    },
    slideScrollTo(targetY, speed, callback) {
      let yValue = window.scrollY
      let timeLength = Math.floor(Math.abs(targetY - yValue) / Math.abs(speed)) * 13
      timeLength = timeLength > 2500 ? 2500 : timeLength
      const coords = { y: yValue }
      new TWEEN.Tween(coords)
        .to({ y: targetY }, timeLength)
        // Linear, Quadratic, Cubic, Quartic, Back and Bounce...
        // In, Out and InOut
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
          window.scrollTo(0, coords.y)
        })
        .onComplete(() => {
          callback && callback()
        })
        .start()
    }
  })

  try {
    controller.init(view)
  } catch (error) {
    window.reloadScriptObj.add('./js/scroll-jump.js')
  }
}.call()



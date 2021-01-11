!function () {
  let view = document.body;
  let controller = {
    view: null,
    jumpSelectors: null,
    jumpAnchors: null,
    init: function (view) {
      this.view = view;
      this.jumpSelectors = view.querySelectorAll('nav > ul > li > a');
      this.jumpAnchors = view.querySelectorAll('[data-scroll-anchor]');
      this.bindEvents();
    },
    bindEvents () {
      /*** 页面载入事件，标记出现在屏幕内的部分，添加出现动画(一次性) ***/
      window.addEventListener('load', () => {
        for (let index = 0; index < this.jumpAnchors.length; index++) {
          this.updateApearState(this.jumpAnchors[index]);
        }
      })

      /*** 页面滚动事件，随着滚动自动切换当前显示的模块名 ***/
      window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        // active menu auto switch
        let recentMenu = this.jumpAnchors[0];
        for (let index = 1; index < this.jumpAnchors.length; index++) {
          let distance1 = Math.abs(recentMenu.offsetTop - scrollY);
          let distance2 = Math.abs(this.jumpAnchors[index].offsetTop - scrollY);
          if (distance1 > distance2) {
            recentMenu = this.jumpAnchors[index];
          }
          // check is section in screen
          this.updateApearState(this.jumpAnchors[index]);
        }

        let activeMenu = this.view.querySelector('nav > ul > li > a[href="#' + recentMenu.id + '"]');
        this.switchActiveTo(activeMenu);
      })
    },
    inScreen(element) {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let windowHeight = window.innerHeight;
      return element.offsetTop < (scrollTop + windowHeight - 20);
    },
    updateApearState (elem) {
      if (this.inScreen(elem)) {
        elem.classList.add('appear');
      }
    },
    switchActiveTo (elem) {
      if (!elem.classList.contains('active')) {
        this.jumpSelectors.forEach(a => {
          a.classList.remove('active');
        })
        elem.classList.add('active');
      }
    }
  }
  try {
    controller.init(view);
  } catch (error) {
    window.reloadScriptObj.add('./js/section-appear.js');
  }
}.call()



/*** 页面滚动事件，标题导航栏粘黏效果 ***/
!function () {
  let view = document.querySelector('#topNavBar');
  let controller = {
    view: null,
    state: null,
    init: function (view) {
      this.view = view;
      this.bindEvents();
    },
    bindEvents () {
      window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        if (scrollY > 0) {
          this.setState('active');
        } else {
          this.setState('deactive');
        }
      })
    },
    setState (state) {
      if (state === this.state) {
        return;
      }
      this.state = state;
      let methodName = this.state === 'active' ? 'add' : 'remove';
      view.classList[methodName]('sticky');
    }
  }
  try {
    controller.init(view);
  } catch (error) {
    window.reloadScriptObj.add('./js/sticky-toolbar.js');
  }
}.call();

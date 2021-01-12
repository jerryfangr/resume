
!function () {
  // 页面滚动事件，标题导航栏粘黏效果
  let view = document.querySelector('#topNavBar');
  let controller = {
    view: null,
    state: null,
    init: function (view) {
      this.view = view;
      this.updateState(window.scrollY);
      this.bindEvents();
    },
    bindEvents () {
      window.addEventListener('scroll', () => {
        this.updateState(window.scrollY);
      })
    },
    updateState(scrollY) {
      let newState = scrollY > 0 ? 'active' : 'deactive';
      if (newState === this.state) { return; }

      this.state = newState;
      let methodName = scrollY > 0 ? 'add' : 'remove';
      this.view.classList[methodName]('sticky');
    }
  }
  try {
    controller.init(view);
  } catch (error) {
    window.reloadScriptObj.add('./js/sticky-toolbar.js');
  }
}.call();

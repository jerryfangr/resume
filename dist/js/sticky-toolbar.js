"use strict";

!function () {
  // 页面滚动事件，标题导航栏粘黏效果
  var view = View('#topNavBar');
  var controller = Controller({
    state: '',
    init: function init() {
      this.updateState(window.scrollY);
    },
    bindEvents: function bindEvents() {
      var _this = this;

      window.addEventListener('scroll', function () {
        _this.updateState(window.scrollY);
      });
    },
    updateState: function updateState(scrollY) {
      var newState = scrollY > 0 ? 'active' : 'deactive';

      if (newState === this.state) {
        return;
      }

      this.state = newState;
      var methodName = scrollY > 0 ? 'add' : 'remove';
      this.view.classList[methodName]('sticky');
    }
  });

  try {
    controller.init(view);
  } catch (error) {
    console.log(error);
    window.reloadScriptObj.add('./dist/js/sticky-toolbar.js');
  }
}.call();
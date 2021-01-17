"use strict";

!function () {
  // 留言板
  var view = View('section#siteMessage');
  var model = Model({
    dataName: 'Message',
    init: function init() {
      if (localStorage.user === 'me123456-skachaskjckobhfciawuobcui') {
        AV.User.logIn('user', 'test001').then(function (user) {
          console.log('login success', user);
        }, function (error) {
          console.log('er', error);
        });
      }
    }
  });
  var controller = Controller({
    view: null,
    boardView: null,
    model: null,
    init: function init(view) {
      this.boardView = view.querySelector('#messageList');
      this.loadMessages();
    },
    loadMessages: function loadMessages() {
      var _this = this;

      this.model.fetch().then(function (result) {
        result.forEach(function (r) {
          _this.addReply({
            time: r.attributes.time,
            message: r.attributes.message,
            sender: r.attributes.username,
            read: r.attributes.read,
            id: r.id
          }, _this.boardView);
        });
      });
    },
    addReply: function addReply(reply, boardElem) {
      var _reply$time = reply.time,
          time = _reply$time === void 0 ? 'unknow' : _reply$time,
          _reply$message = reply.message,
          message = _reply$message === void 0 ? '' : _reply$message,
          _reply$sender = reply.sender,
          sender = _reply$sender === void 0 ? 'unknow' : _reply$sender,
          _reply$read = reply.read,
          read = _reply$read === void 0 ? false : _reply$read,
          _reply$id = reply.id,
          id = _reply$id === void 0 ? '' : _reply$id;
      var readStatus = read ? '已读' : '未读';
      var readClass = read ? 'read' : '';
      var template = "\n        <li>\n          <div class=\"toolbar clearfix\">\n            <div class=\"reply-status\">".concat(readStatus, "</div>\n            <div class=\"read-icon ").concat(readClass, "\" title=\"reply\" data-id=\"").concat(id, "\">\n              <svg class=\"icon\" aria-hidden=\"true\">\n                <use xlink:href=\"#icon-read\"></use>\n              </svg>\n            </div>\n          </div>\n          <h3>").concat(message, "</h3>\n          <div class=\"footer-info\">\n            <div class=\"reply-time\">").concat(time, "</div>\n            <div class=\"reply-user\">").concat(sender, " \u7559</div>\n          </div>\n        </li>\n      ");
      boardElem.insertAdjacentHTML('beforeend', template);
    },
    bindEvents: function bindEvents() {
      var _this2 = this;

      this.view.querySelector('#messageForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var username = e.currentTarget.querySelector('input[name="username"]').value;
        var message = e.currentTarget.querySelector('input[name="message"]').value;

        if (username !== '' && message !== '') {
          var reply = {
            username: username,
            message: message
          };
          reply.time = _this2.getTime();
          reply.read = false;

          _this2.addMessage(reply, e.currentTarget);
        }
      });
      this.boardView.addEventListener('click', function (e) {
        var node = e.target;
        var id = node.dataset.id;

        if (id && node.className.indexOf('read-icon') !== -1) {
          _this2.readMessage(id, node);
        }
      });
    },
    addMessage: function addMessage(reply, formElem) {
      var _this3 = this;

      this.model.save(reply).then(function (messageObj) {
        _this3.addReply({
          time: messageObj.attributes.time,
          message: messageObj.attributes.message,
          sender: messageObj.attributes.username,
          read: false,
          id: messageObj.id
        }, _this3.boardView);

        formElem.reset();
      });
    },
    getTime: function getTime() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month > 9 ? month : '0' + month;
      var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      var h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
      var m = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
      var time = year + '/' + month + '/' + day;
      time += ' ' + h + ':' + m;
      return time;
    },
    readMessage: function readMessage(id, node) {
      this.model.update(id, {
        read: true
      }).then(function (r) {
        node.classList.add('read');
        var contentNode = node.previousSibling.nodeType === 1 ? node.previousSibling : node.previousSibling.previousSibling;
        contentNode.innerText = '已读';
      }, function (error) {
        console.log(error);
      });
    }
  });

  try {
    controller.init(view, model);
  } catch (error) {
    window.reloadScriptObj.add('./dist/js/message-board.js');
  }
}.call();
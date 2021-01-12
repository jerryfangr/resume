!function () {
  // 留言板
  let view = document.querySelector('#siteMessage');

  let model = {
    init () {
      AV.init({
        appId: "8jw7gkIFnu4f0pNyGnYBrp6H-gzGzoHsz",
        appKey: "xazaedy0vMM8yaHYwEIawsBI",
        serverURL: "https://8jw7gkif.lc-cn-n1-shared.com"
      });
      this.DataObj = AV.Object.extend('Message');
      if (localStorage.user === 'me123456-skachaskjckobhfciawuobcui') {
        AV.User.logIn('user', 'test001').then((user) => {
          console.log('login success', user);
        }, (error) => {
          console.log('er', error)
        });
      }
    },
    fetch () { // 获取数据
      let query = new AV.Query('Message')
      return query.find();
    },
    add (addData) { // 增加数据
      const dataObj = new this.DataObj();
      for (const key in addData) {
        dataObj.set(key, addData[key]);
      }
      return dataObj.save();
    },
    update (id, updateData) { // 更新数据
      const dataObj = AV.Object.createWithoutData('Message', id);
      for (const key in updateData) {
        dataObj.set(key, updateData[key]);
      }
      return dataObj.save()    
    }
  }

  let controller = {
    view: null,
    boardView: null,
    model: null,
    init: function (view) {
      this.view = view;
      this.boardView = view.querySelector('#messageList');
      this.model = model;
      this.model.init()
      this.loadMessages();
      this.bindEvents();
    },
    loadMessages() {
      this.model.fetch().then(result => {
        result.forEach(r => {
          this.addReply({
            time: r.attributes.time,
            message: r.attributes.message,
            sender: r.attributes.username,
            read: r.attributes.read,
            id: r.id,
          }, this.boardView)
        })
      })
    },
    addReply(reply, boardElem) {
      let {
        time = 'unknow',
        message = '',
        sender = 'unknow',
        read = false,
        id = '',
      } = reply;
      let readStatus = read ? '已读' : '未读';
      let readClass = read ? 'read' : '';
      let template = `
        <li>
          <div class="toolbar clearfix">
            <div class="reply-status">${readStatus}</div>
            <div class="read-icon ${readClass}" title="reply" data-id="${id}">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-read"></use>
              </svg>
            </div>
          </div>
          <h3>${message}</h3>
          <div class="footer-info">
            <div class="reply-time">${time}</div>
            <div class="reply-user">${sender} 留</div>
          </div>
        </li>
      `
      boardElem.insertAdjacentHTML('beforeend', template);
    },
    bindEvents() {
      this.view.querySelector('#messageForm').addEventListener('submit', (e) => {
        e.preventDefault();
        let username = e.currentTarget.querySelector('input[name="username"]').value;
        let message = e.currentTarget.querySelector('input[name="message"]').value;
        if (username !== '' && message !== '') {
          let reply = { username, message };
          reply.time = this.getTime();
          reply.read = false;
          this.addMessage(reply, e.currentTarget);
        }
      })

      this.boardView.addEventListener('click', e => {
        let node = e.target;
        let id = node.dataset.id;
        if (id && node.className.indexOf('read-icon') !== -1) {
          this.readMessage(id, node);
        }
      });
    },
    addMessage(reply, formElem) {
      this.model.add(reply).then((messageObj) => {
        this.addReply({
          time: messageObj.attributes.time,
          message: messageObj.attributes.message,
          sender: messageObj.attributes.username,
          read: false,
          id: messageObj.id,
        }, this.boardView)
        formElem.reset()
      })
    },
    getTime() {
      let date = new Date();
      let year = date.getFullYear()
      let month = date.getMonth() + 1;
      month = month > 9 ? month : '0' + month;
      let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      let h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
      let m = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
      let time = year + '/' + month + '/' + day
      time += ' ' + h + ':' + m
      return time
    },
    readMessage(id, node) {
      this.model.update(id, {read: true}).then(
        r => {
          node.classList.add('read');
          let contentNode = node.previousSibling.nodeType === 1 ? 
            node.previousSibling : 
            node.previousSibling.previousSibling;
          contentNode.innerText = '已读';
        },
        error => {
          console.log(error);
        })
    },

  }

  try {
    controller.init(view);
  } catch (error) {
    console.log(error);
    console.log('load 11111');
    window.reloadScriptObj.add('./js/message-board.js');
  }
}.call();


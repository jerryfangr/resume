!function () {
  // 页面的第三方文件载入失败处理，替换为本地文件
  function reloadTag(insertPosition, elem, type, link) {
    elem && elem.remove()
    let sandbyTag = document.createElement(type)
    switch (type) {
      case 'script':
        sandbyTag.src = link
        break;
      case 'link':
        sandbyTag.href = link
        sandbyTag.rel = 'stylesheet'
        break;
      default:
        sandbyTag.href = link
        break;
    }
    return new Promise((resolve, reject) => {
      sandbyTag.onload = resolve
      sandbyTag.onerror = () => {
        reject(link)
      }
      insertPosition.appendChild(sandbyTag)
    })
  }

  window.reloadScript = function (elem, link) {
    return reloadTag(document.head, elem, 'script', link)
  }

  window.reloadLink = function (elem, link) {
    return reloadTag(document.head, elem, 'link', link)
  }

  window.reloadScriptObj = function () {
    return {
      list: [],
      add(adress) {
        this.list.push(adress)
      },
      reload() {
        let loaders = []
        this.list.forEach(link => {
          loaders.push(reloadScript(undefined, link))
        })
        this.list = []
        return Promise.all(loaders)
      }
    }
  }()}.call()

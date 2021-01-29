window.Model = function (options) {
  let originInit = options.init;

  options.init = function () {
    AV.init({
      appId: window.resumeConfig.av.appId,
      appKey: window.resumeConfig.av.appKey,
      serverURL: window.resumeConfig.av.serverURL,
    })
    this.DataObj = AV.Object.extend(this.dataName)
    originInit && originInit.call(this)
  }

  options.fetch = function () {// 获取数据
    let query = new AV.Query(this.dataName)
    return query.find()
  }

  options.save = function (saveData) {
    const dataObj = new this.DataObj()
    for (const key in saveData) {
      dataObj.set(key, saveData[key])
    }
    return dataObj.save()
  }

  options.update = function (id, updateData) {
    const dataObj = AV.Object.createWithoutData(this.dataName, id)
    for (const key in updateData) {
      dataObj.set(key, updateData[key])
    }
    return dataObj.save()
  }

  return options
}
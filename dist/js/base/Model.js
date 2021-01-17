"use strict";

window.Model = function (options) {
  var originInit = options.init;

  options.init = function () {
    AV.init({
      appId: "8jw7gkIFnu4f0pNyGnYBrp6H-gzGzoHsz",
      appKey: "xazaedy0vMM8yaHYwEIawsBI",
      serverURL: "https://8jw7gkif.lc-cn-n1-shared.com"
    });
    this.DataObj = AV.Object.extend(this.dataName);
    originInit && originInit.call(this);
  };

  options.fetch = function () {
    // 获取数据
    var query = new AV.Query(this.dataName);
    return query.find();
  };

  options.save = function (saveData) {
    var dataObj = new this.DataObj();

    for (var key in saveData) {
      dataObj.set(key, saveData[key]);
    }

    return dataObj.save();
  };

  options.update = function (id, updateData) {
    var dataObj = AV.Object.createWithoutData(this.dataName, id);

    for (var key in updateData) {
      dataObj.set(key, updateData[key]);
    }

    return dataObj.save();
  };

  return options;
};
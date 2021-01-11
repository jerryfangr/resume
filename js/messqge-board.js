!function () {
  AV.init({
    appId: "8jw7gkIFnu4f0pNyGnYBrp6H-gzGzoHsz",
    appKey: "xazaedy0vMM8yaHYwEIawsBI",
    serverURL: "https://8jw7gkif.lc-cn-n1-shared.com"
  });
  
  localStorage.setItem('debug', 'leancloud*');
  const DataObject = AV.Object.extend('Message');
  const dataObject = new DataObject();

  dataObject.set('words', 'Hello world!');
  // dataObject.save().then((dataObject) => {
  //   console.log('保存成功。')
  // })

}.call();


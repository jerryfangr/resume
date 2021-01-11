!function () {
  AV.init({
    appId: "8jw7gkIFnu4f0pNyGnYBrp6H-gzGzoHsz",
    appKey: "xazaedy0vMM8yaHYwEIawsBI",
    serverURL: "https://8jw7gkif.lc-cn-n1-shared.com"
  });
  
  localStorage.setItem('debug', 'leancloud*');
  const DataObject = AV.Object.extend('Message');
  let form = document.querySelector('#messageForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let message = e.currentTarget.querySelector('input[name="message"]').value;
    const dataObject = new DataObject();
    dataObject.set('message', message);
    dataObject.save().then((dataObject) => {
      console.log('保存成功。')
    })
    // dataObject.save({'message':message}).then((dataObject) => {console.log('保存成功。')})
  })

  console.log(new AV.Query('Message'));
}.call();


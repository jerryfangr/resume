!function () {
  setTimeout(() => {
    window.reloadScriptObj.reload().then(
      v => {
        siteWelcome.classList.remove("active");
      },
      fs => {
        siteWelcome.classList.remove("active");
        console.log('can not loads these file: ', fs);
      }
    )
  }, 100);
}.call();




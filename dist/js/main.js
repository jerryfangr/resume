"use strict";

!function () {
  setTimeout(function () {
    window.reloadScriptObj.reload().then(function (v) {
      siteWelcome.classList.remove("active");
    }, function (fs) {
      siteWelcome.classList.remove("active");
      console.log('can not loads these file: ', fs);
    });
  }, 100);
}.call();
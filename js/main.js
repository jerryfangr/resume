// nav bar scroll event
let allJumpSelector = document.querySelectorAll('nav > ul > li > a');
let allSections = document.querySelectorAll('[data-scroll]');
function inScreen(element) {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let windowHeight = window.innerHeight;
  if (element.offsetTop < (scrollTop + windowHeight - 20)) {
    return true;
  }
  return false;

}
function updateLoadElement () {
  let scrollY = window.scrollY;
  // topNavBar sticky effect switch
  if (scrollY > 0) {
    topNavBar.classList.add('sticky');
  } else {
    topNavBar.classList.remove('sticky');
  }

  // active menu auto switch
  let recentMenu = allSections[0];
  for (let index = 1; index < allSections.length; index++) {
    let distance1 = Math.abs(recentMenu.offsetTop - scrollY);
    let distance2 = Math.abs(allSections[index].offsetTop - scrollY);
    if (distance1 > distance2) {
      recentMenu = allSections[index];
    }

    // check is section in screen
    if (inScreen(allSections[index])) {
      allSections[index].classList.add('appear');
    }
  }

  let activeMenu = document.querySelector('nav > ul > li > a[href="#' + recentMenu.id + '"]');
  if (!activeMenu.classList.contains('active')) {
    allJumpSelector.forEach(a => {
      a.classList.remove('active');
    })
    activeMenu.classList.add('active');
  }
}

window.onload = function () {
  for (let index = 0; index < allSections.length; index++) {
    if (inScreen(allSections[index])) {
      allSections[index].classList.add('appear');
    }
  }
}

window.onscroll = function (e) {
  updateLoadElement()
}

// nav bar click event
function animate(time) {
  // time 是执行函数时的当前时间
  requestAnimationFrame(animate)
  TWEEN.update(time)
}
// 希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。
requestAnimationFrame(animate)

/**
 * 以ease方程式滑动动画，滑动到指定位置
 * @param {*} targetY 
 * @param {*} speed 
 * @param {*} callback scroll complete callback function
 */
function slideScrollTo(targetY, speed, callback) {
  let yValue = window.scrollY;
  let timeLength = Math.floor(Math.abs(targetY - yValue) / Math.abs(speed)) * 13;
  timeLength = timeLength > 2500 ? 2500 : timeLength;
  const coords = { y: yValue };
  const tween = new TWEEN.Tween(coords)
    .to({ y: targetY }, timeLength)
    // Linear, Quadratic, Cubic, Quartic, Quintic, Sinusoidal, Exponential, Circular, Elastic, Back and Bounce
    // In, Out and InOut
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      window.scrollTo(0, coords.y);
    })
    .onComplete(() => {
      callback && callback();
    })
    .start();
}

allJumpSelector.forEach(a => {
  a.onclick = function (e) {
    let id = a.getAttribute('href');
    if (!!id && id.length > 1 && id[0] === '#') {
      e.preventDefault();
      let targetY = document.querySelector(id).offsetTop - 70;
      slideScrollTo(targetY, 8);
    }
  }
})

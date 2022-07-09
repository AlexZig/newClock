let body = document.querySelector('body');
let electronicTime = document.querySelector('.electronicTime');
let startTime = new Date();
let startSecond = startTime.getSeconds().toString();
let sound = document.createElement('audio');
sound.setAttribute('src' , 'sound50.mp3');
sound.volume = 0.1;
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  body.classList.add('dark');
  body.style.setProperty('--color', 'rgb(206, 13, 13)');
  } else {
  body.classList.add('light');
  body.style.setProperty('--color', 'rgb(0, 255, 242)');
}
document.querySelector('.dark-light').onclick = function(){
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    body.classList.add('light');
    body.style.setProperty('--color', 'rgb(0, 255, 242)');
  } else {
    body.classList.remove('light');
    body.classList.add('dark');
    body.style.setProperty('--color', 'rgb(206, 13, 13)');
  }
}



function timeControl() {
  let time = new Date();
  let h = time.getHours().toString();
  let m = time.getMinutes().toString();
  let s = time.getSeconds().toString();
  if (h.length < 2) {
    h = "0" + h;
  };
  if (m.length < 2) {
    m = "0" + m;
  };
  if (s.length < 2) {
    s = "0" + s;
  };
  if (s % 2 == 0) {
    electronicTime.innerHTML = h + ':' + m + ':' + s;
  }else{
    electronicTime.innerHTML = h + ' ' + m + ' ' + s;
  }
  if (m == '50' && s == '00'){
    sound.play();
  }
  
}
function secondControl() {
  let time = new Date();
  let s = time.getSeconds().toString();
  if (s != startSecond) {
    clearInterval(startInterval);
    let s = time.getSeconds().toString();
    let m = time.getMinutes().toString();
    let h = time.getHours().toString();
    body.style.setProperty('--secondPositionStart', (s * 6) + 'deg');
    body.style.setProperty('--secondPositionEnd', (s * 6 + 360) + 'deg');
    body.style.setProperty('--minutePositionStart', ((m * 6) + (s * 0.1)) + 'deg');
    body.style.setProperty('--minutePositionEnd', ((m * 6) + (s * 0.1) + 360) + 'deg');
    body.style.setProperty('--hourPositionStart', ((h * 30) + (m * 0.5) + (s * 0.00833333)) + 'deg');
    body.style.setProperty('--hourPositionEnd', ((h * 30) + (m * 0.5) + (s * 0.00833333)) + 360 + 'deg');
    body.classList.add('start-time');
    regularInterval =  setInterval(timeControl, 1000);
  }
}
function start() {
  startInterval = setInterval(secondControl, 1);
};
start();

function monitorScreensize() {
  let bodyWidth = body.offsetWidth;
  let bodyHeight = body.offsetHeight;
  if ( bodyHeight > bodyWidth) {
    body.classList.add('vertical-orientation');
  }else{
    body.classList.remove('vertical-orientation');
  }
}
viewScreenSize = setInterval(monitorScreensize, 100);

new Swiper ('.swiper', {
  effect: 'fade',
  speed: 1000,
});


function requestPermission() {
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      // Поддержка устаревшей версии с функцией обратного вызова.
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error('Permission not granted.');
    }
  });
}
Notification.requestPermission();
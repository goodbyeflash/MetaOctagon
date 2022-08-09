let isGltfLoading;
const spanArray1 = [
  ...document.getElementById('homeText1').getElementsByTagName('span'),
];
const spanArray2 = [
  ...document.getElementById('homeText2').getElementsByTagName('span'),
];

shuffle(spanArray1);
shuffle(spanArray2);

window.onload = () => {
  loading();
  document.getElementById('homePage').style.width = `100vw`;
  document.getElementById('homePage').style.height = `100vh`;
  [...document.getElementById('nav').getElementsByTagName("li")].forEach((el) => {
    if (el.id) {
      el.onclick = () => {
        goLink(el.id);
      };
    }
  });
  menuClick();
};

window.addEventListener('message', function (e) {
  // e.data가 전달받은 메시지
  if (e.data == 'gltfLoading') {
    isGltfLoading = true;
    homeTextAnimation1();
  }
});

function loading() {
  document.getElementById('introPage').height = `${window.innerHeight}px`;
  const loadingEl = document.getElementById('loading');
  let interval = 100;
  let startValue = 0;
  let endValue = 100;
  let duration = Math.floor(interval / endValue);

  let counter = setInterval(() => {
    loadingEl.textContent = `Loading ${startValue}%`;
    if (startValue >= 80) {
      //if (isGltfLoading) {
      startValue += 1;
      if (startValue == 100) {
        clearInterval(counter);
        document.getElementById('introPage').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
        //Todo..
        homeTextAnimation1();
      }
      //}
    } else {
      startValue += 1;
    }
  }, duration);
}

function goLink(id) {
  if (id == 'goHome') {
    window.scrollTo(0, 0);
  } else if (id == 'goMetaverse') {
    window.open('./public/MetaOctagonUnity'); // 새창에서 열림
  } else if (id == 'goMetagonz') {
    window.open('http://metagonz.io'); // 새창에서 열림
  } else if (id == 'goAbout') {
    window.location.href = "about.html";
  }
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function menuClick() {
  var menuOnButton = document.getElementsByClassName('btn-menu')[0],
      menuOffButton = document.getElementsByClassName('btn-menu-close')[0];

  menuOnButton.onclick = () => {
    menuOnButton.classList.add('active');
  }

  menuOffButton.onclick = () => {
    menuOnButton.classList.remove('active');
  }
}

// 첫 번쨰 텍스트 애니메이션 실행
function homeTextAnimation1() {
  spanArray1.forEach((spanEl,index) => {
    setTimeout(() => {
      spanEl.style.visibility = 'visible';
      spanEl.classList.remove('txt_blur_hide');
      spanEl.classList.add('txt_blur_show');
      spanEl.addEventListener('animationend', (e) => {
        if( e.animationName == "txt_blur_show" ) {
          if( (spanArray1.length-1) == index ){
            setTimeout(() => {
              homeTextAnimation2();
            }, 3000);
          }
        } else {
          spanEl.classList.remove('txt_blur_hide');
          spanEl.style.visibility = 'hidden';
        }
      });
    }, Math.random() * 1000);
  });
}


// 두 번쨰 텍스트 애니메이션 실행
function homeTextAnimation2() {
  spanArray2.forEach((spanEl2,index) => {
    setTimeout(() => {
      spanEl2.style.visibility = 'visible';
      spanEl2.classList.remove('txt_blur_hide');
      spanEl2.classList.add('txt_blur_show');
      spanEl2.addEventListener('animationend', (e) => {
        if( e.animationName == "txt_blur_show" ) {
          spanArray1.forEach((spanEl1) => {
            if( (spanArray2.length-1) == index ){
              setTimeout(() => {
                spanEl1.classList.remove('txt_blur_show');
                spanEl1.classList.add('txt_blur_hide');
              }, Math.random() * 1000);
            }
          });
          setTimeout(() => {
            spanEl2.classList.remove('txt_blur_show');
            spanEl2.classList.add('txt_blur_hide');
          }, 6000);
        } else {
          spanEl2.classList.remove('txt_blur_hide');
          spanEl2.style.visibility = 'hidden';
          if( (spanArray2.length-1) == index ){
            homeTextAnimation1();
          }
        }
      });
    }, Math.random() * 1000);
  });

}
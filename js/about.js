window.onload = () => {
    // scrollCanvasAnimation();
    scrollTextAnimation();
    [...document.getElementById('nav').getElementsByTagName("li")].forEach((el) => {
        if (el.id) {
            el.onclick = () => {
                goLink(el.id);
            };
        }
    });
    //onSendButton();
    onLoadingMedium();
    onLoadVideoPlayer();

    document.getElementsByClassName("video-area")[0].onclick = (e) => {
        document.getElementsByClassName("video-bg")[0].style.visibility = "hidden";
        let player = window.videoPlayer;
        player.playVideo();
        //event.target.playVideo();
    };

    menuClick();
};

window.addEventListener('message', function (e) {
    // e.data가 전달받은 메시지
    if (e.data == 'gltfLoading') {
        isGltfLoading = true;
        homeTextAnimation1();
    }
});

function goLink(id) {
    if (id == 'goHome') {
        window.location.href = "index.html";
    } else if (id == 'goMetaverse') {
        window.open('./public/MetaOctagonUnity'); // 새창에서 열림
    } else if (id == 'goMetagonz') {
        window.open('http://metagonz.io'); // 새창에서 열림
    } else if (id == 'goAbout') {
        window.location.href = "about.html";
    }
}

function onSendButton() {
    const sendButton = document.getElementById('send');
    const inputMail = document.getElementById('inputMail');
    const mailMsg = document.getElementById('mailMsg');
    //Todo
    return;
    sendButton.onclick = () => {
        mailMsg.innerText = '';
        let regEmail =
            /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        if (!regEmail.test(inputMail.value)) {
            mailMsg.innerText = "It's not in email format.";
            return;
        }
        inputMail.readOnly = true;
        sendButton.disabled = true;
        $.ajax({
            type: 'GET',
            url: '',
            data: {
                이메일: document.getElementById('inputMail').value,
            },
            success: function (response) {
                inputMail.value = '';
                inputMail.readOnly = false;
                sendButton.disabled = false;
            },
            error: function (request, status, error) {
                console.log('code:' + request.status + '\n' + 'error:' + error);
                console.log(request.responseText);
            },
        });
    };
}

function scrollCanvasAnimation() {
    const html = document.documentElement;
    const canvas = document.getElementById('scrollCanvas');
    const context = canvas.getContext('2d');

    const frameCount = 147;
    const currentFrame = (index) =>
        `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
            .toString()
            .padStart(4, '0')}.jpg`;

    const preloadImages = () => {
        for (let i = 1; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
        }
        const sectionArea = document.getElementById('section1');
        sectionArea.style.height = window.innerHeight * 9 + 'px';
    };

    const img = new Image();
    img.src = currentFrame(1);

    img.onload = function () {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const updateImage = (index) => {
        img.src = currentFrame(index);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('scroll', () => {
        const scrollCanvasStyle = document.getElementById('scrollCanvas').style;
        const scrollTextStyle = document.getElementById('scrollText').style;
        const scrollElements = [scrollCanvasStyle, scrollTextStyle];
        const styleClear = () => {
            document.getElementById('canvas-wrap').style.position = 'absolute';
            // scrollElements.forEach((styleEl) => {
            //   styleEl.position = '';
            //   styleEl.left = '';
            //   styleEl.top = '';
            //   styleEl.transform = '';
            // });
        };
        if (html.scrollTop >= window.innerHeight) {
            const scrollTop = html.scrollTop;
            const maxScrollTop = parseInt(
                document.getElementById('section1').style.height.replace('px', '')
            );
            const scrollFraction = scrollTop / maxScrollTop;
            const frameIndex = Math.min(
                frameCount - 1,
                Math.ceil(scrollFraction * frameCount)
            );
            requestAnimationFrame(() => updateImage(frameIndex + 1));
            document.getElementById('canvas-wrap').style.position = 'fixed';
            // scrollElements.forEach((styleEl) => {
            //   styleEl.position = 'fixed';
            //   styleEl.left = '50%';
            //   styleEl.top = '50%';
            //   styleEl.transform = 'translate(-50%, -50%)';
            // });

            if (
                html.scrollTop >=
                parseInt(
                    document.getElementById('section1').style.height.replace('px', '')
                )
            ) {
                styleClear();

                scrollElements.forEach((styleEl) => {
                    // styleEl.position = 'absolute';
                    // styleEl.top = maxScrollTop + 'px';
                });
                // document.getElementById('canvas-wrap').style.top = maxScrollTop + 'px'
            }
        } else {
            styleClear();
        }
    });

    preloadImages();
}

function scrollTextAnimation() {
    let controller = new ScrollMagic.Controller();
    let animateElem = ["#animate1", "#animate2", "#animate3",];
    let triggerElem = ["#trigger1", "#trigger2", "#trigger3",];

    for (let i = 0; i < animateElem.length; i++) {
        let currentAnimateElem = animateElem[i];
        let currentTriggerElem = triggerElem[i];

        let timeline = new TimelineMax();

        let tween_move = TweenMax.fromTo(
            currentAnimateElem,
            1,
            {
                ease: SlowMo.ease.config(0.7, 0.7, false),
                y: 50
            },
            {
                ease: SlowMo.ease.config(0.7, 0.7, false),
                y: -50
            }
        );

        let tween_opacity = new TimelineMax();
        tween_opacity
            .to(currentAnimateElem, 0.3, {
                ease: Linear.easeNone,
                opacity: 1
            })
            .to(
                currentAnimateElem,
                0.3,
                {
                    ease: Linear.easeNone,
                    opacity: 0
                },
                "+=0.4"
            );

        timeline.add(tween_move, 0).add(tween_opacity, 0);

        let scene_main = new ScrollMagic.Scene({
            triggerElement: currentTriggerElem,
            duration: "1500px"
        })
            .setTween(timeline)
            .addTo(controller);
    }
}



function onLoadingMedium() {
    const swiperWrap = document.getElementsByClassName("swiper-wrapper")[0];
    $.get('https://api.rss2json.com/v1/api.json', {
        rss_url: 'https://medium.com/feed/@metaoctagon'
    }, (res) => {
        if (res.status == 'ok') {
            if( res.items.length > 0 ) {
                res.items.forEach((item,index) => {
                    if( index < 10 ) {
                        let parser = new DOMParser();
                        let doc = parser.parseFromString(item.content, 'text/html');
                        const swiperEl = document.createElement("div");
                        swiperEl.classList = "swiper-slide";
                        swiperEl.innerHTML = `<div class="news-wrap">
                                    <div class="news-cont">
                                      <p class="news-tit">${item.title}</p>
                                        <div class="hover">
                                        <p class="news-txt">${doc.body.getElementsByTagName("p")[0].innerText}</p>
                                        <a class="news-more"><img src="images/btn-more.png" alt="더보기"></a>
                                      </div>
                                    </div>
                                  </div>`;
                        swiperEl.style.backgroundImage = `url(${item.thumbnail})`;
                        swiperEl.addEventListener("click",()=>{
                            window.open(item.link);
                        });
                        swiperWrap.appendChild(swiperEl);
                    }
                })

                var swiper = new Swiper(".mySwiper", {
                    slidesPerView: 4,
                    touches: true,
                    watchOverflow: true,
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                    breakpoints: {
                        280: {
                            slidesPerView: 2,
                            spaceBetween: 5
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        },
                        1321: {
                            slidesPerView: 4,
                            spaceBetween: 30
                        }
                    }
                });

            }
        }});
}

function onLoadVideoPlayer() {
    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    let player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '100%',
            width: '100%',
            videoId: 'HtESDBJTFkY',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // window.onYouTubePlayerAPIReady = function() {
    onYouTubeIframeAPIReady();
    //};

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        var target = event.target;
        window.videoPlayer = target;
        //event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    let done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }
    function stopVideo() {
        player.stopVideo();
    }
}

function menuClick() {
    console.log(document.getElementsByClassName('btn-menu')[0]);
    var menuOnButton = document.getElementsByClassName('btn-menu')[0],
        menuOffButton = document.getElementsByClassName('btn-menu-close')[0];

    menuOnButton.onclick = () => {
        console.log("ASDF");
        menuOnButton.classList.add('active');
    }

    menuOffButton.onclick = () => {
        menuOnButton.classList.remove('active');
    }
}

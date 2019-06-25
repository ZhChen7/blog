window.onload = function () {
    // 轮播图
    banner();
    //音乐播放组件
    audioPlay()


}
let audioPlay = function () {
    let audio = document.getElementById('music1');
        audio.play();
    $("#btn").bind("click", function bf() {
        if (audio !== null) {
            //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
            //alert(audio.paused);
            if (audio.paused) {
                audio.play(); //audio.play();// 这个就是播放
                $('.audio').css({
                    'animation-play-state':'running'
                })
            } else {
                audio.pause(); // 这个就是暂停
                $('.audio').css({
                    'animation-play-state':'paused'
                })
            }
        }
    })
}

let banner = function () {
    let bannerBox = document.querySelector('.bg-banner>.banner-main');
    let imgBox = document.querySelector('.bg-banner>.banner-main>ul:first-child');
    let circleBox = document.querySelectorAll('.bg-banner>.banner-main>ul:last-child>li');
    let addTranslation = function () {
        imgBox.style.transition = 'all 0.2s';
        imgBox.style.webkitTransition = 'all 0.2s';
    };
    let removeTransition = function () {
        imgBox.style.transition = 'none';
        imgBox.style.webkitTransition = 'none';
    };

    let settanslateX = function (translateX) {
        imgBox.style.transform = 'translateX(' + translateX + 'px)';
        imgBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    };


    let index = 1;
    let timer = setInterval(function () {
        let width = bannerBox.offsetWidth;
        index++;
        addTranslation();
        // console.log('index:'+index);
        // console.log('width:'+width);
        let translateX = -width * index;
        // console.log('translateX:'+translateX);
        settanslateX(translateX);
    }, 2000);


    imgBox.addEventListener('transitionend', function () {
        // console.log('外面index:' + index);
        if (index >= 9) {
            let width = bannerBox.offsetWidth;
            index = 1;
            removeTransition();
            let translateX = -width * index;
            settanslateX(translateX);
        } else if (index <= 0) {
            let width = bannerBox.offsetWidth;
            index = 8;
            removeTransition();
            let translateX = -width * index;
            settanslateX(translateX);
        }
        setpoint();

    });
    // 设置点的方法
    let setpoint = function () {
        for (let i = 0; i < circleBox.length; i++) {
            let obj = circleBox[i];
            obj.classList.remove('now');
        }

        circleBox[index - 1].classList.add('now');

    };
    let startX = 0;
    let distanceX = 0;
    let isMove = false;
    imgBox.addEventListener('touchstart', function (e) {
        e.stopPropagation()
        e.preventDefault()
        clearInterval(timer);
        startX = e.touches[0].clientX;
    })
    imgBox.addEventListener('touchmove', function (e) {
        e.stopPropagation()
        e.preventDefault()
        let moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        let width = bannerBox.offsetWidth;
        let translateX = -width * index + distanceX;
        settanslateX(translateX);
        isMove = true;
    })
    imgBox.addEventListener('touchend', function (e) {
        e.stopPropagation()
        e.preventDefault()
        if (isMove) {
            let width = bannerBox.offsetWidth;
            if (Math.abs(distanceX) < width / 3) {
                addTranslation();
                let translateX = -width * index;
                settanslateX(translateX);
            } else {
                if (distanceX > 0) {
                    index--;

                } else {
                    index++;
                }
                addTranslation();
                let translateX = -width * index;
                settanslateX(translateX);
            }
            startX = 0;
            distanceX = 0;
            clearInterval(timer);
            timer = setInterval(function () {
                let width = bannerBox.offsetWidth;
                index++;
                addTranslation();
                let translateX = -width * index;
                settanslateX(translateX);
            }, 1500);
        }
    })
};


$(function () {
    main_Navigation()
})

let main_Navigation = function () {
    let addTranslation = function () {
        $('.main_Navigation_nav').css({
            transition: 'transform 0.2s',
            webkitTransition: 'transform 0.2s'
        })
    }
    let settanslateX = function (translateX) {
        $('.main_Navigation_nav').css({
            transform: 'translateX(' + translateX + 'px)',
            webkitTransform: 'translateX(' + translateX + 'px)'
        })

    }
    let startX = 0
    let startY = 0
    let moveX = 0
    let moveY = 0
    let distanceX = 0
    let distanceY = 0
    let isMove = false
    let width = 0
    let index_Navigation = 0

    setTimeout(function () {
        width = document.querySelector('.bg-container').offsetWidth
    }, 100)
    window.addEventListener('resize', function () {
        width = $('.main_Navigation').width()
    })

    $('.main_Navigation_nav').on('touchstart', function (e) {
        startX = e.touches[0].clientX
        startY = e.touches[0].clientY
    })
    $('.main_Navigation_nav').on('touchmove', function (e) {
        moveX = e.touches[0].clientX
        moveY = e.touches[0].clientY
        distanceX = moveX - startX
        distanceY = moveY - startY
        let translateX = -width * index_Navigation + distanceX;
        // console.log("distanceX :"+ distanceX)
        // console.log("distanceY :"+ distanceY)

         if(distanceX >= 30){


         }


        if (Math.abs(distanceY)<= 10) {
            if (distanceX != 0) {
                e.preventDefault()
                if (translateX > 0) {
                    settanslateX(0)
                } else {
                    settanslateX(translateX)
                    isMove = true
                }
            }
        }


    })

    $('.main_Navigation_nav').on('touchend', function (e) {
        if (isMove) {
            e.stopPropagation()
            e.preventDefault()
            console.log(width)
            if (Math.abs(distanceX) < width / 3) {
                addTranslation();
                let translateX = -width * index_Navigation;
                settanslateX(translateX);
            } else {
                if (distanceX > 0) {
                    index_Navigation--;

                } else {
                    index_Navigation++;
                }
                addTranslation();
                let translateX = -width * index_Navigation;
                settanslateX(translateX);
                console.log(index_Navigation)
                $('.topBar-bottom>a').eq(index_Navigation).addClass('Recommend_common').siblings().removeClass('Recommend_common')
                if (index_Navigation === 1) {
                    animation_play_start($('.Recond'))
                    animation_play_start($('.dynamic-body>ul>li'))
                }
            }
            isMove = false
        }
    })

    $('.topBar-bottom>a').click(function () {
        index_Navigation = $(this).index()
        addTranslation()
        settanslateX(-width * index_Navigation)
        $('.topBar-bottom>a').eq(index_Navigation).addClass('Recommend_common').siblings().removeClass('Recommend_common')
        if (index_Navigation === 1) {
            animation_play_start($('.Recond'))
            animation_play_start($('.dynamic-body>ul>li'))
        }

    })

    let animation_play_start = function (el) {
        el.css({
            'animation-play-state': 'running'
        })
    }

    let animation_play_pause = function (el) {
        el.css({
            'animation-play-state': 'paused'
        })
    }

}

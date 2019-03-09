$(function () {
    main_Navigation()
})

let main_Navigation=function () {
    let addTranslation = function () {
        $('.main_Navigation_nav').css({
            transition:'transform 0.2s',
            webkitTransition:'transform 0.2s'
        })
    }
    let settanslateX = function (translateX) {
        $('.main_Navigation_nav').css({
            transform:'translateX(' + translateX + 'px)',
            webkitTransform:'translateX(' + translateX + 'px)'
        })

    }
     let startX=0
     let moveX=0
     let distanceX=0
     let isMove=false
     let width=0
     let index=0

    setTimeout(function () {
        width=document.querySelector('.bg-container').offsetWidth
    },100)
    window.addEventListener('resize',function () {
        width=$('.main_Navigation').width()
    })

     $('.main_Navigation_nav').on('touchstart',function (e) {

         startX = e.touches[0].clientX;

     })
    $('.main_Navigation_nav').on('touchmove',function (e) {
        e.preventDefault()
        moveX = e.touches[0].clientX;
        distanceX=moveX-startX

        let translateX = -width * index + distanceX;
        if(translateX>0){
            settanslateX(0)
        }else{
            settanslateX(translateX)
            isMove=true
        }
    })

    $('.main_Navigation_nav').on('touchend',function (e) {
        if(isMove){
            e.stopPropagation()
            e.preventDefault()
            if(Math.abs(distanceX)<width/3){
                addTranslation();
                let translateX = -width * index;
                settanslateX(translateX);
               }else {
                if (distanceX > 0) {
                    index--;

                } else {
                    index++;
                }
                addTranslation();
                let translateX = -width * index;
                settanslateX(translateX);
                console.log(index)
                $('.topBar-bottom>a').eq(index).addClass('Recommend_common').siblings().removeClass('Recommend_common')
                if(index === 1){
                    animation_play_start($('.Recond'))
                    animation_play_start($('.dynamic-body>ul>li'))
                }
            }
            isMove =false
        }
    })

    $('.topBar-bottom>a').click(function () {
        index= $(this).index()
        addTranslation()
        settanslateX(-width* index)
        $('.topBar-bottom>a').eq(index).addClass('Recommend_common').siblings().removeClass('Recommend_common')
        if(index === 1){
            animation_play_start($('.Recond'))
            animation_play_start($('.dynamic-body>ul>li'))
        }

    })

    let animation_play_start=function (el) {
        el.css({
            'animation-play-state':'running'
        })
    }

    let animation_play_pause=function (el) {
        el.css({
            'animation-play-state':'paused'
        })
    }

}

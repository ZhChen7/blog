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
        moveX = e.touches[0].clientX;
        distanceX=moveX-startX

        let translateX = -width * index + distanceX;

        settanslateX(translateX)
        isMove=true
    })

    $('.main_Navigation_nav').on('touchend',function (e) {
        if(isMove){
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
            }
        }
    })


}

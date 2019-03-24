$(function (e) {
    //调整侧边栏位置
    sideBar_Position()

    //侧边栏动画效果
    sideBar_showAndhide()

    dianzanAnimation()
})

let sideBar_Position=function () {
    let Width=window.innerWidth
    if(Width>900){
        $('.sidebar').css({'left':(Width-750)/2-10})
    }
    window.addEventListener('resize',function () {
        let innerWidth=window.innerWidth
        if(innerWidth<=772){
            $('.sidebar').css({'left':0})
        }else{
            $('.sidebar').css({'left':(innerWidth-750)/2-10})
        }
    })
}

let sideBar_showAndhide=function () {


    $('.icon-icon').click(function () {
        $('.sidebar').show(1500)
        $('.sidebar').css({
            display:'block',
            transition: 'width 2s,left 2s',
            transform: 'none'
        })
            //侧边栏bottom图片显示与否
            SideBar_Show();
    })


    $('.sideBar-right').click(function (e) {
        e.stopPropagation()
        $('.sidebar').hide(1000)
    })

    let addTranslation = function () {
       $('.sidebar').css({
           transition:'transform 0.2s',
           webkitTransition:'transform 0.2s'
       })
    }
    let settanslateX = function (translateX) {
        $('.sidebar').css({
            transform:'translateX(' + translateX + 'px)',
            webkitTransform:'translateX(' + translateX + 'px)'
        })

    }

    let startX = 0
    let moveX=0
    let distanceX = 0
    let isMove=false
    $('.sidebar').on('touchstart',function (e) {
        startX = e.touches[0].clientX;
    })

    $('.sidebar').on('touchmove',function (e) {
        moveX = e.touches[0].clientX;
        distanceX = startX - moveX;
        if(distanceX>0){
            settanslateX(-distanceX)
            isMove=true
        }else{
            distanceX=0
        }
    })

    $('.sidebar').on('touchend',function (e) {
        if(isMove){
           if( distanceX<$('.sidebar>.sidebar-main').width()*2/3){
               addTranslation()
               settanslateX(0)
           }
           else {
             settanslateX(-$('.sidebar').width())
               addTranslation()
               $('.sidebar').css({
                   display:'none',
                   transition: 'width 2s,left 2s',
                   transform: 'none'
               })
           }

        }
    })


}

let SideBar_Show = function () {

   let cleartime=setTimeout(function () {
        $('.Sidebar_Show_imgLogo').eq(0).show(3000).siblings().hide()
    },300)


    $('.Sidebar_Show_img').click(function (e) {
        e.stopPropagation()
        let index = $(this).index()
        if(index === 6){
            index=5
        }
        if(index === 7){
            index=6
        }
        $('.Sidebar_Show_imgLogo').eq(index - 3).show(1000).siblings().hide(0)

        $('.Show-img').click(function (e) {
            e.stopPropagation()
        })
        $('.sidebar-bottom').click(function (e) {

            $('.Sidebar_Show_imgLogo').hide(1000)
        })
    })
}


let dianzanAnimation =function () {
    $('.dianzan').click(function () {
        let num= parseInt($('.Click-num').html())
         num= num+1
        $('.Click-num').html(num)
        $('.dianzan').css({
            'animation-play-state':'running'
        })

    })
}

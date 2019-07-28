$(function () {
    //调整侧边栏位置
    sideBar_Position()
    //侧边栏动画效果
    sideBar_showAndhide()
    dianzanAnimation()
    //backTop
    backTop()
    //newpart
    newpart()
})

let sideBar_Position = function () {
    let Width = window.innerWidth
    if (Width > 900) {
        $('.sidebar').css({'left': (Width - 750) / 2 - 10})
    }
    window.addEventListener('resize', function () {
        let innerWidth = window.innerWidth
        if (innerWidth <= 772) {
            $('.sidebar').css({'left': 0})
        } else {
            $('.sidebar').css({'left': (innerWidth - 750) / 2 - 10})
        }
    })
}

let sideBar_showAndhide = function () {


    $('.icon-icon').click(function () {
        $('.sidebar').show(1500)
        $('.sidebar').css({
            display: 'block',
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
            transition: 'transform 0.2s',
            webkitTransition: 'transform 0.2s'
        })
    }
    let settanslateX = function (translateX) {
        $('.sidebar').css({
            transform: 'translateX(' + translateX + 'px)',
            webkitTransform: 'translateX(' + translateX + 'px)'
        })

    }

    let startX = 0
    let moveX = 0
    let distanceX = 0
    let isMove = false
    $('.sidebar').on('touchstart', function (e) {
        startX = e.touches[0].clientX;
    })

    $('.sidebar').on('touchmove', function (e) {
        moveX = e.touches[0].clientX;
        distanceX = startX - moveX;
        if (distanceX > 0) {
            settanslateX(-distanceX)
            isMove = true
        } else {
            distanceX = 0
        }
    })

    $('.sidebar').on('touchend', function (e) {
        if (isMove) {
            if (distanceX < $('.sidebar>.sidebar-main').width() * 2 / 3) {
                addTranslation()
                settanslateX(0)
            } else {
                settanslateX(-$('.sidebar').width())
                addTranslation()
                $('.sidebar').css({
                    display: 'none',
                    transition: 'width 2s,left 2s',
                    transform: 'none'
                })
            }

        }
    })


}

let SideBar_Show = function () {

    let cleartime = setTimeout(function () {
        $('.Sidebar_Show_imgLogo').eq(0).show(3000).siblings().hide()
    }, 300)


    $('.Sidebar_Show_img').click(function (e) {
        e.stopPropagation()
        let index = $(this).index()
        if (index === 6) {
            index = 5
        }
        if (index === 7) {
            index = 6
        }
        if(index == 9){
             index =7
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


let dianzanAnimation = function () {
    $('.dianzan').click(function () {
        let num = parseInt($('.Click-num').html())
        num = num + 1
        $('.Click-num').html(num)
        $('.dianzan').css({
            'animation-play-state': 'running'
        })

    })
}


let backTop = function () {
    let Width = window.innerWidth
    if (Width > 900) {
        $('.backTop').css({'left': (innerWidth - 750) / 2 + 750 - 150, 'bottom': 50})
    }
    window.addEventListener('resize', function () {
        let innerWidth = window.innerWidth
        if (innerWidth <= 772) {
            $('.backTop').css({'right': 50})
        } else {
            $('.backTop').css({'left': (innerWidth - 750) / 2 + 750 - 150, 'bottom': 50})
        }
    })

    $('.backTop').click(function () {
        let s = $(window).scrollTop();
        let v = 50;

        let sobj = setInterval(function () {
            s -= v;

            if (s <= 0) {
                s = 0;
                clearInterval(sobj);
            }

            $(window).scrollTop(s);
        }, 10);
    })

    window.addEventListener('scroll', function () {
        let scrollTop = $(window).scrollTop()
        if (scrollTop >= 20) {
            $('.backTop').show(1400)
        } else {
            $('.backTop').hide(1000)
        }
    })
}

let newpart=function () {
    //分类
    $('.PersonalSortbtn').click(function () {
        $('.PersonalSort').css({
            'max-height':'none'
        })
        $('.PersonalSortTextCenter').hide(800)
    })

    //three分类
    $('.PersonalSortbtn1').click(function () {
        $('.PersonalSort1').css({
            'max-height':'none'
        })
        $('.PersonalSortTextCenter1').hide(800)
    })

    //归档
    $('.Archiving_btn-link-blue').click(function () {
        $('.Archiving_content').css({
            'max-height':'none'
        })
        $('.Archiving_text-center').hide(800)
    })

    //three归档
    $('.Archiving_btn-link-blue1').click(function () {
        $('.Archiving_content1').css({
            'max-height':'none'
        })
        $('.Archiving_text-center1').hide(800)
    })

    $('.newpart_btn.type1 ').click(function () {
          $(this).hide(500)
          $('.newpartbox').hide(1000)
          setTimeout(function () {
              $('.wrap').fadeOut(1000)
          },800)

        setTimeout(function () {
            $('#newpartbiggestbox').fadeOut(800)

        },2000)
    })

    $('.newpart_btn.type1 ').mouseenter(function () {
        $('.wrap').fadeOut(1000)
        $('.newpart_btn.type1 ').mouseleave(function () {
            $('.wrap').fadeIn(300)
        })
    })

    $('#newpartbiggestbox').css({
        'background-size': 'none'
    })

    let newpartWidth = window.innerWidth
}

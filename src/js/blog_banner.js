$(function () {
     let index = 0
     setInterval(function () {
        index++
        if (index === 7) {
             index=0
        }
        $('.blog-banner>li').eq(index).fadeIn(3000).siblings().fadeOut(3000)
     },5000)

})

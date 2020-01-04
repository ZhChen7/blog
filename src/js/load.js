$(function () {
    // document.onreadystatechange = function () {//即在加载的过程中执行下面的代码
    //     //     if (document.readyState == "complete") {//complete加载完成
    //     //         $(".load").fadeOut();
    //     //     }
    //     // }
    window.addEventListener('DOMContentLoaded',function () {
        $(".load").fadeOut(600);
        initColorfulBubble();
    })

})

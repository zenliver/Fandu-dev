// Code by ZenLiver
// 凡度

// 全局变量
var screenWidth = $(window).width();
var screenHeight = $(window).height();

$(function () {

    // 设计师页面：设计师介绍modal
    $(".designer_profile").click(function () {
        $(this).siblings(".designer_profile_modal").children(".modal").modal();
    });

    // modal垂直居中（通用）
    $(".modal-dialog").each(function () {
        var modalHeight = $(this).actual("height");
        console.log(modalHeight);
        $(this).css({
            "margin-bottom": "0",
            "margin-top": (screenHeight-modalHeight)/2+"px"
        });
    });

    // 案例详情页：pad横屏以上自动设置.case_detail_content_section3下的.col-md-4的高度
    if (screenWidth >= 992) {
        var caseDetailSection3ImgHeight = $(".case_detail_content_section3 .col-md-8 img").height();
        $(".case_detail_content_section3 .col-md-4").css("height",caseDetailSection3ImgHeight+"px");
    }

    // 新闻详情页： .news_detail_section3 区域PC下全屏显示
    if (screenWidth >= 1200) {
        var newsDetailSection3ImgWidth = $(".news_detail_section3 img").width();
        $(".news_detail_section3").css({
            "margin-left": -(screenWidth-newsDetailSection3ImgWidth)/2+"px",
            "margin-right": -(screenWidth-newsDetailSection3ImgWidth)/2+"px"
        });
    }

    // sr动画

        // 启动sr
        window.sr = ScrollReveal({
            reset: true,
            mobile: true,
            easing: 'ease',
            distance: '30px'
        });

        // 添加sr动画
        // sr.reveal('.case_item .col-md-6:nth-child(1)', {
        //     duration: 1500,
        //     origin: 'left'
        // });
        // sr.reveal('.case_item .col-md-6:nth-child(2)', {
        //     duration: 1500,
        //     origin: 'right'
        // });

});

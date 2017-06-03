// Code by ZenLiver
// 凡度

$(function () {

    // 全局变量
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();

    // 设计师页面：设计师介绍modal
    $(".designer_profile").click(function () {
        $(this).siblings(".designer_profile_modal").children(".modal").modal();
    });

    // modal垂直居中（通用）

    $(window).load(function () {
        $(".modal-dialog").each(function () {
            var modalHeight = $(this).actual("height");
            console.log(modalHeight);
            $(this).css({
                "margin-bottom": "0",
                "margin-top": (screenHeight-modalHeight)/2+"px"
            });
        });
    });

    // 案例详情页：pad横屏以上自动设置.case_detail_content_section3下的.col-md-4的高度
    if (screenWidth >= 992) {
        $(window).load(function () {
            var caseDetailSection3ImgHeight = $(".case_detail_content_section3 .col-md-8 img").height();
            $(".case_detail_content_section3 .col-md-4").css("height",caseDetailSection3ImgHeight+"px");
        });
    }

    // 新闻详情页： .news_detail_section3 区域PC下全屏显示
    if (screenWidth >= 1200) {
        $(window).load(function () {
            var newsDetailSection3ImgWidth = $(".news_detail_section3 img").width();
            $(".news_detail_section3").css({
                "margin-left": -(screenWidth-newsDetailSection3ImgWidth)/2+"px",
                "margin-right": -(screenWidth-newsDetailSection3ImgWidth)/2+"px"
            });
        });
    }

    // 鼠标滑过图片后图片变暗
    function imgDarken(imgSelector) {
        $(imgSelector).mouseover(function () {
            $(this).addClass("darken");
        });
        $(imgSelector).mouseout(function () {
            $(this).removeClass("darken");
        });
    }
    imgDarken(".case_item .case_img img, .index_news_body .thumbnail>a>img");

    // 手动添加动画效果
    function addAnimation(selector,animationCssName) {
        $(selector).mouseover(function () {
            $(this).addClass(animationCssName);
        });
        $(selector).mouseout(function () {
            $(this).removeClass(animationCssName);
        });
    }


    $(".designer_joinus img.img-responsive").mouseover(function () {
        $(this).animateCss("rotateIn");
    });

    // 添加sr动画

        // 启动sr
        window.sr = ScrollReveal({
            reset: true,
            mobile: true,
            easing: 'ease',
            distance: '30px',
            // opacity: 0.5,
            scale: 1
        });

        // 首页
        sr.reveal(".index_news_body .col-md-4:nth-child(1)", {
            duration: 1000
        });
        sr.reveal(".index_news_body .col-md-4:nth-child(2)", {
            duration: 1000,
            delay: 200
        });
        sr.reveal(".index_news_body .col-md-4:nth-child(3)", {
            duration: 1000,
            delay: 400
        });
        // 新闻列表页
        sr.reveal(".news_item", {
            duration: 1000
        });
        if (screenWidth >= 992) {
            // 品牌页
            sr.reveal(".brand_story_body .section2 .row:nth-child(2n+1) .col-md-6:nth-child(1)", {
                duration: 1500,
                origin: "top"
            });
            sr.reveal(".brand_story_body .section2 .row:nth-child(2n+1) .col-md-6:nth-child(2)", {
                duration: 1500,
                origin: "bottom"
            });
            sr.reveal(".brand_story_body .section2 .row:nth-child(2n) .col-md-6:nth-child(1)", {
                duration: 1500,
                origin: "right"
            });
            sr.reveal(".brand_story_body .section2 .row:nth-child(2n) .col-md-6:nth-child(2)", {
                duration: 1500,
                origin: "left"
            });

        }
        else {
            // 品牌页
            sr.reveal(".brand_story_body .section2 .row .col-md-6", {
                duration: 1500
            });
        }
        // 品牌页
        sr.reveal(".brand_story_body .section3 .row .col-md-6:nth-child(1)", {
            duration: 1500,
            origin: "top"
        });
        sr.reveal(".brand_story_body .section3 .row .col-md-6:nth-child(2)", {
            duration: 1500,
            origin: "bottom"
        });
        // 案例
        sr.reveal('.case_item', {
            duration: 1000
        });
        // 产品列表
        sr.reveal(".products_item", {
            duration: 1000,
            delay: 200
        });


});

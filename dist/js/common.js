// Code by ZenLiver
// 凡度

$(function () {

    // FastClick
    // FastClick.attach(document.body);
    // window.addEventListener('load', function() {
    //   FastClick.attach(document.body);
    // }, false);

    // 全局变量
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();

    // 返回顶部
    $(window).load(function () {
        var elevator = new Elevator({
            element: document.querySelector(".footer_backtotop img"),
            duration: 600, // milliseconds
            endCallback: function () {
                // $("body").animateCss("bounce");
            }
        });
    });

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
    // imgDarken(".case_item .case_img img, .index_news_body .thumbnail>a>img");

    // 鼠标滑过图片后图片放大
    function imgScale(imgSelector) {
        $(imgSelector).each(function () {
            $(this).parent().css("display","block"); // 必须先设为display:block，否则如果img的父元素是a的话无法获取正确的宽高
        });
        $(window).load(function () {
            $(imgSelector).each(function () {
                var imgParentElWidth = $(this).parent().width();
                var imgParentElHeight = $(this).parent().height();
                $(this).mouseover(function () {
                    $(this).parent().css({
                        "overflow": "hidden",
                        "max-width": (imgParentElWidth+1)+"px",
                        "max-height": (imgParentElHeight+1)+"px"
                    });
                    $(this).addClass("scaleLarger");
                });
                $(this).mouseout(function () {
                    $(this).removeClass("scaleLarger");
                    $(this).addAnimation("scaleDefault");
                });
            });

        });
    }

    imgScale(".case_item .case_img img");
    imgScale(".index_news_body .thumbnail>a>img");
    imgScale(".brand_story_body .col-md-6 img");
    // imgScale(".products_item>a>img");
    imgScale("#honor .col-xs-6>a>img");

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

    // 顶部导航置顶效果
    $(window).scroll(function () {
        var scrollHeight = $(window).scrollTop();
        // console.log(scrollHeight);
        if (scrollHeight >= 1) {
            $("#header").addClass("fixed_top");
            $("body").addClass("padding_top");
        }
        else {
            $("#header").removeClass("fixed_top");
            $("body").removeClass("padding_top");
        }
    });

    // 产品列表页：分类图标区域自动居中
    var productsCateItemColWidth = $("#products_subnav .row .col-md-2").width();
    console.log(productsCateItemColWidth);
    var productsCateItemColNum = $("#products_subnav .row .col-md-2").length;
    if (screenWidth >= 768) {
        $("#products_subnav .row .col-md-2").css("width",(100/productsCateItemColNum)+"%");
    }
    if (screenWidth >= 1200) {
        $("#products_subnav .row").css({
            "padding-left": (1083-productsCateItemColWidth*productsCateItemColNum)/2+"px",
            "padding-right": (1083-productsCateItemColWidth*productsCateItemColNum)/2+"px"
        });
    } else if (screenWidth < 1200 && screenWidth >= 992) {
        $("#products_subnav .row").css({
            "padding-left": (940-productsCateItemColWidth*productsCateItemColNum)/2+"px",
            "padding-right": (940-productsCateItemColWidth*productsCateItemColNum)/2+"px"
        });
    } else if (screenWidth < 992 && screenWidth >= 768) {
        $("#products_subnav .row").css({
            "padding-left": (720-productsCateItemColWidth*productsCateItemColNum)/2+"px",
            "padding-right": (720-productsCateItemColWidth*productsCateItemColNum)/2+"px"
        });
    }

    // 产品分类active效果
    var pageUrl = window.location.href;
    var hostname = window.location.host;
    console.log(hostname);
    // var pagePathName = window.location.pathname;
    var pagePathName = pageUrl.slice(hostname.length+7);
    console.log(pagePathName);

    if (pageUrl.indexOf("/products/") >= 0) {
        var productsCateLinks = $("#products_subnav .row .col-md-2 a");
        var productsCateUrls = new Array();
        for (var i = 0; i < productsCateLinks.length; i++) {
            productsCateUrls[i]=productsCateLinks.eq(i).attr("href");
            console.log(productsCateUrls);
        }
        for (var n = 0; n < productsCateLinks.length; n++) {
            if (productsCateUrls[n].indexOf(pagePathName)>=0) {
                // productsCateUrls[n].slice(0,-5)
                if (pagePathName != "/products/") {
                    $(".products_subnav_item").removeClass("active");
                    $("#products_subnav .row .col-md-2 a").eq(n).children(".products_subnav_item").addClass("active");
                    break;
                }
                else {
                    $(".products_subnav_item").removeClass("active");
                }
            }
            else {
                $(".products_subnav_item").removeClass("active");
            }
        }
    }

    // swiper

        // bannerSwiper
        var bannerSwiper;
        if (screenWidth >= 1200) {
            bannerSwiper = new Swiper('#index_slides .swiper-container', {
                // direction: 'vertical',
                loop: true,

                // pagination
                pagination: '#index_slides .swiper-pagination',
                paginationClickable: true,
                // slidesPerView: 4,
                // spaceBetween: 100,

                // Navigation arrows
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',

                autoplay: 3000,
                autoplayDisableOnInteraction: false,
                speed: 800

                // scrollbar
                // scrollbar: '.swiper-scrollbar',
            });
        }
        else {
            bannerSwiper = new Swiper('#index_slides .swiper-container', {
                // direction: 'vertical',
                loop: true,

                // pagination
                pagination: '#index_slides .swiper-pagination',
                paginationClickable: true,
                // slidesPerView: 4,
                // spaceBetween: 100,

                // Navigation arrows
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',

                autoplay: 3000,
                autoplayDisableOnInteraction: false,
                speed: 800

                // scrollbar
                // scrollbar: '.swiper-scrollbar',
            });
        }



        // swiper视频播放效果
        var swiperVideoPlayer = videojs("swiper_video_container");



        if (screenWidth >= 1200) { // PC下


            $("body").on("click","#index_slides #swiper_video_container",function () {
                // event.preventDefault();
                // event.preventDefault();
                    // event.stopPropagation();
                    // return false;
                // $("#swiper_video_container_html5_api").stop();
                // alert("fastclick!");

                if (bannerSwiper.classNames.length > 0) { // 只有当前页面上存在该swiper时才执行下面的代码，防止报错。只有当前页面上存在该swiper时swiper的classNames属性才不为空，否则swiper的classNames属性是一个空的数组。
                    bannerSwiper.stopAutoplay();

                }

                $("body").append('<div class="swiper_video_mask">');
                $("body").append($(".swiper-slide-active .swiper_slide_video"));
                $("body > .swiper_slide_video").css("margin-top",(-indexVideoHeight/2)+"px");
                $("body > .swiper_slide_video .vjs-big-play-button").trigger("click");
            });
            // console.log(swiperVideoPlayer);
            // swiperVideoPlayer.on("pause",function () {
            //     // alert("播放暂停！");
            // });
            $("body").on("click",".swiper_video_mask",function () {
                $(this).remove();
                $("body > .swiper_slide_video").appendTo($(".swiper-slide-active .container"));
                if (bannerSwiper.classNames.length > 0) { // 只有当前页面上存在该swiper时才执行下面的代码，防止报错。只有当前页面上存在该swiper时swiper的classNames属性才不为空，否则swiper的classNames属性是一个空的数组。
                    bannerSwiper.startAutoplay();

                }
            });


        } else { // 移动设备下


            $("body").on("click","#index_slides .swiper_video_container_mask",function () { // 移动设备下避免click事件无效的变通方法：直接点击视频在移动设备上会直接触发视频的播放，给视频绑定的click事件不会执行，改为在视频上方通过绝对定位显示一个透明的遮罩层，给遮罩层绑定click事件就可以有效解决这个问题。给遮罩层绑定click事件，点击是点在遮罩层上，避免了直接点在视频上带来的问题。

                // event.preventDefault();
                // event.preventDefault();
                    // event.stopPropagation();
                    // return false;
                // $("#swiper_video_container_html5_api").stop();
                // alert("fastclick!");

                if (bannerSwiper.classNames.length > 0) { // 只有当前页面上存在该swiper时才执行下面的代码，防止报错。只有当前页面上存在该swiper时swiper的classNames属性才不为空，否则swiper的classNames属性是一个空的数组。
                    bannerSwiper.stopAutoplay();

                }

                $(this).hide();
                $("body").append('<div class="swiper_video_mask">');
                $("body").append($(".swiper-slide-active .swiper_slide_video"));
                $("body > .swiper_slide_video").css("margin-top",(-indexVideoHeight/2)+"px");
                $("body > .swiper_slide_video .vjs-big-play-button").trigger("click");
                swiperVideoPlayer.play();

            });
            // console.log(swiperVideoPlayer);
            // swiperVideoPlayer.on("pause",function () {
            //     // alert("播放暂停！");
            // });
            $("body").on("click",".swiper_video_mask",function () {
                $(this).remove();
                swiperVideoPlayer.pause();
                $("body > .swiper_slide_video").attr("style","");
                $("body > .swiper_slide_video .swiper_video_container_mask").show();
                $("body > .swiper_slide_video").appendTo($(".swiper-slide-active .container"));
                if (bannerSwiper.classNames.length > 0) { // 只有当前页面上存在该swiper时才执行下面的代码，防止报错。只有当前页面上存在该swiper时swiper的classNames属性才不为空，否则swiper的classNames属性是一个空的数组。
                    bannerSwiper.startAutoplay();

                }
            });


        }


        if (screenWidth < 768) {
            var indexVideoHeight = screenWidth*0.5625;
            $("#swiper_video_container, #index_slides .swiper-slide-wrapper").css("height",indexVideoHeight+"px");
        }
        // $("#index_slides .swiper-slide-active .swiper-slide-bigtext").css("opacity","0");
        // $("#index_slides .swiper-slide-active .swiper-slide-smtxt").css("opacity","0");

        // $("#index_slides .swiper-slide-active .swiper-slide-bigtext").addAnimation("fadeIn");
        // $("#index_slides .swiper-slide-active .swiper-slide-bigtext").attr("style","");
        // setTimeout(function () {
            // $("#index_slides .swiper-slide-active .swiper-slide-smtxt").addAnimation("fadeIn");
            // $("#index_slides .swiper-slide-active .swiper-slide-smtxt").attr("style","");

        // },400);

        // setTimeout(function () {
            // $("#index_slides .swiper-slide-active .swiper-slide-bigtext").addAnimation("fadeOut");
            // $("#index_slides .swiper-slide").eq(activeIndex).find(".swiper-slide-bigtext").addAnimation("fadeOut");
            // $("#index_slides .swiper-slide-bigtext").addAnimation("fadeOut");
        // },5000);
        // setTimeout(function () {
            // $("#index_slides .swiper-slide-active .swiper-slide-smtxt").addAnimation("fadeOut");
            // $("#index_slides .swiper-slide").eq(activeIndex).find(".swiper-slide-bigtext").addAnimation("fadeOut");
            // $("#index_slides .swiper-slide-bigtext").addAnimation("fadeOut");
        // },5400);

        // bannerSwiper.on("slideChangeStart",function () {
        //     var activeIndex = bannerSwiper.activeIndex;
        //     console.log(activeIndex);
            // $("#index_slides .swiper-slide-active .swiper-slide-bigtext").removeClass("fadeIn");
            // $("#index_slides .swiper-slide-active .swiper-slide-bigtext").addAnimation("fadeIn");
            // setTimeout(function () {
                // $("#index_slides .swiper-slide-active .swiper-slide-smtxt").removeClass("fadeIn");
                // $("#index_slides .swiper-slide-active .swiper-slide-smtxt").addAnimation("fadeIn");

            // },400);
            // $("#index_slides .swiper-slide").eq(activeIndex).find(".swiper-slide-bigtext").addAnimation("fadeIn");
            // $("#index_slides .swiper-slide-bigtext").addAnimation("fadeIn");

        // });

        // bannerSwiper.on("slideChangeEnd",function () {
        //     var activeIndex = bannerSwiper.activeIndex;
        //     console.log(activeIndex);
        //     setTimeout(function () {
                // $("#index_slides .swiper-slide-active .swiper-slide-bigtext").removeClass("fadeOut");
                // $("#index_slides .swiper-slide-active .swiper-slide-bigtext").addAnimation("fadeOut");
                // $("#index_slides .swiper-slide").eq(activeIndex).find(".swiper-slide-bigtext").addAnimation("fadeOut");
                // $("#index_slides .swiper-slide-bigtext").addAnimation("fadeOut");
            // },5000);
            // setTimeout(function () {
                // $("#index_slides .swiper-slide-active .swiper-slide-smtxt").removeClass("fadeOut");
                // $("#index_slides .swiper-slide-active .swiper-slide-smtxt").addAnimation("fadeOut");
                // $("#index_slides .swiper-slide").eq(activeIndex).find(".swiper-slide-bigtext").addAnimation("fadeOut");
                // $("#index_slides .swiper-slide-bigtext").addAnimation("fadeOut");
        //     },5400);
        // });


        // productsSwiper
        var productsSwiper = new Swiper ('#index_products .swiper-container', {
            // direction: 'vertical',
            loop: true,

            // pagination
            // pagination: '#index_products .swiper-pagination',
            // paginationClickable: true,
            slidesPerView: 4,
            // spaceBetween: 50,
            breakpoints: {
                991: {
                    slidesPerView: 3,
                    // spaceBetween: 40
                },
                767: {
                    slidesPerView: 2,
                    // spaceBetween: 30
                },
                480: {
                    slidesPerView: 1,
                    // spaceBetween: 20
                },
                320: {
                    slidesPerView: 1,
                    // spaceBetween: 10
                }
            },

            // Navigation arrows
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',

            autoplay: 3000,
            autoplayDisableOnInteraction: false,
            speed: 800

            // scrollbar
            // scrollbar: '.swiper-scrollbar',
        })

    // sr动画

        // 启动sr
        window.sr = ScrollReveal({
            reset: true,
            mobile: true,
            easing: 'ease',
            distance: '30px',
            opacity: 0,
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
        sr.reveal(".index_products_title_cn, .index_case_head_cn, .index_news_head_cn", {
            origin: "top",
            duration: 600
        });
        sr.reveal(".index_products_title_en, .index_case_head_en, .index_news_head_en", {
            duration: 600
        });
        // 新闻列表页
        sr.reveal(".news_item", {
            duration: 1000
        });
        if (screenWidth >= 992) {
            // 品牌页
            sr.reveal(".brand_story_body .section2 .row:nth-child(2n+1) .col-md-6:nth-child(1)", {
                duration: 1000,
                origin: "top"
            });
            sr.reveal(".brand_story_body .section2 .row:nth-child(2n+1) .col-md-6:nth-child(2)", {
                duration: 1000,
                origin: "bottom"
            });
            sr.reveal(".brand_story_body .section2 .row:nth-child(2n) .col-md-6:nth-child(1)", {
                duration: 1000,
                origin: "right"
            });
            sr.reveal(".brand_story_body .section2 .row:nth-child(2n) .col-md-6:nth-child(2)", {
                duration: 1000,
                origin: "left"
            });

        }
        else {
            // 品牌页
            sr.reveal(".brand_story_body .section2 .row .col-md-6", {
                duration: 1000
            });
        }
        // 品牌页
        sr.reveal(".brand_story_body .section3 .row .col-md-6:nth-child(1)", {
            duration: 1000,
            origin: "top"
        });
        sr.reveal(".brand_story_body .section3 .row .col-md-6:nth-child(2)", {
            duration: 1000,
            origin: "bottom"
        });
        // 案例
        // sr.reveal('.case_item', {
        //     duration: 1000
        // });
        // 产品列表
        sr.reveal(".products_item", {
            duration: 1000
        });


});

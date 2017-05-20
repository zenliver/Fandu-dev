// *** jQuery插件 ***

// 手机下类thumbnail图片显示高度自适应
    // 限制 img 的父元素 a 的高度以避免用户上传的图片过高导致页面布局错乱
    // 使用方法：$(imgSelector).thumbImgAutoHeight(imgDesignRatio);

$.fn.thumbImgAutoHeight = function (imgDesignRatio) {
    var screenWidth=$(window).width();
    if (screenWidth<768) { // 只在手机下执行
        this.each(function () {
            // console.log(this);
            var imgWidth=$(this).width();
            console.log(imgWidth);
            $(this).parent().css("height",imgWidth*imgDesignRatio);
        });
    }
    var imgSelector=this; // 用imgSelector指代 $(this)

    $(window).resize(function () {
        var screenWidthNew=$(window).width();
        if (screenWidthNew<768) { // 只在手机下执行
            // console.log(this);
            imgSelector.each(function () {
                // console.log(this);
                var imgWidth=$(this).width();
                console.log(imgWidth);
                $(this).parent().css("height",imgWidth*imgDesignRatio);
            });

            // console.log(imgSelector);
        }
        else { // 窗口拖动到非手机尺寸时清除JS设置的宽高
            imgSelector.css("height","");
            console.log(imgSelector.width());
        }
    });
};

// 手机下视频播放器宽高自适应
    // 使用方法：$(videoSelector).videoAutoResize(videoRatio);

$.fn.videoAutoResize = function (videoRatio) {
    var screenWidth=$(window).width();
    if (screenWidth<768) { // 只在手机下执行
        $(this).css("width",(screenWidth-30)+"px");
        $(this).css("height",(screenWidth-30)*videoRatio+"px");
    }
    var videoSelector=$(this); // 用videoSelector指代 $(this)
    $(window).resize(function () {
        var screenWidthNew=$(window).width();
        if (screenWidthNew<768) { // 只在手机下执行
            // console.log(this);
            console.log(videoSelector);
            videoSelector.css("width",(screenWidthNew-30)+"px");
            videoSelector.css("height",(screenWidthNew-30)*videoRatio+"px");
        }
        else { // 窗口拖动到非手机尺寸时清除JS设置的宽高
            videoSelector.css({"width":"", "height":""});
        }
    });
};

$.fn.extend({
    // animate.css
        // 使用方法：$("selector").animateCss("animationName");
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

// *** 通用函数和功能 ***

// 给当前页的顶部导航项添加active样式

var currentPagePath=location.pathname.slice(1);
console.log(currentPagePath);
var navbarHrefs=new Array();
var navbarLinks=$(".nav.navbar-nav li a");
for (var i = 0; i < navbarLinks.length; i++) {
    navbarHrefs[i]=navbarLinks.eq(i).attr("href");
    console.log(navbarHrefs);
}
for (var n = 0; n < navbarLinks.length; n++) {
    if (navbarHrefs[n].indexOf(currentPagePath)>=0) {
        // navbarHrefs[n].slice(0,-5)
        if (currentPagePath != "") {
            $(".nav.navbar-nav li").removeClass("active");
            $(".nav.navbar-nav li a").eq(n).parent().addClass("active");
            break;
        }
    }
}

// 手机下折叠菜单添加动画效果

var navbarLis=$(".navbar-nav li");
var animationDelay=0;
for (var i = 0; i < navbarLis.length; i++) {
    navbarLis.eq(i).css("animation-delay",animationDelay+"s");
    animationDelay=animationDelay+0.05;
}
$(".navbar-toggle").click(function () {
    $(".navbar-nav li").toggleClass("animated fadeInUp");
    // $(".navbar-nav li").animateCss("fadeInUp");
});

// 手机下视频播放器宽高自适应
    // 使用方法：videoAutoResize(videoSelector,videoRatio);

function videoAutoResize(videoSelector,videoRatio) {
    function videoPlayerAutoResize(videoSelector,videoRatio) {
        var screenWidthInFunc=$(window).width();
        $(videoSelector).css("width",(screenWidthInFunc-30)+"px");
        $(videoSelector).css("height",(screenWidthInFunc-30)*videoRatio+"px");
    }
    var screenWidth = $(window).width();
    if (screenWidth<768) {
        videoPlayerAutoResize(videoSelector,videoRatio);
    }
    $(window).resize(function () {
        var screenWidthNew=$(window).width();
        if (screenWidthNew<768) {
            videoPlayerAutoResize(videoSelector,videoRatio);
        }
        else {
            $(videoSelector).css({"width":"", "height":""});
        }
    });
}

// 手机下thumbnail组件图片显示高度自适应
    // 使用方法：newsThumbDisplayAutoHeight(imgSelector,imgDesignRatio);

function newsThumbDisplayAutoHeight(imgSelector,imgDesignRatio) {
    var screenWidth=$(window).width();
    // var imgMaxWidth=screenWidth-30;
    // console.log(imgMaxWidth);
    if (screenWidth < 768) {
        $(imgSelector).each(function () {
            var imgWidth=$(this).width();
            console.log(imgWidth);
            $(this).parent().css("height",imgWidth*imgDesignRatio);
        });
    }
}

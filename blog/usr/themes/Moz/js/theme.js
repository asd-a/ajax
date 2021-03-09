$(function() {
    var a = $(".nav li").find("a.active").parent().index();
    if (a < 0) {
        $(".left-nav").find(".ninja").css({
            top: 0 + "px"
        });
    } else {
        $(".left-nav").find(".ninja").css({
            top: (a - 1) * 50 + "px"
        });
    }
    useWidgetLoop(".loop", ".change-card", ".widget");
    $(".minilize-fold").click(function() {
        if (!$("body").hasClass("show-sider")) {
            $("body").addClass("show-sider");
        } else {
            $("body").removeClass("show-sider");
        }
    });
    $(window).resize(function() {
        if ($(this).width() > 768) {
            $("body").removeClass("show-sider");
        }
    });
});

$(".nav li").click(function() {
    $(".left-nav .nav").each(function() {
        $("a", this).removeClass("active");
    });
    $("a", this).addClass("active").parents("ul").children(".ninja").css({
        top: ($(this).index() - 1) * 50 + "px"
    });
});
function useWidgetLoop(b, c, d) {
    var e = $("" + b);
    $("" + c).click(function() {
        var a = e.children("" + d);
        a.each(function() {
            switch (+$(this).css("z-index")) {
              case 100:
                $(this).css("z-index", 70);
                break;

              case 90:
                $(this).css("z-index", 100);
                break;

              case 80:
                $(this).css("z-index", 90);
                break;

              case 70:
                $(this).css("z-index", 80);
                break;

              default:
                console.log("出错呢！");
                break;
            }
        });
    });
}
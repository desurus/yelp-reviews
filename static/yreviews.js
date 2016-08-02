var YREVIEWS = YREVIEWS || {};

(function(o, $){
    o.init = function(){
        alert("double awesome!");
        $("#title").css("color", "green");
    };
    $(document).ready(function(){
        o.init();
        /*$("#title").css("color", "red");*/
    })
})(YREVIEWS, jQuery);


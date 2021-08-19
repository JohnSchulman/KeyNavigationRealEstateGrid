
let medias, id_company, isShowMedia = false, gridAnim, cities = new Array();

$(document).ready(function() {

    const urlVars = new URLSearchParams(window.location.search);
    id_company = urlVars.get('c');
    console.log("id_company="+id_company);
    $("#logo").attr("src","http://www.display-engine.com/client/clients/"+id_company+"/logo.jpg");

    $.caph.focus.activate(function(nearestFocusableFinderProvider, controllerProvider) {
        controllerProvider.onFocused(function(event, originalEvent) {
            $(event.currentTarget).css({
                border: '3px solid red'
            });
        });

        controllerProvider.onBlurred(function(event, originalEvent) {
            $(event.currentTarget).css({
                border : '3px solid transparent'
            });
        });

         controllerProvider.onSelected(function(event, originalEvent){
              $(event.currentTarget).toggleClass("selected");
        });
    });

    var media = new Medias();
    media.getMedias();

    //-- Search engine --//
    $("select").change(function(){
        clearInterval(gridAnim);
        $(".card").css("opacity",0);    
    var grid = new Grid();
    grid.buildGrid();
    });

});







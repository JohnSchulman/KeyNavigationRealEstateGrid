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

    getMedias();

    //-- Search engine --//
    $("select").change(function(){
        clearInterval(gridAnim);
        $(".card").css("opacity",0);
        buildGrid();
    });

});

function buildGrid() {
    getCities();
  //  getPriceMax();
    let html = "";
    $.each( medias, function(key, media) {
        //console.log("build grid fonctionne");
        //-- Tri de la grille --//
        if (media.id_form != "14") return true;
        if( typeof(media.photo) == "undefined" ) return true;

        //-- Search engine --//

        //-- Quand la transaction du select est different des media on passe
        //-- Mais quand il sont les mêmes on retourne false
        let transaction = $("#transaction").val();
        if (transaction > 0) { if (transaction != media.transaction) return true; } 
        let type = $("#type").val();
        if (type > 0) { if (type != media.type  ) return true; }
        let rooms = $("#rooms").val();
        //console.log("rooms: " + rooms + " media " + media.rooms);
        if(rooms > 0){if (rooms != media.rooms ) return true;}

        var city = $("#city").val();
        
       // console.log("city:" + city + "media" + media.city);
        if(typeof(city) == "string" && (city != "0"))
        {// je suis dans le filter, j affiche que le media qui ont un city egale au city selectionne par l utilisateur (city)
            if (city != media.city) return true;
        }

        let price = $("#price").val();
        if (price > 0) { if (price < media.price && media.price !== "" && typeof(media.price) != "undefined" && media.price !== "undefined") return true; }
        //console.log("price: " + price + "media: " + media.price); 

        //-- Affichage de la grille --//
        if (media.photo.length != 0) {
            html += `
            <div focusable class="card" id='` + media.id + `' style="background-image:url(http://display-engine.com/client/clients/` + media.id_company+ `/medias/` + media.id + `/photos/thumb/01.jpg)">
                <div class="infos">'`+ (media.price > 0 ? '<div class="price">' + Intl.NumberFormat().format(media.price) + ' €</div>' : '') +
                    `<div class="title">` + media.city + `</div>` +
                    (media.area == "" ? "" : (media.rooms == "" ? '<div class="area" style="left:0;">' + media.area + 'm²</div>' : '<div class="rooms">' + media.rooms + 'P</div>' +
                    (media.area == "" ? "" : "<div class='area' style:'left:18%;'>" + media.area + "m²</div>"))) +
                `</div>
            </div>`
        }
    });

    /*(medias[media]["area"] == "" ? "" : (medias[media]["rooms"] == "" ? "<div class='area' style='left:0;'>" 
        + medias[media]['area'] + "m²</div>" : "<div class='rooms'>" 
    html +=  '<div focusable class="card" id='+ media.id +' style="background-image:url(/clients/' + media.id_company+ '/medias/' + media.id+ '/photos/thumb/01.jpg)"><div class="infos">' + (media.price > 0 ? '<div class="price">' + media.price + '</div>' : '')+'<div class="title">' + media.city + '</div> ' + (media.rooms > 0 ? '<div class="rooms">' + media.rooms + ' P</div>' : '') + (media.area > 0 ? '<div class="area">' + media.area + 'm²</div>' : '')+'</div></div>'                                                                                                                                                           + medias[media]['rooms'] + "P</div>" + (medias[media]["area"] == "" ? "" : "<div class='area' style='left:18%;'>" + medias[media]['area'] 
                                                      */                                                                                                                      
                                                                                /*
      //-- Affichage de la grille --//
      if (media.photo.length != 0) {
        html +=  '<div focusable class="card" id='
        + media.id 
        +' style="background-image:url(http://display-engine.com/client/clients/' + media.id_company+ '/medias/'  + media.id + '/photos/thumb/01.jpg)"><div class="infos">' 
        + (media.price > 0 ? '<div class="price">' 
        + media.price 
        + '</div>' : '')
        +'<div class="title">' 
        + media.city 
        + '</div> ' 
        + (media.rooms > 0 ? '<div class="rooms">' 
        + media.rooms 
        + ' P</div>' : '') 
        + (media.area > 0 ? '<div class="area">' 
        + media.area 
        + 'm²</div>' : '')
        +'</div></div>'
    }   
});
*/

 
 
    $("#list").empty().append(html);
    //console.log("html="+html);

    //-- Animation grille --//
    let nb = 0;
    
    gridAnim = setInterval( function() {
        $(".card:eq("+nb+")").css("opacity",1);
        nb++;
        if (nb > 30) clearInterval(gridAnim);
    }, 100);

    let m = $("#media");

    //-- Click sur les tuiles --//
    $(".card").click( function() {
       // console.log("id="+$(this).attr("id"));
        let that = $(this);
        m.attr("src","https://www.display-foundry.com/medias/product.html?id="+$(this).attr("id")).one("load", function() {
            console.log("iframe loaded !");
            m.css({"transform":"scale(1)","opacity":1}).one("transitionend", function() {
                console.log("iframe maximized !");
                that.css("opacity",0.5);
                $("#iframeClick").css("display","block").one("click", function() {
                    $("#iframeClick").css("display","none");
                    console.log("iframe clicked !");
                    m.css({"transform":"scale(0.01)","opacity":0});
                });
            });
        })
    });

}

function getMedias() {

    // S'il y a deja une item dans localstorage
    // Tu le récupère dans media après l'avoir parsé. (Retransformer en objet)
    if(sessionStorage.getItem("medias"+id_company)) {
        medias = JSON.parse(sessionStorage.getItem("medias"+id_company));
        buildGrid();
    } else {
        let MediasAPI = "https://www.display-foundry.com/api.php?a=medias&id_company="+id_company;

        $.getJSON(MediasAPI, function(m) {
            delete m.conf;
            medias = m;
            //console.log(medias);
            buildGrid();
            // Tu set ton grid avec sessionStorage dans le cache du navigateur
            // Pour cela tu doit stringify (transformer ton objet en string)
            sessionStorage.setItem("medias"+id_company, JSON.stringify(medias));
        })
        .fail(function() {
            console.log( "error" );
        })
    }

}

 

function getCities() {
  // ---------------------Pour les villes ---------------------
  $.each( medias, function(key, media){
    if (media.id_form != "14") return true;
    if(media.city !== "" && typeof(media.city) != "undefined" && media.city !== "undefined"){
        // On crée les options pour le select
        let citySelector = document.getElementById("city");
        let option = document.createElement("option");
        // On définie la valeur puis le texte
        option.value = media.city;
        //var city = $("#city").val();
        option.innerHTML = media.city;
        //console.log("city:" + city + "media" + media.city);
        // On ajoute l'option au select
        citySelector.add(option);
        // On supprime les doublons
        const cityArray = []
        let cityOptions = document.querySelectorAll("#city > option");
        for (option of cityOptions){
            // Si le tableau cityArray contient déjà la l'option, alors on supprime
            if(cityArray.includes(option.value)){
                option.remove();
            // Sinon on l'ajoute
            }else{
                cityArray.push(option.value);
            }
        }
        };
    });
}

function getPriceMax() {
    //-- cities = construire le array cities en bouclant sur les medias
    $.each( medias, function(key, media) {
        if (media.id_form != "14") return true;
        if(media.price !== "" && typeof(media.price) != "undefined" && media.price !== "undefined"){
           // var price = media.price ;
           document.getElementById("price");
           var tranche1 = document.getElementById('tranche1').value;
           var tranche2 = document.getElementById('tranche2').value;
           console.log("tranche1: " + tranche1);
           console.log("tranche2: " + tranche2);
          /*  if(media.price <= tranche1){
                let price = $("#price").val();
        if (price > 0) { if (price < media.price && media.price !== "" +
        && typeof(media.price) != "undefined" +
        && media.price !== "undefined") return true; }
            }
            */

    }
});
}
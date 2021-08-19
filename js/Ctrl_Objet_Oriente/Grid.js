class Grid extends Cities {

    constructor(){
  }
   
   buildGrid() {
    var villes = new Cities();
    villes.getCities();
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
        
        //console.log("city:" + city + "media" + media.city);
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
}
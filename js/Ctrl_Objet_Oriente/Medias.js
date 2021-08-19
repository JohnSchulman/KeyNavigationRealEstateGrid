class Medias{

    constructor() {
    }

    getMedias() {

    // S'il y a deja une item dans localstorage
    // Tu le récupère dans media après l'avoir parsé. (Retransformer en objet)
    if(sessionStorage.getItem("medias"+id_company)) {
        medias = JSON.parse(sessionStorage.getItem("medias"+id_company));
        var grid = new Grid();
        grid.buildGrid();
    } else {
        let MediasAPI = "https://www.display-foundry.com/api.php?a=medias&id_company="+id_company;

        $.getJSON(MediasAPI, function(m) {
            delete m.conf;
            medias = m;
            //console.log(medias);
            var grid = new Grid();
            grid.buildGrid();
            // Tu set ton grid avec sessionStorage dans le cache du navigateur
            // Pour cela tu doit stringify (transformer ton objet en string)
            sessionStorage.setItem("medias"+id_company, JSON.stringify(medias));
        })
        .fail(function() {
            console.log( "error" );
        })
    }

  }

}



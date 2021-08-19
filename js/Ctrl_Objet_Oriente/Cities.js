class Cities  {
    

    constructor() {
    }

    let medias, id_company, isShowMedia = false, gridAnim, cities = new Array();


    getCities() {

    //-- cities = construire le array cities en bouclant sur les medias
    $.each( medias, function(key, media) {
        if (media.id_form != "14") return true;
        if(media.city !== "" && typeof(media.city) != "undefined" && media.city !== "undefined"){
            var city = media.city ;
            if (!cities.includes(city)) {
                cities.push(city);
            }
        }
    });
  //  console.log(cities);
    //-- on construit le select avec les cities triés
    cities = cities.sort();
    $.each(cities, function(key,city) {
        var selectVille = document.getElementById("city");
        var option = document.createElement("option");
        option.text = city;
        option.val = city;
        selectVille.add(option);
    });
    }
}

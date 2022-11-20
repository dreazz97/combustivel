let seixal_fuel_title_data = [];
let seixal_fuel_price_data = [];
let seixal_fuel_type_data = [];
let location_lat = [];
let location_lon = [];
let item_clicker = [];

var municipio = 229;
//Seixal = 229
//Almada = 222
//Sesimbra = 230

  async function getFuelData() {

    const myKeysValues = window.location.search;
    if (myKeysValues == '?municipio=222'){
      municipio = 222;
      document.querySelector(".title").innerHTML="Preço Gasolina Simples Mais Barata de Almada.";
      document.getElementById("municipio").selectedIndex = 0
    } else if (myKeysValues == '?municipio=229') {
      municipio = 229;
      document.querySelector(".title").innerHTML="Preço Gasolina Simples Mais Barata do Seixal.";
      document.getElementById("municipio").selectedIndex = 1
    } else if (myKeysValues == '?municipio=230') {
    municipio = 230;
    document.querySelector(".title").innerHTML="Preço Gasolina Simples Mais Barata de Sesimbra.";
    document.getElementById("municipio").selectedIndex = 2
    } else if(myKeysValues == '') {
      document.getElementById("municipio").selectedIndex = 1
    }

    var seixal_fuel_response = await fetch(`https://precoscombustiveis.dgeg.gov.pt/api/PrecoComb/PesquisarPostos?idsTiposComb=3201&idMarca=&idTipoPosto=&idDistrito=&idsMunicipios=${municipio}&qtdPorPagina=50&pagina=1`);

    const seixal_fuel_data = await seixal_fuel_response.json();
    console.log(seixal_fuel_data);
    console.log(seixal_fuel_data.resultado[0].Nome);

    for (let i = 0; i < 5; i++) {
     seixal_fuel_title_data[i] = seixal_fuel_data.resultado[i].Nome;
     seixal_fuel_price_data[i] = seixal_fuel_data.resultado[i].Preco;
     seixal_fuel_type_data[i] = seixal_fuel_data.resultado[i].Combustivel; 
     location_lat[i] = seixal_fuel_data.resultado[i].Latitude;
     location_lon[i] = seixal_fuel_data.resultado[i].Longitude;
    }
    seixal_fuel_title_list();
    seixal_fuel_price_list();
    seixal_fuel_type_list();
    getPostoLocation();
}

var click_alterar_botao = document.querySelector('#alterar_botao');
click_alterar_botao.addEventListener("click", function () {
  var municipio_new = document.querySelector("#municipio").value;
  municipio = municipio_new;

  var url = window.location.href;    
    if (url.indexOf('?') < 1){
        url += `?municipio=${municipio}`
        window.location.href = url;
    }else{
      window.history.pushState({}, document.title, "/combustivel/gasolina_simples.html" + `?municipio=${municipio}`);
      location.reload();
    }
  })

var click_gasolina_simples = document.querySelector('#gasoleo_aditivado');
click_gasolina_simples.addEventListener("click", function () {
  location.href = "index.html";
  })

var click_gasoleo_simples = document.querySelector('#gasoleo_simples');
click_gasoleo_simples.addEventListener("click", function () {
location.href = "gasoleo_simples.html";
  })

var click_github = document.querySelector('.github');
click_github.addEventListener("click", function () {
  location.href = "https://github.com/dreazz97";
  })

var click_linkedin = document.querySelector('.linkedin');
  click_linkedin.addEventListener("click", function () {
    location.href = "https://pt.linkedin.com/in/iuri-peniche-29337a183";
    })

getFuelData();

function seixal_fuel_title_list () {
var seixal_fuel_data_title_list_element = [];
for (let i = 0; i < seixal_fuel_title_data.length; i++) {
seixal_fuel_data_title_list_element[i] = document.createElement("li");
seixal_fuel_data_title_list_element[i].classList.add('li-name');
seixal_fuel_data_title_list_element[i].textContent = seixal_fuel_title_data[i];
var unordered_list_element_posto_name = document.querySelector("#posto_nome");
unordered_list_element_posto_name.appendChild(seixal_fuel_data_title_list_element[i]);
  }
}

function seixal_fuel_price_list () {
    var seixal_fuel_data_price_list_element = [];
    for (let i = 0; i < seixal_fuel_price_data.length; i++) {
    seixal_fuel_data_price_list_element[i] = document.createElement("li");
    seixal_fuel_data_price_list_element[i].classList.add('li-price');
    seixal_fuel_data_price_list_element[i].textContent = seixal_fuel_price_data[i];
    var unordered_list_element_posto_preco = document.querySelector("#posto_preço");
    unordered_list_element_posto_preco.appendChild(seixal_fuel_data_price_list_element[i]);
      }
    }

function seixal_fuel_type_list () {
      var seixal_fuel_data_type_list_element = [];
      for (let i = 0; i < seixal_fuel_type_data.length; i++) {
      seixal_fuel_data_type_list_element[i] = document.createElement("li");
      seixal_fuel_data_type_list_element[i].classList.add('li-type');
      seixal_fuel_data_type_list_element[i].textContent = seixal_fuel_type_data[i];
      var unordered_list_element_fuel_type = document.querySelector("#tipo_combustivel");
      unordered_list_element_fuel_type.appendChild(seixal_fuel_data_type_list_element[i]);
        }
      }

function getPostoLocation () {
    var location_element = [];
    for (let i = 0; i < location_lat.length; i++) {
    location_element[i] = document.createElement("li");
    location_element[i].textContent = "Localização";
    location_element[i].classList.add('topics-div'+ i);
    location_element[i].classList.add('topics-div');
    var unordered_list_element_posto_localizacao = document.querySelector("#posto_localização");
    unordered_list_element_posto_localizacao.appendChild(location_element[i]);

    item_clicker[i] = document.querySelector(".topics-div"+ i);
    item_clicker[i].addEventListener("click", function () {
        console.log("teste1");
        location.href = `https://maps.google.com/?q=`+location_lat[i]+`,`+location_lon[i]+``;
        })
      }
}
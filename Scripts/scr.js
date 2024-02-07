const apiKey = "9cdc084fd3ab428ca6f171320240402";
const apiUrl = "https://api.weatherapi.com/v1/current.json?";
var submitSearch=document.querySelector(".citysearch button");
var enterSubmit=document.querySelector(".citysearch input");
async function weatherDetails(cityname) {
    const response = await fetch(apiUrl+`key=${apiKey}`+`&q=${cityname}`);
    var data = await response.json();
    console.log(data);
    console.log(cityname);
    let mode = "Day";
    if(data.error)
    {
        document.querySelector("#cityname").innerHTML="Location not Found!";
        document.querySelector("#mtemp").innerHTML="--"+"°C";
        document.querySelector("#mstatus").innerHTML="--";
        document.querySelector("#callender").innerHTML="--";
        document.querySelector("#windval").innerHTML="Wind Speed: -- <span>km/h</span>";
        document.querySelector("#humidval").innerHTML="Humidity: -- <span>%</span>";
        document.querySelector("#visibval").innerHTML="Visibility: -- <span>km</span>";
    }
    else
    {
        if(!data.current.is_day)
        {
            mode="Night";
            document.querySelector('.info_box').style.backgroundColor = "rgba(0, 0, 0, 0.4)";
            document.querySelector('.info_box').style.color = "white";
            document.querySelector('.humid').style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            document.querySelector('.windd').style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            document.querySelector('.visib').style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            document.querySelector('.citysearch input').style.color = "white";
            document.querySelector('.citysearch button').style.color = "white";
            document.querySelector('.citysearch input').style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        }
        else
        {
            mode="Day";
            document.querySelector('.info_box').style.backgroundColor = "rgba(255, 255, 255, 0.4)";
            document.querySelector('.info_box').style.color = "black";
            document.querySelector('.humid').style.backgroundColor = "rgba(255, 255, 255, 0.8)";
            document.querySelector('.windd').style.backgroundColor = "rgba(255, 255, 255, 0.8)";
            document.querySelector('.visib').style.backgroundColor = "rgba(255, 255, 255, 0.8)";
            document.querySelector('.citysearch input').style.color = "black";
            document.querySelector('.citysearch button').style.color = "black";
            document.querySelector('.citysearch input').style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        }
        let cc = data.current.condition.code;
        if(cc==1000)//clear
        {
            document.body.style.backgroundImage = "url('Images/"+`${mode}`+"/clearweather.jpg')";
            document.querySelector('.micon img').src = "Images/"+`${mode}`+"/Icons/clear.png";
        }
        else if(cc==1003)//partlycloudy
        {
            document.body.style.backgroundImage = "url('Images/"+`${mode}`+"/partlycloudyweather.jpg')";
            document.querySelector('.micon img').src = "Images/"+`${mode}`+"/Icons/partlycloudy.png";
        }
        else if(cc==1006 || cc==1009)//cloudy
        {
            document.body.style.backgroundImage = "url('Images/"+`${mode}`+"/cloudyweather.jpg')";
            document.querySelector('.micon img').src = "Images/"+`${mode}`+"/Icons/cloudy.png";
        }
        else if(cc==1030)//mist
        {
            document.body.style.backgroundImage = "url('Images/"+`${mode}`+"/mistyweather.jpg')";
            document.querySelector('.micon img').src = "Images/"+`${mode}`+"/Icons/haze.png";
        }
        else if(cc==1135 || cc==1147)//fog
        {
            document.body.style.backgroundImage = "url('Images/"+`${mode}`+"/fogweather.jpg')";
            document.querySelector('.micon img').src = "Images/"+`${mode}`+"/Icons/fog.png";
        }
        else if(cc==1150||cc==1153||cc==1180)//drizzle
        {
            document.body.style.backgroundImage = "url('Images/"+`${mode}`+"/drizzleweather.jpg')";
            document.querySelector('.micon img').src = "Images/"+`${mode}`+"/Icons/drizzle.png";
        }
        else if(cc==1063||cc==1183||cc==1186||cc==1189||cc==1192||cc==1195||cc==1240||cc==1243||cc==1246)//rain
        {
            document.body.style.backgroundImage = "url('Images/"+`${mode}`+"/rainyweather.jpg')";
            document.querySelector('.micon img').src = "Images/"+`${mode}`+"/Icons/rain.png";
        }
        else if(cc==1069||cc==1072||cc==1168||cc==1171||cc==1198||cc==1201||cc==1204||cc==1207||cc==1237||cc==1249||cc==1252||cc==1261||cc==1264)//sleet&freezing
        {
            document.body.style.backgroundImage = "url('Images/"+`${mode}`+"/sleetandfreezingrainweather.jpg')";
            document.querySelector('.micon img').src = "Images/"+`${mode}`+"/Icons/sleet.png";
        }
        else if(cc==1066||cc==1114||cc==1117||cc==1210||cc==1213||cc==1216||cc==1219||cc==1222||cc==1225||cc==1255||cc==1258||cc==1279||cc==1282)//snow
        {
            document.body.style.backgroundImage = "url('Images/"+`${mode}`+"/winterweather.jpg')";
            document.querySelector('.micon img').src = "Images/"+`${mode}`+"/Icons/snow.png";
        }
        else if(cc==1087||cc==1273||cc==1276)//thunderstorms
        {
            document.body.style.backgroundImage = "url(Images/"+`${mode}`+"/thunderstormweather.jpg)";
            document.querySelector('.micon img').src = "Images/"+`${mode}`+"/Icons/storm.png";
        }
    document.querySelector("#cityname").innerHTML=data.location.name+", "+data.location.country;
    const date = data.location.localtime;
    document.querySelector("#callender").innerHTML=date.substr(11)+", "+date.substr(8,2)+"-"+date.substr(5,2)+"-"+date.substr(0,4);
    document.querySelector("#mtemp").innerHTML=Math.round(data.current.temp_c)+"°C";
    document.querySelector("#mstatus").innerHTML=data.current.condition.text;
    document.querySelector("#windval").innerHTML="Wind Speed: "+data.current.wind_kph+" <span>km/h</span>"
    data.current.wind_dir;
    document.querySelector("#humidval").innerHTML="Humidity: "+data.current.humidity+"<span>%</span>";
    document.querySelector("#visibval").innerHTML="Visibility: "+data.current.vis_km+" <span>km</span>";
    document.getElementById("searchbox").value="";
}
}

submitSearch.addEventListener("click", ()=>{
    var citySearchh=document.getElementById("searchbox").value;
    console.log(citySearchh);
    weatherDetails(citySearchh);
})

enterSubmit.addEventListener("keypress", (e)=>{
    if(e.code==="Enter")
    {
        e.preventDefault();
        var citySearchh=document.getElementById("searchbox").value;
        console.log(citySearchh);
        weatherDetails(citySearchh);
    }
})

window.onload = function getLocation() {
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(poss);
        async function poss(position) {
            let lati = position.coords.latitude;
            let longi = position.coords.longitude;
            const rs = await fetch(apiUrl+`key=${apiKey}`+ `&q=${lati},${longi}`);
            var cn = await rs.json();
            weatherDetails(cn.location.name);
        }
    }
}
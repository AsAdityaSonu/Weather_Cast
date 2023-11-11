// ----------------------------------------------------------------
const apikey = '06c6f17aee8328616963556e5dfc87b3';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  
const searchBox = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);

    if (response.status === 404) {
        console.log('City not found!');
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';

        const contentHeight = document.querySelector('.error').scrollHeight;
        document.querySelector('.weather-wrapper').style.height = contentHeight+10 + 'px';
    }else{
        var data = await response.json();

        console.log(data);

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + "Km/hr";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "Images/clouds.png";
        }else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "Images/clear.png";
        }else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "Images/rain.png";
        }else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "Images/drizzle.png";
        }else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "Images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display="none";
        

        // document.querySelector('.weather-wrapper').classList.add('weather-unwrap');
        const contentHeight = document.querySelector('.weather').scrollHeight;
        document.querySelector('.weather-wrapper').style.height = contentHeight + 'px';
    }
    
}

searchButton.addEventListener('click', ()=>{
    const city = searchBox.value;
    checkWeather(city);
});

searchBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { 
        const city = searchBox.value;
        checkWeather(city);
    }
});



// ----------------------------------------------------------------

const container = document.querySelector('.container');
const search = document.querySelector('.cont-input-button button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const input = document.querySelector('.cont-input-button input');
const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');

search.addEventListener('click', (e)=>{
    e.preventDefault();
    traerData(input.value)
})


const traerData=async(city)=>{
    let apiKey= 'ab3f596ab3166b49816a9ef485441486'
    let URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

        const response=await fetch(URL);
        const data= await response.json();
        console.log(data)
        boxInfo(data)
}

const boxInfo=(cityData)=>{
    if(cityData.cod=='404'){
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
    }
    error404.style.display = 'none'; 
    error404.classList.remove('fadeIn');
    
    //switch and break funcionan como una sitaxis mas clara de un if else anidado. break dice que no siga ejecutandose el switch in "case" de que se cumpla la condicion. Si ninguna es true entonces default.

    switch (cityData.weather[0].main) {
        case 'Clear':
            image.src = 'assets/imgs/clear.png';
            break;

        case 'Rain':
            image.src = 'assets/imgs/rain.png';
            break;

        case 'Snow':
            image.src = 'assets/imgs/snow.png';
            break;

        case 'Clouds':
            image.src = 'assets/imgs/cloud.png';
            break;

        case 'Haze':
            image.src = 'assets/imgs/mist.png';
            break;

        default:
            image.src = '';
    }

    temperature.innerHTML = `${parseInt(cityData.main.temp)}<span>°C</span>`;
    description.innerHTML = `${cityData.weather[0].description}`;
    humidity.innerHTML = `${cityData.main.humidity}%`;
    wind.innerHTML = `${parseInt(cityData.wind.speed)}Km/h`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '600px';
}



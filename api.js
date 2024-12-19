const apiKey = "5138c890d3114223ae8151422241512";
 
let baseUrl = 'https://api.weatherapi.com/v1/current.json';

// Function to fetch weather data
async function fetchWeatherData(location) {
    try {
        
        let url = `${baseUrl}?key=${apiKey}&q=${location}`;
        console.log(`Fetching weather data from: ${url}`); 
        
        // Fetch the API response
        let response = await fetch(url);
        
        if (!response.ok) {

          if(response.status === 400){
            throw new Error("Invalid Location. Please enter a valid Locaion")
          }
            throw new Error(`API Error: ${response.statusText}`);
        }
        
        let data = await response.json();
        console.log('Weather Data:', data); // 

        let time = data.location.localtime;
        let hour = parseInt(time.split(' ')[1].split(':')[0],10);
        const searchbtn = document.querySelector(".search-bar");
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;
        const temp_f = 32 + (9/5 ) * temp  ;
        const button = document.querySelector(".changeunit");
        let isCelsius = true;
        const iconUrl = data.current.condition.icon
        ? `https:${data.current.condition.icon}`
        : 'path/to/your/default-icon.png'; // Provide a local default icon
        
        // Update the DOM
        document.getElementById('heatindex').textContent = `${data.current.heatindex_c}`;
        document.getElementById('wind').textContent = `${data.current.wind_kph} kph (${data.current.wind_dir})`;
        document.getElementById('humidity').textContent = `${data.current.humidity}%`;
        document.getElementById('visibility').textContent = `${data.current.vis_km} km`;
        document.getElementById('pressure').textContent = `${data.current.pressure_mb} mb`;
        document.getElementById('UV-index').textContent = `${data.current.uv}`;
        document.getElementById('temp').textContent = `${data.current.temp_c}°C`;
        document.querySelector('.time').textContent = ` ${data.location.localtime}`;
        document.querySelector('.weathericon').src = iconUrl;
        document.querySelector('.weathertype').textContent = condition;
        document.querySelector('.weatherdescription').textContent = `According to today's weather forecast weather will be  ${condition}`;

        //color change according to time
        if(hour>=12 && hour<16){
          document.querySelector('body').style.backgroundColor="orange";
        }
        else if(hour>=16 && hour<24){
          document.querySelector('body').style.backgroundColor="blue";

        }
        else if(hour>=0 && hour<4){
          document.querySelector('body').style.backgroundColor="black";
        }
        
        

        button.addEventListener('click',function(){

          isCelsius=!isCelsius;

          if(isCelsius){
            document.getElementById('temp').textContent = `${data.current.temp_c}°C`;
            button.textContent = '°F';

          }

          else {
            document.getElementById('temp').textContent = `${Math.round(temp_f)}°F`;
            button.textContent = '°C';


          }

        });

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert(error.message);
    }

         baseUrl = 'https://api.weatherapi.com/v1/forecast.json';
         url = `${baseUrl}?key=${apiKey}&q=${location}`;
          response = await fetch(url);
          data = await response.json();
        document.querySelector('.Sun-rise').textContent = `Sun-rise: ${data.forecast.forecastday[0].astro.sunrise}`;
        document.querySelector('.Sun-set').textContent = `Sun-set: ${data.forecast.forecastday[0].astro.sunset}`;
        document.querySelector('.Moon-rise').textContent = `Moon-rise: ${data.forecast.forecastday[0].astro.moonrise}`;
        document.querySelector('.Moon-set').textContent = `Moon-rise: ${data.forecast.forecastday[0].astro.moonset}`;
}

// Search bar event listener
document.querySelector('.searchbar').addEventListener('keypress', function (event) {
        if(event.key == 'Enter'){
  const location = event.target.value.trim();
        if (location) {
            fetchWeatherData(location); // Fetch data for the entered location
        } else {
            alert('Please enter a valid location.');
        }
    } 
});

document.querySelector('.searchbarnav').addEventListener('keypress', function (event) {
  if(event.key == 'Enter'){
const location = event.target.value.trim();
  if (location) {
      fetchWeatherData(location); // Fetch data for the entered location
  } else {
      alert('Please enter a valid location.');
  }
} 
});

// Default fetch when the page loads
fetchWeatherData('Jaipur'); 

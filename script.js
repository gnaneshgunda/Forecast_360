// Hamburger menu
const hamburger = document.getElementById("hamburger");
const links = document.getElementById("links");

hamburger.addEventListener("click", () => {
    const isVisible = links.style.display === "block";
    links.style.display = isVisible ? "none" : "block";
});


//change background according to time
const currentTime = new Date();
console.log("Search Time:", currentTime.toLocaleString()); 
let hours = currentTime.getHours();
let body=document.getElementsByTagName("body");
if((hours>5)&&(hours<8)){
    body[0].style.backgroundColor="rgb(250,214,165)";
}
else if((hours>=8)&&(hours<=16)){
    body[0].style.backgroundColor="#c4e6ff";
}
else if((hours>16)&&(hours<19)){
    body[0].style.backgroundColor="rgb(250,214,165)";
}
else{
    body[0].style.backgroundColor="rgba(0,0,0,0.7)";
    body[0].style.color="white";
}

//Function to display weather data
function displayWeatherData(data) {
    const mainSection = document.querySelector("main");
    // Clear previous data
    mainSection.innerHTML = "";
   


    if (data.error) {
        mainSection.innerHTML = `<p>City not found. Please try again.</p>`;
        return;
    }

    // Create elements to display the weather information
    const cityName = document.createElement("h2");
    cityName.innerHTML = `Weather in ${data.location.name}, ${data.location.region}(<h6>Last Updated:${data.current.last_updated}</h6>)`;
    cityName.classList.add("cityname");

    const div1=document.createElement("div");
    const div2=document.createElement("div");
    const div3=document.createElement("div");
    const div4=document.createElement("div");
    div1.classList.add("details");
    div2.classList.add("icon");
    div3.classList.add("hrdetails");
    div4.classList.add("weekdetails");


    const date=document.createElement("p");
    date.textContent=`Date:${data.forecast.forecastday[0].date}`;
    date.classList.add("det");
   

    const temperature = document.createElement("p");
    temperature.textContent = `Temperature: ${data.current.temp_c}°C/${data.current.temp_f}°F`;
    temperature.classList.add("det");


    const stattemp=document.createElement("p");
    stattemp.textContent=`Max-temp:${data.forecast.forecastday[0].day.maxtemp_c}°C/${data.forecast.forecastday[0].day.maxtemp_f}°F  Min-temp:${data.forecast.forecastday[0].day.mintemp_c}°C/${data.forecast.forecastday[0].day.mintemp_f}°F`;
    stattemp.classList.add("det");

    const condition = document.createElement("p");
    condition.textContent = `Condition: ${data.current.condition.text}`;
    condition.classList.add("det");

    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${data.current.humidity}%`;
    humidity.classList.add("det");

    const  wind=document.createElement("p");
    wind.innerHTML=`Wind-direction:${data.current.wind_dir} <br> Wind-speed:${data.current.wind_kph}kph/${data.current.wind_mph}mph`;
    wind.classList.add("det");

    const precip=document.createElement("p");
    precip.textContent=`Precipitation:${data.current.precip_in}inches/${data.current.precip_mm}mm`;
    precip.classList.add("det");

    const press=document.createElement("p");
    press.textContent=`Pressure:${data.current.pressure_in} in of Hg/${data.current.pressure_mb}mb`;
    press.classList.add("det");

    const sundet=document.createElement("p");
    sundet.innerHTML=`Sunrise:${data.forecast.forecastday[0].astro.sunrise}   Sunset:${data.forecast.forecastday[0].astro.sunset} <br> Moonrise:${data.forecast.forecastday[0].astro.moonrise}   Moonset:${data.forecast.forecastday[0].astro.moonset}`
    sundet.classList.add("det");

    // Add the weather condition icon
    const weatherIcon = document.createElement("img");
    weatherIcon.src = `https:${data.current.condition.icon}`; 
    weatherIcon.alt = data.current.condition.text;
    weatherIcon.classList.add("iconimg")

    mainSection.appendChild(cityName);
   mainSection.appendChild(div1);
   mainSection.appendChild(div2);
   mainSection.appendChild(div3);
   mainSection.appendChild(div4);
  
    div1.appendChild(date);
    div1.appendChild(temperature);
    div1.appendChild(stattemp);
    div1.appendChild(condition);
    div1.appendChild(humidity);
    div1.appendChild(wind);
    div1.appendChild(precip);
    div1.appendChild(press);
    div1.appendChild(sundet);
   
    div2.appendChild(weatherIcon);

    let i=0;
    while(i<24){
        let hr=document.createElement("p");
        hr.innerHTML=`${i}:00hrs <br> ${data.forecast.forecastday[0].hour[i].temp_c}°C`
        hr.classList.add("hrdet");

        div3.appendChild(hr);
        i++;
    }
    let j=0;
    while(j<7){
        let dt=document.createElement("p");
        dt.innerHTML=`${data.forecast.forecastday[j].date} <br> <img src="https:${data.forecast.forecastday[j].day.condition.icon}" /> <br> ${data.forecast.forecastday[j].day.maxtemp_c}°C/${data.forecast.forecastday[j].day.mintemp_c}°C`
        dt.classList.add("weekdet");

        div4.appendChild(dt);
        j++;
    }

}

//By default printing data of Kharagpur
let URL = "https://api.weatherapi.com/v1/forecast.json?key=482a85a44e0b4539b0852322241612&q=Kharagpur&days=7&aqi=no&alerts=no";
let res="";
fetch(URL)
    .then((response) => response.json()) 
    .then((data) => {
        console.log(data); 
        res=data;
        displayWeatherData(data);
    })
    .catch((error) => {
        console.error("Error fetching data:", error); 
    });

    





    


let city="";
document.getElementById("searchbutton").addEventListener("click", (event)=>{

    event.preventDefault();

    let cityInput = document.getElementById("cityinput");
    city=cityInput.value;
    console.log(city);
    URL=`https://api.weatherapi.com/v1/forecast.json?key=482a85a44e0b4539b0852322241612&q=${city}&days=1&aqi=no&alerts=no`;
fetch(URL)
    .then((response) => response.json()) 
    .then((data) => {
        console.log(data); 
        res=data;
        displayWeatherData(data);
    })
    .catch((error) => {
        cityInput.placeholder="Enter Correct Spelling" 
        console.error("Error fetching data:", error);
       
    });

});





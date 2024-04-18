// URL - http://api.weatherapi.com/v1/astronomy.json?key=ff8469af4cd244768eb171734241704&q=London&dt=2024-04-17

// API - KEY: ff8469af4cd244768eb171734241704

// location-variables
const locationText = document.querySelector('.location-text');
const latitudeText = document.querySelector('.latitude-text');
const longitudeText = document.querySelector('.longitude-text');

// moon variables
const moon = document.querySelector('.moon-image');  // moon phase display image
const moonPhaseName = document.querySelector('.moon-phase-name');    // name of moon phase
const moonPhase_illumination_text = document.querySelector('.moon-phase-display-text');   // moon phase illumination text
const moonRiseText = document.querySelector('.moon-rise-time-text');
const moonSetText = document.querySelector('.moon-set-time-text');
const sunRiseText = document.querySelector('.sun-rise-time-text');
const sunSetText = document.querySelector('.sun-set-time-text');

// date and time
const timeText = document.querySelector('.time-text');
const dateText = document.querySelector('.date-text');

// dialog box
const searchDialogWindow = document.querySelector('.location-searcher');    // dialog window to enter the city and get data

// buttons and inputs
const submitAndGet = document.querySelector('.submit-button');
const cancelSearch = document.querySelector('.cancel-button');
const inputCityValue = document.querySelector('.location-searching-input');
const searcherButton = document.querySelector('.get-info-from-mylocation');

// emoji images
const MoonPhases = {
    newMoon: "🌑", waxingCresent: "🌒",
    firstQuarter: "🌓", waxingGibbous: "🌔",
    fullMoon: "🌕", wanningGibbous: "🌖",
    lastQuarter: "🌗", wanningCresent: "🌘"
};


searcherButton.addEventListener('click', function() {
    searchDialogWindow.style.display = "grid";
    searchDialogWindow.style.opacity = '1';
    searchDialogWindow.showModal();    // show modal when the button is clicked (dialog box)
});  

cancelSearch.addEventListener('click', function()  {
    searchDialogWindow.style.opacity = "0";
    searchDialogWindow.style.display = "none";
    searchDialogWindow.close();       // close modal when the user cancels the search (close dialog box)
});


function RenderMoonPhase(moonPhase_percentage, moon_phaseName)   {
    let moonPhase = Number(moonPhase_percentage);

    if (moonPhase == 0 || moon_phaseName === "New Moon")   {
        moon.innerText = `${MoonPhases.newMoon}`;
    }
    if ((moon_phaseName === "Waxing Cresent"))  {
        moon.innerText = `${MoonPhases.waxingCresent}`;
    }
    if ((moon_phaseName === "First Quarter"))   {
        moon.innerText = `${MoonPhases.firstQuarter}`;
    }
    if ((moon_phaseName === "Waxing Gibbous"))  {
        moon.innerText = `${MoonPhases.waxingGibbous}`;
    }
    if ((moonPhase === 100))   {
        moon.innerText = `${MoonPhases.fullMoon}`;
    }
    if ((moon_phaseName === "Wanning Gibbous"))   {
        moon.innerText = `${MoonPhases.wanningGibbous}`;
    }
    if ((moon_phaseName === "Last Quarter"))   {
        moon.innerText = `${MoonPhases.lastQuarter}`;
    }
    if ((moon_phaseName === "Waxing Cresent"))   {
        moon.innerTet = `${MoonPhases.wanningCresent}`;
    }

    moonPhaseName.innerText = `${moon_phaseName} (${moonPhase} %)`;   // display text
}

// asyncrhonus function to fetch data from the API
async function GetData(city)   {
    const today = new Date().toString().split(" ");
    const dateValue = `${today[3]}-${today[1]}-${today[2]}`;     // current date
    // the API
    const URL = `http://api.weatherapi.com/v1/astronomy.json?key=ff8469af4cd244768eb171734241704&q=${city}&dt=${dateValue}`;
    const promise = await fetch(URL);     // fetch data with a succes or failure respone
    return await promise.json();       // return the json file
}

submitAndGet.addEventListener('click', async () => {
    const city = inputCityValue.value;
    const data = await GetData(city);
    const jsonStringOfData = JSON.stringify(data);      // convert the json file into a string
    const dataObject = JSON.parse(jsonStringOfData);    // convert the JSON string into a javascript object  
    // close the dialog box
    searchDialogWindow.style.opacity = "0";
    searchDialogWindow.style.display = "none";  
    searchDialogWindow.close();  
    // data variables
    const locationName = `${dataObject["location"]["name"]}, ${dataObject["location"]["country"]}`;
    const latitude = `${dataObject["location"]["lat"]}`;
    const longitude = `${dataObject["location"]["lon"]}`;
    const localDate = `${dataObject["location"]["localtime"].slice(0, 10)}`;
    const localTime = `${dataObject["location"]["localtime"].slice(10, 15)}`;
    // astronomy
    const moonRise = `${dataObject["astronomy"]["astro"]["moonrise"]}`;
    const moonSet = `${dataObject["astronomy"]["astro"]["moonset"]}`;
    const sunRise = `${dataObject["astronomy"]["astro"]["sunrise"]}`;
    const sunSet = `${dataObject["astronomy"]["astro"]["sunset"]}`;
    const moonPhase = `${dataObject["astronomy"]["astro"]["moon_phase"]}`;
    const moonPhase_illumination = `${dataObject["astronomy"]["astro"]["moon_illumination"]}`;

    locationText.innerText = locationName;
    latitudeText.innerText = latitude;
    longitudeText.innerText = longitude;
    dateText.innerText = localDate;
    timeText.innerText = localTime;
    RenderMoonPhase(moonPhase_illumination, moonPhase);   // render moon phase

    moonPhaseName.innerText = moonPhase;
    moonRiseText.innerText = moonRise;
    moonSetText.innerText = moonSet;
    sunRiseText.innerText = sunRise;
    sunSetText.innerText = sunSet;
    moonPhase_illumination_text.innerText = `${moonPhase_illumination} %`;
});

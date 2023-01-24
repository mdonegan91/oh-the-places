

// Business Logic for CitiesLog ---------
function CitiesLog() {
    this.cities = {};
    this.currentId = 0;
}

CitiesLog.prototype.addCity = function (city) {
    city.id = this.assignId();
    this.cities[city.id] = city;
};

CitiesLog.prototype.assignId = function () {
    this.currentId += 1;
    return this.currentId;
};

CitiesLog.prototype.findCity = function (id) {
    if (this.cities[id] !== undefined) {
        return this.cities[id];
    }
    return false;
};

CitiesLog.prototype.deleteCity = function (id) {
    if (this.cities[id] === undefined) {
        return false;
    }
    delete this.cities[id];
    return true;
};

// Business Logic for Contacts ---------
function City(cityName, pointOfInterest, bestSeason) {
    this.cityName = cityName;
    this.pointOfInterest = pointOfInterest;
    this.bestSeason = bestSeason;
}

City.prototype.cityFullName = function () {
    return this.cityName;
};

// User Interface Logic ---------
let citiesLog = new CitiesLog();

function listCities(citiesLogToDisplay) {
    let citiesDiv = document.querySelector("div#cities");
    citiesDiv.innerText = null;
    const ul = document.createElement("ul");
    Object.keys(citiesLogToDisplay.cities).forEach(function (key) {
        const city = citiesLogToDisplay.findCity(key);
        const li = document.createElement("li");
        li.append(city.cityFullName());
        li.setAttribute("id", city.id);
        ul.append(li);
    });
    citiesDiv.append(ul);
}

function displayCityDetails(event) {
    const city = citiesLog.findCity(event.target.id);
    document.querySelector(".city").innerText = city.cityName;
    document.querySelector(".poi").innerText = city.pointOfInterest;
    document.querySelector(".best-season").innerText = city.bestSeason;
    document.querySelector("button.delete").setAttribute("id", city.id);
    document.querySelector("div#city-details").removeAttribute("class");
}

function handleFormSubmission(event) {
    event.preventDefault();
    const inputtedcityName = document.querySelector("input#new-city").value;
    const inputtedpointOfInterest = document.querySelector("input#new-poi").value;
    const inputtedbestSeason = document.querySelector("input#new-best-season").value;
    let newCity = new City(inputtedcityName, inputtedpointOfInterest, inputtedbestSeason);
    citiesLog.addCity(newCity);
    listCities(citiesLog);
    document.querySelector("input#new-city").value = null;
    document.querySelector("input#new-poi").value = null;
    document.querySelector("input#new-best-season").value = null;
}

function handleDelete(event) {
    citiesLog.deleteCity(event.target.id);
    document.querySelector("button.delete").removeAttribute("id");
    document.querySelector("div#city-details").setAttribute("class", "hidden");
    listCities(citiesLog);
}

window.addEventListener("load", function () {
    document.querySelector("form#new-city").addEventListener("submit", handleFormSubmission);
    document.querySelector("div#cities").addEventListener("click", displayCityDetails);
    document.querySelector("button.delete").addEventListener("click", handleDelete);
});
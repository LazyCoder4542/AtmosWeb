const APIKey = 'b01609e4e9f3b67abf6b446a6533b825';
function success(position) {
    console.log(position);
    weatherStatus(position.coords.longitude, position.coords.latitude)
}

function error(error) {
    if (error.code == 1) {
        console.log('Please allow access to location');
    }
    else {
        console.log(error.message);
    }
}

var options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
};
const watchID = navigator.geolocation.getCurrentPosition(success, error, options);
/*function getCityName(lat, lon) {
    console.log(lat, lon);
    $.ajax({
        url: 'http://api.positionstack.com/v1/reverse',
        data: {
            access_key: '118535dffb665e04f3a4ca4fbb466e90',
            query: `${lat},${lon}`,
            limit: 1
        }
    }).done(function (data) {
        console.log(data);
    });
}*/

function weatherStatus(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=1&appid=${APIKey}`)
        //fetch(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&limit=1&appid=${APIKey}`)
        .then(resp => {
            return resp.json()
        })
        .then(resp => {
            //localStorage.setItem('cache', JSON.stringify(resp))
            pageContent.displayDOM(resp)
        })
    //pageContent.displayDOM(JSON.parse(localStorage.getItem('cache')))
}
class PageContent {
    constructor(info, main) {
        this.temperature = info.querySelector('#temperature')
        this.humidity = info.querySelector('#humidity')
        this.windSpeed = info.querySelector('#wind-speed')
        this.pressure = info.querySelector('#pressure')
        this.place = main.querySelector('#name')
        this.country = main.querySelector('#country')
        this.summaryText = main.querySelector('.text')
        this.summaryIcon = main.querySelector('.sum-icon')
    }
    initialize() {
        this.search()
    }
    displayDOM(json) {
        console.log(json);
        const switchValue = this.temperature.querySelector('.convert-temp').querySelector('.switch').ariaCurrent;
        var temperatureUnit = switchValue == 'kelvin' ? '°K' : '°C';
        var humidityUnit = '%', windSpeedUnit = 'mph', pressureUnit = 'mb';
        var temperature = switchValue == 'kelvin' ? Math.round(parseInt(json.main.temp)) : Math.round(parseInt(json.main.temp)) - 273;
        var humidity = json.main.humidity, windSpeed = json.wind.speed, pressure = json.main.pressure;

        this.temperature.querySelector('.wrapper').querySelector('.value').innerText = temperature;
        this.temperature.querySelector('.wrapper').querySelector('.unit').innerText = temperatureUnit;
        this.humidity.querySelector('.wrapper').querySelector('.value').innerText = humidity;
        this.humidity.querySelector('.wrapper').querySelector('.unit').innerText = humidityUnit;
        this.windSpeed.querySelector('.wrapper').querySelector('.value').innerText = windSpeed;
        this.windSpeed.querySelector('.wrapper').querySelector('.unit').innerText = windSpeedUnit;
        this.pressure.querySelector('.wrapper').querySelector('.value').innerText = pressure;
        this.pressure.querySelector('.wrapper').querySelector('.unit').innerText = pressureUnit;
        this.summaryText.innerText = (json.weather[0].description.charAt(0).toUpperCase() + json.weather[0].description.slice(1)) + '...'
        this.getCityName(json.coord.lat, json.coord.lon, 1).done((data) => {
            console.log(data.data[0]);
            var json = data.data[0];
            this.place.innerText = json.name
            this.place.title = json.name
            this.country.innerText = `${json.region}, ${json.country_code}`
        })
    }
    search() {
        /*$('.search-box #search').on('input', function () {
            console.log($(this).val());
            var arr = [...$(this).val()];
            arr.forEach(char => {
                if (parseInt(char)) {
                    console.log(char, parseInt(char));
                    arr.pop()
                }
            });
            console.log(arr);
            $(this).val(arr.join(''))
        })*/
        $('.search-box button').click(() => {

            if ($('.search-box #search').val().trim().length >= 2) {
                this.searchCity($('.search-box #search').val().trim())
                //console.log($('.search-box #search').val().trim())
            }
        })
    }
    searchCity(entry) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${entry}&appid=${APIKey}`)
            .then(resp => {
                return resp.json()
            })
            .then(resp => {
                pageContent.displayDOM(resp)
            })
    }
    getCityName(lat, lon, limit) {
        var req = ($.ajax({
            url: 'http://api.positionstack.com/v1/reverse',
            data: {
                access_key: '118535dffb665e04f3a4ca4fbb466e90',
                query: `${lat},${lon}`,
                limit: limit.toString()
            }
        }))
        return req
    }

}
const pageContent = new PageContent(document.querySelector('.info'), document.querySelector('.main'));
pageContent.initialize()
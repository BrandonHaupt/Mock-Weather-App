window.addEventListener('load', () => {
    let long;
    let lat;
    //grabs the temp-description from the html document
    let temperatureDescription = document.querySelector('.temp-description');

    //grabs the temp-degree class from the html document
    let temperatureDegree = document.querySelector('.temp-degree');

    //grabs the timezone class from the html document
    let locationTimezone = document.querySelector('.location-timezone');

    //grabs the temperature class from the html document
    let temperatureSection = document.querySelector('.temperature');

    //grabs the temperature's span from the html document
    const temperatureSpan = document.querySelector('.temperature span')

    //Grabs the body (hopefully)
    let bodyBackground = document.querySelector('.day');

    //asks your browser to enable location.
    if (navigator.geolocation) {
        //gets your longitude and latitude position.
        navigator.geolocation.getCurrentPosition(position => {
            //gets your longitude position
            long = position.coords.longitude;
            //gets your latitude position
            lat = position.coords.latitude;

            //Allows fetch(api) to be ran on localhost
            const proxy = 'https://cors-anywhere.herokuapp.com/';

            //uses Dark Sky API to get weather in your locaiton.
            //I switched out the latitude and longitude 
            // use ${proxy} infront of https to allow localhost use
            const api = `${proxy}https://api.darksky.net/forecast/7dabd7377485115ae7219c96419d4e1a/${lat},${long}`;

            //goes and grabs the api data and then returns the response as a .json so the browser can read it properly.
            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data => {

                    //pulls the currently from the api
                    const {
                        temperature,
                        summary,
                        icon
                    } = data.currently;

                    //Set DOM elements from the API
                    temperatureDegree.textContent = Math.floor(temperature);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //forumula for Celsius
                    let celisus = (temperature - 32) * (5 / 9);

                    //sets icon
                    setIcons(icon, document.querySelector('.icon'))

                    //changes degree to Celisus/Fahrenheit
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === 'F') {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(celisus);
                        } else {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = Math.floor(temperature);
                        }
                    })
                })
        });

        //if they deny the locaiton, then a message will show.
    } else {
        h1.textContent = 'Hey this is not working, you need to enable location';
    }

    //outside of the navigator.geolocation

    //Grabs the icons
    function setIcons(icon, iconID) {
        //grabs the skycons and makes them white
        const skycons = new Skycons({
            color: 'White'
        });
        //Grabs the icon from Dark Sky API but the problem is that the icons
        //uses dashes and not underscores. This replaces the dashes with
        //underscores
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    //Grabs the local time in hours
    let currentTime = new Date().getHours();
    console.log(currentTime);

    //Checks to see if the local time is midnight (need to change it back to
    // 17:00 or 5pm)
    if (currentTime >= 18) {
        //removes the class day
        bodyBackground.classList.remove('day');
        //adds the class night-time
        bodyBackground.classList.add('night-time');
        //just making sure it works :P
        console.log(`psst, it's night time`);

        //Checks to see if the local time is less than or equal to 6pm
    } else if (currentTime <= 16) {
        //Removes the class night-time
        bodyBackground.classList.remove('night-time');
        //adds the class day
        bodyBackground.classList.add('day');
        //checking to make sure it works
        console.log(`Hey! It's day time! :D`);
    } else {
        //Removes the class night-time
        bodyBackground.classList.remove('night-time');
        //adds the class day
        bodyBackground.classList.add('day');
        //checking to make sure it works
        console.log(`Hey! It's day time! :D`);
    }

});
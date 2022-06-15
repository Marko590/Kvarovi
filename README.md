# Kvarovi

React Native application made to display scraped data
from pages containing info about 
[sewage](https://www.bvk.rs/kvarovi-na-mrezi/)
and [electrical](http://www.epsdistribucija.rs/Dan_0_Iskljucenja.htm) malfunctions
in Belgrade.

The application is able to take the street address that is currently
experiencing outages and locate it on a map (geolocation), returning it's exact
coordinates.

The information is recieved from a [REST API](https://github.com/Marko590/KvaroviServer)
I developed using [Express.js](https://github.com/expressjs/express).


## To-do
- [ ] Let the user set their neighbourhood so information about outages in that area appear in the card
- [ ] Add a settings page
- [ ] Add the second page 
- [ ] Remake the long press modal on street names
- [ ] Add info about electrical outages
- [ ] Enable http requests
- [ ] Translate hardcoded strings and make an English version
- [ ] Enable the user to pick background colors for the gradient

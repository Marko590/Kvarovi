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


![image](https://user-images.githubusercontent.com/62253006/174435519-9a62bfe7-23bf-4c8c-8660-874bc0accff1.png)
![image](https://user-images.githubusercontent.com/62253006/174435529-1a728f34-3c7d-46e1-b24d-fe84c5dda3bd.png)
![image](https://user-images.githubusercontent.com/62253006/174435538-ac557636-9ae2-451c-b203-40023ef2e9b2.png)
![image](https://user-images.githubusercontent.com/62253006/174435543-9e081cc9-ee2a-4fe2-b535-22cb605e4ffa.png)



## To-do
- [x] Let the user set their neighbourhood so information about outages in that area appear in the card
- [x] Add a settings page
- [x] Add the second page 
- [x] Remake the long press modal on street names
- [x] Add an about page
- [x] Add info about electrical outages
- [ ] Possibly add a main page for both types of info
- [ ] Make a service to send notifications using Headless JS
- [ ] Translate hardcoded strings and make an English version


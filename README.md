# Kvarovi

React Native application made to display scraped data
from pages containing info about 
[sewage](https://www.bvk.rs/kvarovi-na-mrezi/)
and [electrical](http://www.epsdistribucija.rs/Dan_0_Iskljucenja.htm) malfunctions
in Belgrade.

The application is able to take the street address that is currently
experiencing outages and locate it on a map (geocoding), returning it's exact
coordinates.

The information is recieved from a [REST API](https://github.com/Marko590/KvaroviServer)
I developed using [Express.js](https://github.com/expressjs/express).

![image](https://user-images.githubusercontent.com/62253006/175090125-57967083-a729-4b95-8ff1-56d258907ceb.png)
![image](https://user-images.githubusercontent.com/62253006/175090254-bdfcc65f-3a71-4f13-b149-d951d5381833.png)
![image](https://user-images.githubusercontent.com/62253006/175090333-96a040df-94ea-45ae-a08c-fa2d3ab935d6.png)
![image](https://user-images.githubusercontent.com/62253006/175090531-e067243c-ba68-4608-877b-e663327745bd.png)
![image](https://user-images.githubusercontent.com/62253006/175090618-28243ffb-a0d1-412a-8578-03a72c727274.png)



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


# ZenefitsCodingChallenge
Zenefits Coding Challenge
 
 
The Challenge is :

Create a web app (desktop or mobile) that provides a query box and a search button and then calls the Places Library for Google Maps (https://developers.google.com/maps/documentation/javascript/places). Format the results to give a good user experience. 


About the Architecture of the App :
***********************************

The App includes the API calls to google maps places library.

When the user keys in the place and location(Assisted by google maps autocomplete API) a list of all the places available in the location are visualized on the map. Besides, other states of each area like OverAll rating, Minimum Price Level,  Phone Number  and other categories into which the place listed falls in are visualized and listed.

Visualization:
***************

              HIGHCHARTS !
              ***********   
              The application uses highcarts to beautify the visualization.
              Every call to the google maps API retrieves results object which contains different places in the area user is searching for and other attributes for each.
              As most of the attributes are unavailable/undefined, I have considered those which are available and could be visualized.

              Graphs:
              *******
              
              A solid gauge chart which visualizes the rating for each place on the scale of 5.
              A solid gauge chart which visualizes the minimum price range for each place on the scale of 5.(less available)
              A column chart that visualizes the rating of all the places for comparision.

              Maps:
              *****
              
              The places the user looks in a region are pointed using a custom icon (zenefits logo).
              There exists interaction between the carousel of results and the icons pointing the location in the map.
              
              Animations:
              ***********
              When the user hits the mouse pointer onto the location in the map, the carousel automatically pulls in the details of the location which the user is looking at.
              Vice-versa ly, when the user slides the carousel, the place name that the carousel details has a pointer bouncing over it.

Deployment:
**********

The app is deployed in Heroku cloud. @( https://zencochallenge.herokuapp.com )
The app is hosted on the nodejs server.

Technologoes used:
********************

Nodejs( For hosting the application in heroku cloud)
HTML,CSS,Javascript
JQuery
Adobe Illustrator (for custom icons in the page and in the page tab logo and custom map pointer)
git (Deployment to heroku and archiving)
Google Material Design ( Followed to beautify the UX with subtle actions like ripple effect in the input field and color combinations)













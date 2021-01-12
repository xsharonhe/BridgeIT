<h1 align="center"> BridgeIT </h1>
Awarded Best Overall Hack at SheHacksV! Built with Django REST API, React, JavaScript, scikit-learn, Google Cloud APIs, and geotab datasets.
<br>
<br>
<b> Check out our project at: </b> https://devpost.com/xsharonhe?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav
<br>
<br>

![BridgetIT](https://github.com/xsharonhe/BridgeIT/blob/main/frontend/src/scenes/homeLogo.jpg)

## Inspiration
According to a recent study, even though 70% Inuit in Nunangat had been seen by a medical professional, 14% experienced unmet health care needs. Amongst the most common reasons given was that the health service was unavailable in the area or at the time required. Ironically, it is estimated that the U.S. healthcare system wasted $765 billion a year on essentially usable medical supplies. Surprised by these statistics, we wanted to create a platform that allows medical organizations to view the needs of nearby remote communities and donate excess products to remote communities.

## What it does
Introducing BridgeIT, a platform which strives to bridge the gap between First Nations communities and more urbanized society. Specifically, BridgeIT is designed to connect remote communities with local medical institutions and other donation centres, encouraging the donation of excess medical products to First Nation communities where supplies are severely lacking.

BridgeIT uses a combination of Google Cloud APIs and GeoTab data stacks to create a machine learning model capable of predicting the optimal transportation route between a given community and donation centre. The application pairs communities and donors based on the goods desired by the communities and the goods available by donors. Based on their locations, BridgeIT then provides both parties with a recommended shipping route. The determination of the route considers hazardous road intersections, no cell zones, and even border wait times for routes that cross the Canada-America border. 

## How we built it
We built this full-stack web application using React and JavaScript as the frontend, and a Django REST API with a PostgreSQL database, as our backend. User authentication was achieved using Django in conjunction with CSRF Cookies. Additionally, using Geotabs infrastructure datasets on hazardous driving areas and no cell spots, and their COVID-19 mobility dataset on border wait times, we were able to create a dynamic application that could give users recommendation on the best travelling route that would minimize time and prioritize safety. For the machine learning model, we used a stacked machine learning model with one layer as an extra tree regressor and the other as a random forest regressor, which ultimately achieved a 71% accuracy score and a 0.182 F2 score. In combination with the Google Places, Routes and Geocoding API, we were able to recommend to the user the top three routes that would take the shortest distance, recommending the route, time, place, and day.

## Challenges we ran into
One challenge we faced was using the Google Maps React package, as there were two different versions - one being deprecated and the other with very little documentation. It was frustrating to work with because it took us a long time to debug and understand how to use these React components.

Regarding the machine learning model, it was challenging to productionize the machine learning model in a Django REST API, as we were used to creating machine learning models in Jupyter notebooks. 

Another challenge we faced involved the exploration of user authentication with JWT and CSRF Cookies, a task which involved rewriting our authentication more times than we care to admit!

## Accomplishments that I'm proud of
Despite infuriating CORS errors, mismatched API keys, and the strange task of developing a hackathon project in lockdown, we are proud of the outcome, and are excited for what the future holds for BridgeIT. 

We are particularly proud of having implemented our own machine learning model and developing a full CRUD application in a short period of time with languages we were not not familiar with. We are also proud to have developed an application that has the potential to improve conditions in remote communities.

## What we learned
* How to incorporate a machine learning model in a Django REST API
* How powerful Google Maps API is and the number of services Google Cloud provides (it was very important for our recommendation engine and we used several of its platforms: distance matrix, routes, places, and geocoding)
* How to work as a team, as it was some of our first times’ working with four people

## What's next for BridgeIT
Everything, from an email confirmation system to accounting for product expiry dates in our calculations is on the table! We plan to incorporate a more accurate machine learning model (increase to over 80% accuracy), and have a more rigorous group ordering system in place.

Thanks for taking the time to read about BridgeIT!

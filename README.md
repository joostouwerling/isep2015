Website frontend
================

This is the website frontend for the coffee control application, which is
built for Softwerk AB as a project for Software Engineering I & II at the 
University of Groningen, 2015. It has a user system and the ability to
control the state of the coffee machine using a raspberry pi connected
to the back end. 

This logic behind the frontend and the communication with the backend is 
written mainly in AngularJS and the markup is built with Twitter Bootstrap. 
The author of this part of the application is Joost Ouwerling.

Code organization
-----------------

There are two subfolders, *app* and *assets*. This folder configuration was
suggested by [Adnan Kukic](https://scotch.io/tutorials/angularjs-best-practices-directory-structure).

### assets
Here you can find all static image and css files. nothing magically.

### app
The app folder contains all logic. It has one file and three folders. 
**coffee.js** is the main bootstrap which initializes the app and loads
all dependencies.

### app/components
Every folder here can be viewed as a small, stand alone application, 
and are mainly seperate pages of the app. It istherefore easy to find the 
right code with the right page based on the file structure. Services which
are only used at one page are also dropped here.

### app/shared
Code which is shared by multiple *components*. These can be services,
directives or filters.

### app/dev
Here is at this point only the development mock up api defined, which can be
activated during development in coffee.js.

Statistics
----------
Statistics are generated by Google Analytics and are shown using the 
[Embed API](https://developers.google.com/analytics/devguides/reporting/embed/v1/).
For more information on modifying the viewing of statistics, their development
reference and user guides prove to be very helpful. It uses the Google Service
Accounts to generate a access token which can be used by every user.

Considerations
--------------
When running this application in production, it might be useful to minimize and 
put all JS files in one file, to improve load speed.

Optimizations
-------------
Various. Unit tests, alert service, api service, other angularities which I do not (yet) know about ;-)

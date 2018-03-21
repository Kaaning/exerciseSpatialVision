# Exercise for Spatial Vision

## About
Here are the files for the exercise made by William VITALI for Spatial Vision.

The app can be accessed here : https://wvitali.github.io/exerciseSpatialVision/

It has been created with Ionic 3.9.2

## Sources

You can get the source files in the src folder and all the project files by downloading the exercise.zip

Once extracted, you will need to run npm install.

## Statement

*“Develop a responsive web app that allows a user to create a profile using name, email address, date of birth and location (using a map). This information should be saved locally [using local storage] and the user should be able to see it after refresh and edit it.”*

## Result

The app allows users to manage their profile. On the home page, the user can type in his email address.
Once logged in, the user can edit his name, his date of birth and sees where he has been geolocated.
All the data is stored in the local storage.

**Note :** As it was intended to be a web app, the Cordova plugins were not used. The app uses the *navigator.geolocation* with the parameter *enableHighAccuracy* set to true but this one may not be always accurate. For mobile applications, the Cordova geolocation plugin, more accurate, will be preferred.

## Improvements

A validation could be added to the form, at least for the email.

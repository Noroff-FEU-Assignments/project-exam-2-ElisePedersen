# Share-ish
This is my submission for the second project exam at Noroff. This project only covers the front-end application for the API. The API I have used can be found under Social EndPoints in the [Noroff API documentation](https://noroff-api-docs.netlify.app/). 

## Description
Share-ish is a social media application where photosharing is the main focus. A registered user can login and create posts containing images, text and tags. The user can also edit the posts subsequently or delete them completely. The application is social in a way where the users can interact with others through commenting posts and reacting with emojis. They can also visit other profiles and follow/unfollow these. On the profile page the user can edit their avatar and banner for a more personalized feel.  

### Frameworks and Libraries

- React
- React Bootstrap
- CSS Modules
- Yup and react-hook-form
- Axios
- Font Awesome
- Google Fonts

### Hosting Services

- Netlify

## Installation and Setup
To run the project locally, clone this repository to your computer. Make sure you have node and npm installed. Open a terminal in the proejct:

- run `npm install` 
- run `npm start` 
 
This will open a webbrowser and run the application in developer mode locally on your computer. Normally the application starts on `port 3000` if it is not already in use - press `Y` to open on another port. This page will reload when you save any changes. You can also see any errors in the terminal and console. 

### Register

To login, you need to register a new profile. The username must not include space or any punctuation marks except`_`. The email must be a `@stud.noroff.no` or `@noroff.no` email address. The password must be at least 8 characters. 

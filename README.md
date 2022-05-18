# Getting Started with the Laundry-Booking-WebApp

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This web app belongs to the Laundry-Booking-Application and provides users with a responsive web-based user interface.

## Used tools

For the project development, the following tools have been used:
- Version control (Git)
- JavaScript runtime environment (Node.js)
- Project and package management (npm)
- Automatic update when files change (React-scripts)
- Code editor (Visual Studio Code)
- Static analysis (ESLint)

## Frameworks

The following frameworks/libraries were used in this project:

- bootstrap
- react
- react-bootstrap
- react-bootstrap-icons
- react-cookie-consent
- react-dom
- react-scripts
- react-toastify

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Deployment to the cloud

The following steps describe the deployment process of the `Laundry-Booking-WebApp` project to Heroku's cloud service.

1. Create a free account on Heroku's cloud platform [Heroku](https://heroku.com/).
2. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) tool.
3. Login to Heroku using the CLI by typing `heroku login` in a shell terminal.
4. Download the latest version of the `Laundry-Booking-WebApp` project locally.
5. Start a new shell instance and change the directory to the local directory of the `Laundry-Booking-WebApp` project.
6. Initialize a new Git repository using the command `git init`.
8. Edit the `apiConfig.js` file accordingly and fill it with the needed information (VERY IMPORTANT).
9. Add all files to the local Git repository using `git add .`.
10. Commit the changes to the repository using the command `git commit -m "Commit message goes here!"`.
11. Create a new Heroku project using the command `heroku create --region eu --buildpack mars/create-react-app` in the shell terminal.
12. Push the changes to the newly created Heroku project repository using the command `git push heroku master`.
13. Heroku will automatically use the `mars/create-react-app` template to properly setup, build and deploy the React Webapp.
14. The deployment process might take few minutes, and once the deployment is complete, a link to the deployed project will be presented in the shell terminal.
15. The status and the logs of the project can be viewed on Heroku's online dashboard or using the command `heroku logs -n 200` in a shell terminal.

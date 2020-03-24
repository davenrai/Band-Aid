# React Express Auth

# Team 08

To start our app, please go to the index.html file. This is the main page for our application, "Band-Aid." To log in, press log in and use "user" as both the password and the username. This immediately takes you to our request timeline. Currently, you can add a request to our timeline and it will add it. You can also delete a request by saying "I'm down," which means that the request has been taken care of. Later on, we hope to show contact information so that they can contact that venue. To go to the admin view, the log in should be with username and password as "admin."

At the top, there is a button that says "My Profile." This will take you to a standard profile page, from where users will be able to create their own profiles! You can use the log out button at the top to log out of our application.

Next, you can sign up. You can pick a username, password, and say which email you need. Right now, you can add anything. You also have the option to pick if you are restaurant or performer or venue (restaurant/bar/convert hall). This will take you to different make profile pages, depending on if you choose to sign up as a performer or a venue. 

We do the following::

-   connect your React frontend to Express backend and MongoDB
-   create user sessions using cookies
-   use global state and prop drilling
-   organize your app so that your code is maintainable
-   make your app prettier using Material UI ✨


## Setup
Start your local Mongo database.  For example, in a separate terminal window:

```
# create and run local Mongo database in the root directory of the repo
mkdir mongo-data
mongod --dbpath mongo-data
```

Then, in the root directory of the repo, run:
```
# install server dependencies in the root directory
npm install

# install frontend dependencies in the client directory
cd client
npm install
```

Alternatively, you can run `npm run setup` in the root directory which runs a script to execute all the above commands (not including starting the mongo database, since it should be run in a separate window). This is a shortcut command defined in [package.json](package.json).

## Development

During development, run the following commands to build your React app and start the Express server.  You should re-run these commands for your app to reflect any changes in the code. Make sure mongo is still running on a separate terminal.

```
# build the React app
cd client
npm run build

# go back to the root directory
cd ..

# run the server
node server.js
```

Alternatively, you can run `npm run build-run` in the root directory which runs a script to execute all the above commands. This is a shortcut command defined in [package.json](package.json).

## Creating a User

There is no frontend form to create a user on the app, so before you login send a `POST` request to `/users` with something like:
```
{
    "email": "bob@gmail.com",
    "password": "123456"
}
```
Then proceed to `http://localhost:5000` in your browser and login with your credentials.

## Directory Structure

```
react-express-auth
├── db
│   └── mongoose.js
├── models
│   ├── user.js
│   └── student.js
├── package.json
├── server.js
└── client
    ├── public
    │   ├── index.html
    │   └── ...
    ├── tests
    │   └── ...
    └── src
        ├── actions
        │   ├── student.js
        │   └── user.js
        ├── react-components
        │   ├── Dashboard
        │   │   └── index.js
        │   ├── StudentForm
        │   │   ├── index.js
        │   │   └── styles.css
        │   ├── Student
        │   │   ├── index.js
        │   │   └── styles.css
        │   └── ...
        ├── index.js
        ├── index.css
        ├── App.js
        ├── App.css
        ├── package.json
        └── serviceWorker.js
```

## React Components

Each React component lives in a separate directory with its own `index.js` and `styles.css`. Import them from parent components as needed.

### Styles

Unique styles associated with each React component are kept separate. If the same styles are shared between multiple React components, keep them in a top-level, shared CSS file (i.e. App.css) to avoid repeated styles.

### Material UI

The following Material UI components are used in this app:

-   Button
-   TextField
-   Grid
-   Table
-   Table Body
-   Table Row
-   Table Cell

You can find more components [here](https://material-ui.com/).

Note that you can override the default styles of these components by increasing CSS selector specificity.

### Actions

To keep your `index.js` files clean and simple, import required methods from an associated action file. Following this structure can help organize your code and keep it manageable.

## Deployment

The `start` and `heroku-postbuild` scripts included in [package.json](package.json) will tell Heroku how to run your app.  You can deploy to Heroku easily:

```
# create a new empty Heroku app in the root directory (only need to be done once)
heroku create

# deploy the latest committed version of your code to Heroku
git push heroku master
```

Don't forget to set the `MONGODB_URI` environmental variable to use a cloud Mongo database (like Atlas).





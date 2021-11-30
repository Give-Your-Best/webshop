# Give Your Best webshop app

Welcome to our webshop app!

Visit our webshop here: https://give-your-best-webshop.herokuapp.com/

And visit our webpage here: https://www.giveyourbest.uk/

## Getting started

_Note: Until we automate this process and fetch the .env vars from Heroku/AWS Secrets/similar service,
you will need to manually input the database URI in the `.env` file in order to connect to the database.
See further below the steps how to set it up._

Clone the app with:

```
git clone https://github.com/Give-Your-Best/webshop.git
```

Then `cd` into `/webshop`.

Install the server dependencies with:

```
npm i
```

and the client dependencies with:

```
cd client && npm i
```

Then run the app:

```
npm run start:dev
```

This will run both the server and the client, and open localhost:3000 in Chrome.

If you want to run separately the server and the client, hit:

```
npm run start:server
```

and in another terminal session:

```
npm run start:client
```

Open the code in an editor of your choice, and you're ready to go!

## Run storybook

[Storybook](https://storybook.js.org/) is configured for this app.

To run Storybook, head to the client: `cd client`
and run: `npm run storybook`.

Alternatively, you can run storybook from the root directory, with:

```
npm run start:storybook
```

Storybook will run on port 6006.

## Setting up the database connection

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com) with our GYB developers Gmail credentials (ask Eirini if this doesn't ring any bells).
2. Head to "Database Access" menu and click on the top right to "Add new database user".
3. Add your user -> keep your username handy and copy your password - it's accessible only upon creation!
4. Click the "Databases" option from the left menu. You'll see the "prod" database with some live charts.
5. Click "connec" next to the name.
6. "Connect using MongoDB Compass"
7. Copy the database connection string you see
8. Create a `.env` file in the root dir of the repo, and add a variable with the name `DB_CONNECTION_URI` and a value of the string
   you just copied, replacing the username & password with your values (from step 3) and replacing the `/test` part with `/webshop?retryWrites=true&w=majority`
9. Restart the server and you should be good to go!

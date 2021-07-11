# Give Your Best webshop app

Welcome to our webshop app!

Visit our webshop here: https://give-your-best-webshop.herokuapp.com/

And visit our webpage here: https://www.giveyourbest.uk/

## Getting started

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

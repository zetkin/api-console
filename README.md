# Zetkin API Console
Simple console for testing and debugging API requests to the Zetkin Platform API. Calls are made manually either while authenticated or as an anonymous user, and the response can be reviewed as plain JSON text.

![Screenshot of Console](https://cloud.githubusercontent.com/assets/550212/7105414/07a86264-e117-11e4-8651-e79712bfe485.png)

## How to use
This repository contains the React.js source code for the console. To use the console you first have to build it, and then serve it from a (local) web server.

First make sure you have Node.js and npm installed, and then use `npm update` to install the requirements as defined in the `package.json` file.

```
npm update
```

Once all prerequisites have been installed, you can build the output JS and CSS using Gulp. The locally installed gulp can be accessed using the `gulp.sh` shortcut script.

```
./gulp.sh
```

Next you need to serve the `static` folder. A simple way to do that if you have Python is to use the standard `SimpleHTTPServer` Python module.

```
cd static
python -m SimpleHTTPServer 3080
```

This will serve the console on port 3080 of localhost. Browse to [http://localhost:3080](http://localhost:3080) to see the console in action.

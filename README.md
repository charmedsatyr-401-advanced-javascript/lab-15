![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## Lab 15: API Server

### Author: Joseph Wolfe

### Links and Resources
* [repo](http://xyz.co://github.com/charmedsatyr-401-advanced-javascript/lab-15)
* [travis](http://xyz.com)
* [front-end](http://xyz.com) (when applicable)
* [back-end](http://xyz.com) (when applicable)

#### Documentation
* [swagger](http://xyz.com) (API assignments only)
* [jsdoc](http://xyz.com) (All assignments)

### Modules
#### `modulename.js`
##### Exported Values and Methods

###### `foo(thing) -> string`
Usage Notes or examples

###### `bar(array) -> array`
Usage Notes or examples

### Setup
#### `.env` 
* `MONGODB_URI` - URL to the running mongo instance/db
* `PORT` - Port number
* `SECRET` - The key the application uses for JWT token signing
* `SINGLE_USE_TOKENS` - Boolean for whether single use tokens are issued
* `TOKEN_EXPIRE` - The amount of time before JWT tokens expire, expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms)

#### Running the app
* `npm start`
* Endpoint: `/foo/bar/`
  * Returns a JSON object with abc in it.
* Endpoint: `/bing/zing/`
  * Returns a JSON object with xyz in it.
  
#### Tests
* How do you run tests?
* What assertions were made?
* What assertions need to be / should be made?

#### UML
Link to an image of the UML for your application and response to events

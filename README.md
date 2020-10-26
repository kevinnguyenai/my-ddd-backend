# Node API fxlicense

## Quick start

_Notice that the boilerplate comes with a small application for user management already, you can delete it with a npm script after you understand how the boilerplate works but please do the quick start first!_ 😊

1. Clone the repository with `git clone --depth=1 https://github.com/talyssonoc/node-api-boilerplate`
2. Setup the database on `config/database.js` (there's an example file there to be used with PostgreSQL 😉 )
3. Install the dependencies with `yarn` (click here if [you don't have Yarn installed](https://yarnpkg.com/docs/install))
4. Create the development and test databases you have setup on `config/database.js`
5. Define configuration environment in `config/environments`
6. Run the database migrations with `npm run sequelize db:migrate`
7. Add some seed data to the development database with `npm run sequelize db:seed:all`
8. Run the application in development mode with `npm run dev`
9. Access `http://localhost:3000/api/users` and you're ready to go!
10. Generate new model Profile: `npm run sequelize -- model:generate --name=Profile --attributes=profile_id:number,profile_name:string,profile_img:number,profile_url:string,profile_address:string`, migration will create automatically
11. Generate new seed for Profile: `npm run sequelize -- seed:generate --name test-profile --models-path=/Projects/fxlicense/src/infra/models/Profile.js`

After playing a little bit with the boilerplate and _before_ implementing a real application with it I recommend you to read at least the `Setup` and the `Organization and architecture` sections of our [Wiki](https://github.com/talyssonoc/node-api-boilerplate/wiki). After that you'll be able to remove the example application files running `npm run cleanup`

## Usage:

_Notice that the api authentication is injection ready, you must using jwt pattern to authentication with application to use User or Productions API !_ 😊

1. Test authentication `curl -k -X POST -H "Content-Type: application/json" -d '{"email": "<abc@xyz.com>", "password": "<abc@xyz>"}' https://localhost:3000/token`
2. Create user `curl -k -X POST -H "Content-Type: application/json, Authorization: jwt <token>" -d '{"name":"admin", "age": 37, "email": "admin@xyz.com", "password": "admin@xyz", "active": true}' https://localhost:3000/api/users/`
3. Test api users `curl -k -X POST -H "Content-Type: application/json, Authorization: jwt <token>" https://localhost:3000/api/users/<id>`


## Aditional info:

- Don't forget to run the migrations for the test environment as well (including when you create a new migration) with `npm run sequelize db:migrate -- --env=test`
- Keep in mind you must define some argument in your environment when start include
    `timezone: process.env.TIMEZONE,`
    `authSecret: '<extermerly secret using to release license to customer for production>'`
    `AdministratorEmail: "<email address of admin>"` - only this email can get token for verify all of api of system 

## Scripts

This boilerplate comes with a collection of npm scripts to make your life easier, you'll run them with `npm run <script name>` or `yarn run <script name>`:

- `dev`: Run the application in development mode
- `start` Run the application in production mode (prefer not to do that in development) 
- `test`: Run the test suite
- `test:unit`: Run only the unit tests
- `test:features`: Run only the features tests
- `coverage`: Run only the unit tests and generate code coverage for them, the output will be on `coverage` folder
- `lint`: Lint the codebase
- `sequelize`: Alias to the [Sequelize CLI](https://github.com/sequelize/cli)
- `console`: Open the built-in console, you can access the DI container through the `container` variable once it's open, the console is promise-friendly. Click [here](https://github.com/talyssonoc/node-api-boilerplate/wiki/Application-console) to know more about the built-in console
- `cleanup`: Removes the files from the example application

## Tech

- [Node v7.6+](http://nodejs.org/)
- [Express](https://npmjs.com/package/express)
- [Sequelize](https://www.npmjs.com/package/sequelize)
- [Awilix](https://www.npmjs.com/package/awilix)
- [Structure](https://www.npmjs.com/package/structure)
- [HTTP Status](https://www.npmjs.com/package/http-status)
- [Log4js](https://www.npmjs.com/package/log4js)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Express Status Monitor](https://www.npmjs.com/package/express-status-monitor)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [PM2](https://www.npmjs.com/package/pm2)
- [Mocha](https://www.npmjs.com/package/mocha)
- [Chai](https://www.npmjs.com/package/chai)
- [FactoryGirl](https://www.npmjs.com/package/factory-girl)
- [Istanbul](https://www.npmjs.com/package/istanbul) + [NYC](https://www.npmjs.com/package/nyc)
- [ESLint](https://www.npmjs.com/package/eslint)

## Contributing
- 


## My Solution Fingerprint
 Generation SSL for https
 ```
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
 ```

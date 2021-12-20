# Storefront Backend Project

Challenge by Udacity Fullstack Web Developer Nanodegreee.

### Steps to make the project work:

1. Using the terminal, enter the project root
2. Copy the file '.env.example' to '.env' using the command: `mv .env.example .env`
3. Install all the dependencies using: `npm install` or `yarn`
4. Make the docker environment run with the command: `docker-compose up`
5. Run the command to create the database: `npm run create`
   - That command will create a user and the dev database and also the testing database according to the names specified in the .env file
   - After the running of the command, it is possible to lock the database restarting the docker-compose manually. The steps to proceed are:
     1. Stop docker-compose
     2. Change the .env file, removing the "POSTGRES_HOST_AUTH_METHOD" entry.
     3. Running the server again with `docker-compose up`
     4. Now the database will only be authenticated using the username and password provided in the .env (the user was created when the command `npm run create` was run)
6. Run all the database migrations: `npm run migrate`
7. Use any of the available commands to make the project work

### Available commands

1. Start the server in dev mode, compiling the typescript in realtime: `npm run watch`
2. Run the tests: `npm run test`
3. Run the migrations: `npm run migrate`
4. Build the project: `npm run build`
5. Start the server (after successfully built): `npm run start`

## Description

[UBER-Challenge]

Uber drivers are very eager to achieve the best targets in number of trips. It is a good thing for
Uber and for the drivers. But Uber is a well developed and educated company that wants to
know if some of the drivers are monopolists in this competition. So that Uber decided to create a
system that will detect and display drivers who have made more than or equal to 10% of the
trips. It also wants this information on three levels; who exceeded 10% this month, this year,
and all time.
They want to maintain a be able to display an updated list of monopolist for anyone opens Uber
website.
There are some requirements for this goal to be achieved:
1- Uber needs a web service that the driver app will use to inform the system that the driver
made another trip. It uses POST method and it doesn't need any parameters. Each call to this
service means another trip for the calling driver. This web function can only be accessed using
the driver's credentials.
2- Another web service is needed that gets the current list of monopolists.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
# rename development.json.dist to development.json
$ npm run start

# watch mode
# rename development.json.dist to development.json
$ npm run start:dev

# production mode
# rename production.json.dist to production.json
$ npm run start:prod
```
## ADMIN USER
email: sherif@develop.com
password: 123456


## Web Services: JSON

1- Register new driver :

- POST   /auth/register

- Request body :
 {
   email: "hey@gmail.com",
   password: "123456"
 }
==========================================
2- Login :

- POST   /auth/login

- Request body :
 {
   email: "hey@gmail.com",
   password: "123456"
 }

 - After login jwt token will be sent in headers
   to be used later for other routes.
==========================================
3- Add trip for a driver: 

- POST   /trips

- Headers :
  key : x-auth 
  value: driver jwt-token
===========================================
4- List Monopolists: 

- POST   /monopolists/{period}

  period =  month  --  List of drivers exceeding 10% of the trips this month.
  period =  year   --  List of drivers exceeding 10% of the trips this year.
  period =  ever   --  List of drivers exceeding 10% of the trips all time.

- Headers :
  key : x-auth 
  value: admin jwt-token
===========================================


## Test
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverag
$ npm run test:cov
```

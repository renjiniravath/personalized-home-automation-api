# Personalized Home Automation API

This RESTful API serves the endpoints used by the Personalized Home Automation project. The endpoints are called by the Raspberry Pi controller, which controls the home devices and also by the Preferences Console, which is used by the user to view and change their preferences.

## Tools Required

This API is build on Node.js and connects to and uses MongoDB for database, HiveMQ Broker for MQTT. See the installation and documentaion links for these tools below

* Node.js 
    - [Installation](https://nodejs.org/en/download)
* MongoDB 
    - [Installation](https://www.mongodb.com/docs/manual/administration/install-community/)
    - [Documentation](https://www.mongodb.com/docs/)
* HiveMQ Broker 
    - [Installation and documentation](https://www.hivemq.com/downloads/hivemq/)

Install these tools and run to set up the environment. You may also use any cloud or docker versions of the tools.

## Environment Variables

The environment variables used by the API is listed in the .env file. Replace these values according to your environment. Refer the [.env](.env) file for info on the environment variables.

## Running Development

Run the below commands to start your development server.
```bash
cd personalized-home-automation-api
npm install
node index.js
```
The API wil be server on SERVER_PORT env in the .env file

## Endpoints

### Sample Responses

**Sample Success Response**
```json
{
    "authorizedUsers": [
        "Jubitta",
        "Ashish"
    ]
}
```
A success response will have a status code 200 (*Status OK*)

**Sample Error Response**
```json
{
    "errorMessage": "User is not authorized"
}
```
A known error will have a status code 4xx and an unknown error will have a status code 500.

### Note

```
Single user string - A single user string is just the username. :user always denotes a single user string. :users can also be replaced by a single user string depending upon the endpoint.

Multi user string - A multiple user string is a hyphen seperated sorted list of username as string. For eg, Ashish-Jubitta-Renji for a request involving users Ashish, Renji and Jubitta. Only denoted by :users.

Room - Rooms in this documentation are represented by :room and is to be replaced by roomID. For eg, GET /rooms/1234/settings returns the settings of the room 1234.

```

### Individual Preferences

**Get a user's preferences**

Returns a user's or a group of current set of preferences

Request

GET */users/:users/preferences*

> :users could be a single user string or a multiple user string


Success Response

```json
{
    "preferences": {
        "_id": "Ashish",
        "temperatureInF": 65,
        "fanSpeed": 3,
        "lightBrightness": 68,
        "lightColor": "Red",
        "humidity": 61
    }
}
```

**Get user's shared preferences**

Returns a list of all the agreed upon set of preferences a user shares with any others

Request

GET */users/:user/preferences/shared*

> :user is always a single user string

Success Response

```json
{
    "sharedPreferences": [
        {
            "_id": "Ashish-Jubitta",
            "fanSpeed": 0,
            "humidity": 50,
            "lightBrightness": 50,
            "lightColor": "Red",
            "temperatureInF": 83
        }
    ]
}
```

**Add preferences**

Inserts a set of individual preferences of a user

Request

POST */users/:user/preferences*

```json
{
  "_id": "John",
  "temperatureInF": 60,
  "fanSpeed": 5,
  "humidifier": "ON",
  "lightBrightness": 100,
  "lightColor": "Red"
}
```
> :user is always a single user string


Success Response
```json
{
    "message": "John's preferences were successfully saved"
}
```

**Update preferences**

Update the individual preferences of a user

Request

PUT */users/:user/preferences*

```json
{
  "_id": "John",
  "temperatureInF": 60,
  "fanSpeed": 5,
  "humidifier": "ON",
  "lightBrightness": 100,
  "lightColor": "Red"
}
```
> :user is always a single user string


> Only the fields needing an update needs to be provided in the request body


Success Response
```json
{
    "message": "John's preferences were successfully updated"
}
```

### Authorization

**Get authorized users**

Returns a list of all authorized users in the system

Request

GET */users*

Success Response
```json
{
    "authorizedUsers": [
        "Jubitta",
        "Ashish"
    ]
}
```

**Check if user is authorized**

Returns a success response if a user is authorized in the system

Request

GET */users/:user/check*

> :user is always a single user string

Success Response
```json
{
    "message": "User is authorized"
}
```

### Rooms

**Get the current occupants of a room**

Returns a list of occupants in a room

Request

GET */rooms/:room/occupants*

Success Response
```json
{
    "occupants": [
        "Jubitta"
    ]
}
```

**Scan a user IN/OUT of a room**

Checks if the user is authorized to scan in to a room. Returns the current occupants and updated settings of the room if user is authorized. If the user is unauthorized, returns an error

Request

PUT */rooms/:room/users/:user/scan*

> :user is always a single user string


Success Response
```json
{
    "authorized": true,
    "occupants": [
        "Ashish",
        "Jubitta"
    ],
    "settings": {
        "_id": "Ashish-Jubitta",
        "fanSpeed": 0,
        "humidity": 50,
        "lightBrightness": 50,
        "lightColor": "Red",
        "temperatureInF": 83
    }
}
```

**Get room settings**

Returns the current settings of a room

Request

GET */rooms/:room/settings*

Success Response
```json
{
    "occupants": [
        "Ashish",
        "Jubitta"
    ],
    "settings": {
        "_id": "Ashish-Jubitta",
        "fanSpeed": 0,
        "humidity": 50,
        "lightBrightness": 50,
        "lightColor": "Red",
        "temperatureInF": 83
    }
}
```

### Shared preferences requests

**Get shared preferences requests**

Returns a list of all shared preferences requests associated with a user

Request

GET */users/:user/requests*

> :user is always a single user string

Success Response
```json
{
    "requests": [
        {
            "_id": "Ashish-Jubitta",
            "preferences": {
                "temperatureInF": 70,
                "lightBrightness": 40,
                "lightColor": "White",
                "humidity": 50,
                "fanSpeed": 5
            },
            "requesters": [
                "Ashish"
            ]
        }
    ]
}
```

**Request a shared preference**

Adds a request with a set of preferences to be shared with an other user. This request is automatically approved by the initiator and has to get approved by all users involved to add as or replace the current agreed shared preference set.

Request

POST */users/:users/requests*

```json
{
  "requester": "Jubitta",
  "preferences": {
    "temperatureInF": 50,
    "fanSpeed": 1,
    "humidity": 50,
    "lightBrightness": 55,
    "lightColor": "Red"
  }
}
```
> :users is always a multiple user string

Success Response
```json
{
    "message": "A new shared preference request was created for Ashish-Jubitta"
}
```

**Update a shared preference request**

Update a shared preference request. The request is no longer shown as approved by the other parties involved and have to go through the approval process again with each user to add as or replace the current agreed shared preferences set.

Request

PUT */users/:users/requests*

```json
{
  "requester": "Jubitta",
  "preferences": {
    "temperatureInF": 50,
    "fanSpeed": 1,
    "humidity": 50,
    "lightBrightness": 55,
    "lightColor": "Red"
  }
}
```
> :users is always a multiple user string


Success Response
```json
{
    "message": "The shared preference request was updated for Ashish-Jubitta"
}
```

**Approve request**

Approves a shared preference request

Request

PUT */users/:users/requests/approve*

```json
{
    "requester": "Ashish" 
}
```
> :users is always a multiple user string

Success Response
```json
{
    "message": "This request was marked as approved by everyone involved and moved to preferences"
}
```


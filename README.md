# Godseye project by Anton Myrberg

## Table of contents
1. [How to install](#install)
2. [Routes](#routes)
3. [About](#about)

<a name="install"/>

## How to install
### Requirements
| Technologies  | Version       
| ------------- |:-------------:|
| Nodejs        | v8.9.4+       |
| Npm           | 5.6.0         |
| Docker        | 18.09.1+      |

#### Install mysql on docker
Follow this tutorial on how to setup a mysql image on docker https://medium.com/@dilsimchandrasena/how-to-deploy-and-use-a-mysql-docker-container-in-ubuntu-4ace7c893982.

#### Setup the backend project
1. Clone the project from Github.
2. To setup the backend server simply `cd ./backend && npm install`
3. Setup the right variables in [config.json](./config/warehouse_db.json) (They might already be right)
4. To connect the mysql to the project, enter the sql folder `cd ./sql` and run `bash setup.sql`'
5. Now that your mysql database is setup go to /backend again and run `npm start`


<a name="routes"/>

## Routes
NOTE: All the routes are protected by Auth0. So in order to access these routes you need to send an jwt token that you get from calling their api.
### POST /camera
Post an object that looks like this
```json
{
  "name": "Example name",
  "camera_url": "http://youtube.com",
  "description": "Example description"
}
```
This will create a new camera with those attributes.

### GET /camera
Just send a GET method to `/camera`. This will return an array with all the camera objects that have this format:
```
{
  camera_id,
  name,
  camera_url,
  description
}
```

### POST /camera/remove
Send an object with this format:
```
[
 {
  "camera_id": 1
 },
 ...
]
```

### GET /vehicles
Send a GET request and it will return an array with vehicle objects like this:
```
[
  {
    vehicle_id,
    name,
    description
  },
  ...
]
```

### POST /vehicles/remove
Send an object with this format:
```
[
 {
  "camera_id": 1
 },
 ...
]
```

### POST /vehicles
Post an object that looks like this
```json
{
  "name": "Example name",
  "description": "Example description"
}
```
This will create a new vehicle with those attributes.

### GET /notifications
Returns a list with phone numbers.

```
[
  {phone_number: <phone_number>, receiptant_id: <random_id>}
]
```

### POST /notifications
Allows you to add phone numbers. Example body that could be posted:
```json
{
  "phone_number": "123456789"
}
```

### POST /notifications/remove
Remove list of numbers. Send and object with this format:
```
[
 {
  "receiptant_id": 1
 },
 ...
]
```

### POST /notifications/event
Send an event notification.
Just send a http request with post method to this route and it will send a notification to the current numbers.

<a name="about"/>

## About

The Autonomous warehouse system will be a way for the customer (Waleed Abdeen) to monitor its autonomous vehicles. The vehicles are fully autonomous and will be observed with a camera feed. This camera feed will be accessible from the front office application, from where the customer can observe and interfere with the vehicles in case of important events such as a collision.

This Github repository is the backend part of the frontoffice application.

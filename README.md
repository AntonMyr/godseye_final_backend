# Godseye project by Anton Myrberg

## Table of contents
1. [How to install](#install)

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
1. To setup the backend server simply `cd ./backend && npm install`
2. Setup the right variables in [config.json](./config/warehouse_db.json) (They might already be right)
3. To connect the mysql to the project, enter the sql folder `cd ./sql` and run `bash setup.sql`'
4. Now that your mysql database is setup go to /backend again and run `npm start`


## Routes
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
```json
{
  camera_id,
  name,
  camera_url,
  description
}
```

### POST /camera/remove
Send an object with this format:
```json
[
 {
  "camera_id": 1
 },
 ...
]
```

### GET /vehicles
Send a GET request and it will return an array with vehicle objects like this:
```json
[
  {
    vehicle_id,
    name,
    description
  },
  ...
]
```

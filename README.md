# Togethearth

This project is a website hosting videos and games from organizations, allowing its users to discover many wonderful ways to act for a better world.


## Setup projet:

### To install all the dependencies on both client and server sides :

#### In the root folder of the project, launch the command : 
```
npm install
```


### Connect to the MySQL database (if you want it on your local MySQL):

#### Go to ``server/app/config/``, copy the ``db.config.js`` file and replace the example connection pparameters by the log in credentials of your MySQL database.

### Creation of the tables:

#### Execute the ``server/app/config/bdd.sql`` file in you database to create the necessary tables.



### Connect the client to the server:

#### Go to ``client/src/main.js`` and remplace the server address by the address of your server in this line:

```
localStorage.setItem('addressServer', 'http://129.151.226.75:8080')
```

#### By default, the server will run at the following address :

```
localStorage.setItem('addressServer', 'http://localhost:8080')
```


## Projet execution :

#### In the root folder of the project, launch the command :

##### server & client :

```
npm start
```

##### server :

```
npm run serve
```

##### client :

```
npm run cli
```

#### To access the website when the script is running, you just have to connect to your server address on the port ``8081`` on the browser of your choice.

#### You can see an example of the website running at the following address : _http://129.151.226.75:8081/landing-page_

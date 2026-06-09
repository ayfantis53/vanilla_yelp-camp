## Getting Started with Yelp-Camp App

### This project was created in reference to
- **The Web Developer Bootcamp 2026**
    > [https://www.udemy.com/course/the-web-developer-bootcamp/]

- Yelp Camp is a Vanilla Javascript project made with JS, HTML5, CSS/Bootstrap5, Express.
- It has a Dockerized element that runs the web app with a localized Mongo DB. 
    

-----------------------------------------------------------------------------------------------------------------
## Setting up Yelp-Camp App

### 1. Initializing project folders and dependencies.
```bash
# Create Frontend Folders
npm init -y
# Download dependencies
npm i express mongoose express ejs-mate dotenv passport passport-local method-override
npm i cloudinary @mapbox/mapbox-sdk connect-flash connect-mongo express-session 
npm i joi mapbox-gl multer multer-storage-cloudinary passport-local-mongoose
```

### 2. Setting up Mongo DB.
- Navigate to **[https://www.mongodb.com/try/download/community]**
    * MongoDB Community Server Download
- Open up Mongo Atlas Compass and connect to the Yelp-camp database.

### 3. Setting up Docker.
#### Login.
```bash 
docker login -u ${username} 
```
#### Docker cleanup commands.
```bash 
docker rm -f $(docker ps -aq)
docker image prune --all --force
docker system prune
```

### 4. Connecting to Database.
- Copy uri into var **<ATLAS_URI>** in .env file with extension [mongo-url]


-----------------------------------------------------------------------------------------------------------------
## Running Yelp-Camp App locally

### 1. Debugging.
- **<Shift + Ctrl + J> to open browser console for debugging.**
    ```bash
    npm ls react
    npm cache clean --force
    npm install -g npm
    ```
### 2. Running project manually.
```bash
# package.lock command
npm start
# Raw command
node app.js
# Raw command nodemon
nodemon app.js
```
### 3. Seeding project manually.
- Register a user
    * Copy number in `_id: ObjectId('')` into `./models/seeds/index.js` line `author: 'number',`
- Run Seeds
```bash
# package.lock command
npm run seed
# Raw command
node models/seeds/index.js
```

### 4. Running project Docker.
- **Run project.**
    * On windows machine open DockerDesktop.
    * navigate to **[http://localhost:3000/]** in browser after running compose.
        ```bash
        docker-compose up --detach
        docker-compose down
        ```

# gym-tracker-react-native

### TLDR Description
Native android app written in React Native - to record workouts in the gym. 
Hooked into a Node-Express-Mongo server hosted on AWS EC2. 

### Description
This is part of a MERN app hosted on AWS. 
The backend is a MongoDB database hosted on Mongo Atlas, accessed through a Node-Express server (running on an AWS EC2 instance).
The initial inspiration for this project was to open up my gym data so I can monitor my fitness and gym performance more closely, importing it into a database for trend analysis (which will form another project).

<img src="https://s3.eu-central-1.amazonaws.com/gym-tracker-node/gymtrackerwalkthrough.gif" title="Walkthrough of the Gym Tracker android app"> 

### Technologies Used: 
+ React Native
+ React Navigation
+ Redux
+ Javascript ES6
+ MongoDB
+ Node server (Mongoose, Express) (in another repo here: <a href="https://github.com/dk03/gym-tracker-node-server">HERE</a>)
+ Authentication
+ React native paper
+ AWS

### What I would do differently:
+ Implement Redux from the very beginning, instead of refactoring several times to implement redux.
+ Plan the data flow from the beginning and design the architecture around this.
+ Host the Node server on AWS Elastic Beanstalk.
+ Implement unit testing from the beginning. 

### Future plans (in no particular order):
+ Add password hashing.
+ Complete Redux refactoring.
+ Seperate logic and style components.
+ Enfore HTTPS in the server.
+ Move the Node server from EC2 to AWS Elastic Beanstalk.
+ Complete styling.
+ Google and Facebook authentication.
+ A web-app to enable access to historical data. 

### Check out the server <a href="https://github.com/dk03/gym-tracker-react-native/blob/master/lessons.md">HERE</a>

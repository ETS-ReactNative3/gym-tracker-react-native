1) Redux
2) React Navigation
3) MongoDB Authentication
4) Google OAUTH2 


Rationales for chosen stack & packages: 

* Redux:

It is far easier for me to manage the daily workout object when it can be accessed and modified globally between components. As exercises generally have the following hierachy: 

Workout --> List of exercises --> Exercises

Using redux allows the use of different workouts (list of ex's) to access the same record object which will result in the days 'workout record', avoiding the need to pass the state up the component hierachy in a convoluted way. This would have been especially messy whilst using react-navigation.

* Styling - CSS

* Keeping track of the component hierachy



* Future features: 

+ Add exercise state to redux so it persists outside of its lifecycle.
+ finding a big enough image database of exercises
+ Using Ubunut EC2 instead of web apps? - manually restart server everytime - run programs to keep server running, nginx to route to port 80 etc etc.

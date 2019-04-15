
        AsyncStorage.getItem(workoutKey)
          .then(doc => {
            const savedWorkouts = JSON.parse(doc);
            
            if(savedWorkouts) {
                if (savedWorkouts.userid === this.state.userId) {

                    this.props.addInitialWorkout(savedWorkouts)
      
                  } else {
      
                    this.props.addBlankWorkout(this.state.userId)
                  }
            } else {

                fetch(
                    `http://ec2-18-185-12-227.eu-central-1.compute.amazonaws.com:3000/workout-list/${
                      this.state.userId
                    }`,
                    {
                      method: "GET",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                      }
                    }
                  )
                    .then(response => {
                      return response.json();
                    })
                    .then(res => {
                      // send to action creator - update redux state & save to local storage
                      if (res.length > 0) {
                        this.props.addInitialWorkout(res[0]);
                        AsyncStorage.setItem(workoutKey, JSON.stringify(res[0]))
                        .catch(err => console.log("Error setting fetch response to local storage: ",err));
                      } else {
                        alert("Please create a workout.");
          
                        this.props.addBlankWorkout(this.state.userId);
                      }
                    });
                }
              })
              .catch(err => console.log("Error getting ALL KEYS from local storage: ", err))
        
  
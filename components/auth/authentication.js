export const checkemail = (email, password) => {

    const emailRegex = /^\S+@\S+\.\S+$/;
    let resBody

    if (emailRegex.test(email) && password) {
      
      // Check server if user exists
      fetch(
        `http://ec2-18-185-12-227.eu-central-1.compute.amazonaws.com:3000/user/email/${email}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
        
        .then(res => {
            return resBody = JSON.parse(res._bodyText)
            
        })
            
    } return resBody 
}
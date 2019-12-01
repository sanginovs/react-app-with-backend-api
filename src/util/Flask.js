const Flask = {

  search(queryString, sortBy){
    if(sortBy === "1-on-1"){
      return fetch(`http://127.0.0.1:5000/users?queryString=${queryString}`, {
        headers: {
        'accept': "application/json",
        //'x-requested-with': "xmlhttprequest",
        'Access-Control-Allow-Origin':"*",
        }
      }).then(response => {
        console.log("We got a response")
        console.log(response)
        return response.json();
      }).then(jsonResponse => {
        console.log(jsonResponse);
        if (jsonResponse) {
          console.log("inside user")
          return jsonResponse.map(user => ({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            discuss: user.discuss
          }));
        }
      });
    }

    //https://cors-anywhere.herokuapp.com/
    //comes in with space=> concetenate with + in between each word
    //queryString: hello+world
    return fetch(`http://127.0.0.1:5000/workshops?queryString=${queryString}`, {
      headers: {
      'accept': "application/json",
      //'x-requested-with': "xmlhttprequest",
      'Access-Control-Allow-Origin':"*",
      }
    }).then(response => {
      console.log("We got a response")
      console.log(response)
      return response.json();
    }).then(jsonResponse => {
      console.log(jsonResponse);
      if (jsonResponse) {
        console.log("inside")
        return jsonResponse.map(workshop => ({
          id: workshop.workshop_id,
          title: workshop.title,
          description: workshop.description,
          file: workshop.file,
          schedule: workshop.schedule,
          speaker: workshop.speaker
        }));
      }
    });
  }
};

export default Flask;

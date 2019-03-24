import { action, observable, decorate, computed } from "mobx";
import User from "../models/User";

class StartingStore {
  welcomeMessage = "Welcome!";
  listOfUsers = [];
  currentUser = new User();
  api = undefined

  constructor(api) {
    this.api = api
  }

  changeMessage = msg => {
    this.welcomeMessage = msg.target.value;
  };

  resetMessage = () => {
    this.welcomeMessage = "Welcome!";
  };

  pushToArray = (user, firstName) => {
    this.listOfUsers.push(new User(user));

    // changing model property
    this.currentUser.setProperty("firstName", firstName);
  };

  getName = () => {
    this.api.getUsers()
    .then(data => {
      console.log(data.data)
    })
  }
}

decorate(StartingStore, {
  welcomeMessage: observable,
  listName: observable,
  currentUser: observable,
  changeMessage: action,
  resetMessage: action,
  pushToArray: action,
  getName: action
});

export default StartingStore;

import { action, observable, decorate, computed } from "mobx";

class StartingStore {
    welcomeMessage = 'Welcome!'

    changeMessage = msg => {
        this.welcomeMessage = msg.target.value
    }

    resetMessage = () => {
        this.welcomeMessage = 'Welcome!'
    }
}

decorate(StartingStore, {
    welcomeMessage: observable,
    changeMessage: action,
    resetMessage: action
})

export default StartingStore
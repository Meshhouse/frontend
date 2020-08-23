import { observable } from 'mobx';

interface Error {
  visible: boolean;
  message: string;
}

class Store {
  @observable error: Error = {
    visible: false,
    message: ''
  };

  setError = (visible: boolean, message: string) => {
    this.error = {
      visible,
      message
    };
  }
}

export default new Store();

import Joi from "joi";
import { decorate, observable } from "mobx";
import Model from "./Model";

class User extends Model {
  constructor(props) {
    const defaults = {
      _id: undefined,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: 0,
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: 0
      },
      dateRegistered: undefined
    };
    super({ ...defaults, ...props });
  }

  static get schema() {
    return {
      _id: Joi.string()
        .hex()
        .length(20),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.email().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
      address: Joi.object().keys({
        street: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        postalCode: Joi.number()
      }),
      date: Joi.date()
        .iso()
        .required()
    };
  }
}

decorate(User, {
  firstName: observable,
  lastName: observable,
  email: observable,
  password: observable,
  phone: observable,
  address: observable,
  date: observable,
});

export default User;

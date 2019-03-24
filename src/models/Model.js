/* eslint no-param-reassign: ["error"] */

import Joi from 'joi';
import {
  toJS,
  isObservableArray,
  isObservableObject,
  isBoxedObservable,
  action,
  decorate,
} from 'mobx';

class Model {
  constructor(props) {
    Object.assign(this, props);
  }

  static get schema() {
    return {};
  }

  validate = () => (
    Joi.validate(
      this,
      this.constructor.schema,
      {
        skipFunctions: true,
        abortEarly: false,
        allowUnknown: false,
      },
    )
  );

  setProperty = (property, value) => {
    this.handleProperties(property, value);
  };

  // get toJS of each property that is an observable
  get toJSproperties() {
    let propertiesClone = {};

    Object.keys(this).forEach((prop) => {
      const value = this[prop];
      if (isObservableArray(value) || isObservableObject(value) || isBoxedObservable(value)) {
        propertiesClone = { ...propertiesClone, [prop]: toJS(value) };
      }
    });

    return { ...this, ...propertiesClone };
  }

  get errors() {
    const { error } = this.validate();

    if (error) {
      const { details } = error;
      return details;
    }

    return [];
  }

  get isValid() {
    const { error } = this.validate();
    return error === null;
  }

  handleProperties = (property, value, deepProperty = undefined) => {
    if (typeof property !== 'string') {
      throw new Error('accepts property of type string');
    }

    const properties = property.split('.');
    const prop = properties.shift();

    if (properties.length > 0) {
      if (deepProperty) {
        return this.handleProperties(properties.join('.'), value, deepProperty[prop]);
      }
      return this.handleProperties(properties.join('.'), value, this[prop]);
    }
    if (deepProperty) {
      (deepProperty[prop] = value);
      return true;
    }
    this[prop] = value;
    return true;
  }
}

decorate(Model, {
  setProperty: action,
});

export default Model;

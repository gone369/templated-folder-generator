const _ = {
  get: require("lodash/get"),
  set: require("lodash/set"),
  merge: require("lodash/merge"),
  isPlainObject: require("lodash/isPlainObject")
};

const defaultConfig = require("./defaults/config.default");
const defaultContext = require("./defaults/context.default");

class Store {
  constructor(state) {
    this.initialState = state;
    this.state = state;
  }
  get(path, defaultValue) {
    return get(this.state, defaultValue);
  }
  set(path, value) {
    set(this.state, path, value);
  }
  merge(state) {
    merge(this.state, state);
  }
  reset(stateOrCb) {
    if (typeof stateOrCb === "function") {
      this.state = stateOrCb(this.state, this.initialState);
    } else {
      this.state = state || this.initialState;
    }
    return this.state;
  }
}

// singleton
const store = new Store({
  config: defaultConfig,
  context: defaultContext
});

module.exports = store;

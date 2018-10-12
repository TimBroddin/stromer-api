import moment from "moment";

class State {
  constructor(api, bike) {
    this.api = api;
    this.bike = bike;
  }

  async get(cached = false) {
    if (!this.bike || !this.bike.obj()) {
      await this.bike.getBike();
    }

    const status = await this.api.call(
      `bike/${this.bike.obj().bikeid}/state?cached=${cached}`
    );
    if (status && status.length) {
      let statusObject = Object.assign({}, status[0]);
      statusObject.rcvts = moment.unix(statusObject.rcvts); // TODO: cached gives different timestamp
      this.status = statusObject;
      return this.status;
    } else {
      throw new Error("Bike status could not be retrieved");
    }
  }
}

export default State;

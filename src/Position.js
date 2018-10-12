import moment from "moment";

class Position {
  constructor(api, bike) {
    this.api = api;
    this.bike = bike;
  }

  async get(cached = false) {
    if (!this.bike || !this.bike.obj()) {
      await this.bike.getBike();
    }

    const position = await this.api.call(
      `bike/${this.bike.obj().bikeid}/position?cached=${cached}`
    );
    if (position && position.length) {
      let positionObj = Object.assign({}, position[0]);
      positionObj.rcvts = moment.unix(positionObj.rcvts); // TODO: cached gives different timestamp
      this.position = positionObj;
      return this.position;
    } else {
      throw new Error("Biks position could not be retrieved");
    }
  }
}

export default Position;

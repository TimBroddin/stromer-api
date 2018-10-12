import moment from "moment";

class Light {
  constructor(api, bike) {
    this.api = api;
    this.bike = bike;
  }

  async set(mode = "flash") {
    if (!this.bike || !this.bike.obj()) {
      await this.bike.getBike();
    }

    return await this.api.post(`bike/${this.bike.obj().bikeid}/light/`, {
      mode
    });
  }
}

export default Light;

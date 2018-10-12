import moment from "moment";

class ServiceInfo {
  constructor(api, bike) {
    this.api = api;
    this.bike = bike;
  }

  async get(cached = false) {
    if (!this.bike || !this.bike.obj()) {
      await this.bike.getBike();
    }

    return await this.api.call(`bike/${this.bike.obj().bikeid}/service_info/`);
  }
}

export default ServiceInfo;

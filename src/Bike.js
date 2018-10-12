import moment from "moment";
import Light from "./Light";
import Position from "./Position";
import ServiceInfo from "./ServiceInfo";
import Settings from "./Settings";
import State from "./State";

class Bike {
  constructor(api) {
    this.api = api;
    this.light = new Light(this.api, this);
    this.position = new Position(this.api, this);
    this.serviceInfo = new ServiceInfo(this.api, this);
    this.settings = new Settings(this.api, this);
    this.state = new State(this.api, this);
  }

  async getBike() {
    const bike = await this.api.call("bike");
    if (bike && bike.length) {
      this.bike = bike[0];
      return this.bike;
    } else {
      throw new Error("No bike found.");
    }
  }

  // convience methods
  async lock() {
    return await this.settings.set({ lock: true });
  }

  async unlock() {
    return await this.settings.set({ lock: false });
  }

  async flash() {
    return await this.light.set();
  }

  // utility function to return bike. Avoids this.bike.bike
  obj() {
    return this.bike;
  }
}

export default Bike;

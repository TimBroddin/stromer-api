class Settings {
  constructor(api, bike) {
    this.api = api;
    this.bike = bike;
    this.settings = {};
  }

  async get() {
    // get bike so we can fetch settings in parallel
    if (!this.bike || !this.bike.obj()) {
      await this.bike.getBike();
    }

    await Promise.all([
      this.getMainSettings(),
      this.getSensorSettings(),
      this.getTuning()
    ]);
    return this.settings;
  }

  async set(obj) {
    if (!this.bike || !this.bike.obj()) {
      await this.bike.getBike();
    }
    return await this.api.post(`bike/${this.bike.obj().bikeid}/settings/`, obj);
  }

  async getSettings(fields) {
    if (!this.bike || !this.bike.obj()) {
      await this.bike.getBike();
    }

    const settings = await this.api.call(
      `bike/${this.bike.obj().bikeid}/settings/?fields=${fields.join(",")}`
    );
    for (let field in settings) {
      this.settings[field] = settings[field];
    }
    return this.settings;
  }

  async getMainSettings() {
    return await this.getSettings([
      "auto_lock_mode",
      "auto_power_off_time",
      "date_format",
      "distance_unit",
      "language",
      "speed_unit",
      "clock_format"
    ]);
  }

  async getSensorSettings() {
    return await this.getSettings([
      "recup_level_user_offset",
      "user_torque_sensitivity"
    ]);
  }

  async getTuning() {
    return await this.getSettings([
      "tuning_speed",
      "tuning_torque",
      "tuning_agility"
    ]);
  }
}

export default Settings;

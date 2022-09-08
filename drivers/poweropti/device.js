'use strict';

const { Device } = require('homey');
const http = require('http.min');

class PoweroptiDevice extends Device {

  /**
   * onInit is called when the device is initialized.
   */
  async onInit() {
    this.intervalId = null;
    setInterval(this.updateValues.bind(this), 15000);
    this.updateValues();
  }

  updateValues() {
    let options = {
      protocol: 'https:',
      hostname: 'backend.powerfox.energy',
      path: '/api/2.0/my/main/current?unit=kwh',
      auth: this.getSettings().email + ':' + this.getSettings().password,
    };
    http.json(options).then(function (data) {
      try {
        this.setCapabilityValue('measure_power', data.Watt);
        this.setCapabilityValue('meter_power', data.A_Plus);
      } catch (error) {
        this.log(error);
      }
    }.bind(this));
  }

  /**
   * onAdded is called when the user adds the device, called just after pairing.
   */
  async onAdded() {
  }

  /**
   * onSettings is called when the user updates the device's settings.
   * @param {object} event the onSettings event data
   * @param {object} event.oldSettings The old settings object
   * @param {object} event.newSettings The new settings object
   * @param {string[]} event.changedKeys An array of keys changed since the previous version
   * @returns {Promise<string|void>} return a custom message that will be displayed
   */
  async onSettings({ oldSettings, newSettings, changedKeys }) {
  }

  /**
   * onRenamed is called when the user updates the device's name.
   * This method can be used this to synchronise the name to the device.
   * @param {string} name The new name
   */
  async onRenamed(name) {
  }

  /**
   * onDeleted is called when the user deleted the device.
   */
  async onDeleted() {
    clearInterval(this.intervalId);
  }

}

module.exports = PoweroptiDevice;

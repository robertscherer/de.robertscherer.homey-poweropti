'use strict';

const { Driver } = require('homey');

class PoweroptiDriver extends Driver {

  async onInit() {
  }

  async onPairListDevices() {
    return [
      {
        name: 'powerfox poweropti',
        data: {
          id: 'powerfox-poweropti',
        },
      },
    ];
  }
}

module.exports = PoweroptiDriver;

---
id: device-status
description: |
  View live device status on Golioth
---

# Device Status

First and foremost, you need to know the state of your fleet. To view individual
device status:

1. Click the `Devices` option in the left sidebar of [the Golioth
   Console](https://console.golioth.io)
2. Click on the device `Name` in the resulting list

![Golioth Device Status](./assets/golioth-device-status.jpg)

## Status page overview

On this page you can view the following information:

* `Device name`: Human readable name provided when virtual device was created
* `Blueprint`: (Optional) Used to group devices based on their hardware traits
* `Tags`: (Optional) Used to create device groups within your fleet
* `Primary Hardware ID`: Can be generated or customized for fleet organization
  (e.g. some customer use MAC address in this field)
* `Device Id`: Used by the Golioth API to identify this device
* `History`: Displays when this virtual device was created and last updated
* `Status`: Displays information on when the device last checked in and
  confirmation that it is in sync with the cloud-side Settings Service (or
  reason it is not synchronized)
* `Firmware`: Displays current package and version of OTA firmware. (This
  precompiled example doesn't implement OTA, so no firmware has been reported to
  the cloud)

## Additional Exercises

* Edit your virtual device in this window to add a Blueprint and a Tag


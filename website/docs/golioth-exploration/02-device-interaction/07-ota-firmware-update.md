---
id: ota-firmware-update
description: |
  See how OTA firmware updates work with Golioth
---

# Over-the-Air (OTA) Firmware Update

Golioth features world-class Over-the-Air (OTA) device firmware update. New
firmware binaries can be released that target your entire fleet, groups of
devices, or individual devices.

When new firmware is available, the device will download it to a secondary slot,
then verify the signature and validity of the firmware before running it.
Golioth includes one-click rollbacks if you ever need to return to a previous
release of your firmware.

## Test Golioth's OTA

The OTA process is beyond the scope of today's training. If you would like to
test it in future, please try the [Over-the-Air (OTA) Update
Walkthrough](https://docs.golioth.io/firmware/zephyr-device-sdk/firmware-upgrade/build-sample-application)
section of of the Golioth Documentation.

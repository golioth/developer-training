---
sidebar_position: 2
---

# Device Firmware Updates (OTA)

## Overview

Golioth makes it easy to manage Over-the-Air (OTA) updates. Binaries are cryptographically signed, assigned a version number, and managed in the Golioth Console. Any device in the field that has been set up to observe firmware updates will automatically detect when a new version becomes available, then download and install it. This feature is highly configurable, using Blueprints and Tags to assign firmware packages to different groups of hardware. The [Golioth example code for DFU](https://github.com/golioth/zephyr-sdk/tree/main/samples/dfu) can be found in our SDK samples directory.

## OTA DFU for Nordic nRF9160 and ESP32

We have recently featured [Over-the-Air update for ESP32](https://blog.golioth.io/firmware-update-for-esp32-devices/) and [for nRF9160](https://blog.golioth.io/update-firmware-dfu-over-cellular-ota-on-the-nrf9160-with-golioth/). These are obvious hardware choices because they have WiFi/Cellular modems built in, but you can accomplish the same with other chips using external modems. Here is an example we published that shows [OTA DFU of an nRF52 using an Ethernet module](https://blog.golioth.io/device-firmware-update-dfu-with-golioth/) as the network connection.

### Video: nRF9160 OTA DFU (Cellular)

<iframe width="560" height="315" src="https://www.youtube.com/embed/vRYPzJrJpyM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Video: nRF52 (Ethernet) OTA DFU

<iframe width="560" height="315" src="https://www.youtube.com/embed/aWOC2bL0Lec" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Zephyr-based DFU for the MagTag Coming Soon

The MagTag is based on the ESP32s2. While the ESP32 is well supported for OTA DFU, the 's2' variant is newer. Espressif's Zephyr team is working to add support for the s2's MCUBoot Bootloader and we hope to see availability soon.

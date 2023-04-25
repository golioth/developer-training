---
sidebar_position: 1
---

# What is Golioth and how can I use it?

When we describe Golioth to engineers, we talk about two distinct pieces:

* The Cloud side services that make up our commercial offering
* The Device side support we offer to users to make it easier to connect IoT
  devices to the Cloud.

## Cloud side services

Golioth's main product is a set of APIs and endpoints for IoT devices to
connect to. We think this is the easiest way to add different functions to a
fleet of IoT devices (details on how to do that further down). You can choose
to use just one or all of these services in your projects.

Once you connect your device to Golioth, you get access to an entire suite of
new functionality:

* **Over-the-air updates** - Push and manage new firmware images, including
  targeting specific devices.
* **Time-series database tracking** - easy management of sensor data on the
  cloud.
* **Command and control capabilities**
  * **LightDB State** - Push and pull data from a device using state-based
    databases on the cloud
  * **Settings Service** - Adjust settings for entire fleet, groups, or
    per-device
  * **Remote Procedure Call** - Execute functions remotely including input
    parameters and returned data
  * **Extensible Control** - Interact with the data via our REST API.
* **Device logging** - pass troubleshooting messages off of individual devices
  (fewer debug probes and USB cables involved!)
* **Easy export of all cloud side data** - Interface to 3rd party visualization
  and cloud platforms.
* **Device Management** - A clean interface for interacting with one (or all)
  of your devices.


## Device side support

Our mission is to not only make Cloud services more accessible, but also to
make it easier to connect your devices to those services.

For us, that includes creating and releasing open source Software Development
Kits (SDKs) for different platforms. We now have three:

* [**Zephyr RTOS**](https://github.com/golioth/golioth-zephyr-sdk)
* [**nRF Connect SDK (NCS)**](https://github.com/golioth/golioth-zephyr-sdk)
* [**Espressif IoT Development Framework
  (ESP-IDF)**](https://github.com/golioth/golioth-esp-idf-sdk)

Each of these SDKs include libraries to connect to Golioth and take advantage
of the Cloud features explained above. We also publish samples which showcase
the individual Cloud features, while also utilizing the Device SDK elements.
Our goal is to get you connected and using the Cloud as quickly as possible.

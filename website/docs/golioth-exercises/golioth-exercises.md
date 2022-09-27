---
title: Golioth Exercises
---
## Learning Objectives

### Summary
The goal of this section of training is to learn more about the Golioth platform and to allow trainees to interact with the [Golioth Console](https://console.golioth.io) using preconfigured code. 

### Desired outcome(s)
* Learn how to assign device credentials
* Use State data to interact with devices
* View and filter remote logging messages
* View and query Stream data received from devices

### Approximate time
This section should take approximately 10-20 minutes.

## Workflow overview

During this training we are using a web-based Docker container called KASM that
has all of the necessary Zephyr tools and Golioth repositories installed. You
must have a login for KASM, and a copy of esptool.py installed on your local
machine.

Throughout these exercies, we will follow the same workflow to edit, build, and
flash firmware.

* In KASM container:

    1. Make changes to sourcecode
    2. Build app using `west`, the Zephyr meta-tool
    3. Download binary file from KASM to your local machine

* On your local machine:

    1. Flash downloaded binary to the MagTag

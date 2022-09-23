---
title: Golioth Exercises
---
During this training we are using a web-based Docker container called KASM that
has all of the necessary Zephyr tools and Golioth repositories installed. You
must have a login for KASM, and a copy of esptool.py installed on your local
machine.

## Learning Objectives

* Learn how to assign device credentials
* Use State data to interact with devices
* View and filter remote logging messages
* View and query Stream data received from devices

## Workflow overview

Throughout these exercies, we will follow the same workflow to edit, build, and
flash firmware.

* In KASM container:

    1. Make changes to sourcecode
    2. Build app using `west`, the Zehyr meta-tool
    3. Download binary filed from KASM to your local machine

* On your local machine:

    1. Flash downloaded binary to the MagTag

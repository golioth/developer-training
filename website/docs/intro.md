---
sidebar_position: 1
---

# Developer Training Overview

## What is this training all about?

This is a place where you're going to learn about Golioth features by playing with hardware. To start this training, plan to spend anywhere from 60-120 minutes, with additional optional exercises for basic I/O and sensors when you have more time available. It is mainly meant as a guided training (either over video conference or in-person), but there will eventually be links to watch some of the presentation content asynchronously. The main reason to take this training with an instructor is to have a guiding hand and someone to ask questions live. In the event you're taking this training asynchronously, utilize [our forum](https://forum.golioth.io) and [our Discord channel](https://golioth.io/discord) for wherever you get stuck.

## How can you use this material after training is over?

Developers who successfully complete this training should feel confident that they will be able to program and deploy a simple IoT system to the field in their application. Future training modules around more in-depth Zephyr RTOS utilization will better prepare them for creating even more custom embedded applications.

## What is Zephyr RTOS? Why are we learning it?

[Zephyr](https://zephyrproject.org/) is an open source Real Time Operating System (RTOS) with wide support among industry leading chip vendors. At Golioth, we build [the Golioth SDK](https://github.com/golioth/golioth-zephyr-sdk) on top of the Zephyr SDK in order to take advantage of the wide hardware support. What's amazing about the project is that you can switch between different hardware platforms with a command line switch and a file that tells the application which pins are assigned to which function.

Golioth lives at the top of the Zephyr stack, meaning that we take advantage of all of the networking capabilities built into Zephyr. When Golioth needs to talk to the internet, it simply communicates with the networking layer's APIs. From this perspective, we can switch between Cellular, WiFi, and Ethernet implementations easily. In the future, we hope to also tap into more "hub and spoke" model devices such as LoRa and Bluetooth as well. The main thing for you to know, as the Developer, is that you have maximum flexibility when trying out or deploying new systems.

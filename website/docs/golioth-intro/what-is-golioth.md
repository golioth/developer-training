---
sidebar_position: 1
---

# What is Golioth?

<iframe width="560" height="315" src="https://www.youtube.com/embed/AkEKJ873tsk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Golioth is a straightforward commercial IoT platform, built for scale. What that means for you, the Developer, is that we want to help get your deployment prototyped quickly and then use that same tooling to be able to expand your application from 1 device to thousands or millions of devices in the field.

## Where is Golioth a good fit?

Golioth is capable of working on any device that has:

* Firmware built with Zephyr (recent versions)
* A network interface. Currently these are best understood to be:
  * Ethernet
  * WiFi
  * Cellular
* Sufficient memory to include the Golioth libraries with their Zephyr build (less than 10% of most builds)

This is not the *only* way that Golioth works (you'll see this later in the training), but is a guideline to devices that will be a good target.

### Custom Hardware

What about your custom device? You have taken a chip company's reference design or dev board and expanded that to fit your end customers' needs? This will work great! You'll still need a network interface and Zephyr to fit the mold, but because Golioth lives at the top of the Zephyr stack, your hardware can almost certainly work with Golioth. As you get deeper into the requirements of the Real Time Operating System's (RTOS) requirements (e.g. tasks, priorities, etc) you might realize some resource constraints, but it should be able to work with Golioth all the same.

## Where isn't Golioth a good fit?

As of right now, Golioth and our Zephyr-based SDK is not a great fit for devices that are set up in a hub and spoke system. Examples of this are Bluetooth and LoRa based devices. If you are using a phone or a base station to connect a range of different devices to the internet, there will be a significant amount of work on your end to fit Zephyr to your needs. Again, Golioth sits up very high in the stack, so it's possible to do just about anything, but it's not a good initial target. We hope to showcase more examples serving these applications in the near future.

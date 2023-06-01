---
id: what-is-zephyr
description: |
  Get an overview of the major components of Zephyr RTOS
---

# What is Zephyr?

[Zephyr](https://www.zephyrproject.org/) is an open source Real-time Operating
System (RTOS) maintained by the Linux foundation. It is fully featured,
specifying a consistent device driver model that facilitates comprehensive
hardware abstraction. Drivers for sensors, displays, and other peripherals will
work with any Zephyr supported MCU because of the driver model abstraction.

Many of the [member
organizations](https://www.zephyrproject.org/project-members/) of the Zephyr
Project are the silicon vendors themselves who implement and maintain the ports
for their chips and development boards. However, contributions are not limited
to members/manufacturers, anyone may submit new chip/board support and drivers
for inclusion in Zephyr.

Connectivity is a particularly desirable aspect of Zephyr. It includes both a
network stack and a Bluetooth stack. Hardware flexibility is also a major
benefit as move a firmware project to a different MCU, replacing a peripheral
with something from a different vendor, and maintaining products with different
hardware options are all possible with surprising ease.

The complexity of Zephyr is front loaded, and it will take some time to learn
the Zephyr approach. But once you begin to internalize the patterns used by the
ecosystem, you'll soon see the benefit of putting in this time during the
learning process.

## How does Golioth use Zephyr?

:::note

Golioth is a Silver member of the Zephyr Project.

:::

Golioth lives at the top of the Zephyr stack, meaning that we take advantage of
all of the networking capabilities built into Zephyr. When Golioth needs to talk
to the internet, it simply communicates with the networking layer's APIs. From
this perspective, we can switch between Cellular, WiFi, Ethernet, and Thread
implementations easily. The main thing for you to know, as the Developer, is
that you have maximum flexibility when trying out or deploying new systems.

## Major components of Zephyr

In this module we'll learn about the various parts that make up Zephyr:

* **Zephyr tree:** The open [source code
  repository](https://github.com/zephyrproject-rtos/zephyr) that contains the
  kernel, drivers, subsystems, tests, and Devicetree definitions (SoC, Board,
  etc). When people say "Zephyr", this is usually what they are referring to.
* **Zephyr SDK:** The [collection of toolchains for Zephyr supported
  architectures](https://docs.zephyrproject.org/latest/develop/toolchains/zephyr_sdk.html)
  that are used to build firmware
* **CMake:** open source software used to manage the compilation process
* **Kconfig:** the language used to maintain a collection of configuration
  options for the build process
* **Devicetree:** a data structure used for describing hardware
* **west:** a metatool that calls all of the other tools necessary for a build.
  This includes repository management, option configuration, compilation, device
  programming, debugging, serial monitoring, and more.

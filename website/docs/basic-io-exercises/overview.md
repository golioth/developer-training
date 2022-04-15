---
sidebar_position: 1
---

# Basic I/O Introduction

The Basic I/O section dives into how Zephyr handles hardware abstraction. We'll focus on the basics of LEDs and Buttons, but understanding these concepts prepares you for working with complex peripherals on any architecture.

* Using Device Tree to map pins for input or output
* Fetch and use the pin assignments from the Device Tree in C code
  * Map the red LED on the MagTag and make it blink using delays
  * Map the buttons on the MagTag; use interrupts to detect button pushes and change LED state
* A taste of RTOS:
  * Declare a timer and use it to blink the LED
  * Declare a thread and use it to blink the LED

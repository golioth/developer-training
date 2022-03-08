---
sidebar_position: 2
---

# Training Requirements

## Hardware requirements

This is a hardware centric training, so you will need to pre-purchase some hardware to properly follow along. 

### Development Board

This training is based around the [Adafruit MagTag board](https://www.adafruit.com/product/4800). It has the following features we think make it a good fit for this training:

* ESP32-S2
* USB C cable programming
* $35 retail (location dependent)
* Inputs: 
  * Accelerometer
  * Light Sensor
  * 4 user buttons
  * Stemma / Qwiic header
* Outputs: 
  * 4 NeoPixel side launch LEDs (multicolor programmables)
  * Speaker
  * eInk Display

### USB C Cable

It will require a USB C cable, not included with the board. If your team doesn't happen to have one in their setup, they can purchase [a USB C Cable directly from Adafruit](https://www.adafruit.com/product/4473). Any USB C cable with D+/D- (no charge-only cables!) will work for this board.

### Optional add-on hardware 

This hardware will work great on its own but will be enhanced by the following:

* [USB to Serial cable](https://www.adafruit.com/product/954)
  * There are serial pins on the MagTag board that are the easiest debug output, but we also are working on getting USB debug output to work
* [Lithium Battery](https://www.adafruit.com/product/4237)
  * Will allow the device to function without any cables (this is not part of the demo).
* [Magnetic standoffs](https://www.adafruit.com/product/4631)
  * This allows users to attach the device to a fridge after the training (as is the point of a MagTag)

### Computer

You will also need a computer for running all of the code. We support Windows / Mac / Linux, but the "happiest path" will be using a friendly Linux distro such as Ubuntu. If you are on Windows / Mac, you might want to consider installing a virtual machine for this purpose. We are evolving our methods for how we install a toolchain that is reliable and consistent across operating systems.  

## Software requirements

In the second part of the training, you will be asked to install the Zephyr toolchain on your local machine. As stated above, this will work best on Ubuntu, but we will try to accommodate all systems.

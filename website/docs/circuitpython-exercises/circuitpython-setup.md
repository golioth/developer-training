---
sidebar_position: 2
---

# CircuitPython Setup

The reason we are interested in CircuitPython is the "drag and drop" nature of this experience. Below you will install an interpreter, load a library, load code onto your device, and add credentials by dropping files onto a drive and then modifying one of those files.

## Install CircuitPython on top of UF2 Bootloader

Download the latest image of CircuitPython from [the MagTag page on CircuitPython.org](https://circuitpython.org/board/adafruit_magtag_2.9_grayscale/). Be sure to download the `.uf2` file. This is a file format that allows drag and drop onto microcontrollers.

Plug in the board to your computer using a USB C cable. Slide the on/off switch on the top of the MagTag board to the "On" position.

![MagTag Diagram](magtag_callout.png)

You should see a green light when it is powered on. Double tap the reset button on your MagTag board. 

:::note

The double tap should have approximately 0.5 - 1 second between taps. 

:::

Once your board has entered UF2 bootloader mode, you should see the red LED (D13) "breathing", the 4 LEDs on the front will turn green, and you should see a new drive appear on your computer called "MAGTAGBOOT".

Drop the `.uf2` file onto the MAGTAGBOOT drive. You will see the LEDs on the front of the board flashing. Once the install is finished, the board will reset and you will see a new drive called "CIRCUITPY". You have now installed CircuitPython.

## Drag and drop! (Libraries, Code)

[Download the all-in-one repository](https://drive.google.com/file/d/1uZgmtob9gE3Dt2YEfejrnyc8uVuRXgwk/view?usp=sharing)

Extract the folder from the zip and drop all files onto the CIRCUITYPY drive. This will overwrite folders and files, approve all overwrite dialogs.

The rough directory structure on the CIRCUITPY drive will look like this:

```
- code.py
- secrets.py
- lib/
    - golioth
    - adafruit_minimqtt
    - other_libs
```

## Add your credentials

As soon as you drop the library files and top level files onto the CIRCUITPY drive, you will likely see an error message on the ePaper screen; you will also see the front LEDs flashing every few seconds as the device reboots and attempts to run the user code again. The ePaper acts as a debug output for CircuitPython programs, which is useful for rapid prototyping. The error screen comes up because you have not yet modified the credentials in `secrets.py`. 
![SSID Error in CircuitPython on MagTag](ssid_error.jpg)

:::warn

Open `secrets.py` in VS Code or another editor that protects line endings (see [Mu Install](#optional-install-mu) below if you don't know of one). 

:::

![Default secrets content](secrets_py_default.jpg)

Insert your:
* Local SSID info
* Local Wifi Password
* Golioth PSK ID
* Golioth PSK  

:::note

Every time you hit save, the device automatically reboots and starts running new code

:::

Recall that the PSK ID and PSK are what we generated in [the signup section of this tutorial](/docs/golioth-intro/signup). If you don't remember your credentials or if they were generated for you, you can find them on the [devices tab of the Console](https://console.golioth.io/devices).

![PSK and PSK ID location](psk_location.jpg)

Once you have typed these in and clicked "save" on `secrets.py`, you should see your unit reboot. If your device successfully connects to the WiFi network and Golioth, you should see the following screen:

![Golioth MagTag Success Screen](welcome_to_your_magtag.jpg)

## Optional: Install Mu

Mu is a friendly editor for working with CircuitPython. It has a mode specific to CircuitPython. You can [download the editor here](https://codewith.mu/). Adafruit has [a page dedicated to installing Mu for CircuitPython](https://learn.adafruit.com/welcome-to-circuitpython/installing-mu-editor) as well.

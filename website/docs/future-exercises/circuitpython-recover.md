---
sidebar_position: 1
---

# Returning to CircuitPython 

## Overview

If you are trying out Zephyr and CircuitPython, you will be installing programs over top of one another. This section tells you how to return your board to the default state so you can once again try out CircuitPython

:::caution

If you have not done any other programming of this board, you probably do not need to be doing this step. The MagTag comes from the factory with the UF2 bootloader loaded onto it. Double-tap the `boot` button at startup to enter the UF2 mode. 

:::

## Recovering the UF2 bootloader


If you have done other work on the MagTag board, you may need to re-install the UF2 bootloader onto your MagTag board. This will later make it easy to to get CircuitPython files to run on your device. The UF2 bootloader allows you to upgrade the CircuitPython version (which includes the interpreter) without needing to use the Espressif programmer each time. 

Most importantly, this will put you on the same footing for instructions at the beginning of the CircuitPython tutorial.

We'll be borrowing from [the adafruit instructions](https://learn.adafruit.com/adafruit-magtag/install-uf2-bootloader), so if anything below is confusing, feel free to refer to their pages as well.

### Download files

The latest UF2 bootloader files are available on [  the "releases" page of the Adafruit github](https://github.com/adafruit/tinyuf2/releases/). Choose the latest version for the "MagTag" board.

Extract the combined.bin from `tinyuf2-adafruit_magtag_29gray-x.x.x.zip` 

### Flash the files

If you have wiped out the bootloader, we're going to assume you have the programmer available on your system, likely `ESPtool.py` (directions on how to install that are here)

Then use the following command to program your board. You'll need to have the board in "bootloader" mode, by pressing both the boot button and tapping the reset button before running this command.

`esptool.py --chip esp32s2 -p /dev/ttyUSB0 write_flash 0x0 combined.bin`

The above assumes an Ubuntu system, fill in the serial port that matches your system (COM4, slab, etc)

:::caution

You need to specify `--chip esp32s2` any time you are using esptool on this board. The S2 is a very different architecture and anything you try to do without that flag will likely fail.

:::

## Upload CircuitPython onto the MagTag

[The CircuitPython MagTag page](https://circuitpython.org/board/adafruit_magtag_2.9_grayscale/) is where you can always retrieve the latest image to install on your MagTag board. Download the `.uf2` file to your machine.

Put the MagTag board into uf2 bootloader mode. This is different than the ESP32 bootloader mode explained above! Enter this mode by powering on your board and tapping the reset button twice. You might have to try this in different cadences. You will see the red LED onboard start to "breathe" when you are successful and the LEDs on the front of the board will go all green. You will also see a new drive called `MAGTAGBOOT`.

Drag and drop the `.uf2` file onto that new drive and you will once again have a CircuitPython interpreter on your board. You will see the LEDs on the front of the board flashing. Once you have successfully programmed the image, you should see a new "CIRCUITPY" drive on your computer.

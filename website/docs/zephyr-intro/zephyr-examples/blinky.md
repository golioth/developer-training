---
sidebar_position: 3
---

# Blinky Example

The Blinky example is the most basic application possible&ndash;one blinking LED. It shows that your toolchain is capable of building code correctly, that you are able to flash a binary to the device, and that the device runs the binary as expected.

1. Go to your local copy of [the magtag-demo repository](https://github.com/golioth/magtag-demo) and checkout the `blinky` example:

    ```bash
    cd ~/zephyrproject/modules/lib/golioth/samples/magtag-demo
    git checkout blinky
    ```

2. Build the example

    ```bash
    west build -b esp32s2_saola . -p
    ```

3. Flash the example

    Put the MagTag into DFU bootloader mode

    1. Hold down the Boot0 button
    2. Press and release the Reset button

    Type the following command to start the firmware upgrade

    ```bash
    west flash
    ```

:::note
If the flash is successful, **you will receive an error message** telling you that you must manually reset the device. Remember to press the reset button to run the newly flashed program. [Learn more about this](../zephyr-tips#you-must-press-the-reset-button-after-flashing-firmware).

On some machines you will only have a few seconds to run the `west flash` command after entering bootloader mode. [Learn more about this](../zephyr-tips.md#errors-with-west-build-zephyr-tree-and-esp32-environmental-variables).
:::

## Expected Results

The Blinky app will make the red LED on the underside of the MagTag board blink on and off about once every two seconds.

## Challenge: Modifying Blinky

* Find the source files for blinky. 
* Modify the blink period in the source files 
* Recompile/reflash -- Try leaving off the `-p` command for a faster recompile.

### Questions:
1. What do you notice about directory structure for Zephyr projects?
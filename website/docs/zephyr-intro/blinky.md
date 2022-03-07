---
sidebar_position: 3
---

# Blinky Example

The Blinky example is the most basic application possible&ndash;one blinking LED. It shows that your toolchain is capable of building code correctly, that you are able to flash a binary to the device, and that the device runs the binary as expected.

1. Go to your local copy of [the magtag-demo repository](https://github.com/golioth/magtag-demo) and checkout the `blinky` example:

    ```bash
    git checkout blinky
    ```

2. Build the example

    ```bash
    west build -b esp32s2_saola . -p
    ```

3. Flash the example

    Put the MagTag into DFU bootloader mode by holding the Boot0 button and pressing the Reset button. Type the following command to start the firmware upgrade:

    ```bash
    west flash
    ```

Note that on some machines you will only have a few seconds to run the `west flash` command after entering bootloader mode. The binary will be flashed to the MagTag and you will receive an error message telling you that you must manually reset the device.

## Expected Results

The Blinky app will blink the red LED on the underside of the MagTag board about once every two seconds.

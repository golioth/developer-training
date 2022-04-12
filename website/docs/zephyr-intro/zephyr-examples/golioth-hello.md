---
sidebar_position: 4
---

# Golioth Hello Example

The Hello example is the most basic network-connected example. It shows not only that you can build and flash a binary, but that the binary includes credentials for your WiFi and the Golioth cloud, and that the board can successfully connect to both.

1. Go to your local copy of [the magtag-demo repository](https://github.com/golioth/magtag-demo) and ensure you are on the `main` branch which is the hello example

    ```bash
    cd ~/zephyrproject/modules/lib/golioth/samples/magtag-demo
    git checkout main
    ```

2. Create a file for WiFi and Golioth credentials

    * Make a copy of `credentials.conf_example` and name it `credentials.conf`
    * Edit this new file to include your WiFi credentials and the PSK-ID/PSK from the device page on your Golioth console
    * This file will be ignored by git, and may be reused in other examples.

3. Build the example, including the credentials file you just created

    ```bash
    west build -b esp32s2_saola . -D OVERLAY_CONFIG=credentials.conf -p
    ```

4. Flash the example

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

After flashing the example you need to press the Reset button to run the program. Your MagTag may not visibly react for a few seconds as it initializes the WiFi hardware. The two center LEDs will turn blue as the board attempts to connect to the internet and establish a secure connection with Golioth. The Golioth logo will be displayed on the ePaper screen during this time.

When a connection is established, all four LEDs will turn green and the MagTag will being sending Hello messages to Golioth once every five seconds. The ePaper screen will display a connected message, and will print a Hello messages when log messages are sent. Each log message in this demo is sent to the Golioth servers, and can be be viewed on [the Golioth Console](https://console.golioth.io/) by selecting Monitor&rarr;Logs from the sidebar menu.

![Golioth Hello output shown on the Logs in Golioth Console](../assets/golioth-hello.png)

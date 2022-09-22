---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Golioth Stream Example

The Stream example sends accelerometer sensor data to the Golioth Cloud every few seconds. Each JSON object receives a timestamp and is stored in a database we refer to as LightDB stream.

1. Go to your local copy of [the magtag-demo repository](https://github.com/golioth/magtag-demo) and checkout the `stream` example:

    ```bash
    cd ~/magtag-training/app
    git checkout stream
    ```

2. Create a file for WiFi and Golioth credentials

    * Make a copy of `credentials.conf_example` and name it `credentials.conf`

        ```
        cp credentials.conf_example credentials.conf
        ```

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

The Stream example will begin running after pressing the Reset button. You will see the center LEDs turn blue when the board is trying to connect to Golioth. When successful, all four LEDs will turn green, a connected message will be shown on the ePaper display, and sensor data will begin streaming to Golioth each time the screen displays "sent accel data".

Sensor data can be viewed on [the Golioth Console](https://console.golioth.io/)

1. Select Monitor&rarr;Stream from the sidebar menu
2. Under "Query Response" use the time/date box and choose the `Last 4h` setting
3. To the right of the time/date box, choose the name of your device from the list
4. Click the circle arrow icon next to the Refresh button in the upper right to auto-refresh every 1 second
5. Use the green arrows in the "data" column to unfold the nested JSON objects for viewing

![Accelerometer data show in the Golioth Console LightDB stream view](../assets/golioth-stream-data.png)

This streaming data can be queried using the [Golioth REST API](https://docs.golioth.io/reference/rest-api/overview), or accessed on a number of different external platforms/services using our [Output Streams](https://docs.golioth.io/cloud/output-streams). This allows timestamped stream data to be graphed and visualized to meet your needs.

Golioth also includes a LightDB State for persistent, mutable data. We will look at that feature in the next example.

## Continued Learning

The Query Builder found in the LightDB Stream view of the Golioth Console is a powerful tool for visualizing your incoming data and for testing how the data you collect will be used. You can see [our post on Query Builder](https://blog.golioth.io/prototype-your-data-outputs-with-the-golioth-query-builder/) to learn more about this feature.

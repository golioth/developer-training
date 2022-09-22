---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Golioth Hello Example

The Hello example is the most basic network-connected example. It shows not only that you can build and flash a binary, but that the binary includes credentials for your WiFi and the Golioth cloud, and that the board can successfully connect to both.

1. Go to your local copy of [the magtag-demo repository](https://github.com/golioth/magtag-demo) and ensure you are on the `main` branch which is the hello example

    ```bash
    cd ~/magtag-training/app
    git checkout main
    ```

2. Create a file for WiFi and Golioth credentials

    * Make a copy of `credentials.conf_example` and name it `credentials.conf`

        ```
        cp credentials.conf_example credentials.conf
        ```

    * Edit this new file to include your WiFi credentials and the PSK-ID/PSK from the device page on your [Golioth console](https://console.golioth.io/)
    * This file will be ignored by git, and may be reused in other examples.

3. Build the example, including the credentials file you just created

    ```bash
    west build -b esp32s2_saola . -D OVERLAY_CONFIG=credentials.conf -p
    ```

import HowToFlash from '/docs/partials/flash-the-example-kasm.md'

<HowToFlash/>

## Expected Results

After flashing the example you need to press the Reset button to run the program. Your MagTag may not visibly react for a few seconds as it initializes the WiFi hardware. The two center LEDs will turn blue as the board attempts to connect to the internet and establish a secure connection with Golioth. The Golioth logo will be displayed on the ePaper screen during this time.

When a connection is established, all four LEDs will turn green and the MagTag will being sending Hello messages to Golioth once every five seconds. The ePaper screen will display a connected message, and will print a Hello messages when log messages are sent. Each log message in this demo is sent to the Golioth servers, and can be be viewed on [the Golioth Console](https://console.golioth.io/) by selecting Monitor&rarr;Logs from the sidebar menu.

![Golioth Hello output shown on the Logs in Golioth Console](../assets/golioth-hello.png)

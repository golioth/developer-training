---
sidebar_position: 2
---

# Add Credentials to the Golioth Demo

We begin with a full-featured demo. But for the MagTag to connect we must give
it one set of credentials to connect to your WiFi and another set of credentials
to connect to Golioth.

1. Go to your local copy of [the magtag-demo
   repository](https://github.com/golioth/magtag-demo) and ensure you are on the
   `main` branch which is the hello example

    ```bash
    cd ~/magtag-training/app
    git checkout golioth-demo
    ```

2. Create a file for WiFi and Golioth credentials

    * Make a copy of `credentials.conf_example` and name it `credentials.conf`

        ```
        cp credentials.conf_example credentials.conf
        ```

    * Edit this new file to include your WiFi credentials and the PSK-ID/PSK
      from the device page on your [Golioth
      console](https://console.golioth.io/)
    * This file will be ignored by git, and may be reused in other examples.

3. Build the example, including the credentials file you just created

    ```bash
    west build -b esp32s2_saola . -D OVERLAY_CONFIG=credentials.conf -p
    ```

import HowToFlash from "/docs/\_partials/flash-the-example-kasm.md"

<HowToFlash/>

## Expected Results

![Golioth Demo connected to Wifi and the Golioth Servers](assets/magtag-golioth-connected.jpg)

After flashing the example you need to press the Reset button to run the
program. Your MagTag may not visibly react for a few seconds as it initializes
the WiFi hardware. The two center LEDs will turn blue as the board attempts to
connect to the internet and establish a secure connection with Golioth. The
Golioth logo will be displayed on the ePaper screen during this time.

When a connection is established, the four LEDs will turn to yellow, blue,
green, and red and the MagTag show a "Connected to Golioht!"


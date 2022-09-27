---
sidebar_position: 2
---

# Add Credentials to the Golioth Demo

We begin with a full-featured demo! But for the MagTag to connect we must give
it one set of credentials to connect to your WiFi and another set of credentials
to connect to Golioth that you created in the [Golioth Signup and Exploration](/docs/golioth-intro/signup) section.

## Learning Objectives
We are building your muscles around compiling Zephyr binaries, by starting with pre-configured code. All you need to do is add credentials, compile, and load the binary onto your device. 

We are doing this so you can use this hardware and firmware on the MagTag to experiment with features on Golioth in the next section. 

### Desired outcome(s)
* Create a customized file containing your credentials for Wi-Fi and Golioth.
* Build a binary containing those credentials.
* Download the built binary and load it onto the MagTag hardware.
* See the device connect to Golioth over WiFi
### Time Estimate

* This section will take 5-20 minutes
  * Depending on experience with Zephyr and the `west` meta tool.

## Workflow

1. Go to your local copy of [the magtag-demo
   repository](https://github.com/golioth/magtag-demo) and ensure you are on the
   `main` branch which is the hello example

    ```bash
    cd ~/Desktop/magtag-training/app
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

import VerbostDownloadFlash from '/docs/\_partials/flash-the-example-kasm-verbose.md';

4. Download and flash

  <VerbostDownloadFlash/>

## Expected Results

![Golioth Demo connected to Wifi and the Golioth Servers](assets/magtag-golioth-connected.jpg)

After flashing the example you need to press the Reset button to run the
program. Your MagTag may not visibly react for a few seconds as it initializes
the WiFi hardware. The two center LEDs will turn blue as the board attempts to
connect to the internet and establish a secure connection with Golioth. The
Golioth logo will be displayed on the ePaper screen during this time.

When a connection is established, the four LEDs will turn to yellow, blue,
green, and red and the MagTag show a "Connected to Golioth!"


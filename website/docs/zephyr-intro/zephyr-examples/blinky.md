---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Blinky Example

The Blinky example is the most basic application possible&ndash;one blinking LED. You will be starting from pre-configured Zephyr code.

## Learning Objectives

Blinky shows that your toolchain is capable of building code correctly, that you are able to flash a binary to the device, and that the device runs the binary as expected.

### Desired outcome(s)
* Blink LED D13

### Time Estimate

* 5 minutes

## Workflow

1. Go to your local copy of [the magtag-demo repository](https://github.com/golioth/magtag-demo) and checkout the `blinky` example:

    ```bash
    cd ~/Desktop/magtag-training/app
    git checkout blinky
    ```

2. Build the example

    ```bash
    west build -b esp32s2_saola . -p
    ```


import VerbostDownloadFlash from '/docs/\_partials/flash-the-example-kasm-verbose.md';

3. Download and flash

  <VerbostDownloadFlash/>

## Expected Results

![MagTag LED on pin D13](../../basic-io-exercises/assets/d13-LED.jpg)

The Blinky app will make the red LED on the underside of the MagTag board blink on and off about once every two seconds.

## Challenge: Modifying Blinky

* Find the source files for blinky. 
* Modify the blink period in the source files 
* Recompile/reflash -- Try leaving off the `-p` command for a faster recompile.

### Questions:
1. What do you notice about directory structure for Zephyr projects?
2. How does the chipset know which pin to toggle?

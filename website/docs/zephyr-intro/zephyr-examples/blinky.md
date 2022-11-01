---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import HowToDownload from '/docs/\_partials/download-from-kasm.md'
import VerboseFlash from '/docs/\_partials/flash-the-example-kasm-verbose.md';

# Blinky Example

The Blinky example is the most basic application possible&ndash;one blinking LED. You will be starting from pre-configured Zephyr code.

## Learning Objectives

Blinky shows that your toolchain is capable of building code correctly, that you are able to flash a binary to the device, and that the device runs the binary as expected.

### Desired outcome(s)
* Blink LED D13

### Time Estimate

* 5 minutes

## Workflow

### Build in the Kasm container

1. In the Kasm container, go to your local copy of [the magtag-demo repository](https://github.com/golioth/magtag-demo).

    ```bash
    cd ~/Desktop/magtag-training/app
    ```

2. Build the example

    ```bash
    west build -b esp32s2_saola blinky -p
    ```

3. Download the binary

    * Run `west kasm download` to package the compiled code and make it
      available for download
    * Use the Download option in Kasm's left sidebar to download
      `merged_yymmdd_hhmmss.bin` to your local machine.

  <HowToDownload/>

### Update MagTag firmware from your local machine

<VerboseFlash/>

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

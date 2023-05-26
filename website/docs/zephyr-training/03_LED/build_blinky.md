---
id: build-blinky
sidebar_position: 2
description: |
    Build and flash the Zephyr blinky app
---

import HowToDownload from '/docs/\_partials/download-from-kasm.md'
import FirmwareFlash from '/docs/\_partials/flash-the-example-nrf.md'
import ConnectSerial from '/docs/\_partials/connect-to-serial.md'

# Build Blinky

Let's build and run the Zephyr blinky app to take advantage of the Devicetree
(DT) LED definitions that are already in the Zephyr tree for these boards.

:::note

The `03_LED` sample in our repository is a direct copy of [the Zephyr
`basic/blinky`
sample](https://github.com/zephyrproject-rtos/zephyr/tree/main/samples/basic/blinky)
with the addition of some placeholder DT overlay files.

:::

## Learning objectives

Learn about Devicetree aliases, naming conventions, and accessing DT nodes from
C.

* **Desired outcome(s)**
  1. Your board blinks an LED at 1 Hz
* **Time Estimate:** 5 minutes

## Workflow

### Build in the Kasm container

1. Open main.c and start the VScode terminal

    * In the VScode Explore, click on `app` to unfold it
    * Unfold the `03_LED` and `src` folders
    * Double click on `main.c` to open it in the editor
    * Open a terminal by right-clicking on `app` and selecting `Open in
      Integrated Terminal`

2. Build the example

    :::tip

    Try to build this sample, you should receive an error message:

    ```console
    ERROR: Build directory "/home/kasm/zephyr-training/app/build" is for application "/home/kasm/zephyr-training/app/02_helloworld", but source directory "/home/kasm/zephyr-training/app/03_LED" was specified; please clean it, use --pristine, or use --build-dir to set another build directory
    FATAL ERROR: refusing to proceed without --force due to above error
    ```

    The build directory was previously used for the `02_helloworld` app, and now
    we're trying to build the `03_LED` in the same build directory. You should
    do one of the following:

    * Add `-p` to the build command for a "pristine" build
    * Remove the `build` directory before building

    <br />Both approaches will have the same effect of using
    <code>app/build</code> as a clean directory with no leftover build files

    :::

    * Make sure the terminal at the bottom of the VScode window is in the
      `~/zephyr-training/app` folder
    * Run the following code to build the `03_LED` app

        ```bash
        # for nRF7002
        west build -b nrf7002dk_nrf5340_cpuapp 03_LED

        # for nRF9160
        west build -b nrf9160dk_nrf9160_ns 03_LED
        ```

4. Download the binary

    * In the VScode terminal, run `west kasm download` to package the compiled
      code and make it available for download

    * Use the Download option in Kasm's left sidebar to download
      `<devicename>_<appfolder>_<hhmmss>.hex` to your local machine.

    <HowToDownload/>

### Update device firmware from your local machine

<FirmwareFlash/>

## Expected results

The LED labelled `LED1` on your board will start blinking once per second.

## Code Walkthrough

The C code doesn't actually know how your LED is connected to the MCU. Let's
walk through the code to establish how this happens.

### Alias, DT Spec, API Call

1. From the C side of things, the pattern is not difficult to understand. First,
   `main.c` looks for an `alias` in the Devicetree with a macro:

    ```c
    /* The devicetree node identifier for the "led0" alias. */
    #define LED0_NODE DT_ALIAS(led0)
    ```

2. Next, a struct from the GPIO library is used to store information about that
   device gathered from the Devicetree:

    ```c
    static const struct gpio_dt_spec led = GPIO_DT_SPEC_GET(LED0_NODE, gpios);
    ```

3. Finally, that struct is passed to the API call that toggles the LED:

    ```c
    ret = gpio_pin_toggle_dt(&led);
    ```

`ret` above is the return code from the toggle function. Zephyr often sends
return codes from functions and you can use them to determine if things went as
planned.

You don't need to know much more than that. The `west build -b <boardname>`
command selects the proper Devicetree files. As discussed in the [Devicetree
Overview](devicetree-overview), DT definitions for our board already exist in the Zephyr tree.

### LED0 and the Devicetree

By convention, all Zephyr supported boards that have LEDs should alias those
LEDs to `LED0`, `LED1`, `...`, `LEDn`. Let's take the nRF9160dk as an example. If we
look at [the DTS file for this
board](https://github.com/zephyrproject-rtos/zephyr/blob/main/boards/arm/nrf9160dk_nrf9160/nrf9160dk_nrf9160_common.dts)
we can find the relevant node information for the LED:

```
/ {
	leds {
		compatible = "gpio-leds";
		led0: led_0 {
			gpios = <&gpio0 2 0>;
			label = "Green LED 1";
		};
	};


	/* These aliases are provided for compatibility with samples */
	aliases {
		led0 = &led0;
	};
};
```

* The
  [`compatible`](https://docs.zephyrproject.org/latest/build/dts/bindings-syntax.html#compatible)
  is a Devicetree Binding used to identify the properties of the gpio-leds type.
  You can learn about these compatibles from the [Zephyr Bindings
  Index](https://docs.zephyrproject.org/latest/build/dts/api/bindings.html)
  &mdash;the [gpio-leds
  entry](https://docs.zephyrproject.org/latest/build/dts/api/bindings/led/gpio-leds.html#dtbinding-gpio-leds)
  explains the syntax and properties for this binding.
* `led0: led_0` declares a child node using the `nodelabel:
  nodepath` syntax
* `gpios = <&gpio0 2 0>` declares the port, pin, and pin settings flags
* The alias `led0` is assigned to the address of the `led0` nodelabel.

This is why the Zephyr hardware abstraction works. As long as your board defines
an `led0` alias, the same C code will be able to drill down to this pin
assignment information, even if it's a chip from a completely different
manufacturer.

## A Reminder

If you're used to embedded C, some of the things might look OK to you or they
might look *really* different. As you continue to look at more Zephyr based C
and dig into the DT, you'll start to recognize patterns.

## Conclusion

We now have a taste of how the built-in DT files help us. In the next section
we'll pretend that these definitions don't exist in the DT files. We'll map an
LED, make an alias, and reference these from our C code.

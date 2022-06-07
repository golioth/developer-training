---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Blinking an LED

| ![MagTag LED on pin D13](assets/d13-LED.jpg) |
|:--:|
| Make this LED blink! |

Making an LED blink is the "Hello World!" of the hardware universe. This exercise challenges you to set up the red LED on the underside of the MagTag board in devicetree. If you map it correctly with the alias `led0`, the stock Zephyr blinky example will do the rest.

## Copy the Zephyr Blinky example

Make a copy of the Zephyr Blinky example to work from

<Tabs
groupId="os"
defaultValue="linux"
values={[
{label: 'Linux/MacOS', value: 'linux'},
{label: 'Windows', value: 'windows'},
]}>

<TabItem value="linux">

```shell
cd ~/golioth-zephyr-workspace/modules/lib/golioth/samples
cp -r ~/golioth-zephyr-workspace/zephyr/samples/basic/blinky blinky-training
cd blinky-training
```

</TabItem>
<TabItem value="windows">

```shell
cd C:\golioth-zephyr-workspace\modules\lib\golioth\samples
Xcopy C:\golioth-zephyr-workspace\zephyr\samples\basic\blinky blinky-training\ /E
cd blinky-training
```

</TabItem>
</Tabs>

1. Create a `boards` directory in your `blinky-training` folder
2. Create a new file in the boards folder called `esp32s2_saola.overlay`

The MagTag board isn't officially supported in Zephyr, so we are using the DTS files for the Espressif Saola dev board which uses the same ESP32s2 module.

## Exercise: Add `led0` to your empty overlay file

To populate our overlay file you can just copy the needed parts of an existing DTS file.

* The ESP32 WROVER kit has LEDs on it. We can study [the DTS file for that board](https://github.com/zephyrproject-rtos/zephyr/blob/main/boards/xtensa/esp_wrover_kit/esp_wrover_kit.dts) and use the parts we need for our MagTag:
* open `golioth-zephyr-workspace/zephyr/boards/xtensa/esp_wrover_kit/esp_wrover_kit.dts`

Here is the general structure you will need:

```js
/ {
    child-node {
        subnode_nodelabel: a-sub-node {
            foo = <3>;
            label = "SUBNODE";
        };
    };
};
```

As with Linux, the `/` indicates a root node. Inside the root node we see one child node, which contains one subnode.

For your overlay file you will need to create:

* One root node that contains two child nodes: `aliases` and `leds`
* The leds child node needs a subnode that declares the red LED
* The aliases child node needs a subnode that associates the `led0` alias with your red LED subnode

Once you have copied the relevant parts from the WROVER kit DTS file into your overlay file, update the pin number for the LED. After consulting [the schematic](https://learn.adafruit.com/assets/96946) we can see the D13 pin that connects to the red LED is routed to the ESP32s2 GPIO13 pin.

![MagTag red LED is connected via the D13 signal](assets/magtag-red-led-pinout.jpg)

With this family of microcontrollers, any IO number that is less-than 32 will be on `&gpio0`. Just update the pin number that follows that directive to match what you need. Compare your completed overlay file to the code below.

<details><summary>Click to reveal the expected esp32s2_saola.overlay file</summary>

```js esp32s2_saola.overlay
/ {
    aliases {
        led0 = &red_led;
    };
    leds {
        compatible = "gpio-leds";
        red_led: red_led {
            gpios =  <&gpio0 13 GPIO_ACTIVE_HIGH>;
            label = "Red - LED2";
        };
    };
};
```

In general, subnode names, subnode labels, and the label properties can be named anything that you want. If you compare this overlay file to the [overlay file previously used in the blinky example](https://github.com/golioth/magtag-demo/blob/blinky/boards/esp32s2_saola.overlay) during Zephyr Exercises part of this training, you'll find the subnode for the LED was named differently.

Of note:

* The `compatible` property tells Zephyr the type of binding we are using
* The `gpios` assignment indicates several gpio properties:
  * `&gpio0` &ndash; assigns the port that drives these pins (Further reading: [how ESP32 pin/port assignments work](https://blog.golioth.io/how-to-set-up-esp32-gpio-pins-in-zephyr/))
  * `13` &ndash; assigns the pin number based on the IO## (or GPIO##) number, not the physical pin number on the package
  * `GPIO_ACTIVE_HIGH` &ndash; a flag that sets the active state of the pin. This is also where you could set a pull-up or pull-down resistor by using a bitmask: `(GPIO_ACTIVE_HIGH | GPIO_PULL_UP)`

</details>

## Build and flash the example

Now that we set up our LED in the overlay file, let's build and run the app to make sure it blinks:

```shell
west build -b esp32s2_saola . -p
west flash
```

## C code walkthrough

```c
#define LED0_NODE DT_ALIAS(led0)
static const struct gpio_dt_spec led = GPIO_DT_SPEC_GET(LED0_NODE, gpios);
gpio_pin_configure_dt(&led, GPIO_OUTPUT_ACTIVE);
gpio_pin_set_dt(&led, 1);
```

Here is the relevant code the from `main.c` file of the blinky example. Let's walk through what is happening:

1. A macro is used to look at the devicetree and get the node information from the `led0` alias
2. Create a struct instance called `led` that contains the relevant pin information for led0
3. The pin is configured. This function automatically pulls in any flags specified in the devicetree
4. The pin is set to high (as an example we've shown the set function instead of the toggle function used in the blinky example)

Notice that the macros and functions used all contain `dt` to indicate these operate on a devicetree node. There are equivalent functions/macros that operate directly, but we recommend always using the devicetree.

For more information on the Zephyr GPIO system, consult [the GPIO driver API reference](https://docs.zephyrproject.org/apidoc/latest/group__gpio__interface.html).

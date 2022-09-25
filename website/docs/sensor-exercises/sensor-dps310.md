---
sidebar_position: 1
description: Set up and use a sensor that has a driver built-in to Zephyr
---

# Using Zephyr Sensor Drivers

![MagTag connected to the DPS310 pressure sensor](assets/magtag-dps310-sensor.jpg)

For this exercise you will be building an app that reads temperature and
humidity data from an [Infineon
DPS310](https://www.infineon.com/cms/en/product/sensor/pressure-sensors/pressure-sensors-for-iot/dps310/)
pressure and temperature sensor. The concepts are similar for any supported
sensor, so if you don't have this part you can still follow along, assuming that
there is a driver for the sensor you do have on hand. The best place to look for
driver support is in the
[driver/sensor](https://github.com/zephyrproject-rtos/zephyr/tree/main/drivers/sensor)
folder of the Zephyr toolchain.

## Connecting the Sensor

This sensor includes an i2c interface which is easy to connect to the MagTag
using a QWiic cable.

![MagTag i2c pinout](assets/magtag-i2c-pinout.png)

After referencing [the MagTag schematic](https://learn.adafruit.com/assets/96946)
we see the SDA and SCL pins are on IO33 and IO34. With this information in hand,
we can create an overlay file that defines the DPS310 in the Devicetree.

## Devicetree and Pin Control

We need to use an i2c peripheral. An entry already exists for `i2c1` in the
esp32s2_saola dts file:

```js title="excerpt from ~/magtag-training/deps/zephyr/boards/xtensa/esp32s2_saola/esp32s2_saola.dts"
&i2c1 {
	clock-frequency = <I2C_BITRATE_STANDARD>;
	pinctrl-0 = <&i2c1_default>;
	pinctrl-names = "default";
};
```

Two important things to not from the node above: there is no status listed which
means the peripheral is not enabled, and the pinctrl-0 entry tells us to look
for the `i2c1_default` node in the pinctrl.dtsi file to see how the pins are
mapped and configured:

```js title="excerpt from ~/magtag-training/deps/zephyr/boards/xtensa/esp32s2_saola/esp32s2_saola-pinctrl.dtsi"
&pinctrl {
	i2c1_default: i2c1_default {
		group1 {
			pinmux = <I2C1_SDA_GPIO3>,
				 <I2C1_SCL_GPIO4>;
			bias-pull-up;
			drive-open-drain;
			output-high;
		};
	};
};
```

This shows that by default the saola board maps i2c1 to GPIO3 and GPIO4. We now
have all the information we need to change this pin mapping and enable the
peripheral. We will also tell Zephyr that we have connected a sensor by adding
it as a subnode of i2c1.

Create your `boards/esp32s2_saola.overlay` file with the following contents:

```js title="esp32s2_saola.overlay"
&i2c1 {
	pinctrl-0 = <&i2c1_default>;
	pinctrl-names = "default";
	status = "okay";

	pressure1: DPS310@77 {
		status = "okay";
		compatible = "infineon,dps310";
		reg = <0x77>;
	};
};

&pinctrl {
	i2c1_default: i2c1_default {
		group1 {
			pinmux = <I2C1_SDA_GPIO33>,
				 <I2C1_SCL_GPIO34>;
		};
	};
};
```

Let's walk through everything that's going on in our new overlay file:

* Included the pinctrl-0 and pinctrl-names assignments so it's very clear
  with Pin Control state is being used. (Technically, these would have been
  inherited from the board definitions and don't need to be here.)
* Set the status of i2c1 to "okay" to enable the node
* Add a child node that defines the DPS310:
  * Declare a `pressure1` node label
    * The `DPS310` path is appended with the address of the i2c device: `@77`
  * Sets the status of the DPS31 to "okay" to enable the subnode
  * The `compatible` property is set using the device tree bindings. You can
    look these up in [the binding
    index](https://docs.zephyrproject.org/latest/build/dts/api/bindings.html#devicetree-binding-index).
  * Specify the device address as a `reg` value
* Add a pinctrl node to reassign the i2c1 pins
  * Map the sda and scl pins to IO33 and IO34 to match the MagTag schematic
  * Pin configuration will be inherited from the saola board definition in
    Zephyr.

As with the [LED](../basic-io-exercises/mapping-gpio.md) and
[Button](../basic-io-exercises/button-input.md) examples, the node and subnode
Devicetree entries are all that is needed to set up the hardware abstraction for
the i2c peripheral, and the DPS310 part itself. But remapping peripheral pins
requires the use of a pinctrl node too.

## Using Kconfig to build in the necessary libraries

Up to this point we've spent quite a bit of time on Devicetree but have not even
touched on the other half of Zephyr configuration. Kconfig is a series of files
that tell the build system what libraries to include in the build (along with
all of the necessary variables, settings, and dependencies that go along with
them). In this example, we'll work with the `prj.conf` file, which is
project-level configuration.

To use an i2c sensor, there are three main libraries you need to include in the
build by adding the following lines to the `prj.conf`:

```js
CONFIG_I2C=y
CONFIG_SENSOR=y
CONFIG_DPS310=y
```

## Getting the sensor node from Devicetree and using it

It is surprisingly easy to pull in the sensor node and use it. This is thanks to
the uniformed API that Zephyr has implemented for sensors.

```c
const struct device *dev = DEVICE_DT_GET(DT_NODELABEL(pressure1));
sensor_sample_fetch(dev);
```

That is all you need to do to fetch a sensor value. There is some additional
housekeeping that helps you associate the values with the data type, and to
display it as a human readable value. But after running the two lines above, you
will have read data from the sensor.

```c main.c
#include <zephyr.h>
#include <device.h>
#include <drivers/sensor.h>
#include <stdlib.h>

void main(void)
{
	printk("Hello DPS310\n");
	const struct device *dev = DEVICE_DT_GET(DT_NODELABEL(pressure1));

	if (dev == NULL) {
		printk("Could not get DPS310 device\n");
		return;
	}

	printk("dev %p name %s\n", dev, dev->name);

	while (1) {
		struct sensor_value temp, press;

		sensor_sample_fetch(dev);
		sensor_channel_get(dev, SENSOR_CHAN_AMBIENT_TEMP, &temp);
		sensor_channel_get(dev, SENSOR_CHAN_PRESS, &press);

		printk("temp: %d.%06d; press: %d.%06d\n",
		      temp.val1, abs(temp.val2), press.val1, press.val2);

		k_sleep(K_MSEC(1000));
	}
}
```

## Exercise: Run DSP310 Code Sample

A [code sample for the
DPS310](https://github.com/zephyrproject-rtos/zephyr/tree/main/samples/sensor/dps310)
is available in Zephyr. It is nearly identical to the code outlined above. As an
exercise:

1. Make a copy of the code sample into your
   `golioth-zephyr-workspace/modules/lib/golioth/samples/` folder
2. Study the `app.overlay` file from the sample and compare it to the `*dev`
assignment in `main.c`.
    * Notice the different approach that was taken by the sample writers from
      what is outlined above. There is more than one way to get information from
      the Devicetree.
3. Remove the `app.overlay` file, add a `boards` directory and place your
`esp32s2_saola.overlay` file inside with the Devicetree entries as shown above.
Alter `main.c` to work with the way your overlay file defines the sensor.
4. Build, flash, and run the sample. Verify it is printing pressure and
temperature data to the serial console.

## Exercise: Stream DPS310 Data to Golioth LightDB

Make this example into an IoT device by sending the senor readings to Golioth's
LightDB Stream. To be successful at this, you will need to combine a few
different code samples that we've already worked with.

1. Begin with your working copy of the DPS310 sample.
2. Reference the `stream` [branch of the
magtag-demo](https://github.com/golioth/magtag-demo/tree/stream) repository:
    * Add in the Kconfig directives necessary to use Golioth by copying
      everything from `prj.conf` and `esp32s2_saola.conf` from that branch into
      those files in your DPS310 sample
    * Study how `main.c` writes accelerometer data to a LightDB stream endpoint
      using the `golioth_lightdb_set()` function. Adapt this approach for your
      DPS310 sensor readings.
3. Build, flash, and run the sample. Verify in [the Golioth
Console](https://console.golioth.io/) that your sensor data is being received by
LightDB Stream

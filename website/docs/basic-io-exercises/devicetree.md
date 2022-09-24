---
sidebar_position: 2
description: "Using Devicetree to map pins for input or output"
---

# Zephyr Devicetree

Zephyr uses Devicetree bindings to associate pins, peripherals, and external
hardware with an abstract definition in your code.

It won't take long for you to appreciate the power of this approach. If for some
reason you need to change which pins are being used for a project, or you need
to update the type of sensor you are using, it can be as easy as changing a few
lines in your Devicetree overlay file, and leaving your C code completely
untouched.

## DTS Files

All devices that are supported in Zephyr have a Devicetree source (DTS) included
in the codebase. These files provide all of the hardware details Zephyr needs to
interact with them&ndash;memory layout, clock speed, register addresses for
peripherals for everything from GPIO to i2c, and more. These files are great for
you to reference, but you will not edit them directly unless you are adding your
own board/chip that lacks official support. Do you need to know the clock speed
and TX/RX pins used by the Espressif Saola dev board? Look in the DTS file:

```js title="excerpt from: ~/magtag-training/deps/zephyr/boards/xtensa/esp32s2_saola/esp32s2_saola.dts"
&cpu0 {
	clock-frequency = <ESP32_CLK_CPU_240M>;
};

&uart0 {
	status = "okay";
	current-speed = <115200>;
	pinctrl-0 = <&uart0_default>;
	pinctrl-names = "default";
};
```

From this we see that `uart0` is using Pin Control (pinctrl) to define the pins with a
structure named `uart0_default`. If we look in the `<board>-pinctrl.dtsi` file
we can see exactly which pins are assigned in that structure, and that one of
those pins is configured with a pull-up resistor enabled.

```js title="excerpt from ~/magtag-training/deps/zephyr/boards/xtensa/esp32s2_saola/esp32s2_saola-pinctrl.dtsi"
&pinctrl {
	uart0_default: uart0_default {
		group1 {
			pinmux = <UART0_TX_GPIO43>;
		};
		group2 {
			pinmux = <UART0_RX_GPIO44>;
			bias-pull-up;
		};
	};
};
```

## Changing pin assignments with and overlay file

Each project can specify one or more Devicetree overlay files. This is where
your application code will declare its intention to use pins and peripherals.
For instance, the MagTag sample code turns on an i2c bus and selects the pins
for the SDA and SCL lines signals that are connected to the accelerometer.
Overlay files are located in a `boards/` subdirectory of your application code.

```js title="MagTag accelerometer excerpt from: ~/magtag-training/app/boards/esp32s2_saola.overlay"
&i2c1 {
	pinctrl-0 = <&i2c1_default>;
	status = "okay";

	lis3dh@19 {
			compatible = "st,lis2dh";
			reg = <0x19>;
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

## The pinctrl subsystem

Special function pins like the SDA/SCL lines are specified using the pinctrl
subsystem of Zephyr. The syntax for these pins varies from one chip manufacturer
to the next, so it is good to peruse the documentation. By consulting [the
Zephyr bindings
index](https://docs.zephyrproject.org/latest/build/dts/api/bindings.html), we
find [useful documentation on the Espressif pinctrl
page](https://docs.zephyrproject.org/latest/build/dts/api/bindings/pinctrl/espressif%2Cesp32-pinctrl.html
).

Espressif has approached pinctrl by making a definition for every possible
configuration of every pin. These definitions are found in the include folder of
the Espressif hardware abstraction layer module. For the MagTag demo, the i2c1
pins needed remapping. Here is an excerpt of the relevant define for the SDA
pin. Compare this to what is found in the overlay file above.

```js title="Espressif esp32s2 pinctrl definitions: ~/magtag-training/deps/modules/hal/espressif/include/dt-bindings/pinctrl/esp32s2-pinctrl.h"
#define I2C1_SDA_GPIO31 \
	ESP32_PINMUX(31, ESP_I2CEXT1_SDA_IN, ESP_I2CEXT1_SDA_OUT)

#define I2C1_SDA_GPIO32 \
	ESP32_PINMUX(32, ESP_I2CEXT1_SDA_IN, ESP_I2CEXT1_SDA_OUT)

#define I2C1_SDA_GPIO33 \
	ESP32_PINMUX(33, ESP_I2CEXT1_SDA_IN, ESP_I2CEXT1_SDA_OUT)

#define I2C1_SDA_GPIO34 \
	ESP32_PINMUX(34, ESP_I2CEXT1_SDA_IN, ESP_I2CEXT1_SDA_OUT)

```

The defines from the esp32s2-pinctrl.h file are used to populate subnodes inside
the pinctrl node of our overlay file. (The anatomy of a Devicetree node will be
discussed in the next exercise: [Blinking an LED](./mapping-gpio.md).)


It's normal to feel confused over the details at this point. Devicetree is a
complex topic that will take time to fully understand. We recommend looking at
overlay files from sample code, and review [the pinctrl post on the Golioth
blog](https://blog.golioth.io/how-to-use-zephyr-pin-control-pinctrl-for-pin-multiplexing-and-configuration/)
to help build your early understanding.

## Devicetree files at build time

All Devicetree files are merged together at build time. Anything your overlay
files change will be incorporated with inherited settings from the board and/or
chip DTS files. Notice that a lot of properties from the chip's `esp32s2.dtsi`
file have joined the i2c settings we saw in the overlay file:

```js title="Excerpts from ~/magtag-training/app/build/zephyr/zepyr.dts whosing i2c1 pins and configuration"
/ {
	#address-cells = < 0x1 >;
	#size-cells = < 0x1 >;
	model = "esp32s2_saola";
	compatible = "espressif,esp32s2";

	soc {
		#address-cells = < 0x1 >;
		#size-cells = < 0x1 >;
		compatible = "simple-bus";
		ranges;

		i2c1: i2c@3f427000 {
			compatible = "espressif,esp32-i2c";
			#address-cells = < 0x1 >;
			#size-cells = < 0x0 >;
			reg = < 0x3f427000 0x1000 >;
			interrupts = < 0x35 >;
			interrupt-parent = < &intc >;
			clocks = < &rtc 0x5 >;
			status = "okay";
			clock-frequency = < 0x186a0 >;
			pinctrl-0 = < &i2c1_default >;
			pinctrl-names = "default";
			lis3dh@19 {
				compatible = "st,lis2dh";
				reg = < 0x19 >;
			};
		};
  };

	pinctrl: pin-controller {
		compatible = "espressif,esp32-pinctrl";
		status = "okay";
		i2c1_default: i2c1_default {
			phandle = < 0x5 >;
			group1 {
				pinmux = < 0x301821 >, < 0x2f97e2 >;
				bias-pull-up;
				drive-open-drain;
				output-high;
			};
		};
	};
};
```

Note that the pinmux instruction in the pinctrl node is no longer
human-readable, but we do see the pin configuration commands which were pulled
in from the board's pinctrl.dtsi file in Zephyr. All our overlay file did was
change which pins are used for those signals.

Now if you were to use a different variant of the chip (say the ESP32 instead of
the ESP32s2), you add your overlay file for that variant and the Devicetree will
pull in the correct register address and other settings for the new part without
anything more than changing the board name in the build command.

## Some Devicetree resources to keep in mind

Today's training will guide you through your first small steps in using
Devicetree. As you advance, consider reading through [the Zephyr Devicetree
docs](https://docs.zephyrproject.org/latest/build/dts/intro.html). We also
recommend watching this talk from Marti Bolivar at the 2021 Zephyr Developer's
Summit that [walks through the core Devicetree
concepts](https://www.youtube.com/watch?v=sWaxQyIgEBY).

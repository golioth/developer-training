---
sidebar_position: 2
---

# Zephyr Devicetree

Zephyr uses devicetree bindings to associate pins, peripherals, and external hardware with an abstract definition in your code.

It won't take long for you to appreciate the power of this approach. If for some reason you need to change which pins are being used for a project, or you need to update the type of sensor you are using, it can be as easy as changing a few lines in your devicetree overlay file, and leaving your C code completely untouched.

## DTS and Overlays

All devices that are supported in Zephyr have a devicetree source (DTS) included in the codebase. These files provide all of the hardware details Zephyr needs to interact with them&ndash;memory layout, clock speed, register addresses for peripherals for everything from GPIO to i2c, and more. These files are great for you to reference, but you will not edit them directly unless you are adding your own board/chip that lacks official support. Do you need to know the clock speed and TX/RX pins used by the Espressif Saola dev board? Look in the DTS file:

```js title="excerpt from: golioth-zephyr-workspace/zephyr/boards/xtensa/esp32s2_saola/esp32s2_saola.dts"
&cpu0 {
	clock-frequency = <ESP32_CLK_CPU_240M>;
};

&uart0 {
	status = "okay";
	current-speed = <115200>;
	pinctrl-0 = <&uart0_tx_gpio43 &uart0_rx_gpio44>;
	pinctrl-names = "default";
};
```

Each project can specify one or more devicetree overlay files. This is where your application code will declare its intention to use pins and peripherals. For instance, the MagTag sample code turns on an i2c bus and selects the pins for the SDA and SCL lines signals that are connected to the accelerometer. Overlay files are located in a `boards/` subdirectory of your application code.

```js title="MagTag accelerometer excerpt from: magtag-demo/boards/esp32s2_saola.overlay"
&i2c1 {
    pinctrl-0 = <&i2c1_sda_gpio33 &i2c1_scl_gpio34>;
	status = "okay";

	lis3dh@19 {
			compatible = "st,lis2dh";
			reg = <0x19>;
			label = "LIS3DH";
	};
};
```

## The pinctrl subsystem

Special function pins like the SDA/SCL lines are specified using the pinctrl subsystem of Zephyr. The syntax for these pins varies from one chip manufacturer to the next, so it is good to peruse the documentations. By consulting [the Zephyr bindings index](https://docs.zephyrproject.org/latest/build/dts/api/bindings.html), we find [useful documentation on the Espressif pinctrl page](https://docs.zephyrproject.org/latest/build/dts/api/bindings/pinctrl/espressif%2Cesp32-pinctrl.html
).

Espressif has approached pinctrl by making a definition for every possible configuration of every pin. These definitions are found in the include folder of the Espressif hardware abstraction layer module. For the MagTag demo, the i2c1 pins needed remapping, here is an excerpt of the relevant define for SDA on pin :

```js title="Espressif esp32s2 pinctrl definitions: golioth-zephyr-workspace/modules/hal/espressif/include/dt-bindings/pinctrl/esp32s2-pinctrl.h"
#define I2C1_SDA_GPIO31 \
	ESP32_PINMUX(31, ESP_I2CEXT1_SDA_IN, ESP_I2CEXT1_SDA_OUT)

#define I2C1_SDA_GPIO32 \
	ESP32_PINMUX(32, ESP_I2CEXT1_SDA_IN, ESP_I2CEXT1_SDA_OUT)

#define I2C1_SDA_GPIO33 \
	ESP32_PINMUX(33, ESP_I2CEXT1_SDA_IN, ESP_I2CEXT1_SDA_OUT)

#define I2C1_SDA_GPIO34 \
	ESP32_PINMUX(34, ESP_I2CEXT1_SDA_IN, ESP_I2CEXT1_SDA_OUT)

```

The defines from the esp32s2-pinctrl.h file are used to declare subnodes inside the pinctrl node of our overlay file.

```js title="Adjusting i2c1 pin assignments in an overlay file"
&pinctrl {
    i2c1_sda_gpio33: i2c1_sda_gpio33 {
        pinmux = <I2C1_SDA_GPIO33>;
        bias-pull-up;
        drive-open-drain;
        output-high;
    };
    i2c1_scl_gpio34: i2c1_scl_gpio34 {
        pinmux = <I2C1_SCL_GPIO34>;
        bias-pull-up;
        drive-open-drain;
        output-high;
    };
};

&i2c1 {
    pinctrl-0 = <&i2c1_sda_gpio33 &i2c1_scl_gpio34>;
	status = "okay";

    lis3dh@19 {
            compatible = "st,lis2dh";
            reg = <0x19>;
            label = "LIS3DH";
    };
};
```

In the example above, the `&pinctrl` section declares pin names using the `subnode-label: sub-node-path{ };` syntax. The label and path can be anything you wish, with the pinmux define (from the Espressif hal include file) and relevant pin configuration inside the curly brackets. Once defined, the subnode-label is reference using the ampersand: `&i2c1_sda_gpio33`.

It's normal to be a bit confused over the details. Devicetree is a complex topic that will take some time to fully understand. We recommend looking at overlay files from sample code to help build your early understanding.

## Devicetree files at build time

All devicetree files are merged together at build time. Anything your overlay files change will be incorporated with inherited settings from the board and/or chip DTS files. Notice that a lot of properties from the chip's `esp32s2.dtsi` file have joined the i2c settings we saw in the overlay file:

```js title="excerpts from file generated by build process: magtag-demo/build/zephyr/zephyr.dts"
pinctrl: pin-controller {
	compatible = "espressif,esp32-pinctrl";
	status = "okay";
	i2c1_sda_gpio33: i2c1_sda_gpio33 {
		pinmux = < 0x301821 >;
		bias-pull-up;
		drive-open-drain;
		output-high;
		phandle = < 0x7 >;
	};
	i2c1_scl_gpio34: i2c1_scl_gpio34 {
		pinmux = < 0x2f97e2 >;
		bias-pull-up;
		drive-open-drain;
		output-high;
		phandle = < 0x8 >;
	};
};

i2c1: i2c@3f427000 {
	compatible = "espressif,esp32-i2c";
	#address-cells = < 0x1 >;
	#size-cells = < 0x0 >;
	reg = < 0x3f427000 0x1000 >;
	interrupts = < 0x35 >;
	interrupt-parent = < &intc >;
	label = "I2C_1";
	clocks = < &rtc 0x5 >;
	status = "okay";
	clock-frequency = < 0x186a0 >;
	pinctrl-0 = < &i2c1_sda_gpio33 &i2c1_scl_gpio34 >;
	pinctrl-names = "default";
	lis3dh@19 {
		compatible = "st,lis2dh";
		reg = < 0x19 >;
		label = "LIS3DH";
	};
};
```

Now if you were to use a different variant of the chip (say the ESP32 instead of the ESP32s2), you add your overlay file for that variant and the devicetree will pull in the correct register address and other settings for the new part without anything more than changing the board name in the build command.

## Some devicetree resources to keep in mind

Today's training will guide you through your first small steps in using devicetree. As you advance, consider reading through [the Zephyr devicetree docs](https://docs.zephyrproject.org/latest/build/dts/intro.html). We also recommend watching this talk from Marti Bolivar at the 2021 Zephyr Developer's Summit that [walks through the core devicetree concepts](https://www.youtube.com/watch?v=sWaxQyIgEBY).

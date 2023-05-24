---
id: devicetree-overview
sidebar_position: 1
description: |
    High-level info of what Devicetree is and does
---

# Devicetree Overview

Devicetree is the data structure that Zephyr uses to describe hardware.
Everything from the bus addresses inside the microcontrollers to the type of
sensors you connect to your device should be described in Devicetree.

It is still possible to access all MCU registers, and interact with GPIO and
other peripherals directly. But that misses out on one of Zephyr's best features:
portability. We live in an age of chip shortages and there's a very real
possibility the project you're working on will need to move to a different chip
within the same family, or to a completely different manufacturer. When done
right, Devicetree lets you do this ***without altering any of your C code!!!***

<table>
<tr><td>

```devicetree
/ {
	relay_pins {
		compatible = "gpio-relay";
		relay_0: relay_0 {
			gpios = <&gpio0 17 (GPIO_ACTIVE_HIGH)>;
		};
		relay_1: relay_1 {
			gpios = <&gpio0 0 (GPIO_ACTIVE_HIGH)>;
		};
	};
};

&i2c1 {
	bme280: bme280@76 {
		compatible = "bosch,bme280";
		reg = <0x76>;
	};

	apds9960: apds9960@39 {
		compatible = "avago,apds9960";
		reg = <0x39>;
		label = "APDS9960";
		int-gpios = <&gpio0 4 (GPIO_ACTIVE_LOW)>;
	};
};

&pwm0 {
	status = "disabled";
};
```

</td></tr>
<tr><td>
An example of a Devicetree board overlay file that adds two relay control pins,
a BME280 weather sensor, an APDS9960 light sensor, and disables the PWM0 channel
on this board.
</td></tr>
</table>

But with great power, comes great responsibility. It's up to you to get your
Devicetree files right. When done wrong, the compiler errors are brutally
punishing. (We're only partly joking here.)

In this module we will frequently abbreviate Devicetree as DT.

:::tip

The Devicetree is the most confusing and difficult to learn part of Zephyr. This
overview will likely be a bit of a head-scratch&ndash;especially when it comes
to syntax&ndash;but don't worry. It's worth knowing about DT right away, even if
you don't understand it. This is where the rubber hits the road for Zephyr's
vast hardware abstraction.

[Zephyr's Devicetree Docs
page](https://docs.zephyrproject.org/latest/build/dts/index.html) is a tome, but
worth having on speed-dial when you run into issues.

:::

## Devicetree for the nRF9160dk

Let's take the red pill. You've been working with our training repository. Did
you know it's set up to have a full copy of the Zephyr tree in it?

1. Take a moment to explore the `deps/zephyr` folder. You'll find a ton of help
   in here (`samples` and `tests` are the next-best thing if a tutorial for what
   you need isn't available).

    To illustrate the scope of Devicetree, look at the nRF9160dk folder
    (`zephyr/boards/arm/nrf9160dk_nrf9160/`):

    ```shell
    nrf9160dk_nrf9160/
    ├── board.cmake
    ├── CMakeLists.txt
    ├── doc
    │   ├── img
    │   │   └── nrf9160dk_nrf9160.jpg
    │   └── index.rst
    ├── dts
    │   ├── bindings
    │   │   ├── nordic,nrf9160dk-nrf52840-interface.yaml
    │   │   └── nordic,nrf9160dk-nrf52840-reset.yaml
    │   ├── nrf9160dk_buttons_on_io_expander.dtsi
    │   ├── nrf9160dk_leds_on_io_expander.dtsi
    │   ├── nrf9160dk_nrf52840_reset_on_if5.dtsi
    │   ├── nrf9160dk_nrf52840_reset_on_if9.dtsi
    │   └── nrf9160dk_uart1_on_if0_3.dtsi
    ├── Kconfig.board
    ├── Kconfig.defconfig
    ├── nrf52840_reset.c
    ├── nrf9160dk_nrf9160_0_14_0.overlay
    ├── nrf9160dk_nrf9160_common_0_14_0.dtsi
    ├── nrf9160dk_nrf9160_common.dts
    ├── nrf9160dk_nrf9160_common-pinctrl.dtsi
    ├── nrf9160dk_nrf9160_defconfig
    ├── nrf9160dk_nrf9160.dts
    ├── nrf9160dk_nrf9160_ns_0_14_0.overlay
    ├── nrf9160dk_nrf9160_ns_defconfig
    ├── nrf9160dk_nrf9160_ns.dts
    ├── nrf9160dk_nrf9160_ns.yaml
    ├── nrf9160dk_nrf9160_partition_conf.dts
    ├── nrf9160dk_nrf9160.yaml
    ├── pre_dt_board.cmake
    └── revision.cmake
    ```

    This represents everything that's already been set up for you for this
    particular development board, from peripheral address, to pin muxes, to Kconfig
    symbols that enable necessary libraries.

2. Browse the `nrf9160dk_nrf9160_common.dts` file


## How DT enables `uart0` for serial console

The `nrf9160dk_nrf9160_common.dts` file hosts board-specific Devicetree details.
For instance, here are selected portions of the DT that set up the serial
console we've been using:

```
/ {
    chosen {
        zephyr,console = &uart0;
        zephyr,shell-uart = &uart0;
        zephyr,uart-mcumgr = &uart0;
    };
};

&uart0 {
    status = "okay";
    current-speed = <115200>;
    pinctrl-0 = <&uart0_default>;
    pinctrl-1 = <&uart0_sleep>;
    pinctrl-names = "default", "sleep";
};
```

Learning DT is an entire set of training days, so give yourself permission to
not understand most of this. But a few general things:

1. The `okay` status means this node is enabled. Setting a status to `disabled`
   would remove it from the build.
2. Note the `&` operator on `&uart0`. This tells us that this node already
   exists on the DT and what we're doing here is making changes.
3. The pinout of the uart is not defined here, it's defined using Pin Control
   (which handles muxing for special-function peripherals). You can see this
   defines which Pin Control definitions to use.

  :::tip

  We will not touch on Pin Control at all in this training (we won't need it
  today). See the [Pin Control
  docs](https://docs.zephyrproject.org/latest/hardware/pinctrl/index.html) for
  further information.
  :::

### Devicetree is many files combined

In point #2 above, we said the `uart0` DT node already exits. So where is
`uart0` actually defined? The chip itself has DT files!

Microcontroller specific DT files are found in the `zephyr/dts` folder. If we
look in `zephyr/dts/arm/nordic/nrf9160_common.dtsi` we can locate the `uart0`
definition (notice no `&` this time) which includes the register address,
offset, and interrupt configuration:

```
uart0: uart@8000 {
	compatible = "nordic,nrf-uarte";
	reg = <0x8000 0x1000>;
	interrupts = <8 NRF_DEFAULT_IRQ_PRIORITY>;
	status = "disabled";
};
```

:::note

The status is set to `disabled` in the chip DT file. As mentioned earlier, the
development board DT file is what enables it by changing its status to `okay`.
The same can be done in the application-level board DT files (called "overlay"
files) that we will be working with in this module.

:::

When the project is built, the microcontroller DT files will be located, the
board DT files will be combined on top of those, and the overlay DT files from
the application will be added on top of everything.

## Don't Freak Out!

This page is here to let you know that "*Thar be dragons*" in Devicetree. However,
in most cases, the hard work has already been done for us. Much of the DT work
needed by application developers is turning on/off peripherals, telling Zephyr
about sensors and other devices connected to the MCU, and mapping I/O.

Let's jump in by using Devicetree to add an LED to an application.

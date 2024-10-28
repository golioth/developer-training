---
id: devicetree-overview
sidebar_position: 1
description: |
    High-level info of what Devicetree is and does
---

# Devicetree Overview

Devicetree is the data structure that Zephyr uses to describe hardware.
Everything should be described in Devicetree, from the bus addresses inside the
microcontrollers to the type of sensors you connect to your device.

It is still possible to access all MCU registers, and interact with GPIO and
other peripherals directly. But that misses out on one of Zephyr's best
features: portability. We live in an age of chip shortages. There's a real
possibility the project you're working on will need to move to a different chip
variant, or to a completely different manufacturer. When done right, Devicetree
lets you do this ***without altering any of your C code!***

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

With great power, comes great responsibility. It's up to you to get your
Devicetree files right. When done wrong, the compiler errors are difficult to
unwind and troubleshoot.

In this module we will frequently abbreviate Devicetree as DT.

:::tip

The Devicetree is the most confusing and difficult to learn part of Zephyr. This
overview will likely be a bit of a head-scratch—especially when it comes
to syntax—but don't worry. It's worth knowing about DT right away, even if
you don't fully understand it. This is where the rubber hits the road for Zephyr's
vast hardware abstraction.

[Zephyr's Devicetree Docs
page](https://docs.zephyrproject.org/latest/build/dts/index.html) is a tome, but
worth having on speed-dial when you run into issues.

:::

## Devicetree for the nRF9160dk

Let's dive in. You've been working with [our training
repository](https://github.com/golioth/zephyr-training). Did you know it's set
up to have a full copy of the Zephyr tree in it?

### Exploring the nrf9160dk board definition

Take a moment to explore the `deps/zephyr` folder. You'll find a ton of help
in here (`samples` and `tests` are the next-best thing if a tutorial for what
you need isn't available).

To illustrate the scope of Devicetree, look at the nRF9160 DK folder
(`zephyr/boards/nordic/nrf9160dk/`):

```shell
nrf9160dk_nrf9160/
├── board.c
├── board.cmake
├── board.yml
├── CMakeLists.txt
├── doc
│   ├── img
│   │   └── nrf9160dk_nrf9160.jpg
│   └── index.rst
├── dts
│   ├── bindings
│   │   ├── nordic,nrf9160dk-nrf52840-interface.yaml
│   │   ├── nordic,nrf9160dk-nrf52840-reset.yaml
│   │   └── nordic,nrf9160dk-optional-routing.yaml
│   ├── nrf52840
│   │   ├── nrf9160dk_buttons_on_io_expander.dtsi
│   │   ├── nrf9160dk_leds_on_io_expander.dtsi
│   │   ├── nrf9160dk_nrf52840_reset_on_if5.dtsi
│   │   ├── nrf9160dk_nrf52840_reset_on_if9.dtsi
│   │   └── nrf9160dk_uart1_on_if0_3.dtsi
│   └── nrf9160
│       ├── nrf9160dk_buttons_on_io_expander.dtsi
│       ├── nrf9160dk_leds_on_io_expander.dtsi
│       ├── nrf9160dk_nrf52840_reset_on_if5.dtsi
│       ├── nrf9160dk_nrf52840_reset_on_if9.dtsi
│       └── nrf9160dk_uart1_on_if0_3.dtsi
├── Kconfig
├── Kconfig.defconfig
├── Kconfig.nrf9160dk
├── nrf52840_reset.c
├── nrf9160dk_nrf52840_0_14_0.overlay
├── nrf9160dk_nrf52840_0_14_0.yaml
├── nrf9160dk_nrf52840_0_7_0.yaml
├── nrf9160dk_nrf52840_defconfig
├── nrf9160dk_nrf52840.dts
├── nrf9160dk_nrf52840-pinctrl.dtsi
├── nrf9160dk_nrf9160_0_14_0.overlay
├── nrf9160dk_nrf9160_0_14_0.yaml
├── nrf9160dk_nrf9160_0_7_0.yaml
├── nrf9160dk_nrf9160_common_0_14_0.dtsi
├── nrf9160dk_nrf9160_common.dtsi
├── nrf9160dk_nrf9160_common-pinctrl.dtsi
├── nrf9160dk_nrf9160_defconfig
├── nrf9160dk_nrf9160.dts
├── nrf9160dk_nrf9160_ns_0_14_0.overlay
├── nrf9160dk_nrf9160_ns_0_14_0.yaml
├── nrf9160dk_nrf9160_ns_0_7_0.yaml
├── nrf9160dk_nrf9160_ns_defconfig
├── nrf9160dk_nrf9160_ns.dts
├── nrf9160dk_nrf9160_partition_conf.dtsi
└── pre_dt_board.cmake
```

This represents everything that's already been set up for you for this
particular development board, from peripheral addresses, to pin muxes, to
Kconfig symbols that enable necessary libraries.

### How DT enables `uart0` for serial console

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
```

Look further down this file and you can find where `&uart0;` is configured.

```
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
   would disable the node in the build.
2. Note the `&` operator on `&uart0`. In Devicetree terminology, `&uart0` is
   known as a
   [phandle](https://docs.zephyrproject.org/latest/build/dts/phandles.html#dt-phandles)
   and it's function is similar in concept to the way you can use pointers to
   refer to structures in C. This allows us to reference an existing node in
   the DT so that we can make changes to that node.
3. The pinout of for the `uart0` peripheral is not explicitly defined here.
   Instead, it's defined using Pin Control, which handles muxing for
   special-function peripherals. Pin Control enables devices to use different
   pin configurations for each operating "state". In this example, the `&uart0`
   node refers to pin definitions for the `default` and `sleep` states defined
   in the
   `zephyr/boards/nordic/nrf9160dk/nrf9160dk_nrf9160_common-pinctrl.dtsi`
   file.

  :::tip

  We will not touch on Pin Control at all in this training (we won't need it
  today). See the [Pin Control
  docs](https://docs.zephyrproject.org/latest/hardware/pinctrl/index.html) for
  further information. We have written about [Pin Control on our blog as
  well](https://blog.golioth.io/how-to-use-zephyr-pin-control-pinctrl-for-pin-multiplexing-and-configuration/).

  :::

## Devicetree is many files combined

In point #2 above, we said the `uart0` DT node already exists for the board
files we're looking at. So where is `uart0` actually defined? The nRF9160 chip
itself has DT files!

Microcontroller specific DT files are found in the `zephyr/dts` folder. If we
look in `zephyr/dts/arm/nordic/nrf91_peripherals.dtsi` we can locate the `uart0`
node label (notice no `&` this time) which includes the register address,
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

When the project is built, the microcontroller DT files are located and used as
the base, the board DT files will be combined on top of those, and the overlay
DT files from the application will be added on top of everything. Each of these
layers are capable of controlling different elements in the system.

## Don't Freak Out!

This page is here to let you know that "*Thar be dragons*" in Devicetree. However,
in most cases, the hard work has already been done for us. Much of the DT work
needed by application developers is turning on/off peripherals, telling Zephyr
about sensors and other devices connected to the MCU, and mapping I/O.

Let's jump in by using Devicetree to add an LED to an application.

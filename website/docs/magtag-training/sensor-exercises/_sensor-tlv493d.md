---
sidebar_position: 3
---

# Using Sensors without Zephyr Drivers

The TLV493D magnetometer does not have a Zephyr driver. But it is an i2c device and we just communicated with one of those in the last example. In this section, you can choose your own adventure by declaring the i2c bus in the devicetree, and talking to this sensor directly by using i2c commands.

## Connecting the Sensor

:::note
This exercise is still under development. You will find some breadcrumbs here to get you started, but at this time we do not have a fully guided experience for the TLV493D.
:::

Connect the sensor with the QWiic cable as you did in the previous sensor example. This places it on IO33 and IO34 of the MagTag. We can set those pins, and give our i2c bus an alias using an overlay file:

```js esp32s2_saola.overlay
/ {
    aliases {
        magtagi2c = &i2c1;
    };
};

&i2c1 {
	sda-pin = <33>;
	scl-pin = <34>;
	status = "okay";
};
```

## Enable i2c via Kconfig

We need to tell Zephyr to build in the i2c drivers by adding this Kconfig directive to the `prj.conf` file:

```js
CONFIG_I2C=y
```

## Pull in the i2c bus from devicetree

In the `main.c` file, we can pull in the i2c bus using the devicetree alias. We can then configure the device, and read/write to it using [the Zephyr i2c API](https://docs.zephyrproject.org/latest/hardware/peripherals/i2c.html).

Here is an example main function. It builds and runs, but currently only returns 0 for each reading. This may be an issue with this example code (wrong i2c address, incorret initialization, etc), or a failure to properly initialize the sensor. Please consider this a starting point and see if you can get it working. If you figure it out, pull requests are always welcome! 

```c main.c
#include <zephyr.h>
#include <device.h>
#include <stdlib.h>
#include <drivers/i2c.h>



void main(void)
{
	printk("Hello TLV493D\n");
	
	uint8_t buf[4] = {0};
	const struct device *i2c_dev = DEVICE_DT_GET(DT_ALIAS(magtagi2c));

	i2c_configure(i2c_dev, I2C_SPEED_SET(I2C_SPEED_STANDARD) | I2C_MODE_MASTER);
	if (!i2c_dev)
	{
		printk("Cannot get I2C device\n");
		return;
	}

	buf[0] = 0x00;
	int ret = i2c_write(i2c_dev, buf, 1, 0x5E);
	if (ret) {
		printk("Error resetting sensor: %d\n", ret);
	}


	while (1) {
		uint8_t buf[4] = {0};
		i2c_read(i2c_dev, buf, 4, 0x5E);
		printk("Sensor: %x, %x, %x, %x\n", buf[0], buf[1], buf[2], buf[3]);

		k_sleep(K_MSEC(1000));
	}
}
```

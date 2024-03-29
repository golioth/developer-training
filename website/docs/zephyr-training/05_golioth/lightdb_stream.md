---
sidebar_position: 3
description:
    Send time series data with Golioth LightDB Stream
---

import HowToDownload from '/docs/\_partials/download-from-codespaces.md'
import FirmwareFlash from '/docs/\_partials/flash-the-example-nrf.md'

# Use Golioth LightDB Stream to Send Data

## Learning objectives

With a Golioth client added to our C code, we can send data using the LightDB
Stream API calls.

* **Desired outcome(s)**
  1. Send time-series data to Golioth
* **Time Estimate:** 10 minutes

## Exercise: Send the counter value to LightDB Stream

The sample code includes a counter in the main loop that is printing out
messages every second. Let's pretend this counter is sensor data and report it
to Golioth using LightDB Stream. This is a time-series database that will record
each reading along with a timestamp for when it was received.

## Send integer value to LightDB Stream

We'll use an asynchronous call to send the counter data to Golioth so it doesn't
block our main function.

:::tip

You may want to use either the Doxygen or LightDB Sample code as reference for
this exercise:

* [Golioth Firmware SDK
  Doxygen](https://firmware-sdk-docs.golioth.io/group__golioth__stream.html)
* [Golioth LightDB Stream
  Sample](https://github.com/golioth/golioth-firmware-sdk/tree/main/examples/zephyr/lightdb_stream)

:::

* In the `main()` function of `05_golioth/src/main.c`:

    1. Add the header file for Stream data: `CONFIG_GOLIOTH_STREAM=y`
    2. In the `main()` function:
        1. Add a `golioth_stream_set_int_async()` function call to the main loop
        2. Use `"sensor"` as the endpoint
        3. Use `counter` as the payload
        4. We'll use `NULL` as the callback for this example

* In the '05_golioth/prj.conf' file:

    1. Add the Kconfig symbol for Stream data: `CONFIG_GOLIOTH_STREAM=y`

<details>
    <summary>Click to reveal the solution</summary>

Excerpts from `main.c`:

```c
// highlight-next-line
#include <golioth/stream.h>
```

```c
	int counter = 0;

	while (1) {
		printk("This is the main loop: %d\n", counter);

		snprintk(sbuf, sizeof(sbuf), "{\"counter\":%d}", counter);

        // highlight-start
		golioth_stream_set_int_async(client,
					     "sensor/counter",
					     counter,
					     NULL,
					     NULL);
        // highlight-end

		++counter;
		k_msleep(SLEEP_TIME_MS);
	}
```

:::tip

This code ignores some best practices in favor of reduced complexity. When using
this function call in production, we recommend the following:

* Check the `int` returned by all Golioth function calls for a non-zero error
  number
* Use a callback function to handle errors and timeouts

Both of these are demonstrated in the [Golioth LightDB Stream
Sample](https://github.com/golioth/golioth-zephyr-sdk/blob/main/samples/lightdb_stream/src/main.c)

:::

</details>

### Build in the Codespaces container

1. Build the example

    * Make sure the terminal at the bottom of the VS Code window is in the
      `/zephyr-traininig/app` folder
    * Run the following code to build the `05_golioth` app

        ```bash
        # for nRF7002
        west build -b nrf7002dk_nrf5340_cpuapp 05_golioth

        # for nRF9160
        west build -b nrf9160dk_nrf9160_ns 05_golioth
        ```

2. Download the binary

    <HowToDownload/>

### Update device firmware from your local machine

<FirmwareFlash/>

## Expected results

Counter data from your device should now be streaming to Golioth. To see it,
select your device in the [Golioth web console](https://console.golioth.io), and
click on the `LightDB Stream` tab.

![LightDB Stream data viewed on the Golioth
Console](./assets/lightdb-stream-counter.png)

:::tip

The "Erase & write" operation in the firmware programming steps may have wiped
out the settings partition containing the Golioth credentials. If your device is
not connecting to Golioth, you can check the stored PSK-ID setting by issuing
the `settings get golioth/psk-id` command in the serial shell.

Instructions for setting device credentials are available in the [Connect
Hardware to Golioth](/docs/golioth-exploration/golioth-intro/hardware-setup)
section.

:::

## Additional Exercises

1. Convert the `printk()` messages in the main loop to logging messages
2. Turn on Golioth remote logging for this app by adding the
   `CONFIG_LOG_BACKEND_GOLIOTH=y` Kconfig symbol to the build.
    * Rebuild and flash the firmware to verify logs are no longer sent to the
      servers


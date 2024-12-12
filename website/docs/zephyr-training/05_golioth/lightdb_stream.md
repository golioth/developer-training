---
sidebar_position: 3
description:
    Send time series data with Golioth LightDB Stream
---

import HowToDownload from '/docs/\_partials/download-from-codespaces.md'
import FirmwareFlash from '/docs/\_partials/flash-the-example-nrf.md'

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

* In the `05_golioth/prj.conf` file:

    1. Add the Kconfig symbol for Stream data: `CONFIG_GOLIOTH_STREAM=y`

* In `05_golioth/src/main.c` file:

    1. Add the header file for Stream data: `#include <golioth/stream.h>`
    2. In the `main()` function:
        1. Prepare a char array and create a JSON string in it
            1. Use `"upcount"` as the key
            2. Use `counter` as the value
        2. Add a `golioth_stream_set_async()` function call to the main loop
            1. Use `"sensor"` as the endpoint
            2. Use `GOLIOTH_CONTENT_TYPE_JSON` as the content type
            3. Use your char array as the buffer
            4. Use the `strlen()` your char array as the buffer length
            5. We'll use `NULL` as the callback for this example
            6. We'll use `NULL` as the callback argument

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

        // highlight-start
		char sbuf[32];
		snprintk(sbuf, strlen(sbuf), "{\"upcount\":%d}", counter);

		golioth_stream_set_async(client,
					 "sensor",
					 GOLIOTH_CONTENT_TYPE_JSON,
					 sbuf,
					 strlen(sbuf),
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

        <Tabs
        groupId="devboard"
        defaultValue="nrf7002dk"
        values={[
        {label: 'nRF7002 DK', value: 'nrf7002dk'},
        {label: 'nRF9160 DK', value: 'nrf9160dk'},
        ]}>

        <TabItem value="nrf7002dk">

            ```bash
            west build -b nrf7002dk/nrf5340/cpuapp 05_golioth
            ```

        </TabItem>
        <TabItem value="nrf9160dk">

            ```bash
            west build -b nrf9160dk/nrf9160/ns 05_golioth
            ```

        </TabItem>
        </Tabs>

2. Download the binary

    <HowToDownload/>

### Update device firmware from your local machine

<FirmwareFlash/>

### Add a Pipeline to route JSON data

Buy default, the pipeline in a new Golioth project expects to receive CBOR data,
but the firmware we're using sends data in JSON format. Let's add a new pipeline
that routes JSON data to LightDB Stream.

1. Click the `Pipelines` entry in the left sidebar of the [Golioth
   console](https://console.golioth.io).
2. Click the `Create` button in the upper right of the Pipelines windows.
3. Rename the pipeline.
4. Change the `content_type` in the `filter` node to `application/json`.
5. Remove the `transformer` from `step0`.
6. Use the slider to enable this pipeline and click `Create`.

<details>
    <summary>Click to reveal the solution</summary>

Pipeline to route all JSON-formatted device stream data to LightDB Stream

```yaml
filter:
  path: "*"
  content_type: application/json
steps:
  - name: step0
    destination:
      type: lightdb-stream
      version: v1
```

</details>

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
Hardware to Golioth](/golioth-exploration/golioth-intro/hardware-setup) section.

:::

## Additional Exercises

1. Convert the `printk()` messages in the main loop to logging messages
2. Turn on Golioth remote logging for this app by adding the
   `CONFIG_LOG_BACKEND_GOLIOTH=y` Kconfig symbol to the build.
    * Rebuild and flash the firmware to verify logs are no longer sent to the
      servers


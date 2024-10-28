---
sidebar_position: 2
description:
    Add Golioth Kconfig options and create Golioth Client
---

# Golioth Kconfig Options and Client Creation

## Learning objectives

Now that the Golioth Firmware SDK has been added to your Zephyr installation we
are ready to start using it. As with all Zephyr libraries, we need to first
enable Golioth using some Kconfig symbols. Then we create the Golioth Client to
handle all things Golioth.

* **Desired outcome(s)**
  1. Understand how to enable Kconfig symbols required by the Golioth SDK
  2. Add a Golioth client to main.c
* **Time Estimate:** 5 minutes

:::note

Your application is responsible for establishing a network connection before
trying to connect to Golioth. This is already set up in the `05_golioth`
example.

:::

## Kconfig symbols required by Golioth

There is one Kconfig symbol required to enable the Golioth Zephyr SDK.

```kconfig
CONFIG_GOLIOTH_FIRMWARE_SDK=y
```

When enabled, your application should select dependency configuration values
that match your needs. In our case, we're using some "boiler plate" values that
will work for most simple demo apps:

```kconfig
# Configure Golioth SDK dependencies
CONFIG_EVENTFD_MAX=14
CONFIG_LOG_PROCESS_THREAD_STACK_SIZE=1536
CONFIG_MBEDTLS_ENABLE_HEAP=y
CONFIG_MBEDTLS_HEAP_SIZE=10240
CONFIG_MBEDTLS_SSL_IN_CONTENT_LEN=2048
CONFIG_MBEDTLS_SSL_OUT_CONTENT_LEN=2048
CONFIG_NETWORKING=y
CONFIG_NET_IPV4=y
CONFIG_POSIX_MAX_FDS=23
```

These will immediately allow you to connect to Golioth, however each Golioth
service must be individually enabled. This helps conserve device resources by
only including what you need in the firmware build. Here is an example of the
Kconfig symbols used for our services:

```
# Enable OTA firmware update
CONFIG_GOLIOTH_FW_UPDATE=y

# Enable stateful data
CONFIG_GOLIOTH_LIGHTDB_STATE=y

# Enable sending log messages to the Golioth cloud
CONFIG_LOG_BACKEND_GOLIOTH=y

# Enable remote procedure call
CONFIG_GOLIOTH_RPC=y

# Enable fleet-wide device settings
CONFIG_GOLIOTH_SETTINGS=y

# Enable time-series data
CONFIG_GOLIOTH_STREAM=y
```

Generally speaking, see [the Golioth Zephyr
samples](https://github.com/golioth/golioth-zephyr-sdk/tree/main/samples) for
information on enabling services.

<details>
    <summary>Explain the Golioth Kconfig symbols present in the 05_golioth sample code</summary>

Some Golioth Kconfig symbols are already enabled [in the `prj.conf` file of the
`05_golioth`
application](https://github.com/golioth/zephyr-training/blob/main/05_golioth/prj.conf)
we're working with in this module.

* We use the [Golioth common
  library](https://github.com/golioth/golioth-firmware-sdk/tree/main/examples/zephyr/common)
  for credential and connection management

    ```
    CONFIG_GOLIOTH_SAMPLE_COMMON=y
    ```

* These symbols enable [Golioth runtime
  settings](https://github.com/golioth/golioth-firmware-sdk/blob/main/examples/zephyr/hello/README.md#psk-based-auth---runtime)
  so that WiFi and Golioth credentials can be stored in the settings partition
  from the shell

    ```
    # Runtime credentials
    CONFIG_SETTINGS=y
    CONFIG_SETTINGS_RUNTIME=y
    CONFIG_GOLIOTH_SAMPLE_HARDCODED_CREDENTIALS=n
    CONFIG_GOLIOTH_SAMPLE_PSK_SETTINGS=y
    CONFIG_GOLIOTH_SAMPLE_SETTINGS_AUTOLOAD=y
    CONFIG_GOLIOTH_SAMPLE_SETTINGS_SHELL=y

    CONFIG_FLASH=y
    CONFIG_FLASH_MAP=y
    CONFIG_NVS=y

    CONFIG_SHELL=y
    ```

</details>

## Exercise: Create a Golioth Client in main.c

With the Kconfig symbols selected, it's time to start using some Golioth device
API calls in our C code.

### Set up the client and callback

Add the following code to the `05_golioth/src/main.c` file:

```c
#include <golioth/client.h>

static struct golioth_client *client;
static K_SEM_DEFINE(connected, 0, 1);

static void on_client_event(struct golioth_client *client,
			    enum golioth_client_event event,
			    void *arg)
{
	bool is_connected = (event == GOLIOTH_CLIENT_EVENT_CONNECTED);

	if (is_connected) {
		k_sem_give(&connected);
	}
	LOG_INF("Golioth client %s", is_connected ? "connected" : "disconnected");
}
```

Here's what's happening in this block:

1. Include the Golioth System Client at the top of the file
2. Create a pointer to a `golioth_client` instance
3. Create a semaphore to block until a connection with Golioth is established
4. Create a callback that will be used when we connect to Golioth
    * This callback will unblock the semaphore, allowing program execution to
      continue

### Register callback and start client

Finally, add this code in your `main()` function, after the network connection
function calls, but before the loop:

```c
/* Get golioth_client_config filled with PSK-ID/PSK credentials
 * using Golioth common Library */
const struct golioth_client_config *client_config = golioth_sample_credentials_get();

/* Use golioth_client_config to create the Golioth client */
client = golioth_client_create(client_config);

/* Register a callback to run when we connect to Golioth */
golioth_client_register_event_callback(client, on_client_event, NULL);

/* Block program flow until connection is ready */
k_sem_take(&connected, K_FOREVER);
```

This block serves the following purpose:

1. Get the stored credentials
2. Create the Golioth client
3. Register a callback so we can do things when first connected to Golioth
4. Block program execution until the connection is established

:::tip

The Golioth client runs on its own thread. Since we cannot send or receive
anything from Golioth until a connection is established, it makes sense for
simple demo code to block program flow until that point. In production, you may
want to adopt a different approach that allows other parts of your application
to run while waiting for a connection.

:::

### More information on credentials

This example uses a helper function to get the runtime credentials and use them
when creating the Golioth client. But the Golioth client is designed to make
this step configurable. You may be using credentials stored in a secure
keystore, or loaded in from a storage location of your choosing. Here are a few
examples of different golioth_client_config structs:

```c
/* Config for Certificate authentication */
struct golioth_client_config client_config = {
    .credentials =
        {
            .auth_type = GOLIOTH_TLS_AUTH_TYPE_PKI,
            .pki =
                {
                    .ca_cert = tls_ca_crt,
                    .ca_cert_len = sizeof(tls_ca_crt),
                    .public_cert = tls_client_crt,
                    .public_cert_len = tls_client_crt_len,
                    .private_key = tls_client_key,
                    .private_key_len = tls_client_key_len,
                },
        },
};

/* Config for PSK authentication */
struct golioth_client_config client_config = {
    .credentials =
        {
            .auth_type = GOLIOTH_TLS_AUTH_TYPE_PSK,
            .psk =
                {
                    .psk_id = client_psk_id,
                    .psk_id_len = client_psk_id_len,
                    .psk = client_psk,
                    .psk_len = client_psk_len,
                },
        },
};

/* Config for credential tag authentication */
struct golioth_client_config client_config = {
    .credentials =
        {
            .auth_type = GOLIOTH_TLS_AUTH_TYPE_TAG,
            .tag = YOUR_CREDENTIALS_TAG,
        },
};
```

## Expected results

You have added Golioth to your application. The code will build and attempt to
establish a connection to Golioth, but beyond that we haven't used any of the
Golioth services. In the next section we'll send data to Golioth using the
LightDB Steam.

<details>
    <summary>Click to reveal solution</summary>

Here is an excerpt from `main.c` that includes the added code from this section:
```c
/* There are existing file contents above this line that aren't shown */
/*   - additions you should have made are highlighted below           */

// highlight-start
#include <golioth/client.h>
static struct golioth_client *client;
static K_SEM_DEFINE(connected, 0, 1);

static void on_client_event(struct golioth_client *client,
			    enum golioth_client_event event,
			    void *arg)
{
	bool is_connected = (event == GOLIOTH_CLIENT_EVENT_CONNECTED);

	if (is_connected) {
		k_sem_give(&connected);
	}
	LOG_INF("Golioth client %s", is_connected ? "connected" : "disconnected");
}
// highlight-end

/* Main function */
int main(void)
{
	int ret;

	if (!device_is_ready(led1.port)) {
		return -EIO;
	}

	ret = gpio_pin_configure_dt(&led1, GPIO_OUTPUT_ACTIVE);
	if (ret < 0) {
		return -EIO;
	}

	/* Start timer-based LED blinker */
	k_timer_start(&my_timer, K_MSEC(200), K_MSEC(200));

	/* Start network connection (if necessary) */
	net_connect();

    // highlight-start
	const struct golioth_client_config *client_config = golioth_sample_credentials_get();
	client = golioth_client_create(client_config);
	golioth_client_register_event_callback(client, on_client_event, NULL);
	k_sem_take(&connected, K_FOREVER);
    // highlight-end

	int counter = 0;

	while (1) {
		printk("This is the main loop: %d\n", counter);
		++counter;
		k_msleep(SLEEP_TIME_MS);
	}
}
```

</details>

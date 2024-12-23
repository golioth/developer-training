---
sidebar_position: 2
description: "Zephyr can blink with timers!"
---

import HowToDownload from '/docs/\_partials/download-from-codespaces.md'
import FirmwareFlash from '/docs/\_partials/flash-the-example-nrf.md'

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Blink Using Timers

## Learning Objectives

When you made the LED blink in the previous module, it was using a sleep
function in the main loop. In this module we'll explore how to use a timer to
blink the LED instead. One benefit of using a Real Time Operating System (RTOS)
like Zephyr is that it will take care of scheduling for you. In this exercise
you will use Zephyr's Timers API to blink the LED for you.

* **Desired outcome(s)**
    1. Understand how to blink an LED using a timer in the RTOS
* **Time Estimate:** 5 minutes

## Exercise: Blink Using a Timer

### Setting up a timer

Timers are easy to use in Zephyr. There are just three things we need to do:

* Make a callback function that will run when the timer expires
* Define the timer
* Start the timer

In the `04_blinkRTOS/src/main.c` file:

1. Create a new function just above `main` to act as the timer callback
    * Function should be marked `static` and return `void`
    * Function parameter should be `struct k_timer *dummy` (yes, dummy variables are notated as 'dummy'!)
    * Move the LED toggle function call out of the main loop and into your new
      function
      * Do not use a `k_sleep()` in this timer function, it should return after
        toggling the LED
2. Define your timer just after your new function:

    ```c
    K_TIMER_DEFINE(my_timer, my_timer_handler, NULL);
    ```
  For more info on what we're passing in these functions, see the [Zephyr API docs on timers](https://docs.zephyrproject.org/apidoc/latest/group__timer__apis.html)

3. In `main`, before the `while` loop begins, start your timer:

    ```c
    k_timer_start(&my_timer, K_MSEC(200), K_MSEC(200));
    ```

<details>
    <summary>Click to reveal the expected main.c file</summary>

```c excerpts from main.c
static void my_timer_handler(struct k_timer *dummy) {
	gpio_pin_toggle_dt(&led);
}

K_TIMER_DEFINE(my_timer, my_timer_handler, NULL);

void main(void)
{
	int ret;

	if (!device_is_ready(led.port)) {
		return;
	}

	ret = gpio_pin_configure_dt(&led, GPIO_OUTPUT_ACTIVE);
	if (ret < 0) {
		return;
	}

	k_timer_start(&my_timer, K_MSEC(200), K_MSEC(200));

	while (1) {
		k_msleep(SLEEP_TIME_MS);
	}
}
```

When starting the timer, there are two time values. The first is how long to
wait before the first timer expiry. The second is the time to wait before each
subsequent expiry. So you could wait `K_SECONDS(5)` at the beginning, and then
set the blink rate to `K_MSEC(500)`. You can also do a one-shot timer by setting
the second value to `K_NO_WAIT`.

</details>

### Build in the Codespaces container

1. Build the example

    * Make sure the terminal at the bottom of the VS Code window is in the
      `/zephyr-traininig/app` folder
    * Run the following code to build the `04_blinkRTOS` app

        <Tabs
        groupId="devboard"
        defaultValue="nrf7002dk"
        values={[
        {label: 'nRF7002 DK', value: 'nrf7002dk'},
        {label: 'nRF9160 DK', value: 'nrf9160dk'},
        ]}>

        <TabItem value="nrf7002dk">

            ```bash
            west build -b nrf7002dk/nrf5340/cpuapp 04_blinkRTOS
            ```

        </TabItem>
        <TabItem value="nrf9160dk">

            ```bash
            west build -b nrf9160dk/nrf9160/ns 04_blinkRTOS
            ```

        </TabItem>
        </Tabs>

2. Download the binary

    <HowToDownload/>

### Update device firmware from your local machine

<FirmwareFlash/>

## Expected outcome

Make sure the LED blinks as expected, then play around with different timer
values to see how they work.

For more information on Zephyr Timers, consult [the Timers
documentation](https://docs.zephyrproject.org/latest/kernel/services/timing/timers.html).

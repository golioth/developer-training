---
sidebar_position: 5
description: "Zephyr can blink with timers or threads!"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Try the RTOS

When you made the red LED blink, it was using a sleep function in the main loop. For actual embedded development this is almost never allowed, and timers are used instead. One benefit of using a Real Time Operating System (RTOS) like Zephyr is that it will take care of scheduling for you.

In this exercise you will use two different approaches to having the RTOS blink the red LED for you:

* Blink using a timer
* Blink using a dedicated thread

## Use the blinky-training example

For this exercise we'll use the code we ended up with in the [Blinking an LED](mapping-gpio.md) exercise.

```shell
cd ~/magtag-training
cp -r blinky-training rtos-training
cd ~/magtag-training/deps/modules/lib/golioth/samples/rtos-training
```

You shouldn't reuse the build directory from a different project. Let's remove it now to avoid build errors. It will be automatically regenerated.

```shell
rm -r build
```

You should already have a `boards` directory with the `esp32s2_saola.overlay` file inside it that sets up `led0`. We will not need to change anything in the devicetree.

## Blinking with a timer

Timers are easy to use in Zephyr. There are just three things we need to do:

* Make a callback function that will run when the timer expires
* Define the timer
* Start the timer

In the `src/main.c` file:

1. Create a new function just above `main` to act as the timer callback
    * Function should be marked extern and return `void`
    * Function parameter should be `struct k_timer *dummy`
    * Move the LED toggle function call out of the main loop and into your new function (you do not need the sleep function)
2. Define your timer just after your new function (replace `my_timer_handler` with the name of your function):

    ```c
    K_TIMER_DEFINE(my_timer, my_timer_handler, NULL);
    ```

3. In `main`, before the `while` loop begins, start your timer:

    ```c
    k_timer_start(&my_timer, K_SECONDS(1), K_SECONDS(1));
    ```

<details><summary>Click to reveal the expected main.c file</summary>

```c excerpts from main.c
void my_timer_handler(struct k_timer *dummy) {
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

	k_timer_start(&my_timer, K_SECONDS(1), K_SECONDS(1));

	while (1) {
		k_msleep(SLEEP_TIME_MS);
	}
}
```

When starting the timer, there are two time values. The first is how long to wait before the first timer expiry. The second is the the wait before each subsequent expiry. So you could wait `K_SECONDS(5)` at the beginning, and then set the blink rate to `K_MSEC(500)`. You can also do a one-shot timer by setting the second value to `K_NO_WAIT`.

</details>

### Build and flash the Timers example

```shell
west build -b esp32s2_saola . -p
west flash
```

Make sure the LED blinks as expected, then play around with different timer values to see how they work.

For more information on Zephyr Timers, consult [the Timers documentation](https://docs.zephyrproject.org/latest/kernel/services/timing/timers.html).

## Blinking as a thread

You can also blink the LED by giving it its own thread. Once started, the scheduler will monitor the thread, servicing it when needed, and returing to other tasks in between blinks. To use a thread, there are just three things we need to do:

* Make a function that will run as its own thread
* Define the thread
* Start the thread

In the `src/main.c` file:

1. Create a new function just above `main` to run as its own thread
    * Function should return `extern void`
    * Function should have three void pointers as parameters: `void *dummy1, void *dummy2, void *dummy3`
    * Place the LED toggle function in a loop inside your your new function. This works just like a `while` loop in `main` and needs to include a sleep command.

2. Define your thread just after your new function (replace `my_thread_handler` with the name of your function):

    ```c
    K_THREAD_DEFINE(my_thread, 1024,
					my_thread_handler, NULL, NULL, NULL,
					K_LOWEST_APPLICATION_THREAD_PRIO, 0, 0);
    ```

3. In `main`, before the `while` loop begins, start your thread:

    ```c
    k_thread_start(my_thread);
    ```

<details><summary>Click to reveal the expected main.c file</summary>

```c excerpts from main.c
static void my_thread_handler(void *dummy1, void *dummy2, void *dummy3) {
	while (1) {
		gpio_pin_toggle_dt(&led);
		k_sleep(K_SECONDS(1));
	}
}

K_THREAD_DEFINE(my_thread, 1024,
				my_thread_handler, NULL, NULL, NULL,
				K_LOWEST_APPLICATION_THREAD_PRIO, 0, 0);

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

	k_thread_start(my_thread);

	while (1) {
		k_sleep(K_SECONDS(1));
	}
}
```

When defining the thread, we told Zephyr the name we want to assign to the thread, the number of bytes to use for the thread's stack, the function to run whenever the thread is serviced, and the priority level.

</details>

### Build and flash the Threads example

```shell
west build -b esp32s2_saola . -p
west flash
```

Make sure the LED blinks as expected. Delving deeply into how these threads work is beyond the scope of this session. But an important lesson is that you **must** call a kernel sleep function from the main loop. Without it, the main thread will never yield time for your thread to run. Equally important is that your thread do something that yields back (usually a kernel sleep function) so that the scheduler can take over once again.

For more information on Zephyr Threads, consult [the Threads documentation](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html).

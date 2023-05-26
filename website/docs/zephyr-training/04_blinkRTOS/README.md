---
id: blink-rtos
description: |
  Blink an LED using features of the RTOS
---

# Using the RTOS

In this module we will blink the LED using two different RTOS approaches:

* **timer**: a timer uses the system clock to run a callback function after a
  specific amount of time has passed
* **thread**: using a thread is much like adding a second `main()` function to
  your application

In both cases, [the Scheduler of the Zephyr Real-Time Operating
System](https://docs.zephyrproject.org/latest/kernel/services/scheduling/index.html)
handles context switching between different operations to service your code
whenever needed.

You will learn:

* How to set up and use a timer
* How to set up and use a thread
* Understand how and why to yield time to the Scheduler
* How to view Thread stack usage

import DocCardList from '@theme/DocCardList';

<DocCardList />

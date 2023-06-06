---
id: remote-logging
description: |
  View device logs from the cloud
---

# Remote Logging

The Golioth Remote Logging service allows you to access log messages from
devices in your fleet.

To view the Remote Logging data for a device:

1. Click the `Devices` option in the left sidebar of [the Golioth
   Console](https://console.golioth.io)
2. Click on the device `Name` in the resulting list
3. Click on the `Logs` tab

![Golioth Remote Logging](./assets/remote-logging.jpg)

## Logs page overview

On this page you can view the following information:

* `Timestamp`: Time/Date at which the log was received
* `Level`: Standardized log level for this message (Error, Warning, Info, Debug)
* `Module`: The C file (or one of a group of C files) that generated the log message
* `Message`: The payload your code generated for this log
* Time selector: Historic logs can be accessed by choosing time/date from the time
  selection box
* Log level selector: Filter messages by log level
* Search tools: Search by message/metadata or module
* Refresh tools: Both manual and automatic refresh buttons are available for
  updating the logs being displayed

:::tip Controlling Log Traffic
Log messages are most useful when prototyping and troubleshooting. Customers
often choose to only send Error and Warning level messages by default, but
include a Remote Procedure Call (RPC) in their firmware to enable Debug level
messages when needed.
:::

## Viewing log messages from your fleet

The approach above shows log messages from a single device, but it is also
possible to view logs from your entire fleet:

1. Click the `Monitor` option in the left sidebar and select `Logs`
   from the list that unfolds

![Golioth Logging Monitor view](./assets/remote-logging-monitor.jpg)

Notice that in this view the `Device` column has been added, and there is now
an additional selector box to filter by device(s). It is also possible to export
Logs as `.csv` files.

## Additional Exercises

* Use the search box to find log messages issued by the Golioth SDK. These will
  be issued from the `golioth_system` module.

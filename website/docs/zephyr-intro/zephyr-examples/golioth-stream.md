---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CreateCredentials from '/docs/\_partials/create-credentials.md';
import HowToDownload from '/docs/\_partials/download-from-kasm.md'
import HowToFlash from '/docs/\_partials/flash-the-example-kasm.md'

# Golioth Stream Example

The Stream example sends accelerometer sensor data to the Golioth Cloud every
few seconds. Each JSON object receives a timestamp and is stored in a database
we refer to as LightDB stream.

## Learning Objectives

We want to understand time-series data and how to interact with it in Zephyr. 

### Desired outcome(s)
* See time-series data delivered to the Golioth cloud.
* Understand the APIs sending to the time series database.
* Try out the Settings Service.

### Time Estimate

* 10 minutes 

## Workflow

### Build in the KASM container

1. In the KASM container, go to your local copy of [the magtag-demo
   repository](https://github.com/golioth/magtag-demo).

    ```bash
    cd ~/magtag-training/app
    ```

2. Create a file for WiFi and Golioth credentials

  <CreateCredentials/>

3. Build the example, including the credentials file you just created

    ```bash
    west build -b esp32s2_saola stream -p
    ```

4. Download the binary

    * Run `getbin` to package the compiled code and make it available for download
    * Use the Download option in KASM's left sidebar to download `merged.bin` to your local machine.

  <HowToDownload/>

### Update MagTag firmware from your local machine

<HowToFlash/>

## Expected Results

The Stream example will begin running after pressing the Reset button. You will
see the center LEDs turn blue when the board is trying to connect to Golioth.
When successful, all four LEDs will turn green, a connected message will be
shown on the ePaper display, and sensor data will begin streaming to Golioth
each time the screen displays "sent accel data".

Sensor data can be viewed on [the Golioth Console](https://console.golioth.io/)

1. Select Monitor&rarr;Stream from the sidebar menu
2. Under "Query Response" use the time/date box and choose the `Last 4h` setting
3. To the right of the time/date box, choose the name of your device from the
   list
4. Click the circle arrow icon next to the Refresh button in the upper right to
   auto-refresh every 1 second
5. Use the green arrows in the "data" column to unfold the nested JSON objects
   for viewing

![Accelerometer data show in the Golioth Console LightDB stream view](../assets/golioth-stream-data.png)

This streaming data can be queried using the [Golioth REST
API](https://docs.golioth.io/reference/rest-api/overview), or accessed on a
number of different external platforms/services using our [Output
Streams](https://docs.golioth.io/cloud/output-streams). This allows timestamped
stream data to be graphed and visualized to meet your needs.

Golioth also includes a LightDB State for persistent, mutable data. We will look
at that feature in the next example.

### Settings Service: Change the frequency of readings

Imagine you have 100 sensors in the field and wanted to update the rate at which they take their readings. This demo is set up to take advantage of the Golioth Settings Service, which can update a setting for all devices in the fleet with a single click, or target them individually or in groups.

Navigate to your device on [the Golioth Console](https://console.golioth.io/)

1. Select Device Settings from the left sidebar
2. Click the Create button and set the key as `LOOP_DELAY_S`
3. Choose Integer for data type
4. Enter the desired delay between sensor readings (in seconds)

![Setting up the LightDB State endpoint](../assets/golioth-device-settings-service.png)

Your MagTag will immediately recognize the change and display a message.

Settings can be adjusted from the project, blueprint, or device level. Try
adjusting this value from the device-view Settings tab. Also notice that the state of the settings synchronization is reported in the summary page for your device.

### Continued Learning

The Query Builder found in the LightDB Stream view of the Golioth Console is a
powerful tool for visualizing your incoming data and for testing how the data
you collect will be used. You can see [our post on Query
Builder](https://blog.golioth.io/prototype-your-data-outputs-with-the-golioth-query-builder/)
to learn more about this feature.

## Challenge: Modifying Stream

* Find the source files for Stream. 
* Modify the JSON message going back to the Golioth cloud
* Recompile/reflash -- Try leaving off the `-p` command for a faster recompile.

### Questions:
1. What are the inputs to send data to the Stream API?
2. How do you format sensor data to send to the Stream API?

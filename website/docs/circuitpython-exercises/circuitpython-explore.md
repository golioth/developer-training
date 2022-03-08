---
sidebar_position: 8
---

# Exploring Golioth using the MagTag

## One button, 3 outputs

The light and sound aren't the only things happening when you press a button on the MagTag. There are three things we're looking at when you press a button:

* Logging message
* LightDB State Change
* LightDB Stream Event

## Logging Message

1. Check that your device is connecting 
2. Set up recurring checks of the logs
  * ![Refresh Settings](refresh_settings.png)

## LightDB State

1. Navigate to your device page
2. Open LightDB State "drawer"
3. Turn on "Refresh" every second, same as logs

## LightDB Stream

1. Navigate to the LightDB stream page
  * If you reach it on the sidebar, you might need to filter for the data you want
  * Navigate to the device page first and click on "LightDB Stream" to have it prefiltered for the device you're looking at\
2. Look at the output, including the format
  * Notice how the data is formatted
  * Click to expand each piece of data
  * Why do you think it's set up like that?
3. Set up Query Builder
  * The data you saw in step 2 has the default query builder settings
  ![Query builder before](query_builder_before.png)
  * We want to have a better way to visualize the time series data that is coming through
  ![Query builder after](query_builder_after.png)
  * How does it look different now?


## Discussion around the difference between these 3 data types

As a discussion among Developers, what are some of the differences you see in how this data is being processed. How might it be useful for your projects?
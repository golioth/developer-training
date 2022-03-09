---
sidebar_position: 3
---

# Data Visualization

## Overview

Collecting data with network connected devices is only one side of the IoT equation. You also need to be able to do something useful with that data and Golioth makes that a seamless experience through our REST API and Output Streams.

There is an Output Streams menu entry in the Golioth Console where you can connect your data to common cloud services like AWS SQS, Azure Event Hub, and GCP PubSub. Learn more about this from our [Output Streams blog post](https://blog.golioth.io/output-streams-are-the-firehose-of-data-to-your-chosen-platform/).

Webhooks are a one of the Output Streams and a great way to connect your data to visualization platforms. [Datacake](https://datacake.co/) is one example that has a matching integration for Golioth.

## Visualization example with Datacake

![Datacake dashboard showing data from a Golioth device](assets/datacake-golioth-dashboard.png)

This demonstration shows temperature, pressure, and humidity data from a BME280 sensor streaming data to Golioth and being displayed on a Datacake dashboard. Datacake has put together [a guide you can follow to replicate this with your own data](https://docs.datacake.de/integrations/golioth).

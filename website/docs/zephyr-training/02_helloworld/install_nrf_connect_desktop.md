---
id: nrf-connect-desktop
sidebar_position: 1
description: |
  Using Nordic's tools for programming and serial terminal
---

import InstallNrfConnect from '/docs/golioth-exploration/01-golioth-intro/\_partials/install_nrf_connect.md'
import UseNrfConnectSerial from '/docs/\_partials/connect-to-serial.md'

# Install Nordic's nRF Connect for Desktop

We are using Nordic's nRF Connect for Desktop tools to flash binaries to the
device and establish a serial connection with it.

:::tip Have You Already Done This Step?

If you completed the [**Intro to Golioth** module](/golioth-exploration)
then you have already installed these tools. Please move on to the next page.

:::

## Why Do I Need These Tools?

Our live Zephyr training uses a Codespaces container to host the build
environment. The good news is that the tools will already be set up for you. The
bad news is that Zephyr's `west flash` command that is commonly used to program
devices is not available because of USB sharing issues between the browser-based
Codespaces and your computer.

The solution to this issue is to download your compiled application binary from
the Codespaces container, and flash it to the device using Nordic's desktop
tools on your local machine.

## Installation

On your local machine, follow these installation instructions:

### Get nRF Connect for Desktop and install the Programmer App

<InstallNrfConnect/>

### Install the nRF Connect for Desktop Serial App

<UseNrfConnectSerial/>

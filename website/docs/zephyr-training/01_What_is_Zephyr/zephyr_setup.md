---
sidebar_position: 1
description:
    Learn about setting up a Zephyr development environment
---

# About the Zephyr Dev Environment

We will not be setting up the Zephyr development environment today. Due to
differences in operating systems (and quirks between different installs of the
same OS), setting up the development tools takes a bit of time. Instead, we have
set up a pre-configured build environment you can access in your browser called
Codespaces.

:::tip Setup after training

After the training is over you will need a local install to continue working
with Zephyr. You can follow [Golioth's Zephyr setup guide for the
nRF9160](https://docs.golioth.io/hardware/nrf91/zephyr-quickstart/set-up-zephyr)
which will work for all Nordic devices.

:::

## What is Codespaces?

[GitHub Codespaces a container-based build system in a
browser](https://github.com/features/codespaces). For this training we have
preconfigured Codespaces with Golioth tools and the Zephyr toolchain so
that you can build Zephyr projects without first installing the tools on your
local machine.

We believe this is the fastest way to get new developers building Zephyr
projects and interacting with Golioth. You should be able to build a Zephyr +
Golioth project almost immediately after entering the development environment.

| ![Codespaces](./assets/codespaces-ncs.png) |
|:--:|
| We use GitHub Codespaces to load a Linux-based build environment in your browser, complete with VS Code and all the Zephyr tools you need. |

## Using the Command Line

Golioth training expects that commands will be run from the command line.
Codespaces uses VS Code as a code editor, so we can run our build commands from
the terminal inside of VS Code.

:::tip

While Nordic includes tools for building Zephyr projects in VScode, they miss
out on some of the benefits of the `west` meta tool. To explore this part of
Zephyr, its worth using the command line today.

:::

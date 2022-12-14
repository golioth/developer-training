---
sidebar_position: 99
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Install Zephyr on Your Local Machine

The Kasm containers make it easy to start training because the Zephyr workspace
is pre-installed and ready to use. But what do you do when you get home and want
to give Zephyr another try?

Here are some options for installing a local version of Zephyr.

:::tip Install the Zephyr SDK

In all cases, you must have the Zephyr SDK bundle installed. If you have not yet
done so, please [use this section of the Zephyr getting-started
guide](https://docs.zephyrproject.org/latest/develop/getting_started/index.html#install-zephyr-sdk)
before continuing with the steps below.

:::

* Option A: [Use the MagTag repo as a Zephyr installation](#magtag-zephyr)
* Option B: [Follow the Golioth Quickstart to install Zephyr](#golioth-zephyr)
* Option C: [Follow the Zephyr Getting Started Guide to install Zephyr](#standard-zephyr)


## Option A: The magtag-demo repository as a Zephyr install {#magtag-zephyr}

At Golioth, we like to add a west manifest file (`west.yml`) to each of our
project repositories. This file locks the project to a specific version of
Zephyr, Golioth, and all of the dependencies, and makes it easy to install them.
If you want to do more work with the MagTag, here's how to install those tools.

### 1. Create a Python virtual environment in the working folder

<Tabs
groupId="os"
defaultValue="linux"
values={[
{label: 'Linux', value: 'linux'},
{label: 'MacOS', value: 'macos'},
{label: 'Windows', value: 'windows'},
]}>
<TabItem value="linux">

```c
cd ~
mkdir magtag-demo
python3 -m venv magtag-demo/.venv
source magtag-demo/.venv/bin/activate
pip install wheel
pip install west
```

:::tip Reactivating the virtual environment

Each time you start a new terminal session you need to enable the Python virtual
environment:

```shell
cd ~/magtag-demo
source .venv/bin/activate
cd app
```

:::

</TabItem>
<TabItem value="macos">

```c
cd ~
mkdir magtag-demo
python3 -m venv magtag-demo/.venv
source magtag-demo/.venv/bin/activate
pip install wheel
pip install west
```

:::tip Reactivating the virtual environment

Each time you start a new terminal session you need to enable the Python virtual
environment:

```shell
cd ~/magtag-demo
source .venv/bin/activate
cd app
```

:::

</TabItem>
<TabItem value="windows">

```shell
cd %homepath%
mkdir magtag-demo
python -m venv magtag-demo\.venv
magtag-demo\.venv\Scripts\activate.bat
pip install west
```

:::tip Reactivating the virtual environment

Each time you start a new terminal session you need to enable the Python virtual
environment:

```shell
cd %homepath%\magtag-demo
.venv\Scripts\activate.bat
cd app
```

:::

</TabItem>
</Tabs>

### 2. Clone and Install

It is important that you do not use `git` to clone the repository. Zephyr's `west`
meta tool will take care of fetching all of the code.

<Tabs
groupId="os"
defaultValue="linux"
values={[
{label: 'Linux', value: 'linux'},
{label: 'MacOS', value: 'macos'},
{label: 'Windows', value: 'windows'},
]}>
<TabItem value="linux">

```c
cd ~
west init -m https://github.com/golioth/magtag-demo.git magtag-demo
cd magtag-demo
west update
west zephyr-export
pip install -r ~/magtag-demo/deps/zephyr/scripts/requirements.txt
west blobs fetch hal_espressif
```

</TabItem>
<TabItem value="macos">

```c
cd ~
west init -m https://github.com/golioth/magtag-demo.git magtag-demo
cd magtag-demo
west update
west zephyr-export
pip install -r ~/magtag-demo/deps/zephyr/scripts/requirements.txt
west blobs fetch hal_espressif
```

</TabItem>
<TabItem value="windows">

```c
cd %homepath%
west init -m https://github.com/golioth/magtag-demo.git magtag-demo
cd magtag-demo
west update
west zephyr-export
pip install -r deps\zephyr\scripts\requirements.txt
west blobs fetch hal_espressif
```

</TabItem>
</Tabs>

After fetching the code, the `west update` command installs necessary modules,
followed by steps to install Python dependencies and the binary blobs for
Espressif's WiFi radio.

### 3. Install the Zephyr SDK Toolchain

Up to this point we've been installing a standalone workspace inside the
magtag-demo directory. The final piece of the puzzle is to install the Zephyr
SDK Toolchain. You only need one copy of these tools on your machine so if
you've previously installed them you may skip this section.

import InstallZephyrSDKtoolchain from './\_partials/install-zephyr-sdk-toolchain.md'

<InstallZephyrSDKtoolchain/>

### Recap

You have now installed a local Zephyr workspace. Be sure to activate your Python
virtual environment each time you start a new coding session, and build the
samples from the magtag-demo/app folder.

## Option B: Follow the Golioth Quickstart to install a Zephyr workspace {#golioth-zephyr}

The official [Golioth Docs](https://docs.golioth.io) include details about [installing a Zephyr
workspace](https://docs.golioth.io/hardware/esp32/zephyr-quickstart/set-up-zephyr).
This workspace will also be able to build for other supported hardware like NXP.
To build Zephyr projects for Nordic parts, please follow the [NCS-focused
installation
guide](https://docs.golioth.io/hardware/nrf91/zephyr-quickstart/set-up-zephyr).

## Option C: Follow the Zephyr Getting Started Guide {#standard-zephyr}

The Zephyr project maintains a [getting started
guide](https://docs.zephyrproject.org/latest/develop/getting_started/index.html)
for setting up a local Zephyr workspace. Note that Golioth is a module for
Zephyr and if you follow this guide you will need to manually add Golioth to the
west manifest file. For more, please see [our blog post on adding Golioth to
existing Zephyr
projects](https://blog.golioth.io/how-to-add-golioth-to-an-existing-zephyr-project/).


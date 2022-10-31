---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Zephyr Toolchain Installation

This page includes sections from [the Golioth docs site](https://docs.golioth.io/) that walk through the installation of the SDKs and Toolchains necessary to build Zephyr firmware.

## Overview

* **Summary:**
  1. Install `west` (the Zephyr meta tool), the Golioth Zephyr SDK, and the Espressif (ESP32) toolchain.
  2. Clone the [magtag-demo](https://github.com/golioth/magtag-demo) code repository that will be used for this training
* **Desired Outcome:** By the end of this section you will have the software tools you need to build Zephyr projects and flash binaries to the MagTag board.
* **Approximate time:** 15-20 minutes

<Tabs
groupId="os"
defaultValue="inperson"
values={[
{label: 'In-Person', value: 'inperson'},
{label: 'Virtual', value: 'virtual'},
]}>

<TabItem value="inperson">

## Download Locally Hosted Packages

Internet speeds can be a problem for installing software tools at live training. To help, we have locally-available downloads for the biggest packages.

### Step 1: Log onto our wireless router

  * SSID: golioth
  * password: training

### Step 2: Navigate to this URL in your browser

  * <http://golioth.routerlogin.net/shares/U/>

### Step 3: Download the two files related to your operating system

  * golioth_zds2022-XXXXXX &mdash; contains Zephyr SDK and Golioth SDK
  * zephyr-sdk-0.14.2_xxxxxx &mdash; contains the Zephyr SDK Toolchain

### Step 4: Disconnect your computer from our wireless router

:::caution
Please be certain you have disconnected as we're using a cellular connection for this router and high-bandwidth demands may disrupt the rest of the workshop.
:::

### Step 5: Uncompress the archives

<Tabs
groupId="os"
defaultValue="linux"
values={[
{label: 'Linux', value: 'linux'},
{label: 'MacOS', value: 'macos'},
{label: 'Windows', value: 'windows'},
]}>

<TabItem value="linux">

* Uncompress the `golioth-zds2022-LINUX.tar.gz` archive into your home folder. (All archived files are contained in a folder called `golioth-zephyr-workspace`)
* Uncompress the Zephyr SDK toolchain archive (`zephyr-sdk-0.14.2_linux-XXXXXXXX.tar.gz`) in your home directory (All archived files are contained in a folder called `zephyr-sdk-0.14.2`)

</TabItem>

<TabItem value="macos">

* Uncompress the `golioth-zds2022-MACOS.zip` archive into your home folder. (All archived files are contained in a folder called `golioth-zephyr-workspace`)
* Uncompress the Zephyr SDK toolchain archive (`zephyr-sdk-0.14.2_macos-XXXXXXXX.tar.gz`) in your home directory (All archived files are contained in a folder called `zephyr-sdk-0.14.2`)

</TabItem>

<TabItem value="windows">

* Uncompress the `golioth-zds2022-WINDOWS.zip` archive into your `c:\` directory. (All archived files are contained in a folder called `golioth-zephyr-workspace`)
* Uncompress the Zephyr SDK toolchain archive (`zephyr-sdk-0.14.2_windows-x86_64.zip`) in your home directory (All archived files are contained in a folder called `zephyr-sdk-0.14.2`)

</TabItem>
</Tabs>

## Install the Golioth Zephyr SDK

###  Step 1: Install West Meta Tool

import ZdsSetupZephyr from './_partials/setup-zephyr.md'

<ZdsSetupZephyr/>

### Step 2: Install Golioth Zephyr SDK

import ZdsInstallZephyrSDK from './_partials/zds2022-install-zephyr-sdk.md'

<ZdsInstallZephyrSDK/>

### Step 3:  Installing the Zephyr SDK Toolchain

import ZdsInstallZephyrSDKtoolchain from './_partials/zds2022-install-zephyr-sdk-toolchain.md'

<ZdsInstallZephyrSDKtoolchain/>

### Step 4:  Sample build

Your system is all set up and ready to start building & flashing with Zephyr. Verify by building a minimal sample:

<Tabs
groupId="os"
defaultValue="linux"
values={[
{label: 'Linux', value: 'linux'},
{label: 'MacOS', value: 'macos'},
{label: 'Windows', value: 'windows'},
]}>

<TabItem value="linux">

```shell
cd ~/golioth-zephyr-workspace/zephyr
west build -b esp32 samples/basic/minimal -p
```

</TabItem>
<TabItem value="macos">

```shell
cd ~/golioth-zephyr-workspace/zephyr
west build -b esp32 samples/basic/minimal -p
```

</TabItem>
<TabItem value="windows">

Verify by building a minimal sample:

  ```shell
  cd C:\golioth-zephyr-workspace\zephyr
  west build -b esp32 samples\basic\minimal -p
  ```

</TabItem>
</Tabs>

## The magtag-demo repository

For the rest of this tutorial we will use the [magtag-demo](https://github.com/golioth/magtag-demo) code repository. This repo was already included in the SDK local download and can be found in the `golioth-zephyr-sdk/modules/lib/golioth/samples/magtag-demo` directory.

</TabItem>
<TabItem value="virtual">

## Install the Golioth Zephyr SDK

### Install West

import SetupZephyr from './_partials/setup-zephyr.md'

<SetupZephyr/>

### Install Golioth Zephyr SDK

import InstallZephyrSDK from './_partials/install-zephyr-sdk.md'

<InstallZephyrSDK/>

### Installing the Zephyr SDK Toolchain

import InstallZephyrSDKtoolchain from './_partials/install-zephyr-sdk-toolchain.md'

<InstallZephyrSDKtoolchain/>

### Install the Espressif (ESP32) submodules

import InstallEspressifToolchain from './_partials/install-espressif-toolchain.md'

<InstallEspressifToolchain />

### Sample build

Your system is all set up and ready to start building & flashing with Zephyr. Verify by building a minimal sample:

<Tabs
groupId="os"
defaultValue="linux"
values={[
{label: 'Linux', value: 'linux'},
{label: 'MacOS', value: 'macos'},
{label: 'Windows', value: 'windows'},
]}>

<TabItem value="linux">

```shell
cd ~/golioth-zephyr-workspace/zephyr
west build -b esp32 samples/basic/minimal -p
```

</TabItem>
<TabItem value="macos">

```shell
cd ~/golioth-zephyr-workspace/zephyr
west build -b esp32 samples/basic/minimal -p
```

</TabItem>
<TabItem value="windows">

1. Verify by building a minimal sample:

    ```shell
    cd C:\golioth-zephyr-workspace\zephyr
    west build -b esp32 samples\basic\minimal -p
    ```

</TabItem>
</Tabs>

## Clone the magtag-demo repository

For the rest of this tutorial we will use the [magtag-demo](https://github.com/golioth/magtag-demo) code repository. Let's clone a local copy of it into the Golioth samples folder.

<Tabs
groupId="os"
defaultValue="linux"
values={[
{label: 'Linux/MacOS', value: 'linux'},
{label: 'Windows', value: 'windows'},
]}>

<TabItem value="linux">

```bash
cd ~/golioth-zephyr-workspace/modules/lib/golioth/samples
git clone https://github.com/golioth/magtag-demo.git
cd magtag-demo
```

</TabItem>
<TabItem value="windows">

```bash
cd C:\golioth-zephyr-workspace\modules\lib\golioth\samples
git clone https://github.com/golioth/magtag-demo.git
cd magtag-demo
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

## Conclusion

That was a lot of steps, thank you for your patience! With the toolchain now installed, we are ready to run some example code on the hardware.

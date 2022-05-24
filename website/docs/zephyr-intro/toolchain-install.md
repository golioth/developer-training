---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Zephyr Toolchain Installation

This section includes references to [the Golioth docs site](https://docs.golioth.io/). We are linking you there so you have the most up-to-date directions to install the Zephyr toolchain and ESP32 compiler. Once you have completed that section, you will come back to this page for further instructions.

## Overview

* **Summary:**
  1. Follow Golioth Docs to install `west` (the Zephyr meta tool), the Golioth Zephyr SDK, and the Espressif (ESP32) toolchain.
  2. Update the Zephyr version to ensure we have support fo the ESP32s2
  3. Clone the code repository that will be used for this training
* **Desired Outcome:** By the end of this section you will have the software tools you need to build Zephyr projects and flash binaries to the MagTag board.
* **Approximate time:** 15-20 minutes

## Install the Golioth Zephyr SDK

### Install West

import SetupZephyr from '/docs/partials/setup-zephyr.md'

<SetupZephyr/>

### Install Golioth Zephyr SDK

import InstallZephyrSDK from '/docs/partials/install-zephyr-sdk.md'

<InstallZephyrSDK/>

### Installing the Zephyr SDK Toolchain

import InstallZephyrSDKtoolchain from '/docs/partials/install-zephyr-sdk-toolchain.md'

<InstallZephyrSDKtoolchain/>

### Install the Espressif (ESP32) submodules

import InstallEspressifToolchain from '/docs/partials/install-espressif-toolchain.md'

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

## Conclusion

That was a lot of steps, thank you for your patience! With the toolchain now installed, we are ready to run some example code on the hardware.

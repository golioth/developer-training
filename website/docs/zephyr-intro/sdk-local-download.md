---
sidebar_position: 1.5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Special: Local File Download

Internet speeds can be a problem for installing software tools at live training. To help, we have locally-available downloads for the biggest packages.

## ZDS 2022

1. Log onto our wireless router

    * SSID: golioth
    * password: training

2. Navigate to this URL in your browser

    * <http://golioth.routerlogin.net/shares/U/>

3. Download the two files related to your operating system

    * golioth_zds2022-XXXXXX &mdash; contains Zephyr SDK and Golioth SDK
    * zephyr-sdk-0.14.2_xxxxxx &mdash; contains the Zephyr SDK Toolchain

4. Disconnect your computer from our wireless router

:::caution
Please be certain you have disconnected as we're using a cellular connection for this router and high-bandwidth demands may disrupt the rest of the workshop.
:::

5. Uncompress the archives

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

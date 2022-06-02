import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Download the [latest SDK installer](https://github.com/zephyrproject-rtos/sdk-ng/releases):

<Tabs
groupId="os"
defaultValue="linux"
values={[
{label: 'Linux', value: 'linux'},
{label: 'MacOS', value: 'macos'},
{label: 'Windows', value: 'windows'},
]}>
<TabItem value="linux">

In-person training: You should have already [downloaded the Zephyr SDK Toolchain from our local storage](docs/zephyr-intro/sdk-local-download.md) and unpacked it in your home directory.

Run the installer:

```console
cd ~/zephyr-sdk-0.14.2
./setup.sh
```

Answer `y` to both of the questions asked during the setup process.

Install udev rules, which allow you to flash most Zephyr boards as a regular user:

```console
sudo cp ~/zephyr-sdk-0.14.2/sysroots/x86_64-pokysdk-linux/usr/share/openocd/contrib/60-openocd.rules /etc/udev/rules.d/
sudo udevadm control --reload
```

</TabItem>
<TabItem value="macos">

In-person training: You should have already [downloaded the Zephyr SDK Toolchain from our local storage](docs/zephyr-intro/sdk-local-download.md) and unpacked it in your home directory.

Run the installer:

```console
cd ~/zephyr-sdk-0.14.2
./setup.sh
```

</TabItem>
<TabItem value="windows">

In-person training: You should have already [downloaded the Zephyr SDK Toolchain from our local storage](docs/zephyr-intro/sdk-local-download.md) and unzipped it in your `%HOMEPATH%` directory.

Run the installer:

```console
cd %HOMEPATH%\zephyr-sdk-0.14.2
setup.cmd
```

Answer `y` to both of the questions asked during the setup process.

</TabItem>
</Tabs>

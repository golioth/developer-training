import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
groupId="os"
defaultValue="linux"
values={[
{label: 'Linux', value: 'linux'},
{label: 'MacOS', value: 'macos'},
{label: 'Windows', value: 'windows'},
]}>
<TabItem value="linux">

You previously downloaded and unpacked the Zephyr SDK Toolchain, now run the installer:

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

You previously downloaded and unpacked the Zephyr SDK Toolchain, now run the installer:

```console
cd ~/zephyr-sdk-0.14.2
./setup.sh
```

</TabItem>
<TabItem value="windows">

You previously downloaded and unpacked the Zephyr SDK Toolchain, now run the installer:

```console
cd %HOMEPATH%\zephyr-sdk-0.14.2
setup.cmd
```

Answer `y` to both of the questions asked during the setup process.

</TabItem>
</Tabs>

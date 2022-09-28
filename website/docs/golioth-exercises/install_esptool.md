---
sidebar_position: 1
title: Install esptool on your local machine
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Learning Objectives

We are using `esptool.py` to interact with the MagTag hardware directly from your computer over the USB cable. Installing this tool will let you upload binaries directly to the device.

### Desired outcome(s)
* Be able to connect to the device using `esptool.py`
### Time Estimate
* This section should take approximately 1-2 minutes.

## Workflow

<Tabs
groupId="os"
defaultValue="linux"
values={[
{label: 'Linux/MacOS', value: 'linux'},
{label: 'Windows', value: 'windows'},
]}>

<TabItem value="linux">

Espressif has published [full instructions for installing
esptool](https://docs.espressif.com/projects/esptool/en/latest/esp32/installation.html). For Linux and Mac, run the following command:

```
pip3 install esptool
```

</TabItem>
<TabItem value="windows">

:::tip
If Python is not installed on your system, you can hit the Windows key,
type 'python', and the Windows store will launch. Install Python 3.10 before
moving onto the next step
:::

Espressif has published [full instructions for installing
esptool](https://docs.espressif.com/projects/esptool/en/latest/esp32/installation.html).
Click the Windows key, type 'cmd' and press enter to open the command prompt.
Then run the following command to install esptool:

```
pip3 install esptool
```

</TabItem>
</Tabs>

## Troubleshooting

<Tabs
groupId="os"
defaultValue="linux"
values={[
{label: 'Linux/MacOS', value: 'linux'},
{label: 'Windows', value: 'windows'},
]}>

<TabItem value="linux">

If you are unable to run `esptool.py` from the command line, you may need to add
the installed binary to your path:

```
PATH=$PATH:$HOME/.local/bin/
```

</TabItem>
<TabItem value="windows">

Run esptool on Windows by using the following command:
```
python -m esptool
```

In this training guide, all commands used to update firmware on the MagTag
include a set of Windows instructions using this approach.

</TabItem>
</Tabs>

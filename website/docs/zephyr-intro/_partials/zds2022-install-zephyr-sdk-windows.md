import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You previously downloaded and unpacked the `golioth-zephyr-workspace`. Tell `west` to automatically configure CMake:

```shell
cd c:\golioth-zephyr-workspace
west zephyr-export
```

Install the remaining dependencies:

<Tabs
groupId="west-installation"
defaultValue="virtualenv"
values={[
{label: 'Install within a virtualenv', value: 'virtualenv'},
{label: 'Install globally', value: 'global'},
]}>
<TabItem value="virtualenv">

```
pip install -r C:\golioth-zephyr-workspace\zephyr\scripts\requirements.txt
```

</TabItem>
<TabItem value="global">

```
pip3 install -r C:\golioth-zephyr-workspace\zephyr\scripts\requirements.txt
```

</TabItem>
</Tabs>

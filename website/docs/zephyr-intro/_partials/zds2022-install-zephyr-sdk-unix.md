import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

With `west` installed, grab the Zephyr SDK:

:::info
In-person training: You should have already [downloaded the SDK archive from our local storage.](docs/zephyr-intro/sdk-local-download.md).

Because of this, **we will not** be using the `west init` command to checkout the SDK repositories. But for learning purposes, here you can see here what a normal zephyr project checkout process looks like:

<details><summary>Click to reveal normal Zephyr project initialization</summary>

```shell
cd ~
west init -m https://github.com/golioth/golioth-zephyr-sdk.git --mf west-zephyr.yml ~/golioth-zephyr-workspace
cd golioth-zephyr-workspace
west update
```

</details>
:::

Navigate to your workspace folder

```
cd ~/golioth-zephyr-workspace
```

Tell `west` to automatically configure CMake:

```
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
pip install -r ~/golioth-zephyr-workspace/zephyr/scripts/requirements.txt
```

</TabItem>
<TabItem value="global">

```
pip3 install -r ~/golioth-zephyr-workspace/zephyr/scripts/requirements.txt
```

</TabItem>
</Tabs>

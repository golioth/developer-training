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

import InstallZephyrSDKUnix from './zds2022-install-zephyr-sdk-unix.md'
import InstallZephyrSDKWindows from './zds2022-install-zephyr-sdk-windows.md'

<TabItem value="linux">
<InstallZephyrSDKUnix/>
</TabItem>

<TabItem value="macos">
<InstallZephyrSDKUnix/>
</TabItem>

<TabItem value="windows">
<InstallZephyrSDKWindows/>
</TabItem>
</Tabs>

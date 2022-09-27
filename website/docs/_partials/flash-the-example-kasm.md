1. On KASM, run `getbin` (preconfigured bash command in), then download merged.bin using the left sidebar
   menu
2. Put the MagTag into DFU bootloader mode
3. Run the flash command on your local machine:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
groupId="os"
defaultValue="linux"
values={[
{label: 'Linux/MacOS', value: 'linux'},
{label: 'Windows', value: 'windows'},
]}>

<TabItem value="linux">

  ```
  esptool.py --chip esp32s2 --port /dev/ttyACM0 write_flash 0x0 merged.bin
  ```

</TabItem>
<TabItem value="windows">

  ```
  python -m esptool --chip esp32s2 --port com3 write_flash 0x0 merged.bin
  ```

</TabItem>
</Tabs>

5. Press the MagTag **Reset** button to start the new firmware

<br />

<details><summary>Click to reveal full download and flash instructions</summary>

import VerbostDownloadFlash from './flash-the-example-kasm-verbose.md';

<VerbostDownloadFlash/>

</details>

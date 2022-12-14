import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VerbostDownloadFlash from './flash-the-example-kasm-verbose.md';

1. Put the MagTag into DFU bootloader mode (Hold Boot0, tap Reset)
2. Change to the download directory and run the flash command on your local machine:

  <Tabs
  groupId="os"
  defaultValue="linux"
  values={[
  {label: 'MacOS', value: 'linux'},
  {label: 'MacOS', value: 'macos'},
  {label: 'Windows', value: 'windows'},
  ]}>

  <TabItem value="linux">

  ```
  cd ~/Downloads
  esptool.py --chip esp32s2 --port /dev/ttyACM0 write_flash 0x0 merged_<appfolder>_<hhmmss>.bin
  ```

  </TabItem>
  <TabItem value="macos">

  ```
  cd ~/Downloads
  esptool.py --chip esp32s2 --port /dev/cu.usbmodem01 write_flash 0x0 merged_<appfolder>_<hhmmss>.bin
  ```

  </TabItem>
  <TabItem value="windows">

  ```
  cd %HOMEPATH%/Downloads
  python -m esptool --chip esp32s2 --port com3 write_flash 0x0 merged_<appfolder>_<hhmmss>.bin
  ```

  </TabItem>
  </Tabs>

3. Press the MagTag **Reset** button to start the new firmware

<details><summary>Click to reveal full firmware update instructions</summary>

<VerbostDownloadFlash/>

</details>

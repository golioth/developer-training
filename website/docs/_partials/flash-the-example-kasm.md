4. Download and flash
    1. On KASM, run `getbin` (preconfigured bash command in), then download merged.bin using the left sidebar
      menu
    2. Put the MagTag into DFU bootloader mode
    3. Run the flash command on your local machine:

    ```
    esptool.py --chip esp32s2 --port /dev/ttyACM0 write_flash 0x0 merged.bin
    ```

    4. Press the MagTag **Reset** button to start the new firmware


<details><summary>Click to reveal full download and flash instructions</summary>

import VerbostDownloadFlash from './flash-the-example-kasm-verbose.md';

<VerbostDownloadFlash/>

</details>

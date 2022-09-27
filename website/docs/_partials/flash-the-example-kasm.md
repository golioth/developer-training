:::note
As a reminder, this is a two step process, involving the Kasm (browser based build tool) and your local machine.
:::

  * On KASM, run `getbin` (preconfigured bash command in), then download merged.bin using the left sidebar
    menu
  ![How to download binaries from Kasm](./assets/kasm_download_binary.png)
  * Put the MagTag into DFU bootloader mode
    1. Hold down the Boot0 button
    2. Press and release the Reset button
  ![MagTag Boot0 and Reset buttons](./assets/magtag-bootloader-mode.jpg)
  * Run the flash command on your local machine:

      ```
      esptool.py --chip esp32s2 --port /dev/ttyACM0 write_flash 0x0 merged.bin
      ```
  * Press the MagTag **Reset** button to start the new firmware

:::note
If the flash is successful, **you will receive an error message** telling you that you must manually reset the device. Remember to press the reset button to run the newly flashed program. [Learn more about this](../zephyr-tips#you-must-press-the-reset-button-after-flashing-firmware).

On some machines you will only have a few seconds to run the `west flash` command after entering bootloader mode. [Learn more about this](../zephyr-tips.md#errors-with-west-build-zephyr-tree-and-esp32-environmental-variables).
:::
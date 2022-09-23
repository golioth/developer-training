4. Download and flash

    * On KASM, run `merge_bin`, then download merged.bin using the left sidebar
      menu
    * Put the MagTag into bootloader mode by holding the Boot0 button, then
      press and release the Reset button
    * Run the flash command on your local machine:

        ```
        esptool.py --chip esp32s2 --port /dev/ttyACM0 write_flash 0x0 merged.bin
        ```

    * Press the MagTag Reset button to start the new firmware

4. Flash the example

    Put the MagTag into DFU bootloader mode

    1. Hold down the Boot0 button
    2. Press and release the Reset button

    Type the following command to start the firmware upgrade

    ```bash
    west flash
    ```

:::note
If the flash is successful, **you will receive an error message** telling you that you must manually reset the device. Remember to press the reset button to run the newly flashed program. [Learn more about this](../zephyr-tips#you-must-press-the-reset-button-after-flashing-firmware).

On some machines you will only have a few seconds to run the `west flash` command after entering bootloader mode. [Learn more about this](../zephyr-tips.md#errors-with-west-build-zephyr-tree-and-esp32-environmental-variables).
:::

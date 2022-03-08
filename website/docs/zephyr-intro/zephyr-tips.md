---
sidebar_position: 4
---

# Zephyr Tips and Gotchas

Use this page as a reference for reminders and common gotchas.

## The MagTag has a power switch

The MagTag has a toggle switch for power. When in the `on` position, a green LED will be illuminated on the underside of the board.

## Errors with `west build`: Zephyr tree and ESP32 environmental variables

There are a few common gotchas to calling `west build`.

* You need to be in a subdirectory of the Zephyr tree
* If you followed our recommendations during install, you need to enable your Python Virtual Environment
* For ESP32 development, you need to have your environmental variables set.

### Navigate to the magtag-demo directory which is inside the Zephyr tree

```bash
cd ~/zephyrproject/modules/lib/golioth/samples/magtag-demo
```

### Activate your virtual environment

```bash
source ~/zephyrproject/.venv/bin/activate
# OR, if you're using the fish shell, run
source ~/zephyrproject/.venv/bin/activate.fish
```

### Set the ESP32 environmental variables

These will look something like this:

```bash
export ZEPHYR_TOOLCHAIN_VARIANT="espressif"
export ESPRESSIF_TOOLCHAIN_PATH="${HOME}/.espressif/tools/xtensa-esp32-elf/esp-2020r3-8.4.0/xtensa-esp32-elf"
export PATH=$PATH:$ESPRESSIF_TOOLCHAIN_PATH/bin
```

You can see the the commands specific to your installation by running the `west espressif install` command and looking at the end of the 
output

| ![Finding the ESP32 environment settings](assets/golioth-west-espressif-install.png) |
|:--:|
| The end of the `west espressif install` command displays the environment settings for your system. |

## Errors when flashing the MagTag

* You may encounter `OSError: [Errno 71] Protocol error` when flashing. Most often this is caused by a timeout and can usually be fixed by starting the `west flash` process very quickly (one second or less) after putting the device into DFU bootloader mode.
* If your flash command is trying to program the wrong device (e.g. `/dev/ttyUSB0` instad of `/dev/ttyACM0`) you can specify the device endpoint with this command: `west flash --esp-device /dev/ttyACM0`

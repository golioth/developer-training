---
sidebar_position: 1
title: Install esptool on your local machine
---

## Learning Objectives

We are using `esptool.py` to interact with the MagTag hardware directly from your computer over the USB cable. Installing this tool will let you upload binaries directly to the device.

### Desired outcome(s)
* Be able to connect to the device using `esptool.py`
### Approximate time
* This section should take approximately 1-2 minutes.

## Workflow

Espressif has published [full instructions for installing
esptool](https://docs.espressif.com/projects/esptool/en/latest/esp32/installation.html).
On Linux and Mac this should look something like:

```
pip3 install esptool
```

## Troubleshooting

If you are unable to run `esptool.py` from the command line, you may need to add
the installed binary to your path:

```
PATH=$PATH:$HOME/.local/bin/
```

---
sidebar_position: 1
title: Install esptool on your local machine
---

Espressif has published [full instructions for installing
esptool](https://docs.espressif.com/projects/esptool/en/latest/esp32/installation.html).
On Linux and Mac this should look something like:

```
pip3 install esptool
```

If you are unable to run `esptool.py` from the command line, you may need to add
the installed binary to your path:

```
PATH=$PATH:$HOME/.local/bin/
```

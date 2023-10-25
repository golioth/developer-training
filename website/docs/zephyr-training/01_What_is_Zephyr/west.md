---
sidebar_position: 4
description:
    Learn about `west`, the Zephyr meta tool
---

# West Overview

[West](https://docs.zephyrproject.org/latest/develop/west/index.html) is the
meta tool included with Zephyr. It serves two main purposes:

* Repository management through a set of "west manifest" files
* A command-line interface that wraps all other tools

Both of these come in quite handy and the more you work with Zephyr the more you
will come to appreciate the utility.

## West manifests and repository management

West manifest files are out of the scope of this training, yet very much
something you should be aware of.

Zephyr is a rapidly developing codebase. You must be able to both ensure the
ability to build older projects into the future, while maintaining an easy path
for updating dependencies to incorporate new features and changes into your
builds. The west manifest system accomplishes these goals by locking packages to
a specific Git hash, and allowing inclusion of west manifest files from those
repositories which themselves specify repository URIs and Git commit hash for
each dependency.

Rather than using Git to clone a Zephyr project repository, the `west init`
command should be used. This clones the repository and remembers the location of
the `west.yml` file in that repository. From there, every time the `west update`
command is run the entire tree will be restored to the correct commit for every
package.

As an example of the power of this, here are the commands needed to check out
the training code, **including cloning the entire Zephyr tree and all
dependencies**:

```shell
cd ~/Desktop/zephyr-training
west init -m git@github.com:golioth/zephyr-training.git .
west update
west zephyr-export
pip install -r deps/zephyr/scripts/requirements.txt
```

The manifest file is committed in the Git repository, so at any point in time
you can get back to the same Zephyr and module snapshots to ensure it will
build.

## West as a command-line tool

For the most part, you will use two West commands over and over:

```shell
# Build the project for <myboard>
$ west build -b <myboard> <sourcedirectory>

# Program the compiled binary onto the board
$ west flash
```

Which compiler should you use for the chip architecture you are working with?
You don't need to know that, because `west` already knows and will use the
correct option from the Zephyr SDK. It may be ARM, Xtensa, RISC-V, or x86 — the
commands will still be `west build` and `west flash`.

:::note

We will not be using `west flash` during this training because the Kasm
containers that serve as the build environment don't have access to the USB port
on your computer.

During normal workflow, your Zephyr build environment will be local and you
should use `west flash` after the `west build` command completes.

:::

## Other West commands

There are innumerable ways to use this tool, including adding your own custom
commands. To list just a few that we frequently use:

```shell
# List all boards supported by Zephyr
$ west boards

# Get a list of all available programmer options for this board
$ west flash --context

# Open a an on-chip debugging session for this board
$ west debug

# Open the Espressif serial monitor for ES32 family of chips
$ west espressif monitor
```



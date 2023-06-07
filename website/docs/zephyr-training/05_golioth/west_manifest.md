---
sidebar_position: 1
description:
    How to add the Golioth Zephyr SDK to the west manifest
---

# Add Golioth to the West Manifest

Your Zephyr install must include the Golioth Zephyr SDK in order to use Golioth
services. This is a simple matter of adding Golioth in your West manifest file.
There are two general approaches to this:

1. Use the Golioth `west-zephyr.yml` or `west-ncs.yml` manifest to install
   Zephyr (or Nordic's flavor of Zephyr called nRF Connect SDK).
2. Add the Golioth Zephyr SDK as a module of an existing Zephyr (or NCS) install
   using the `west-external.yml` file from the Golioth SDK.

Option 1 is great for people starting a new project who want to use Golioth
right away. Option 2 may be better if you're working from an existing project.

:::note

We will discuss both options on this page, but we will not be doing hands-on
editing of the manifest file today.

:::

## Learning objectives

We will discuss how the Golioth SDK can be added to new and existing projects
using the west manifest.

* **Desired outcome(s)**
  1. Understand the different west manifests used by Golioth
  2. Understand how (and where) to add Golioth in an existing west manifest
* **Time Estimate:** 5 minutes

## How to Set Up a Standalone Project with Golioth

At Golioth we like to use a concept we call "Standalone Projects" when starting
a new firmware project. What we mean is that the project itself contains a west
manifest file responsible for installing its own copy of the Zephyr tree and all
dependencies. This manifest file is committed to the project repo, so that the
build state is known (and replicable) for every commit in that repo.

This is the approach that we used for [the Zephyr Training code
repo](https://github.com/golioth/zephyr-training) we've been using for this
training. The manifest file in the project uses the `west-ncs.yml` file from the
Golioth repository as the main `projects` entry:

```yaml
manifest:
  version: 0.7

  projects:
    - name: golioth
      path: modules/lib/golioth
      revision: f01824d8f0943463ee07cb493103a63221599c79
      url: https://github.com/golioth/golioth-zephyr-sdk
      west-commands: scripts/west-commands.yml
      import:
        file: west-ncs.yml
        path-prefix: deps
        name-allowlist:
          - nrf
          - zephyr
          - cmsis
          - hal_nordic
          - mbedtls
          - mbedtls-nrf
          - mcuboot
          - net-tools
          - nrfxlib
          - tfm-mcuboot
          - trusted-firmware-m
          - qcbor
          - sdk-hostap
          - segger
          - tinycrypt
  self:
    path: app
    west-commands: utility/west-commands/west-commands.yml
```

This file is named `west.yml` in our firmware project repo and will be
automatically located and used when running the `west init` command. Subsequent
calls to `west update` will perform the following (because of the file above):

* Clone the Golioth Zephyr SDK at the `revision` (a Git hash, branch, or tag)
  specified
* Import the `west-ncs.yml` manifest from the Golioth repo, using the `deps`
  subdirectory as the root directory for any other repos cloned from that file
* The `name-allowlist` limits what is imported from the manifest files.

  :::note

  This saves some time since Golioth's `west-ncs.yml` itself imports `west.yml`
  from the Nordic nRF Connect SDK. Since our training code repo only supports a
  few boards, we don't need all HAL packages from all silicon vendors (as one
  example).

  :::

* This manifest sets up the custom `west kasm download` command we've been
  using. You're not likely to need this in your own projects.

:::tip Compare Standalone to building in the Zephyr tree

Compare a Standalone Project to building your project in the samples directory
of the Zephyr tree:

* If you add your project as a subfolder in the Zephyr tree you will still be
  able to put your project under revision control, but it has no visibility to
  the state of the Zephyr tree. If that tree pulls upstream changes, it may
  break your project code and you will have no indication for which upstream
  commit was the last known working state.

* With the Standalone Project approach, the upstream commit hash for Zephyr and
  all dependencies are included in your west manifest. You can always restore
  the Zephyr tree to that known working state. This a very powerful tool you
  should be using.

:::

## How to Add Golioth to an Existing West Manifest

The Golioth SDK has a special manifest file you can use to add Golioth to an
existing project/Zephyr install. This is documented in [the main README for the
Golioth
SDK](https://github.com/golioth/golioth-zephyr-sdk#adding-golioth-sdk-to-existing-west-project).
It instructs you to add the following to the manifest:

:::tip

You can find your project manifest file by using the `west manifest --path`
command.

Add this under the `projects:` section. See [the Zephyr tree
west.yml](https://github.com/zephyrproject-rtos/zephyr/blob/main/west.yml) as an
example.


:::

```yaml
# Golioth repository.
- name: golioth
  path: modules/lib/golioth
  revision: main
  url: https://github.com/golioth/golioth-zephyr-sdk.git
  import: west-external.yml
```

This manifest code does the following:

* Map the Golioth SDK to the proper folder (`modules/lib/golioth`)
* Use the `main` branch
* Imports the `west-external.yml` manifest from the Golioth SDK which ensures
  dependencies (like the QCBOR library needed by Golioth) are installed in the
  Zephyr tree

:::caution

We recommend you use a commit hash or a tag (not a branch name) for the
`revision` to ensure that you get to decide when to include upstream changes in
your builds.

When adding Golioth to an existing Zephyr install, it is up to you to ensure the
Zephyr version is supported by Golioth. View the commit hash/tag in the
`west-zephyr.yml` or `west-ncs.yml` files to establish which version of Zephyr
and NCS are supported by the Golioth commit you are targeting.

:::

## Expected results

After making these manifest changes and running `west update` you will have a
`modules/lib/golioth` directory next to your `zephyr` directory, making it
available to any project that uses this tree for the build.

```shell
.
├── bootloader
├── modules
│   ├── lib
│       ├── golioth
├── nrf
├── nrfxlib
├── tools
└── zephyr
```

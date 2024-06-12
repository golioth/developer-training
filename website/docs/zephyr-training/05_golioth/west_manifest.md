---
sidebar_position: 1
description:
    How to add the Golioth Firmware SDK to the west manifest
---

# Add Golioth to the West Manifest

Your Zephyr install must include the Golioth Firmware SDK in order to use
Golioth services. This is a simple matter of adding Golioth in your West
manifest file. There are two general approaches to this:

1. Use the Golioth `west-zephyr.yml` or `west-ncs.yml` manifest to install
   Zephyr or Nordic's flavor of Zephyr called nRF Connect SDK (aka NCS).
2. Add the Golioth Firmware SDK as a module of an existing Zephyr (or NCS)
   installation.

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

The Zephyr documentation includes a section on this concept which they refer to
as [Zephyr repository
applications](https://docs.zephyrproject.org/latest/develop/application/index.html#application-types).

<details>
    <summary>Explain why I should be using standalone project manifests</summary>

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

 If you'd like a deeper understanding of this topic, [see our talk from the
 Zephyr Developer
 Summit](https://blog.golioth.io/manifests-project-sanity-in-the-ever-changing-zephyr-world/).

</details>

We took this "standalone project" approach with [the Zephyr Training code
repo](https://github.com/golioth/zephyr-training) we've been using for this
training. The manifest file in the project uses the `west-ncs.yml` file from the
Golioth repository as the main `projects` entry:

```yaml
manifest:
  version: 0.7

  projects:
    - name: golioth
      path: modules/lib/golioth-firmware-sdk
      revision: v0.13.1
      url: https://github.com/golioth/golioth-firmware-sdk
      submodules: true
      west-commands: scripts/west-commands.yml
      import:
        file: west-ncs.yml
        path-prefix: deps
        name-allowlist:
          - nrf
          - zephyr
          - cmsis
          - hal_nordic
          - hostap
          - mbedtls
          - mbedtls-nrf
          - mcuboot
          - net-tools
          - nrfxlib
          - qcbor
          - segger
          - tfm-mcuboot
          - tinycrypt
          - trusted-firmware-m
          - zcbor

    - name: zephyr-network-info
      path: deps/modules/lib/network-info
      revision: v1.1.1
      url: https://github.com/golioth/zephyr-network-info

  self:
    path: app
    west-commands: utility/west-commands/west-commands.yml
```

This file is named `west.yml` in our firmware project repo and will be
automatically located and used when running the `west init` command. Subsequent
calls to `west update` will perform the following (because of the file above):

* Clone the Golioth Firmware SDK at the `revision` (a Git hash, branch, or tag)
  specified
* Import the `west-ncs.yml` manifest from the Golioth repo, using the `deps`
  subdirectory as the root directory for any other repos cloned from that file
* The `name-allowlist` limits what is imported from the manifest files.

  :::tip The `name-allowlist` limits unnecessary package downloads

  This saves some time since Golioth's `west-ncs.yml` itself imports `west.yml`
  from the Nordic nRF Connect SDK. Since our training code repo only supports a
  few boards, we don't need all HAL packages from all silicon vendors (as one
  example).

  When adding new functionality, remember to add any new modules to the list so
  that West checks them out during the update.

  :::

* This manifest sets up the custom `west download` command we've been using.
  You're not likely to need this in your own projects.

## How to Add Golioth to an Existing West Manifest

The Golioth Firmware SDK can be added as a module to an existing project/Zephyr
install. This is documented in [the Zephyr README of the Golioth Firmware
SDK](https://github.com/golioth/golioth-firmware-sdk/tree/main/examples/zephyr#adding-the-golioth-firmware-sdk-to-an-existing-zephyr-west-project).
It instructs you to add the following to the manifest:

<details>
    <summary>Show me how to find my project manifest file</summary>

You can find your project manifest file by using the `west manifest --path`
command.

</details>

Add the following under the `projects:` section of your West manifest file. See
[the Zephyr tree
west.yml](https://github.com/zephyrproject-rtos/zephyr/blob/main/west.yml) as an
example.

```yaml
# Golioth repository.
- name: golioth
  path: modules/lib/golioth-firmware-sdk
  revision: main
  url: https://github.com/golioth/golioth-firmware-sdk.git
  submodules: true
```

This manifest code does the following:

* Map the Golioth SDK to the proper folder (`modules/lib/golioth-firmware-sdk`)
* Specify the GitHub repository URL
* Use the `main` branch
* Import the manifest files found in that directory

### Important Considerations when Adding Golioth as a Module

* We recommend you use a commit hash or a tag (not a branch name) for the
  `revision` to ensure that you get to decide when to include upstream changes
  in your builds.
* When adding Golioth to an existing Zephyr install, it is up to you to ensure
  the Zephyr version is supported by Golioth. View the commit hash/tag in the
  `west-zephyr.yml` or `west-ncs.yml` files to establish which version of Zephyr
  and NCS are supported by the Golioth commit you are targeting.

## Expected results

After making these manifest changes and running `west update` you will have a
`modules/lib/golioth-firmware-sdk` directory next to your `zephyr` directory,
making it available to any project that uses this tree for the build.

```shell
.
├── bootloader
├── modules
│   ├── lib
│       ├── golioth-firmware-sdk
├── nrf
├── nrfxlib
├── tools
└── zephyr
```

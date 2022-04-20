---
sidebar_position: 1
---

# Standalone Repositories

## Overview

The Zephyr SDK and Golioth SDK are based around utilizing a "Samples" folder to contain all example code. Build directories can live in various places throughout the SDK and you can choose which samples to compile at any given time with the `west build` directive. 

Once you are ready to create a custom application, you may wish to start from a sample, but will not want to carry along all of the various pieces in your project repository. Instead, you can utilize [Zephyr manifest files](https://docs.zephyrproject.org/3.0.0/guides/west/manifest.html) to define which external repositories are being included in your project and which version of those files you want to use. You might reference a tagged version of the Zephyr SDK (ie. 2.7.0), a branch, or you might even call out a specific commit in order to pull in a precise change in the external repo. 

## Required reading

This section is based around content contained within our blog about [Improving Zephyr Project Structure with Manifest Files](https://blog.golioth.io/improving-zephyr-project-structure-with-manifest-files/)

[![Improving Zephyr Project Structure With Manifest Files (blog post)](assets/ImprovingZephyrManifestStructure-650x366.png)](https://blog.golioth.io/improving-zephyr-project-structure-with-manifest-files/)

## Putting it in practice

This segment of the training will have you taking an existing example like a "blinky" sample and making it a standalone Zephyr application repository.

### Directory Stucture



```
- app_zephyr/
    - .west/
        - config
    - application/
        - boards/
            - arm/
                - ah_1202a/
        - src/
        - CMakeLists.txt
        - prj.conf
        - west.yml
    - deps/
        - mcuboot/
        - modules/
        - tools/
        - zephyr/
    - .gitignore
```


### Example manifest files

Your manifest file exists to call in other Zephyr based projects or repositories, which _also_ have a manifest file in their repository. It's manifests all the way down. However, the top level manifest is what controls the show. That's what we'll be building.

```
manifest:
  version: 0.7
 
  defaults:
    remote: zephyrproject
  remotes:
    - name: zephyrproject
      url-base: https://github.com/zephyrproject-rtos
    - name: mcutools
      url-base: https://github.com/mcu-tools
  projects:
    - name: zephyr
      repo-path: zephyr
      revision: v2.7.0
      import:
        path-prefix: deps
      path: zephyr
    - name: mcuboot
      remote: mcutools
      repo-path: mcuboot
      revision: v1.7.2
      path: deps/mcuboot
 
  self:
    path: application
```

### Revision control

One of the best parts of this method is the squeaky clean directory structure inside of your application directory. You will only have the `app` folder, the `.gitignore` file, the `.west/config` and...that's it. Each person who clones and does a `west update` of your directory will download the exact version of the dependencies called out in the manfiest file. See the [extra credit](#extra-credit) section for a way to reduce the overhead of which files are downloaded.

Your `.gitignore` should be sure to exclude the build and deps folder, as well as any other configuration files, such as for VS Code

```
deps/
build/
.vscode/
```

### Exercise

* Create a new git repository in a fresh folder
* Create an `app` directory
* Create a `.west/config` file and point it at your Zephyr SDK location
* Create a manifest file (`west.yml`) inside the app folder
* Copy one of the samples (like `blinky`or Golioth's `hello`) into your `app` folder alongside the manifest
* Run `west update` and see if West is able to pull in all of the requirements into the `deps` folder 
* Run `west build -p -b <boardname> app` from the top level (this will compile the code from the app folder and place a build directory at the top level of your directory)

#### Extra credit
* Seek out a new Zephyr project to include and add that to your project via the manifest file
* Change the number of dependencies that Zephyr pulls in (for instance, exclude the STM32 HAL files from your project)
---
sidebar_position: 4
---

# Standalone Repositories

## Overview

The Zephyr SDK and Golioth SDK are based around utilizing a "Samples" folder to contain all example code. Build directories can live in various places throughout the SDK and you can choose which samples to compile at any given time with the `west build` directive. 

Once you are ready to create a custom application, you may wish to start from a sample, but will not want to carry along all of the various pieces in your project repository. Instead, you can utilize [Zephyr manifest files](https://docs.zephyrproject.org/3.0.0/guides/west/manifest.html) to define which external repositories are being included in your project and which version of those files you want to use. You might reference a tagged version of the Zephyr SDK (ie. 2.7.0), a branch, or you might even call out a specific commit in order to pull in a precise change in the external repo. 

## Putting it in practice

### Example manifest files

### Revision control

.gitignore

### Exercise

* Create a new repository

## Associated blog post

This section is based around content contained within our blog about [Improving Zephyr Project Structure with Manifest Files](https://blog.golioth.io/improving-zephyr-project-structure-with-manifest-files/)
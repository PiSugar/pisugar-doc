---
sidebar_position: 0
---

# Pwnagotchi Kit

![pwnagotchi](https://www.pisugar.com/cdn/shop/files/Pwnagotchi-Complete-Pack-Pi02w-PiSugar3-eink-case-191792012.jpg?v=1742613716&width=600)

Pwnagotchi is a cute, customizable, and portable AI-powered device that learns from its environment to improve its ability to capture Wi-Fi handshakes. It is designed to be used for educational purposes, security research, and ethical hacking.

It is built on the Raspberry Pi platform and can be powered by various power sources, including the PiSugar battery series.

:::info

If you purchased a Pwnagotchi kit from PiSugar Kitchen, all the images and configurations are already set up for you. You can simply power it on and start using it.

:::

If you want to build your own Pwnagotchi, you can follow the instructions below to set it up with PiSugar.

## System Image

We recommend using the [pwnagotchi.org](https://pwnagotchi.org) community version. Please download the image from: https://github.com/jayofelony/pwnagotchi/releases

This version includes driver support for the latest Waveshare e-ink displays and a PiSugar battery plugin that shows battery level and charging status at the top of the screen.

## Installation Guide

Please follow the installation guide below to install Pwnagotchi on your Raspberry Pi. The guide provides detailed steps for flashing the image onto an SD card and configuring the device.

https://pwnagotchi.org/getting-started/installation/index.html

## Configuration

To use PiSugar with Pwnagotchi, you need to configure the `config.toml` file. Below is an example configuration that enables the PiSugar plugin and sets the display type to Waveshare 4-inch e-ink display.

```toml{fileName=config.toml}
main.name = "pwnagotchi"
main.lang = "en"
main.whitelist = [
  "softelectric",
]

ui.display.enabled = true
ui.display.type = "waveshare_4"
main.plugins.pisugarx.enabled = true

ui.invert = true # false = black background, true = white background
```

You can create or edit the `config.toml` file in the `/etc/pwnagotchi/` directory.

Or you can create the file in the `boot` directory (via tf card reader), which will be copied to the correct location during the first boot.

## PiSugar Plugin

Source code of the PiSugar plugin is in the folder `/pwnagotchi/plugins/pisugarx`.

https://github.com/jayofelony/pwnagotchi/blob/noai/pwnagotchi/plugins/default/pisugarx.py

This plugin supports PiSugar 2/3 series batteries. It does not support PiSugar S which do not have i2c communication.

:::info

Sometimes the latest plugin code may not be included in the latest release. You can copy the source code directly to your Pwnagotchi and restart the device to use it.

:::

## Notes

:::tip

Make sure to turn on PiSugar before connecting Pwnagotchi to your PC.

:::

When connecting to a PC, the LED on PiSugar may light up, but this doesn't mean PiSugar is powered on. Your Pi might not detect the PiSugar I2C during this time, which can cause some confusion and plugin issues. So we recommend turning on PiSugar before connecting it to your PC.



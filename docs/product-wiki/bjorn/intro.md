---
sidebar_position: 0
---

# Bjorn

<img src="https://raw.githubusercontent.com/markatsos/bjorn-pisugar/v0.3.1/docs/device.jpg" alt="Bjorn on a Raspberry Pi Zero 2 W with PiSugar 3: on battery, and charging" width="400"></img>

[Bjorn](https://github.com/infinition/Bjorn) is an autonomous network scanning, vulnerability assessment and offensive security tool for the Raspberry Pi, with a Tamagotchi-like character on an e-ink display and a web interface. It discovers hosts and open services on the network it joins, tests them for known weaknesses, and shows its progress on the screen. It is meant for education and for authorized testing only: use it only on networks you own or have permission to test.

Bjorn runs on the same hardware as the [Pwnagotchi Kit](../pwnagotchi/intro.md): a Raspberry Pi Zero 2 W, a PiSugar 3 and a Waveshare 2.13-inch e-ink display. One kit can run either project, each from its own SD card.

:::warning[Third-party integration]

PiSugar support for Bjorn comes from [bjorn-pisugar](https://github.com/markatsos/bjorn-pisugar), a community add-on. It is not developed, maintained or supported by PiSugar or by the Bjorn project. Please report problems in [its issue tracker](https://github.com/markatsos/bjorn-pisugar/issues).

:::

## Tested Setup

| Component | Version |
| --- | --- |
| Board | Raspberry Pi Zero 2 W |
| Battery | PiSugar 3 |
| Display | Waveshare 2.13-inch e-ink, V4 |
| System | Raspberry Pi OS Bookworm Lite, 64-bit (2024-10-22) |
| Bjorn | v1.0.0 alpha 2, commit `61a4758` |
| Add-on | bjorn-pisugar v0.3.1 |

This is the only combination that has been verified. The add-on patches exact lines of Bjorn's source code, so it is tied to the Bjorn version above: on any other version, the installer stops before changing anything.

## Installation Guide

Install Bjorn first, following its own guide for the Raspberry Pi Zero 2 W (64-bit) and choosing the `epd2in13_V4` display type:

https://github.com/infinition/Bjorn/blob/main/INSTALL.md

Then add PiSugar support:

```bash
git clone --branch v0.3.1 https://github.com/markatsos/bjorn-pisugar.git
cd bjorn-pisugar
sudo ./install.sh --model pisugar3
```

This adds:

- the battery level, with a charging indicator, in the top-right corner of Bjorn's e-ink display;
- a clean shutdown when the battery runs low (10% by default);
- PiSugar 3 switching off its output about 30 seconds after the Pi shuts down. A reboot does not trigger it.

To check that the board is detected and the features are active:

```bash
python3 /home/bjorn/Bjorn/pisugar.py
```

To remove the add-on, run `sudo ./uninstall.sh` in the same folder. It restores Bjorn's files to the state they were in before the installation.

## Configuration

The settings appear in Bjorn's web interface under **Config**, in the **PiSugar** section: whether to show the battery, the shutdown level, and the power-off delay. Bjorn does not save automatically, so press **Save** after changing them.

The low-battery shutdown and the power-off only run when `pisugar_model` is set to `pisugar3`, as the install command above does. With `auto`, the add-on only reads the battery level.

## Other PiSugar Models

- **PiSugar 3 Plus** uses the same registers as PiSugar 3 (`pisugar3`), but has not been tested.
- **PiSugar 2** (2-LED and 4-LED) and **PiSugar 2 Plus** (formerly PiSugar 2 Pro) are experimental. The add-on only reads a battery level from the voltage. There is no charging indicator, no low-battery shutdown and no power-off.
- **PiSugar 1** and the **PiSugar S** series have no I2C communication and are not supported.

## Notes

:::tip

Turn on PiSugar before connecting the Pi to your PC.

:::

If the Pi is powered from its own USB port while PiSugar is off, PiSugar does not appear on the I2C bus and the battery indicator stays hidden. Press the PiSugar button to turn it on.

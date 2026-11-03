---
sidebar_position: 1
title: Product Overview and Getting Started
description: Hardware specifications, Raspberry Pi installation, verification, diagnostics, and interface configuration for Whisplay HAT+.
slug: /product-wiki/whisplay-plus/overview
---

# Product Overview and Getting Started

## Hardware Specifications

| Function | Component / Interface |
| :--- | :--- |
| Display | ST7701P, 2.8-inch IPS, 480 × 640, RGB888 |
| Display interface | Two-lane MIPI DSI |
| Touch | GT911, five-point capacitive touch, I2C address `0x5d` |
| Audio | ES8389 (`0x10`) or WM8960 (`0x1a`), I2S data and I2C control |
| External speaker | 4-pin stereo output |
| Motion sensor | QMI8658B accelerometer and gyroscope, I2C address `0x6b` |
| Magnetometer | MQC5883P, I2C address `0x2c` |
| User input/output | Physical button and RGB LED |
| Grove Port.X | I2C or UART, selected by GPIO27 |

## Supported Platforms

The current Linux driver supports the 64-bit Raspberry Pi OS Desktop on:

- Raspberry Pi 3B and 3B+
- Raspberry Pi 4B
- Raspberry Pi 5
- Raspberry Pi Compute Module 5 (CM5)

Raspberry Pi 3B/3B+ and 4B use the physical DSI1 connector. Raspberry Pi 5 and CM5 use DSI0 by default. The installer selects the correct display interface automatically.

:::warning
Power off the Raspberry Pi before attaching or removing the HAT, DSI cable, speaker, or Grove device. Check the DSI cable orientation before applying power.
:::

## Hardware Interfaces

### Display and Touch GPIOs

| Function | Raspberry Pi GPIO | Notes |
| :--- | :--- | :--- |
| Panel reset | GPIO4 | Active low |
| Backlight enable | GPIO22 | Active high on current hardware |
| Touch reset | GPIO6 | — |
| Touch interrupt | GPIO13 | Falling edge |
| Grove Port.X select | GPIO27 | Low: I2C; high: UART |

### 40-Pin Header Signals

| Signal | Physical pin | GPIO |
| :--- | :--- | :--- |
| 3.3V | Pin 1 | — |
| 5V | Pin 4 | — |
| GND | Pin 14 | — |
| Backlight enable (`LEDC`) | Pin 15 | GPIO22 |
| Grove Port.X select | Pin 13 | GPIO27 |
| Panel reset (`RST`) | Pin 7 | GPIO4 |
| Touch reset (`TPRST`) | Pin 31 | GPIO6 |
| Touch interrupt (`TPINT`) | Pin 33 | GPIO13 |

The RGB LED uses physical pins 22, 18, and 16. The physical button uses pin 11 and reads high while pressed.

### External Speaker Support

Whisplay HAT+ provides a **4-pin stereo external speaker connector**. Use a matching stereo speaker assembly with separate left and right channels.

:::warning
Power off the Raspberry Pi before connecting or disconnecting the external speaker.
:::

## Install the Driver

On the Raspberry Pi, open a terminal and run:

```bash
git clone https://github.com/PiSugar/whisplay-plus.git
cd whisplay-plus
sudo bash install.sh
sudo reboot
```

The installer:

- builds and installs the ST7701P display and Whisplay Sound kernel modules;
- installs the combined `whisplay-plus` device-tree overlay;
- enables I2C, I2S, and SPI;
- selects DSI1 automatically on Raspberry Pi 3 and 4;
- installs the desktop demo and hardware diagnostics under `/opt/whisplay-hat-plus`.

:::note
The driver builds kernel modules for the currently installed Raspberry Pi kernel. After a major kernel upgrade, rerun `sudo bash install.sh` if the display or sound card is no longer detected.
:::

## Verify the Hardware

After rebooting, check the display, touch controller, sound card, and sensors:

```bash
dmesg | grep -Ei 'st7701|goodix'
aplay -l | grep -i whisplay
cat /proc/bus/input/devices | grep -A5 -i goodix
python3 /opt/whisplay-hat-plus/sensors/whisplay_sensors.py
```

Expected sensor identification:

```text
QMI8658B addr=0x6b id=0x05
MQC5883P addr=0x2c id=0x80
```

## Desktop Demo and Diagnostics

Launch **Whisplay Hat+ Demo** from the Raspberry Pi OS application menu, or run:

```bash
/opt/whisplay-hat-plus/demo/run-whisplay-hat-plus-demo.sh
```

The demo exercises the display, multi-touch input, speaker, microphone, RGB LED, button, accelerometer, gyroscope, magnetometer, and heading display.

Standalone diagnostics are also available:

```bash
/opt/whisplay-hat-plus/demo/test_apps/touch/run.sh
/opt/whisplay-hat-plus/demo/test_apps/sound/run_sound_test.sh
/opt/whisplay-hat-plus/demo/test_apps/gyro/run_gyro_test.sh
```

### Sensor Calibration

Use **Cal** in the desktop demo:

1. Keep the device still for about two seconds so the demo can measure gyroscope bias.
2. Select a known compass direction (N, E, S, or W), press **Cal**, and keep the device facing that direction for a few seconds.

The magnetometer is affected by the onboard speaker, magnets, cables, and nearby metal. Calibrate the assembled device in its normal operating environment for the best heading accuracy.

## Configure Grove Port.X

Grove Port.X uses I2C by default. The standard overlay configuration is:

```ini
dtoverlay=whisplay-plus
```

To route Grove Port.X to UART, add the `port_x_uart` parameter in `/boot/firmware/config.txt` and enable UART:

```ini
enable_uart=1
dtoverlay=whisplay-plus,port_x_uart
```

If the HAT EEPROM loads the overlay automatically, place the following setting before the overlay is loaded:

```ini
dtparam=port_x_uart=on
```

The separate [`whisplay-grove-sensors`](https://github.com/PiSugar/whisplay-grove-sensors) project provides Linux/Python drivers, detection tools, and demos for compatible M5Stack I2C and UART Units. See [Grove Port.X and M5Stack Units](./grove-units.md) for the supported functions and installation instructions.

## Advanced Overlay Options

The installer handles the normal Raspberry Pi configuration. These options are only needed for manual or unusual setups.

### Select DSI1 Manually

Raspberry Pi 3 and 4 use DSI1. If the HAT EEPROM loads the overlay automatically, add this near the top of `/boot/firmware/config.txt`, before other `dtoverlay=` lines:

```ini
dtparam=display_dsi=1
```

Do not add an empty `dtoverlay=` line; it disables HAT EEPROM overlay loading globally.

## Uninstall

From the cloned driver repository, run:

```bash
sudo bash uninstall.sh
sudo reboot
```

## Resources

- [Whisplay HAT+ driver and source code](https://github.com/PiSugar/whisplay-plus)
- [Original Whisplay HAT documentation](../hat/intro.md)

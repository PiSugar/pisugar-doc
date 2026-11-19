---
sidebar_position: 0
title: Whisplay Series
description: Explore the PiSugar Whisplay series of integrated display, audio, control, and sensor expansion boards.
slug: /product-wiki/whisplay
---

# Whisplay Series

<img src="/img/whisplay_logo@4x-8.png" alt="Whisplay logo" width="180" />

The **PiSugar Whisplay series** turns compact single-board computers into complete interactive devices. Each Whisplay board combines a display, audio input and output, physical controls, and status lighting in a purpose-built form factor, reducing the wiring and separate modules normally required for multimedia projects.

Whisplay boards are designed for voice assistants, portable dashboards, smart-home controllers, games, robotics interfaces, offline AI appliances, and other projects that need both visual and audio interaction.

## Choose Your Whisplay

| | Whisplay HAT | Whisplay HAT+ |
| :--- | :--- | :--- |
| Best fit | Compact Raspberry Pi Zero projects | Raspberry Pi 3B/3B+, 4B, 5, and CM5 projects |
| Display | 1.69-inch, 240 × 280 IPS | 2.8-inch, 480 × 640 IPS |
| Display interface | SPI | Two-lane MIPI DSI |
| Touch | — | Five-point capacitive touch |
| Audio | Microphones and mono speaker output | Microphones and stereo speaker output |
| External speaker connector | 2-pin, mono | 4-pin, stereo |
| User controls | Physical button and RGB LED | Physical button and RGB LED |
| Motion sensors | — | Accelerometer, gyroscope, and magnetometer |
| Onboard HAT EEPROM | V2 only | Yes |
| Expansion | 40-pin header | 40-pin header and switchable I2C/UART Grove Port.X |

:::info
Whisplay HAT and Whisplay HAT+ use different displays, wiring, and drivers. Follow the documentation for your exact model.
:::

## EEPROM Programming Parameters

| Parameter | Whisplay HAT V2 (ES8389) | Whisplay HAT+ |
| :--- | :--- | :--- |
| Vendor string (`vendor`) | `"PiSugar"` | `"PiSugar"` |
| Product string (`product`) | `"Whisplay HAT"` | `"Whisplay HAT+"` |
| Product ID (`product_id`) | `0x0001` | `0x0002` |
| Product version (`product_ver`) | `0x0200` | `0x0100` |
| Product UUID (`product_uuid`) | Unique per board | Unique per board |
| Device Tree overlay | `whisplay-soundcard` | `whisplay-plus` |

The Raspberry Pi reference for the standard HAT class uses a 7-bit I2C address of `0x50` on the 3.3 V ID bus, with `ID_SD` on GPIO0 (physical pin 27) and `ID_SC` on GPIO1 (physical pin 28). [Raspberry Pi HAT+ specification](https://datasheets.raspberrypi.com/hat/hat-plus-specification.pdf)

Product-specific references are available in the [Whisplay HAT driver installer](https://github.com/PiSugar/Whisplay/blob/main/audio/whisplay-soundcard/scripts/install.sh) and the [Whisplay HAT+ driver documentation](https://github.com/PiSugar/whisplay-plus#notes).

## Whisplay HAT

<img src="/img/whisplay-demo.jpg" alt="Whisplay HAT installed on a compact Raspberry Pi" width="600" />

Whisplay HAT matches the compact Raspberry Pi Zero form factor and provides a 1.69-inch SPI display, audio input and output, an RGB indicator, and a physical button. It is a compact foundation for portable voice, display, gaming, and automation projects.

[Explore Whisplay HAT →](./hat/intro.md)

## Whisplay HAT+

<img src="/img/whisplay/whisplay-hat-plus.jpg" alt="Whisplay HAT+ handheld multimedia and sensor expansion board" width="800" />

Whisplay HAT+ expands the platform with a larger high-resolution MIPI DSI touch display, motion and direction sensors, and Grove connectivity. It is designed for richer touch interfaces, sensor-aware applications, portable AI devices, and interactive control systems.

[Explore Whisplay HAT+ →](./hat-plus/intro.md)

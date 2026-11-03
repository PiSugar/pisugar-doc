---
sidebar_position: 0
title: Whisplay HAT+
description: A multimedia and sensor expansion board for Raspberry Pi with a 2.8-inch touch display, audio, motion sensors, RGB LED, button, and Grove connectivity.
slug: /product-wiki/whisplay-plus/intro
---

# Whisplay HAT+

<img src="/img/whisplay_logo@4x-8.png" alt="Whisplay logo" width="200" />

**PiSugar Whisplay HAT+** is a multimedia and sensor expansion board for Raspberry Pi. It combines a portrait touch display, speaker and microphone support, motion sensing, an RGB status LED, a physical button, and a switchable Grove interface in one compact HAT.

Whisplay HAT+ is designed for interactive projects such as voice assistants, portable control panels, sensor dashboards, compact games, and robotics interfaces.

<img src="/img/whisplay/whisplay-hat-plus.jpg" alt="Whisplay HAT+ showing artwork on its 2.8-inch touch display" width="800" />

## Key Features

- **2.8-inch IPS touch display:** 480 × 640 pixels over two-lane MIPI DSI
- **Five-point capacitive touch:** GT911 touch controller
- **Audio input and output:** onboard Whisplay Sound card with microphone support and a 4-pin external stereo speaker connector
- **Motion sensing:** QMI8658B accelerometer and gyroscope
- **Direction sensing:** MQC5883P three-axis magnetometer
- **User controls:** RGB LED and physical button
- **Grove Port.X:** switchable between I2C and UART, with Linux/Python support for compatible M5Stack Units
- **Raspberry Pi support:** Raspberry Pi 3B/3B+, 4B, 5, and CM5

:::info Whisplay HAT and Whisplay HAT+ are different products
The HAT+ uses a 480 × 640 MIPI DSI touch display and includes motion sensors and Grove Port.X. Do not use the original Whisplay HAT's SPI display wiring or driver instructions with Whisplay HAT+.
:::

## What You Can Build

- Voice assistants with a local display and audio feedback
- Portable dashboards and smart-home control panels
- Motion-aware games and handheld user interfaces
- Compass, orientation, and movement visualizations
- Grove-based sensor and actuator projects
- Robotics controllers with touch, audio, and motion input

Continue to [Product Overview and Getting Started](./overview.md) for hardware details, installation, verification, and diagnostics. You can also explore [Grove Port.X and M5Stack Unit support](./grove-units.md) or the [Whisplay HAT+ Project Demos](./examples.md).

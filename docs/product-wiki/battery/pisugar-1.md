---
sidebar_position: 5
---

# PiSugar1

PiSugar 1 is our first product which aims to create an easiest way to power a Pi0. The connection goes through the bottom pads of pi0s and leave the GPIO free for other PHATs. And the installation is extremely easy for everyone.

![PiSugar Demo](https://raw.githubusercontent.com/JdaieLin/PiSugar/master/demo.gif)

:::info

PiSugar 1 cannot be used as a UPS (Uninterrupted Power Supply). When external power is disconnected, there will be a brief power interruption that causes the Raspberry Pi to restart. This limitation is important to consider for applications requiring continuous operation.

:::

## Hardware SPECS

* PowerIC: Injoice IP5306 (without i2c)
* MicroUSB: charging port
* Power switch: one/double tap (on/off)

## Features

#### Perfect Size
The sizes of circuit board and bettery perfectly match raspberry pi zero. You can easy put your prototypes in small cases.

#### Easy to Install
Install in one minute. No need for welding. Friendly for beginners.

#### USB Charging
Charge via micro USB port. Also you can charge when it is running a raspberry pi zero.

#### On-board Switch
One tap to turn on, dual taps to turn it off. No need to detach.

#### Place It Anywhere
With iron sheets inside, you can place your pi zero anywhere with magnet.

## 3D Printed Case

Basic components: https://github.com/PiSugar/PiSugar/tree/master/model

Lids for PHATs: https://github.com/PiSugar/pisugar-case-pihat-cap
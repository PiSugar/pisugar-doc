---
sidebar_position: 5
---

# PiSugar2 (Plus) I2C Manual

I2c-bus specifications
Chip model: ip5209 & ip5312

Document revision table
| Who | What | When |
| :-: | :-: | :-: |
| Jan Paul Klompmaker | Original creator/translator document. With approval and reference documentation from PiSugar Team | 25 September 2020 |

Introduction
============

This document will explain how to programmatic approach the I2C-bus of the PiSugar2 (Pro) device.
With this information a library, API of application can be designed.
More source can be found [here](../pisugar-power-manager).

In this document examples use the command line programs [**i2cget**](https://manpages.debian.org/testing/i2c-tools/i2cget.8.en.html) and [**i2cset**](https://manpages.debian.org/testing/i2c-tools/i2cset.8.en.html).

When writing to a register, take care you convert the bit(s) to HEX.
Example, to register GPIO1 at 0x51.
GPIO1 is 01 at 3:2 bit, in a byte is 00000**01**0, becomes:

```
i2cset -y 1 0x75 0x51 0x2
```

I2c tools
---------

Use **i2cdetect -y 1** to probe available registers:

-   0x32
-   0x75 → used to configure the device.

Then **i2cdump -y 1 0x32** to see the version:

Disclaimer
==========

Be careful when working with i2c register settings. Some settings might be harmful to the hardware if not handled properly.

Information in this document is believed to be accurate and reliable. However, it does not give any representations or warranties, expressed or implied, as to the accuracy or completeness of such information and shall have no liability for the consequences of use of such information. We take no responsibility for the content in this document if provided by an information source outside of PiSugar. In no event shall we be liable for any indirect, incidental, punitive, special or consequential damages (including - without limitation - lost profits, lost savings, business interruption, costs related to the removal or replacement of any products or rework charges) whether or not such damages are based on tort (including negligence), warranty, breach of contract or any other legal theory.

**Model PiSugar2 (IP5209)**
==================

Read voltage
============

Register address = 0xa2 (low 8 bits) 0xa3 (high 6 bits)

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
| 7:6 || Reserved | | 
| 5:0 | BATVADC(13:8) | Vbat = batvadc*0.26855mv+2.6volt | R | X |
|7:0|BATVADC(7:0)|BATADC(7:0)|R|X|


Custom Push Button
==================

On the board there are two buttons and one switch.

The **Tap Button** can be exposed to be pulled and trigger any software.

-   1 = pressed down
-   2 = released

First initiate(WRITE) the corresponding memory addresses. Then read the GPIO1 register.

Step 1 – Set register 0x51 to GPIO1
-----------------------------------

i2cset -y 1 0x75 0x51 0x2

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:6|-|Reserved|-|-|
|5:4|LIGHT_sel|LED function 00: WLED 01: GPIO2 10: VREF 11: Reserved|R/W|00|
|3:2|L4_sel|L4 00: L4 01: GPIO1 10: Reserved 11: Reserved|R/W|00|
|1:0|L3_sel|L3 00: L# 01: GPIO0 10: Reserved 11: Reserved|R/W|0|


Step 2 – Set GPIO1 in register 0x53 to enabled
----------------------------------------------

i2cset -y 1 0x75 0x53 0xf

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:5|-|Reserved|-|-|
|4:0|GPIO_INEN|GPIO(4:0) input enabled 0: Disabled 1: Enabled|R/W|0|

Step 3 – Read the value from register 0x55
------------------------------------------

i2cget -y 1 0x75 0x55

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:5|-|Reserved|-|-|
|4:0|GPIO_DAT|GPIO(4:0) output|R/W|0|

This will stay enabled, until reset register 0x53 or hardware.

Charging control
================

The GPIO2 pin can be used to enable/disable the charging of the battery.

**Important:** You must follow the order of first disable register 0x54 before you can change register 0x55. Else it is invalid and will be ignored.

Step 1 – Set 0x51 register to GPIO2
-----------------------------------

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:6|-|Reserved|-|-|
|5:4|LIGHT_sel|LED function 00: WLED 01: GPIO2 10: VREF 11: Reserved|R/W|00|
|3:2|L4_sel|L4 00: L4 01: GPIO1 10: Reserved 11: Reserved|R/W|00|
|1:0|L3_sel|L3 00: L3 01: GPIO0 10: Reserved 11: Reserved|R/W|0|

Step 2 – Set GPIO2 in register 0x54 to disabled
-----------------------------------------------

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:5|-|Reserved|-|-|
|4:0|GPIO_OUTEN|GPIO(4:0) output 0: Disabled 1: Enabled Output data|R/W|0|

Step 3 – Set register 0x55 to enable/disable charging.
------------------------------------------------------

I2cset 0x54 to 0 = enable / 1 = disable charging

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:5|-|Reserved|-|-|
|4:0|GPIO_DAT|GPIO(4:0) output|R/W|0|

Step 4 – Set GPIO2 in register 0x54 to enabled
----------------------------------------------

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:5|-|Reserved|-|-|
|4:0|GPIO_OUTEN|GPIO(4:0) output 0: Disabled 1: Enabled Output data|R/W|0


Detect charging status
======================

**Important:** You must follow the order of first disable register 0x54 before you can change register 0x55. Else it is invalid and will be ignored.

Step 1 – Set Vset to internal register
--------------------------------------

i2cset -y 1 0x75 0x51 0x2

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7|-|Reserved|-|-|
|6||1: VSET PIN 0: internal|R/W|1|
|5:0|-|Reserved|-|-|

Step 2 – Set function of Vset to GPIO4
--------------------------------------

Set the function of Vset in the register of 0x52 to gpio4

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:5|-|Reserved|-|-|
|4:0|GPIO_OUTEN|GPIO(4:0) output 0: Disabled 1: Enabled Output data|R/W|0|

Step 3 – Set register 0x53 to enable/disable charging.
------------------------------------------------------

Set gpio4 in the 0x53 register to 1 (enable)

I2cset 0x54 to 0 = enable / 1 = disable charging

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:5|-|Reserved|-|-|
|4:0|GPIO_DAT|GPIO(4:0) input 0: Disabled 1: Enabled|R/W|0|

Step 4 – Read GPIO4 in register 0x55 to enabled
-----------------------------------------------

Read the value of gpio4 in the register of 0x55, which is 1 when charging and 0 when not charging

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:5|-|Reserved|-|-|
|4:0|GPIO_DAT|GPIO(4:0) DATA 0: Not charging 1: Charging|R/W|0|

**Model PiSugar2Pro (IP5312)**
=====================

Read voltage
============

Register address = 0xd0 (low 8 bits) 0xd1 (high 6 bits)

**i2cget -y 1 0x75 0xd0**

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:0|BATVADC(7:0)|BATADC(7:0)|R|X|

i2cget -y 1 0x75 0xd1

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:6|-|Reserved|-|-|
|5:0|BATVADC(13:8)|BATVADC Vbat = batvadc*0.26855mv+2.6volt|R|

Custom Push Button
==================

On the board there are two buttons and one switch.

The **Activate** and **ON/OFF** have fixed functions.

But the **BTN** can be exposed to be pulled and trigger any software. Using the GPIO1 ping.

-   1 = pressed down
-   2 = released

First initiate(WRITE) the corresponding memory addresses. Then read the GPIO1 register.

Step 1 – Set register 0x52 to GPIO1
-----------------------------------

Set the function of L4 in the 0x52 register to gpio1

i2cset -y 1 0x75 0x52 0x2

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7|NTC_sel|NTC 0: NTC 1: GPIO5|R/W|-|
|6:5|VSET_sel|VSET 00: VSET|01: GPIO4 10: ADC 11: Reserved|R/W|--|
|4||Reserved|-|-|
|3|RSET_sel|RSET 0: RSET 1: GPIO3|R/W|0|
|2|LIGHT_sel|LED function 0: Light 1: GPIO2|R/W|0|
|1|L4_sel|LED4 0: L4 1: GPIO1|R/W|0|
|0|L3_sel|L3 0: L3 1: GPIO0|R/W|0|

Step 2 – Set GPIO1 in register 0x54 to enabled
----------------------------------------------

i2cset -y 1 0x75 0x54 0x2

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:5|-|Reserved|-|-|
|4:0|GPIO_IEN|GPIO(5:0) input enabled 0: Disabled 1: Enabled|R/W|

Step 3 – Read the value from register 0x58
------------------------------------------

i2cget -y 1 0x75 0x58

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:5|-|Reserved|-|-|
|4:0|GPIO_DATA|GPIO(5:0) output 0: Released 2: Pressed|R/W|0

This will stay enabled, until reset register 0x54 or hardware.

Charging control
================

The GPIO2 pin can be used to enable/disable the charging of the battery.

**Important:** You must follow the order of first disable register 0x54 before you can change register 0x55. Else it is invalid and will be ignored.

Step 1 – Set 0x52 register to GPIO2
-----------------------------------

Set the function of light in the 0x52 register to gpio2

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7|NTC_sel|NTC 0: NTC 1: GPIO5|R/W|-|
|6:5|VSET_sel|VSET 00: VSET 01: GPIO4 10: ADC 11: Reserved|R/W|--|
|4||Reserved|-|-|
|3|RSET_sel|RSET 0: RSET 1: GPIO3|R/W|0|
|2|LIGHT_sel|LED function 0: Light 1: GPIO2|R/W|0|
|1|L4_sel|LED4 0: L4 1: GPIO1|R/W|0|
|0|L3_sel|L3 0: L3 1: GPIO0|R/W|0|

Step 2 – Set GPIO2 in register 0x56 to disabled
-----------------------------------------------

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:5|-|Reserved|-|-|
|4:0|GPIO_OUTEN|GPIO(4:0) output 0: Disabled 1: Enabled Output data|R/W|0|

Step 3 – Set register 0x58 to enable/disable charging.
------------------------------------------------------

I2cset 0x58 to 0 = enable / 1 = disable charging

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:5|-|Reserved|-|-|
|4:0|GPIO_DAT|GPIO(4:0) output 0: Disabled 1: Enabled|R/W|0|

Step 4 – Set GPIO2 in register 0x54 to enabled
----------------------------------------------

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:5|-|Reserved|-|-|
|4:0|GPIO_OUTEN|GPIO(4:0) output 0: Disabled 1: Enabled Output data|R/W|0

Detect charging status
======================

ADC pin (Vset function pin) is used. Overflow is measured when charging and random value is not charged

**Important:** You must follow the order of first disable register 0x54 before you can change register 0x55. Else it is invalid and will be ignored.

Step 1 – Set Vset to internal register
--------------------------------------

Set the 0x29 register and change Vset to internal register setting

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7|-|Reserved|-|-|
|6|BATSET_sel|1: VSET PIN 0: internal|R/W|1|
|5:0|-|Reserved|-|-|

Step 2 – Set function of Vset to ADC
------------------------------------

Set the function of Vset in the register of 0x52 to ADC

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7|NTC_sel|NTC 0: NTC 1: GPIO5|R/W|-|
|6:5|VSET_sel|VSET 00: VSET 01: GPIO4 10: ADC 11: Reserved|R/W|--|
|4|-|Reserved|-|-|
|3|RSET_sel|RSET 0: RSET 1: GPIO3|R/W|0|
|2|LIGHT_sel|LED function 0: Light 1: GPIO2|R/W|0|
|1|L4_sel|LED4 0: L4 1: GPIO1|R/W|0|
|0|L3_sel|L3 0: L3 1: GPIO0|-|-|

Step 3 – Set VGPI register in 0xC2 to enabled.
----------------------------------------------

Set VGPI in the 0xC2 register to 1

I2cset 0xc2 to 0 = enable / 1 = disable charging

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:5|-|Reserved|-|-|
|4:0|GPIO_DAT|GPIO(4:0) input 0: Disabled 1: Enabled|R/W|0|

Step 4 – Read registers 0xdc and 0xdd 
--------------------------------------

Read the register of 0xdc, 0xdd

The values are **FF, 1F** when charging, and *other values are not charged.*

| Bit(s) | Name | Description | R/W | Reset |
| :-: | :-: | :-: | :-: | :-: |
|7:0|GPIADC (7:0)|GPIADC value (8bit)|R|-|
|7:6|-|Reserved|-|-|
|5:0|GPIADC (13:8)|GPIADC value (6bit)|GPI=GPIADC*0.26855mv+1.5v There is a curve for reading the battery|R|-|


Open-Source libraries
=====================

For developing software, here are some reference to PiSugar2 libraries and code.

PiSugar2 github:

[**https://github.com/PiSugar/PiSugar**](https://github.com/PiSugar/PiSugar)

Wiki:

[**https://github.com/PiSugar/PiSugar/wiki**](https://github.com/PiSugar/PiSugar/wiki)

pwnagotchi:
===========

[**https://github.com/kellertk/pwnagotchi-plugin-pisugar2**](https://github.com/kellertk/pwnagotchi-plugin-pisugar2)

[**https://github.com/PiSugar/pwnagotchi-pisugar2-plugin**](https://github.com/PiSugar/pwnagotchi-pisugar2-plugin)


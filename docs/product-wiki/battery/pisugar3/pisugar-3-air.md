---
sidebar_position: 2
---

# PiSugar3 Air

<img src="/img/pisugar3-air.png" alt="PiSugar 3 Air" width="400"></img>

PiSugar3 Air is a power management board with the same features as PiSugar3.

If you want to use the battery you already have, or want to choose a battery with better performance by yourself, PiSugar3 Air is the best choice for you. With the same hardware features as PiSugar3, PiSugar3 Air provides more flexibility and freedom for your projects.

## Hardware SPECS

- PowerIC: Standalone MCU
- RTC: DS3231, stimulated by MCU
- Type-C: charging port, with E-mark support
- PH2.0 Battery Plug
- Tap Power Button
- Programmable Tap Button
- Extension Interface: I2C interface, 5V output

## Electrical Specifications

| Electrical Specifications |   PiSugar3 Air    |
| :------------------------ | :---------------: |
| Input                     |     5V-3Amax      |
| Output                    |     5V-3Amax      |
| Communication interface   | 0x57/0x68 address |
| Size of PCB               |     65mmX56mm     |

:::info
The Output capability of PiSugar3 Air is up to 5V-3A, and it's limited by the battery you use. Please make sure your battery can provide enough power (>=15W) for your project, otherwise the output may be unstable or insufficient.
:::

## Compatibility

PiSugar3 Air is compatible with a wide range of single-board computers (SBCs) that support I2C communication. It can be used with Raspberry Pi models, as well as other SBCs that have an I2C interface.

- Raspberry Pi Zero
- Raspberry Pi Zero W
- Raspberry Pi Zero 2
- Raspberry Pi Zero 2 W

We have also tested PiSugar3 Air on Radxa Plantforms, and it works well on both of the following models:

- Radxa Zero 3W
- Radxa Cubie A7Z

## Battery Requirements

- Li-ion or Li-Po battery with PH2.0 connector
- Battery voltage: 3.7V (nominal), 4.2V (fully charged)
- Battery capacity: recommended 1500mAh or higher for better performance and longer runtime

:::danger
Make sure the `+/-` polarity of the battery plug matches the PiSugar3 Air's PH2.0 connector, otherwise it may damage the device or cause safety hazards.
:::

### Mounting Steps

- Remove the protective film on the screw nuts of the PiSugar3 Air board.
- Align the four screw nuts of the PiSugar3 Air board with the Raspberry Pi board (PiSugar board under the RPI), the pogo pins on PiSugar3 Air and the RPI's GPIO should be at the same side, and press the RPI board down gently.
- Use the provided screws to secure the PiSugar3 Air board to the Raspberry Pi board.
- Plug a compatible battery into the PH2.0 connector on the PiSugar3 Air board.

## Power-On

The PiSugar3 Air has the `Anti-mistaken Touch` feature enabled by default. (The feature switch is on the webUI, Advanced Settings -> Anti-Mistaken Touch Switch)

<img src="/img/pisugar3antimistouch.gif" alt="PiSugar 3 antimistouch" width="400"></img>

The default power-on method is to short press and then long press (Click & Hold), wait for the LEDs count from 1 to 4.

The default power-off method is to long press.

## Software Installation

<video width="600" controls>
  <source src="https://doc-resourses.pisugar.uk/pisugar3-software-install.mp4" type="video/mp4"></source>
</video>

Run the following script on your pi:

```
wget https://cdn.pisugar.com/release/pisugar-power-manager.sh
bash pisugar-power-manager.sh -c release
```

:::info
Please select the `PiSugar3` model when prompted.
:::

After finished, you can manage the battery by visiting http://\<your raspberry ip\>:8421 in your browser.

![PiSugar logo](http://cdn.pisugar.com/pisugar2/images/ui.png?imageView2/0/w/800)

PiSugar Power Manager is develop in Rust and Vue2.0, with high performace (less than 2% pi0 cpu) and exquisite designed webUI.

User Guide can be found [here](../pisugar-power-manager).

:::info
Since user may use different batteries with different characteristics, PiSugar Power Manager provides a custom battery curve script to measure the battery voltage and capacity, and generate a custom battery curve for better battery status estimation.

More details can be found in the [Custom Battery Guide](../custom-battery).
:::

## Core Features

:::info
PiSugar3 Air has inherited all the hardware features of PiSugar3, except for the battery which is selected by users themselves.
:::

### Full Functions UPS

PiSugar3 Air has full UPS functions and can set up multiple awakening methods to meet various unique project needs.

PiSugar3 Air keeps running/working when external power is connecting or disconnecting to avoid data loss. PiSugar3 Air can infer whether the external power supply is powered, whether the external power supply is disconnected, and also the battery voltage status through the data interface. Users can determine if they need to actively shut down for data protection and can set the device to automatically turn on when the external power supply is restored. With the combination of the above functions, the device can keep running as long as possible on the premise of safety.

### OTA Firmware Upgrade

PiSugar3 Air uses independent MCU control to achieve communication and functions. Only with a simple command, firmware upgrades can be achieved through Raspberry Pi, letting the device get the latest features.

You can use following command to update the firmware of PiSugar3 Air:

```
curl https://cdn.pisugar.com/release/PiSugarUpdate.sh | sudo bash
```

If the device doesn't enter flashing mode after running the script, you can try pressing the reset button located on the PiSugar3 Air's PCB.

<!-- https://cdn.pisugar.com/pisugar-docs/video/pisugar3-ota.mp4 -->
<video width="600" controls>
  <source src="https://doc-resourses.pisugar.uk/pisugar3-ota.mp4" type="video/mp4"></source>
</video>

### Hardware Battery Protection

PiSugar3 Air provides hardware battery protection, limiting battery voltage to nearly 80%. When charging protection is turned on, the battery cycles life can be improved.

### I2C Control, Mutable Address

PiSugar3 Air communicates with the Raspberry Pi through the I2C interface and is compatible with most I2C devices. In addition, the I2C communication address can be customized to avoid I2C address conflicts.

### Software Watchdog

PiSugar3 Air has a software watchdog function. When the function is turned on, the dog needs to be fed regularly, which can effectively prevent the Raspberry Pi from crashing and improve the reliability of the system.

### Anti-Mistaken Touch Switch

Click and hold the power button to turn on/off. This feature can be turn off in software.

## Other Features

### Back contact, easy to install

PiSugar3 Air continues to use the pogo pin design to connect with Raspberry Pi from the back. In this way, it does not occupy the GPIO and is compatible with other GPIO devices.

### TypeC Charging Interface

PiSugar3 Air has a TypeC charging port.

### Onboard RTC

With the ultra-low power consumption design, the onboard RTC can keep the clock running for more than one year when PiSugar3 Air is off. Please note that the RTC will stop running if the battery is removed.

### Soft Shutdown

Hardware events trigger software shutdown. You can set the shutdown script to execute when the power button is pressed. In this way, you can customize the shutdown process, such as saving data before shutdown.

### Custom Button

PiSugar3 Air has a custom button that can be used to trigger custom functions, such as starting a script or sending a signal to the Raspberry Pi.

### WebUI and APP

PiSugar3 Air has a webUI and APP to manage the battery, including battery status, charging status, and other information. You can also set the device parameters through the webUI or APP.

## Other Links

- [PiSugar 3 I2C Datasheet](pisugar-3-i2c)
- [PiSugar 3 RTC Guide](pisugar-3-rtc)
- [PiSugar Certifications](https://github.com/PiSugar/pisugar-documents)

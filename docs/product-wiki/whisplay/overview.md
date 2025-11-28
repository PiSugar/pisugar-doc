---
sidebar_position: 1
---

# Product Overview

**PiSugar Whisplay HAT** is a multifunctional expansion board for Raspberry Pi Zero, integrating a display, microphones, speakers, and more to turn it into a portable interactive device.

### Product Features

- Power supply voltage: 5V
- Logic voltage: 3.3V
- Audio codec chip: WM8960
- Audio control interface: I2C
- Audio data interface: I2S
- Speaker power: 8Ω1W
- Screen size: 1.69 inches (30mm\*37mm)
- Screen resolution: 240\*280RGB
- Screen controller chip: ST7789
- Screen interface: 4-SPI

## Hardware Resources

### Pin Function and Raspberry Pi Pin (Physical Pin Number) Correspondence

<img src="/img/Whisplay_GPIO.jpg" width="300px"></img>

| Pin Function | Pin Number | Pin Function | Pin Number | Pin Function | Pin Number | Pin Function | Pin Number |
| :----------- | :--------- | :----------- | :--------- | :----------- | :--------- | :----------- | :--------- |
| **5V**       | P2, P4     | **LED1**     | P22        | **LCDCTRL**  | P15        | **I2SWS**    | P35        |
| **GND**      | GND        | **LED2**     | P18        | **SPI_RST**  | P7         | **I2SDIN**   | P38        |
| **I2CDAT**   | P3         | **LED3**     | P16        | **SPI_DC**   | P13        | **I2SDOUT**  | P40        |
| **I2CCLK**   | P5         |              |            | **SPI_MOSI** | P19        |              |            |
| **KEY**      | P11        |              |            | **SPI_CLK**  | P23        |              |            |
|              |            |              |            | **SPI_CS**   | P24        |              |            |


## External Speaker Support
<img src="/img/whisplay-diagram.jpg" width="900px"></img>

Whisplay allows for enhanced audio flexibility. Easily switch to an external speaker using the dedicated control.

Note: Compatible speakers must be single-channel (mono) and utilize an XH2.0 connector. 

## Raspberry Pi Usage Instructions

Refer to the github link: [https://github.com/PiSugar/Whisplay](https://github.com/PiSugar/Whisplay)

For now, Whisplay driver only support the latest official Raspberry Pi OS (not including the `Lite` version).

### Audio Function

#### Installation

After cloning the github project, navigate to the Driver directory and use the script to install.

```bash
git clone https://github.com/PiSugar/Whisplay.git --depth 1
cd Whisplay/Driver
sudo bash install_wm8960_drive.sh
sudo reboot
```

#### Sound Card Detection

:::warning
If you are using `PiSugarS (Plus)` as well, please make sure to turn off the `AUTO` switch on `PiSugarS (Plus)` to avoid I2C conflicts. Otherwise the sound card cannot be detected by the system.
:::

Check playback: `aplay -l`

```bash
pi@PI0WH:~ $ aplay -l
**** List of PLAYBACK Hardware Devices ****
card 0: vc4hdmi [vc4-hdmi], device 0: MAI PCM i2s-hifi-0 [MAI PCM i2s-hifi-0]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
card 1: wm8960soundcard [wm8960-soundcard], device 0: bcm2835-i2s-wm8960-hifi wm8960-hifi-0 [bcm2835-i2s-wm8960-hifi wm8960-hifi-0]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```

Check recording: `arecord -l`

```shell
pi@PI0WH:~ $ arecord -l
**** List of CAPTURE Hardware Devices ****
card 1: wm8960soundcard [wm8960-soundcard], device 0: bcm2835-i2s-wm8960-hifi wm8960-hifi-0 [bcm2835-i2s-wm8960-hifi wm8960-hifi-0]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```

Note that the sound card number may vary on different systems and hardware. In the example, the sound card number is 1, and this number should be used in subsequent commands.

#### Recording and Playback Test

:::info

To get the sound card number, use the commands `aplay -l` and `arecord -l` as shown above. And find the sound card number corresponding to `wm8960soundcard`.

:::

Recording

`hw:1,0` indicates using sound card 1, device 0. You can modify the parameters as needed.

```
sudo arecord -D hw:1,0 -f S32_LE -r 16000 -c 2 test.wav
```

Playback

```
sudo aplay -Dhw:1 test.wav
```

Graphical smplayer

The system provides a graphical interface to set more complex functions. You need to press F6 to select the sound card device, and the sound card name is wm8960.

```
sudo alsamixer
```

<img src="/img/soundcardchoice.png" width="50%"></img>

The default volume is relatively low; it can be adjusted up to around 70, beyond which it will cause distortion.

<img src="/img/soundcardconfig.png" width="80%"></img>

### Display and Other Functions

The LCD, RGB LED, and buttons are all controlled by Python, with all functionalities integrated into the Driver.

Please note that the audio component has been installed as a system sound card and is not included in the Driver. You should use the audio functionality as a standard system sound card.

#### Test Program

:::info

In the latest **Raspberry Pi OS (2025-11-24)**, newly install sound card will **NOT** be set as default sound card. So sound card number need to be specified when running the test program. We use a bash shell script to help set the sound card before running the python program.

:::

Navigate to the example directory and run the test program.

```shell
cd example
sudo bash run_test.sh
```

You can also specify an image or sound for testing:

```shell
sudo bash run_test.sh --image test2.jpg --sound test.mp3
```

**Effect**: When executed, the script will display a test image on the LCD. Pressing any button will change the screen to a solid color, and the RGB LED will simultaneously change to match that color.


## Technical Information

### Documents

- Schematic [Schematic](https://cdn.pisugar.com/pisugar-docs/documents/whisplay/Whisplay.pdf)
- 3D model [3D model](https://cdn.pisugar.com/pisugar-docs/documents/whisplay/WhisPlay.step)
- WM8960 Technical Manual [WM8960 Technical Manual](https://cdn.pisugar.com/pisugar-docs/documents/whisplay/WM8960_v4.2.pdf)
- Screen Technical Manual and Source Code [Screen Technical Manual and Source Code](https://cdn.pisugar.com/pisugar-docs/documents/whisplay/1.69LCD.zip)

### Contact Information

For more technical support, please contact: `pisugar.zero@gmail.com`

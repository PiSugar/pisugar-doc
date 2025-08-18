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

## Raspberry Pi Usage Instructions

Refer to the github link: [https://github.com/PiSugar/Whisplay](https://github.com/PiSugar/Whisplay)

For now, Whisplay driver only support the latest official Raspberry Pi OS (not including the `Lite` version).

### Audio Function

#### Installation

After cloning the github project, navigate to the Driver directory and use the script to install.

```bash
git clone https://github.com/PiSugar/Whisplay.git
cd Whisplay/Driver
sudo bash install_wm8960_drive.sh
sudo reboot
```

#### Sound Card Detection

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

Recording and playback test

```bash
sudo arecord -f cd -Dhw:1 | aplay -Dhw:1
```

Recording

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

LCD, RGB LED, and buttons are controlled by python, and all functions have been integrated into the Driver.

#### Test Program 1

Navigate to the example directory and run the test program.

```python
cd Whisplay/example
python test.py
#python test.py test1.jpg
```

#### Test Program 2

The test code completes a function that receives text via socket and displays it, and also notifies the status of the buttons. It can be used as a display interface for an AI chatbot.

- Start the server

  <!-- end list -->

```
cd example
python chatbot-ui.py
```

The program will continuously listen on port 12345. After a client connects, it can send display information and receive button status.

- Test UI

  <!-- end list -->

```
python sockettest.py
```

After running sockettest.py, click the button, and the content displayed on the LCD will change randomly.

## Technical Information

### Documents

- Schematic [Schematic](https://cdn.pisugar.com/pisugar-docs/documents/whisplay/Whisplay.pdf)
- 3D model [3D model](https://cdn.pisugar.com/pisugar-docs/documents/whisplay/WhisPlay.step)
- WM8960 Technical Manual [WM8960 Technical Manual](https://cdn.pisugar.com/pisugar-docs/documents/whisplay/WM8960_v4.2.pdf)
- Screen Technical Manual and Source Code [Screen Technical Manual and Source Code](https://cdn.pisugar.com/pisugar-docs/documents/whisplay/1.69LCD.zip)

### Contact Information

For more technical support, please contact: `pisugar.zero@gmail.com`

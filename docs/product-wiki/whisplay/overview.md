---
sidebar_position: 1
---

# Product Overview

**PiSugar Whisplay HAT** is a multifunctional expansion board for Raspberry Pi Zero, integrating a display, microphones, speakers, and more to turn it into a portable interactive device.

## Product Features

- Power supply voltage: 5V
- Logic voltage: 3.3V
- Audio codec chip: WM8960
- Audio control interface: I2C
- Audio data interface: I2S
- Speaker power: 8Ω 1W
- Screen size: 1.69 inches (30mm\*37mm)
- Screen resolution: 240\*280 RGB
- Screen controller chip: ST7789
- Screen interface: 4-SPI

## Supported Platforms

The current Whisplay driver supports:

- Raspberry Pi boards with a 40-pin header, using the official full Raspberry Pi OS image
- Radxa ZERO 3W (RK3566), using the official Debian 12 Bookworm image
- Radxa Cubie A7Z (Allwinner A733), using the official Debian 11 Bullseye image

:::warning Radxa Cubie A7Z hardware notice
Due to circuit incompatibility, the Whisplay HAT physical button is not safe to use on Radxa Cubie A7Z.
Do not press the button, otherwise the A7Z may shut down or lose power immediately.
:::

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

Whisplay allows enhanced audio flexibility. You can switch to an external speaker using the dedicated control.

Compatible speakers must be single-channel mono speakers and use a PH2.0 connector.

## Getting Started

The Whisplay driver is maintained on GitHub:
[https://github.com/PiSugar/Whisplay](https://github.com/PiSugar/Whisplay)

The `develop` branch uses a unified installer that detects the current platform and runs the matching platform script.

```bash
git clone https://github.com/PiSugar/Whisplay.git --depth 1
cd Whisplay
sudo bash install_driver.sh
sudo reboot
```

The installer enables the buses required by Whisplay. I2C and I2S are used by the WM8960 audio codec, while SPI is used by the LCD.

## Audio Function

### Sound Card Detection

:::warning
If you are using `PiSugarS (Plus)` as well, please make sure to turn off the `AUTO` switch on `PiSugarS (Plus)` to avoid I2C conflicts. Otherwise the sound card cannot be detected by the system.
:::

Check playback devices:

```bash
aplay -l
```

Example output:

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

Check recording devices:

```bash
arecord -l
```

Example output:

```shell
pi@PI0WH:~ $ arecord -l
**** List of CAPTURE Hardware Devices ****
card 1: wm8960soundcard [wm8960-soundcard], device 0: bcm2835-i2s-wm8960-hifi wm8960-hifi-0 [bcm2835-i2s-wm8960-hifi wm8960-hifi-0]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```

The sound card number may vary on different systems and hardware. In the example above, the WM8960 sound card number is `1`.

### Recording and Playback Test

Use the card number for `wm8960soundcard` in the following commands.

Recording:

```bash
sudo arecord -D hw:1,0 -f S32_LE -r 16000 -c 2 test.wav
```

Playback:

```bash
sudo aplay -D hw:1,0 test.wav
```

The system also provides a graphical mixer. Press `F6` to select the `wm8960` sound card.

```bash
sudo alsamixer
```

<img src="/img/soundcardchoice.png" width="50%"></img>

The default volume is relatively low. It can be adjusted up to around 70; higher values may cause distortion.

<img src="/img/soundcardconfig.png" width="80%"></img>

## Display, Buttons, LED, and Apps

The LCD, RGB LED, and button helpers now live in the `runtime/` directory:

- `runtime/whisplay.py`: public Python entry point for LCD, physical button, and LED control
- `runtime/whisplay_client.py`: Python helper for daemon-mode apps

The audio device is installed as a system sound card and should be used through normal ALSA tools or application audio APIs.

### Hardware Test

Run the bundled hardware test from the `example` directory:

```shell
cd Whisplay/example
pip install -r requirements.txt --break-system-packages
bash run_test.sh
```

The script detects the `wm8960soundcard` card index, sets `AUDIODEV`, and runs the full test flow for screen, LED, speaker, button, microphone, and playback.

You can also specify image or sound files:

```shell
bash run_test.sh --image data/test2.jpg --sound data/test.mp3
```

## Whisplay Daemon Service

`whisplay-daemon` is an optional local service that centrally manages the LCD, backlight, RGB LED, button events, and app foreground switching.

When daemon mode is enabled, other apps should register with the daemon instead of directly accessing GPIO or SPI. This lets the daemon own the hardware while foreground apps draw through a shared framebuffer.

Install and start the service:

```shell
cd Whisplay
sudo bash daemon/install_whisplay_daemon_service.sh
systemctl status whisplay-daemon.service --no-pager
```

After installation:

- Settings are stored in `~/.whisplay-daemon/settings.json`
- App entries are loaded from `~/.whisplay-daemon/app/`
- The default socket path is `/tmp/whisplay-daemon.sock`
- App stdout and stderr can be appended to `~/.whisplay-daemon/daemon-app.log` when `use_daemon_default_log` is enabled

View daemon logs:

```shell
journalctl -u whisplay-daemon.service -f
```

### Daemon Desktop

The daemon provides a simple local app launcher:

- Single click: cycle through app entries
- Long press: launch or foreground the selected app
- Four rapid clicks in a foreground app: request the foreground app to exit

It also includes built-in system pages:

- `Bluetooth`: scans nearby Bluetooth devices and lets you bind or unbind the selected device
- `WiFi`: scans nearby Wi-Fi networks and lets you connect; protected-network password input depends on an attached external keyboard

<div style={{display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px', alignItems: 'start', textAlign: 'center'}}>
  <figure style={{margin: 0}}>
    <img src="/img/whisplay/whisplay_desktop.png" alt="Whisplay daemon desktop" />
    <figcaption>Desktop app launcher</figcaption>
  </figure>
  <figure style={{margin: 0}}>
    <img src="/img/whisplay/whisplay_bluetooth.png" alt="Whisplay Bluetooth page" />
    <figcaption>Bluetooth manager</figcaption>
  </figure>
  <figure style={{margin: 0}}>
    <img src="/img/whisplay/whisplay_wifi.png" alt="Whisplay Wi-Fi page" />
    <figcaption>Wi-Fi connection</figcaption>
  </figure>
</div>

The daemon currently supports line-delimited JSON over a Unix socket, with commands such as `health.ping`, `app.register`, `app.list`, `app.launch`, `app.focus.acquire`, `app.focus.release`, `app.exit.request`, `framebuffer.acquire`, `backlight.set`, `led.set`, `led.fade`, `button.get_state`, and `events.subscribe`.

For third-party app integration, refer to the driver repository guides:

- [Third-Party App Integration Guide](https://github.com/PiSugar/Whisplay/blob/develop/APP_INTEGRATION.md)
- [第三方 App 接入指南](https://github.com/PiSugar/Whisplay/blob/develop/APP_INTEGRATION_CN.md)

## Example Programs

The `example` directory contains end-user demos. If `whisplay-daemon` is installed, the default example app entries are seeded into `~/.whisplay-daemon/app/` and shown on the daemon desktop.

| Program | Description |
| :------ | :---------- |
| `run_test.sh` | End-to-end hardware test for screen, LED, speaker, button, microphone, and playback |
| `play_mp4.py` | Plays an MP4 video on the LCD; requires `ffmpeg` |
| `flappy_bird.py` | Single-button Flappy Bird demo with game sound effects |
| `jump_game.py` | Single-button jump game with pseudo-3D tilted rendering and sound effects |

To use the MP4 demo, install `ffmpeg` and download a sample video:

```shell
sudo apt-get install ffmpeg
cd Whisplay/example
wget -O data/whisplay_test.mp4 https://img-storage.pisugar.uk/whisplay_test.mp4
sudo python3 play_mp4.py --file data/whisplay_test.mp4
```

## Driver Repository Layout

The current driver repository is organized by responsibility:

- `install_driver.sh`: auto-detecting driver installer
- `script/`: platform-specific install scripts
- `runtime/`: Python runtime modules including `whisplay.py` and `whisplay_client.py`
- `daemon/`: local hardware daemon, systemd installer, internal pages, and default app definitions
- `audio/`: WM8960 audio assets and Radxa DTS overlays
- `example/`: hardware tests and demo applications

## Technical Information

### Documents

- Schematic [Schematic](https://cdn.pisugar.com/pisugar-docs/documents/whisplay/Whisplay.pdf)
- 3D model [3D model](https://cdn.pisugar.com/pisugar-docs/documents/whisplay/WhisPlay.step)
- WM8960 Technical Manual [WM8960 Technical Manual](https://cdn.pisugar.com/pisugar-docs/documents/whisplay/WM8960_v4.2.pdf)
- Screen Technical Manual and Source Code [Screen Technical Manual and Source Code](https://cdn.pisugar.com/pisugar-docs/documents/whisplay/1.69LCD.zip)

### Related Projects

| Project | Description |
| :------ | :---------- |
| [whisplay-ai-chatbot](https://github.com/PiSugar/whisplay-ai-chatbot) | AI chatbot using Whisplay HAT as display and voice control interface |
| [whisplay-xiaozhi](https://github.com/PiSugar/whisplay-xiaozhi) | XiaoZhi chatbot client implementation for Raspberry Pi with Whisplay HAT |
| [whisplay-lumon-mdr-ui](https://github.com/PiSugar/whisplay-lumon-mdr-ui) | Tiny Lumon MDR device implementation |
| [pizero-openclaw](https://github.com/sebastianvkl/pizero-openclaw) | Openclaw project with Whisplay HAT display and voice control |
| [pisugar-wx](https://github.com/hemna/pisugar-wx) | Weather information display on Whisplay HAT |

### Contact Information

For more technical support, please contact: `pisugar.zero@gmail.com`

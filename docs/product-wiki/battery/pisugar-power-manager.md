---
sidebar_position: 6
---

# PiSugar Power Manager (Software)

PiSugar Power Manager is a software created for PiSugar 2/3 series.

Source Code: https://github.com/PiSugar/pisugar-power-manager-rs

## IMPORTANT

- This software will occupy i2c addresses (0x75 & 0x32 for PiSugar2, 0x57 & 0x68 for PiSugar3). Please avoid other pHATs using these addresses.

- We had upgradged PiSugar2 to new model. To identify it, please check the charging indicate led count, 4-leds is for old model, 2-leds is for new model. The new model is able to accurately detected the charging status and control the charging recycle.

After attaching PiSugar to you pi, you can use the following commands to see whether it works properly:

```
# turn on i2c interface
sudo raspi-config

# Interfacing Options -> I2C -> Yes

# detect i2c bus and devices (PiSugar2)
i2cdetect -y 1
i2cdump -y 1 0x32
i2cdump -y 1 0x75

# detect i2c bus and devices (PiSugar3)
i2cdetect -y 1
i2cdump -y 1 0x57
i2cdump -y 1 0x68
```

If you cannot find any devices, or see lots of 'X.XX.X.X...' things, please try turning off PiSugar 2 and restart one minutes later.

## Support Model List

During the installation process, you need to select the corresponding model. Choosing the correct PiSugar model is essential for the server to function properly.

| Model            |                   Description                   |                                                                                             Photo                                                                                              |
| :--------------- | :---------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| PiSugar 3        |            PiSugar 3/ PiSugar 3 Plus            | ![PiSugar 3](https://github.com/user-attachments/assets/c90403ce-f42e-486a-a506-0dd0ba3b8664) ![PiSugar3Plus](https://github.com/user-attachments/assets/278228b5-22e9-4155-abde-8758006bf14f) |
| PiSugar 2 2-leds |                    PiSugar 2                    |                                               ![PiSugar2-2led](https://github.com/user-attachments/assets/c0d34087-e1c8-4e41-b9b0-07d439128ea1)                                                |
| PiSugar 2 4-leds |   PiSugar 2 (old model, discontinued in 2021)   |                                               ![PiSugar2-4led](https://github.com/user-attachments/assets/f611d48e-d04f-4dcd-8c8c-15eb7bd0db25)                                                |
| PiSugar 2 Pro    | PiSugar 2 Plus (Previously named PiSugar 2 Pro) |                                               ![PiSugar2-plus](https://github.com/user-attachments/assets/09e95248-8fc7-4481-8150-587e46e618cb)                                                |

## Installation

Run the following script on your pi:

```
wget https://cdn.pisugar.com/release/pisugar-power-manager.sh
bash pisugar-power-manager.sh -c release
```

After finished, you can manage the battery by visiting http://\<your raspberry ip\>:8421 in your browser.

<!-- <p>
  <img width="600" src="https://cdn.pisugar.com/pisugar2/images/ui.png?imageView2/0/w/800">
</p> -->

![PiSugar2 WebUI](https://cdn.pisugar.com/pisugar2/images/ui.png?imageView2/0/w/800)

PiSugar Power Manager is develop in Rust and Vue2.0, with high performace (less than 2% pi0 cpu) and exquisite designed webUI.

One more thing, you can also manage the battery by PiSugar APP.

<!-- <p>
  <img width="900" src="https://cdn.pisugar.com/pisugar-app/resources/snapshot.jpg?imageView2/0/w/900"">
</p> -->

![PiSugar App](https://cdn.pisugar.com/pisugar-app/resources/snapshot.jpg?imageView2/0/w/900)

PiSugar App is now available on APP store and Android. It connects the PiSugar-server via port 8423. It allows you manage multiple batteries in your mobile phone!

![qrcode 39796c9](https://github.com/user-attachments/assets/fea4f51d-41cf-4248-abf5-383745e9de8d)

Scan QR Code or click [Here](https://www.pisugar.com/app) to get PiSugar App.

## Commands of controlling pisugar-server systemd service

```
# reload daemon
sudo systemctl daemon-reload

# check status
sudo systemctl status pisugar-server

# start service
sudo systemctl start pisugar-server

# stop service
sudo systemctl stop pisugar-server

# disable service
sudo systemctl disable pisugar-server

# enable service
sudo systemctl enable pisugar-server
```

The service will start automatically after first install. If you stop it, you should restart it manually next time.

## Unix Domain Socket / Websocket / TCP

If you need to get the battery data in your own software, you can request via the following ports

Default ports:

```
uds     /tmp/pisugar-server.sock
tcp     0.0.0.0:8423
ws      0.0.0.0:8422    # standalone websocket api
http    0.0.0.0:8421    # web UI and websocket (/ws)
```

## Commands

Examples:

```bash
    nc -U /tmp/pisugar-server.sock
    get battery
    get model
    rtc_alarm_set 2020-06-26T16:09:34+08:00 127
    set_button_enable long 1
    set_button_shell long sudo shutdown now
    safe_shutdown_level 3
    safe_shutdown_delay 30
```

Or

    echo "get battery" | nc -q 0 127.0.0.1 8423

| Command                    |                                                    Description                                                     |                   Response/Usage                    |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------: |
| get battery                |                                                  battery level %                                                   |                  battery: [number]                  |
| get battery_i              |                                         BAT current in A (PiSugar 2 only)                                          |                 battery_i: [number]                 |
| get battery_v              |                                                  BAT votage in V                                                   |                 battery_v: [number]                 |
| get battery_charging       | charging status (for new model please use battery_power_plugged and battery_allow_charging to get charging status) |           battery_charging: [true\|false]           |
| get model                  |                                                   pisugar model                                                    |                  model: PiSugar 2                   |
| get battery_led_amount     |                                      charging led amount (2 is for new model)                                      |             battery_led_amount: [2\|4]              |
| get battery_power_plugged  |                                       charging usb plugged (new model only)                                        |        battery_power_plugged: [true\|false]         |
| get battery_charging_range |                             charging range restart_point% stop_point% (new model only)                             |      battery_charging_range: [number, number]       |
| get battery_allow_charging |                          whether charging is allowed when usb is plugged (new model only)                          |        battery_allow_charging: [true\|false]        |
| get rtc_time               |                                                     rtc clock                                                      |           rtc_time: [ISO8601 time string]           |
| get rtc_alarm_enabled      |                                              rtc wakeup alarm enable                                               |          rtc_alarm_enabled: [true\|false]           |
| get rtc_alarm_time         |                                               rtc wakeup alarm time                                                |        rtc_alarm_time: [ISO8601 time string]        |
| get alarm_repeat           |                                 rtc wakeup alarm repeat in weekdays (127=1111111)                                  |               alarm_repeat: [number]                |
| get button_enable          |                                            custom button enable status                                             | button_enable: [single\|double\|long] [true\|false] |
| get button_shell           |                                        shell script when button is clicked                                         |    button_shell: [single\|double\|long] [shell]     |
| get safe_shutdown_level    |                                                auto shutdown level                                                 |            safe_shutdown_level: [number]            |
| get safe_shutdown_delay    |                                                auto shutdown delay                                                 |            safe_shutdown_delay: [number]            |
| rtc_pi2rtc                 |                                                sync time pi => rtc                                                 |                                                     |
| rtc_rtc2pi                 |                                                sync time rtc => pi                                                 |                                                     |
| rtc_web                    |                                             sync time web => rtc & pi                                              |                                                     |
| rtc_alarm_set              |                                                set rtc wakeup alarm                                                |    rtc_alarm_set [ISO8601 time string] [repeat]     |
| rtc_alarm_disable          |                                              disable rtc wakeup alarm                                              |                                                     |
| set_button_enable          |                                               auto shutdown level %                                                |   set_button_enable [single\|double\|long] [0\|1]   |
| set_button_shell           |                                                auto shutdown level                                                 | safe_shutdown_level [single\|double\|long] [shell]  |
| set_safe_shutdown_level    |                                             set auto shutdown level %                                              |            safe_shutdown_level [number]             |
| set_safe_shutdown_delay    |                                         set auto shutdown delay in second                                          |            safe_shutdown_delay [number]             |
| set_battery_charging_range |                                                 set charging range                                                 |     set_battery_charging_range [number, number]     |
| set_allow_charging         |                                             enable or disable charging                                             |          set_allow_charging [true\|false]           |
| set_battery_output         |                                          enable or disable battery output                                          |          set_battery_output [true\|false]           |
| set_auth                   |                                     set or clear http auth (with no arguments)                                     |            set_auth [username password]             |
| set_anti_mistouch          |                                          enable or disable anti-mistouch                                           |           set_anti_mistouch [true\|false]           |
| set_soft_poweroff          |                                        enable or disable software poweroff                                         |           set_soft_poweroff [true\|false]           |
| set_soft_poweroff_shell    |                                                soft poweroff shell                                                 |          set_soft_poweroff_shell [string]           |
| set_input_protect          |                                     enable or disable battery hardware protect                                     |           set_input_protect [true\|false]           |

## Server Config

You can manually edit `/etc/pisugar-server/config.json` to update the config.

https://github.com/PiSugar/pisugar-power-manager-rs/blob/master/doc/config.md

## Uninstall

```
# Uninstall/Purge
sudo dpkg -P pisugar-server

```

## Release

See https://github.com/PiSugar/pisugar-power-manager-rs/releases

## LICENSE

GPL v3

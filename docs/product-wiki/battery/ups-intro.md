---
sidebar_position: 0
---

# PiSugar Battery / UPS

PiSugar Kitchen began by developing battery solutions for Raspberry Pi Zero, in what we believe is the best way.

We believe we can help pi lovers to achieve their dreams with our knowledge and passion :-D

Take a look at our products:

* [PiSugar1](./pisugar-1)
* [PiSugar2](./pisugar2/pisugar-2)
* [PiSugar2 Plus](./pisugar2/pisugar-2-plus)
* [PiSugarS Series](./pisugar-s-series)
* [PiSugar3 Series](./pisugar3/pisugar-3-series)

Extra Support Documents:

* [PiSugar Power Manager (Software)](./pisugar-power-manager)
* [PiSugar Scripts Example (Software)](https://github.com/PiSugar/pisugar-power-manager-rs/tree/master/scripts)
* [FAQ](./faq)
* [Where To Buy](./where-to-buy)
* [Certifications](https://github.com/PiSugar/pisugar-documents)


# Function comparison

|                                                     | PiSugar 1     | PiSugarS Series | PiSugar2 Series | PiSugar3 Series  |
|-----------------------------------------------------|---------------|-----------------|-----------------|------------------|
| zero                                                | Compatible    | Compatible      | Compatible      | Compatible       |
| 3A/3B/3B+/4B                                        | Not Support   | Compatible      | Compatible      | Compatible       |
| 5B                                                  | Not Support   | Not Support     | Not Support     | Compatible       |
| Data exchange                                       | Not Support   | Not Support     | I2C             | I2C              |
| Power indicator                                     | LED           | Not Support     | Not Support     | LED              |
| Use while charging                                  | Support       | Support         | Support         | Support          |
| Shut down while charging                            | Not Support   | Support         | Support         | Support          |
| External power-off                                  | Cause restart | Keep working    | Keep working    | Keep working     |
| External power off detection                        | Not Support   | Support*        | Support         | Support          |
| Automatic power on when external power is restored  | Support       | Support         | Support**       | Support          |
| On board RTC                                        | Not Support   | Not Support     | Support         | Support          |
| Timing boot                                         | Not Support   | Not Support     | Support         | Support          |
| Custom button                                       | Not Support   | Support***      | Support         | Support          |
| Button to turn on                                   | Support       | Support         | Not Support     | Support          |
| Button to shut down                                 | Support       | Support***      | Support         | Support          |
| APP & Web UI                                        | Not Support   | Not Support     | Support         | Support          |
| Software watchdog                                   | Not Support   | Not Support     | Not Support     | Support          |
| Start-up watchdog                                   | Not Support   | Not Support     | Not Support     | Support          |


*: Only supported when the automatic power-on function is turned on

**: Two independent power supplies are required

***: Refer to github function description

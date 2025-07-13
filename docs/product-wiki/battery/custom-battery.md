---
sidebar_position: 9
---

# Custom Battery Capacity

If you find that the current capacity of the PiSugar battery doesn't meet your requirements, you can replace it with a larger single lithium battery on your own.

:::danger

**DO NOT attempt to connect multiple batteries in parallel.** The PiSugar charging circuit is NOT designed for parallel battery configurations and doing so can be dangerous.

:::

:::warning

Modifications to the circuit may void the product warranty.

:::

## Battery Specifications

When selecting a replacement battery, please ensure it meets the following criteria:

- **Type**: Single-cell lithium battery (3.7V)
- **Connector**: JST PH 2.54mm connector (plus version) or direct soldering to the board (zero version)
- **Polarity**: Please check the polarity markings on the PiSugar board

## Custom Battery Curve (For PiSugar 2/3)

If you are using a battery with a different capacity than the original, you may need to adjust the battery curve in the PiSugar software.

To measure the battery curve, you can use the following steps:

1. Fully charge the battery using the PiSugar charging circuit.
2. Connect to the Raspberry Pi and run our provided battery logging [script](https://github.com/PiSugar/pisugar-power-manager-rs/blob/master/scripts/record-level.sh) under light system load conditions.
3. Let it discharge continuously until the battery is depleted and the system shuts down.
4. Extract data points from the recorded time and voltage measurements.
5. Calculate the estimated battery percentage corresponding to each voltage level.
6. Write these values into the JSON configuration `/etc/pisugar/config.json`. (add the `battery_curve` key if it doesn't exist)

```json
{
  "battery_curve": [
    [3.3, 10], 
    [3.5, 60], 
    [4.0, 90],
    [4.2, 100]
  ]
}
```

Note: The above values are examples. Your actual battery curve should be based on measurements from your specific battery.

## Important Notes

- Using batteries larger than the recommended size may affect the physical fit in your project
- The PiSugar's charging circuit is designed for specific battery capacities; extremely large batteries may take longer to charge
- Always use quality batteries from reputable manufacturers
- Never use damaged or swollen batteries

:::warning

Improper handling of lithium batteries can pose safety risks. Always follow proper safety procedures when working with lithium batteries.

:::

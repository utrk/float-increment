import { Button, Stack, TextField } from "@mui/material";
import type React from "react";
import { useState } from "react";

const float64Buffer = new ArrayBuffer(8);
const float64View = new DataView(float64Buffer);

const Calc = () => {
  const [value, setValue] = useState("");

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    const number = Number(value);
    if (!Number.isNaN(number) || !Number.isNaN(float64View.getFloat64(0))) {
      float64View.setFloat64(0, number);
    }
  };

  const incrementFloat64 = () => {
    let bigUint64 = float64View.getBigUint64(0);
    bigUint64 = bigUint64 === 0xffffffffffffffffn ? 0n : bigUint64 + 1n;

    float64View.setBigUint64(0, bigUint64);

    setValue(float64View.getFloat64(0).toString());
  };
  const decrementFloat64 = () => {
    let bigUint64 = float64View.getBigUint64(0);
    bigUint64 = bigUint64 === 0n ? 0xffffffffffffffffn : bigUint64 - 1n;

    float64View.setBigUint64(0, bigUint64);

    setValue(float64View.getFloat64(0).toString());
  };

  const handleClickIncrement = () => {
    incrementFloat64();
  };
  const handleClickDecrement = () => {
    decrementFloat64();
  };

  return (
    <>
      <TextField
        fullWidth
        label="Number (Numeric Literal)"
        variant="filled"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onBlur={handleBlur}
        sx={{ mt: 1 }}
      />
      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{ flexWrap: "wrap", mt: 1 }}
      >
        <Button onClick={handleClickIncrement} variant="contained">
          Increment
        </Button>
        <Button onClick={handleClickDecrement} variant="contained">
          Decrement
        </Button>
      </Stack>
    </>
  );
};

export default Calc;

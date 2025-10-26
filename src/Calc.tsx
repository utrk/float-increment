import { Button, Stack, TextField } from "@mui/material";
import type React from "react";
import { useState } from "react";

const float64Buffer = new ArrayBuffer(8);
const float64View = new DataView(float64Buffer);

const Calc = () => {
  const [literalValue, setLiteralValue] = useState("");
  const [binaryValue, setBinaryValue] = useState("");

  const handleLiteralFieldBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    const number = Number(literalValue);
    if (!Number.isNaN(number) || !Number.isNaN(float64View.getFloat64(0))) {
      float64View.setFloat64(0, number);
    }
    setLiteralValue(number.toString());
    setBinaryValue(float64View.getBigUint64(0).toString(2));
  };

  const incrementFloat64 = () => {
    let bigUint64 = float64View.getBigUint64(0);
    bigUint64 = bigUint64 === 0xffffffffffffffffn ? 0n : bigUint64 + 1n;

    float64View.setBigUint64(0, bigUint64);

    setLiteralValue(float64View.getFloat64(0).toString());
    setBinaryValue(float64View.getBigUint64(0).toString(2));
  };

  const decrementFloat64 = () => {
    let bigUint64 = float64View.getBigUint64(0);
    bigUint64 = bigUint64 === 0n ? 0xffffffffffffffffn : bigUint64 - 1n;

    float64View.setBigUint64(0, bigUint64);

    setLiteralValue(float64View.getFloat64(0).toString());
    setBinaryValue(float64View.getBigUint64(0).toString(2));
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
        variant="outlined"
        value={literalValue}
        onChange={(event) => setLiteralValue(event.target.value)}
        onBlur={handleLiteralFieldBlur}
        sx={{ mt: 1 }}
      />
      <TextField
        fullWidth
        label="Binary value"
        variant="filled"
        value={binaryValue}
        disabled
        sx={{ mt: 1 }}
      />
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap", mt: 1 }}>
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

import { Button, Stack, TextField } from "@mui/material";
import type React from "react";
import { useState } from "react";

const float64View = new DataView(new ArrayBuffer(8));

const Calc = () => {
  const [literalValue, setLiteralValue] = useState("");
  const [binaryValue, setBinaryValue] = useState("");

  const handleLiteralFieldBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    const number = Number(literalValue);
    if (
      !Number.isNaN(number) ||
      (literalValue === "NaN" && !Number.isNaN(float64View.getFloat64(0)))
    ) {
      float64View.setFloat64(0, number);
      setFieldValues();
    }
  };

  const incrementFloat64 = () => {
    const bigUint64 = (float64View.getBigUint64(0) + 1n) & 0xffffffffffffffffn;

    float64View.setBigUint64(0, bigUint64);
    setFieldValues();
  };

  const decrementFloat64 = () => {
    const bigUint64 = (float64View.getBigUint64(0) - 1n) & 0xffffffffffffffffn;

    float64View.setBigUint64(0, bigUint64);
    setFieldValues();
  };

  const setFieldValues = () => {
    let binaryValue = float64View.getBigUint64(0).toString(2).padStart(64, "0");
    binaryValue = `${binaryValue.slice(0, 1)} ${binaryValue.slice(1, 12)} ${binaryValue.slice(12)}`;

    setLiteralValue(float64View.getFloat64(0).toString());
    setBinaryValue(binaryValue);
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
        error={Number.isNaN(Number(literalValue)) && literalValue !== "NaN"}
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

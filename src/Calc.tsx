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

  const handleBinaryFieldBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    const spaceRemovedValue = binaryValue.replaceAll(" ", "");
    if (/^[01]{64}$/.test(spaceRemovedValue)) {
      const bigUint64 = BigInt(`0b${spaceRemovedValue}`);
      float64View.setBigUint64(0, bigUint64);
      setFieldValues();
    }
  };

  const setFieldValues = () => {
    let binaryValue = float64View.getBigUint64(0).toString(2).padStart(64, "0");
    binaryValue = `${binaryValue.slice(0, 1)} ${binaryValue.slice(1, 12)} ${binaryValue.slice(12)}`;

    setLiteralValue(float64View.getFloat64(0).toString());
    setBinaryValue(binaryValue);
  };

  const addToFloat64 = (amount: bigint) => {
    const bigUint64 = (float64View.getBigUint64(0) + amount) & 0xffffffffffffffffn;

    float64View.setBigUint64(0, bigUint64);
    setFieldValues();
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
        variant="outlined"
        multiline
        value={binaryValue}
        onChange={(event) => setBinaryValue(event.target.value)}
        onBlur={handleBinaryFieldBlur}
        error={!/^[01]{64}$|^$/.test(binaryValue.replaceAll(" ", ""))}
        sx={{ mt: 1 }}
        slotProps={{
          htmlInput: {
            sx: {
              wordBreak: "break-all",
              fontVariationSettings: '"wdth" 87.5',
            },
          },
        }}
      />
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap", mt: 1 }}>
        <Button onClick={() => addToFloat64(1n)} variant="contained">
          Increment
        </Button>
        <Button onClick={() => addToFloat64(-1n)} variant="contained">
          Decrement
        </Button>
      </Stack>
    </>
  );
};

export default Calc;

import { useState, useRef } from "react";

interface PinInputProps {
  length?: number;
  onChange: (value: string) => void;
}

export default function PinInput({ length = 6, onChange }: PinInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    onChange(newValues.join(""));

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {values.map((digit, i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-12 h-12 text-center border border-black rounded-lg text-xl font-bold focus:outline-none focus:ring-2 focus:ring-black"
        />
      ))}
    </div>
  );
}

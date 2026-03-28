import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface PairingCodeInputProps {
  onSubmit: (code: string) => void;
}

export function PairingCodeInput({ onSubmit }: PairingCodeInputProps) {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const code = newDigits.join('');
    if (code.length === 6 && newDigits.every(d => d !== '')) {
      onSubmit(code);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">Enter the 6-digit code from the sender</p>
      <div className="flex gap-2">
        {digits.map((digit, i) => (
          <motion.input
            key={i}
            ref={el => { inputRefs.current[i] = el; }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            className="w-12 h-14 text-center rounded-lg bg-secondary border border-border text-2xl font-mono font-bold text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        ))}
      </div>
    </div>
  );
}

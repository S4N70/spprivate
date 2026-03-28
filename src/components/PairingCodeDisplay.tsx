import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface PairingCodeDisplayProps {
  code: string;
}

export function PairingCodeDisplay({ code }: PairingCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">Share this code with the receiving device</p>
      <div className="flex gap-2">
        {code.split('').map((digit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="w-12 h-14 flex items-center justify-center rounded-lg bg-secondary border border-border text-2xl font-mono font-bold text-primary glow-primary"
          >
            {digit}
          </motion.div>
        ))}
      </div>
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied!' : 'Copy code'}
      </button>
    </div>
  );
}

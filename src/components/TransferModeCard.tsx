import { motion } from 'framer-motion';
import { Wifi, Radio } from 'lucide-react';

interface TransferModeCardProps {
  mode: 'wifi' | 'offline';
  selected: boolean;
  onSelect: () => void;
}

export function TransferModeCard({ mode, selected, onSelect }: TransferModeCardProps) {
  const isWifi = mode === 'wifi';

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`relative w-full p-6 rounded-xl text-left transition-all duration-300 ${
        selected
          ? 'bg-primary/10 border-2 border-primary glow-primary'
          : 'glass border border-border hover:border-primary/40'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${selected ? 'bg-primary/20' : 'bg-secondary'}`}>
          {isWifi ? (
            <Wifi className={`w-6 h-6 ${selected ? 'text-primary' : 'text-muted-foreground'}`} />
          ) : (
            <Radio className={`w-6 h-6 ${selected ? 'text-primary' : 'text-muted-foreground'}`} />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">
            {isWifi ? 'Wi-Fi (LAN)' : 'Offline (Direct)'}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {isWifi
              ? 'Fast transfer over your local network. Both devices must be on the same Wi-Fi.'
              : 'No router needed. Creates a direct P2P link using Wi-Fi Direct or local hotspot.'}
          </p>
          <div className="flex gap-2 mt-3">
            {isWifi ? (
              <>
                <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-mono">TCP/IP</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono">WebRTC</span>
              </>
            ) : (
              <>
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-mono">Wi-Fi Direct</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-warning/10 text-warning font-mono">Hotspot</span>
              </>
            )}
          </div>
        </div>
      </div>
      {selected && (
        <motion.div
          layoutId="mode-indicator"
          className="absolute top-3 right-3 w-3 h-3 rounded-full bg-primary"
          initial={false}
        />
      )}
    </motion.button>
  );
}

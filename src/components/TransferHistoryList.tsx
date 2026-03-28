import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Wifi, Radio, CheckCircle2, XCircle, Clock, Trash2 } from 'lucide-react';
import { TransferRecord, formatFileSize, clearHistory } from '@/lib/transfer-history';

interface TransferHistoryListProps {
  records: TransferRecord[];
  onClear: () => void;
}

const statusIcons = {
  completed: <CheckCircle2 className="w-4 h-4 text-success" />,
  failed: <XCircle className="w-4 h-4 text-destructive" />,
  cancelled: <XCircle className="w-4 h-4 text-warning" />,
  'in-progress': <Clock className="w-4 h-4 text-primary animate-pulse" />,
};

export function TransferHistoryList({ records, onClear }: TransferHistoryListProps) {
  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Clock className="w-12 h-12 mb-4 opacity-30" />
        <p className="text-lg font-medium">No transfers yet</p>
        <p className="text-sm mt-1">Your transfer history will appear here</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{records.length} transfer{records.length !== 1 ? 's' : ''}</p>
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear all
        </button>
      </div>
      <div className="space-y-2">
        {records.map((record, i) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="glass rounded-lg p-4 flex items-center gap-4"
          >
            <div className={`p-2 rounded-lg ${record.direction === 'sent' ? 'bg-primary/10' : 'bg-accent/10'}`}>
              {record.direction === 'sent' ? (
                <ArrowUpRight className="w-5 h-5 text-primary" />
              ) : (
                <ArrowDownLeft className="w-5 h-5 text-accent" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{record.fileName}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <span>{formatFileSize(record.fileSize)}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  {record.mode === 'wifi' ? <Wifi className="w-3 h-3" /> : <Radio className="w-3 h-3" />}
                  {record.mode === 'wifi' ? 'Wi-Fi' : 'Direct'}
                </span>
                <span>·</span>
                <span>{record.deviceName}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              {statusIcons[record.status]}
              <span className="text-xs text-muted-foreground">
                {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

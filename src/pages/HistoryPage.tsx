import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TransferHistoryList } from '@/components/TransferHistoryList';
import { getTransferHistory, clearHistory, type TransferRecord } from '@/lib/transfer-history';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState<TransferRecord[]>([]);

  useEffect(() => {
    setRecords(getTransferHistory());
  }, []);

  const handleClear = () => {
    clearHistory();
    setRecords([]);
  };

  return (
    <div className="min-h-screen gradient-mesh">
      <header className="flex items-center gap-4 px-6 py-4 max-w-3xl mx-auto">
        <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold text-foreground">Transfer History</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <TransferHistoryList records={records} onClear={handleClear} />
        </motion.div>
      </main>
    </div>
  );
};

export default HistoryPage;

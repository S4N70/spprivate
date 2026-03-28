import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PairingCodeInput } from '@/components/PairingCodeInput';
import { addTransferRecord } from '@/lib/transfer-history';

type Step = 'code' | 'connecting' | 'receiving' | 'done';

const ReceivePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('code');
  const [progress, setProgress] = useState(0);

  const handleCodeSubmit = (code: string) => {
    setStep('connecting');
    // Simulate connection then transfer
    setTimeout(() => {
      setStep('receiving');
      let p = 0;
      const interval = setInterval(() => {
        p += Math.random() * 18;
        if (p >= 100) {
          p = 100;
          clearInterval(interval);
          addTransferRecord({
            id: crypto.randomUUID(),
            fileName: 'presentation.pdf',
            fileSize: 4_500_000,
            direction: 'received',
            mode: 'wifi',
            status: 'completed',
            deviceName: 'Sender Device',
            timestamp: Date.now(),
            progress: 100,
          });
          addTransferRecord({
            id: crypto.randomUUID(),
            fileName: 'photo-2024.jpg',
            fileSize: 2_300_000,
            direction: 'received',
            mode: 'wifi',
            status: 'completed',
            deviceName: 'Sender Device',
            timestamp: Date.now(),
            progress: 100,
          });
          setStep('done');
        }
        setProgress(Math.min(p, 100));
      }, 400);
    }, 2000);
  };

  return (
    <div className="min-h-screen gradient-mesh">
      <header className="flex items-center gap-4 px-6 py-4 max-w-3xl mx-auto">
        <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Receive Files</h1>
      </header>

      <main className="max-w-lg mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {step === 'code' && (
            <motion.div key="code" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground mb-1">Enter pairing code</h2>
                <p className="text-sm text-muted-foreground">Ask the sender for their 6-digit code</p>
              </div>
              <PairingCodeInput onSubmit={handleCodeSubmit} />
            </motion.div>
          )}

          {step === 'connecting' && (
            <motion.div key="connecting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-6 py-8">
              <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin" />
              <div>
                <h2 className="text-xl font-semibold text-foreground">Connecting...</h2>
                <p className="text-sm text-muted-foreground mt-1">Establishing secure P2P connection</p>
              </div>
            </motion.div>
          )}

          {step === 'receiving' && (
            <motion.div key="receiving" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center space-y-8">
              <h2 className="text-xl font-semibold text-foreground">Receiving files...</h2>
              <div className="space-y-3">
                <div className="h-3 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-sm font-mono text-muted-foreground">{Math.round(progress)}%</p>
              </div>
            </motion.div>
          )}

          {step === 'done' && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto glow-accent"
              >
                <Download className="w-8 h-8 text-accent" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Files Received!</h2>
                <p className="text-muted-foreground mt-1">2 files saved to your device</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:opacity-90 transition-opacity"
                >
                  Home
                </button>
                <button
                  onClick={() => navigate('/history')}
                  className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                >
                  View History
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ReceivePage;

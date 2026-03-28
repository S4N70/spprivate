import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FileDropZone } from '@/components/FileDropZone';
import { TransferModeCard } from '@/components/TransferModeCard';
import { PairingCodeDisplay } from '@/components/PairingCodeDisplay';
import { generatePairingCode, addTransferRecord, type TransferMode } from '@/lib/transfer-history';

type Step = 'files' | 'mode' | 'pairing' | 'transferring' | 'done';

const SendPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('files');
  const [files, setFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<TransferMode>('wifi');
  const [pairingCode] = useState(generatePairingCode);
  const [progress, setProgress] = useState(0);

  const handleStartTransfer = () => {
    setStep('pairing');
  };

  const handleSimulateConnection = () => {
    setStep('transferring');
    // Simulate transfer progress
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        files.forEach(file => {
          addTransferRecord({
            id: crypto.randomUUID(),
            fileName: file.name,
            fileSize: file.size,
            direction: 'sent',
            mode,
            status: 'completed',
            deviceName: 'Remote Device',
            timestamp: Date.now(),
            progress: 100,
          });
        });
        setStep('done');
      }
      setProgress(Math.min(p, 100));
    }, 500);
  };

  return (
    <div className="min-h-screen gradient-mesh">
      <header className="flex items-center gap-4 px-6 py-4 max-w-3xl mx-auto">
        <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Send Files</h1>
      </header>

      <main className="max-w-lg mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {step === 'files' && (
            <motion.div key="files" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <FileDropZone files={files} onFilesChange={setFiles} />
              {files.length > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setStep('mode')}
                  className="w-full mt-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  Continue
                </motion.button>
              )}
            </motion.div>
          )}

          {step === 'mode' && (
            <motion.div key="mode" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mb-2">Choose transfer mode</h2>
              <TransferModeCard mode="wifi" selected={mode === 'wifi'} onSelect={() => setMode('wifi')} />
              <TransferModeCard mode="offline" selected={mode === 'offline'} onSelect={() => setMode('offline')} />
              <button
                onClick={handleStartTransfer}
                className="w-full mt-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Generate Pairing Code
              </button>
            </motion.div>
          )}

          {step === 'pairing' && (
            <motion.div key="pairing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-1">Waiting for connection</h2>
                <p className="text-sm text-muted-foreground">
                  {mode === 'wifi' ? 'Both devices must be on the same network' : 'The receiver should be nearby'}
                </p>
              </div>
              <PairingCodeDisplay code={pairingCode} />
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Listening for connections...</span>
              </div>
              <button
                onClick={handleSimulateConnection}
                className="text-sm text-primary hover:underline"
              >
                Simulate a device connecting →
              </button>
            </motion.div>
          )}

          {step === 'transferring' && (
            <motion.div key="transferring" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center space-y-8">
              <h2 className="text-xl font-semibold text-foreground">Sending files...</h2>
              <div className="space-y-3">
                <div className="h-3 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-sm font-mono text-muted-foreground">{Math.round(progress)}%</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Sending {files.length} file{files.length !== 1 ? 's' : ''} via {mode === 'wifi' ? 'Wi-Fi' : 'Direct'} connection
              </p>
            </motion.div>
          )}

          {step === 'done' && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto glow-accent"
              >
                <Send className="w-8 h-8 text-success" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Transfer Complete!</h2>
                <p className="text-muted-foreground mt-1">{files.length} file{files.length !== 1 ? 's' : ''} sent successfully</p>
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

export default SendPage;

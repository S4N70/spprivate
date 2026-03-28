import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Download, Clock, Zap, Shield, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-mesh">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">BeamIt</span>
        </div>
        <button
          onClick={() => navigate('/history')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Clock className="w-4 h-4" />
          History
        </button>
      </header>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
            Transfer files
            <br />
            <span className="text-primary glow-text">across any device</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-lg mx-auto">
            Fast, secure peer-to-peer file sharing. No cloud uploads. 
            Works over Wi-Fi or direct connection.
          </p>
        </motion.div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/send')}
            className="group glass rounded-2xl p-8 text-left hover:border-primary/50 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:glow-primary transition-all">
              <Send className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Send Files</h2>
            <p className="text-muted-foreground text-sm">
              Select files and generate a pairing code for the receiving device.
            </p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/receive')}
            className="group glass rounded-2xl p-8 text-left hover:border-accent/50 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:glow-accent transition-all">
              <Download className="w-7 h-7 text-accent" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Receive Files</h2>
            <p className="text-muted-foreground text-sm">
              Enter the sender's code to start receiving files on this device.
            </p>
          </motion.button>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20"
        >
          {[
            { icon: Globe, label: 'Cross-Platform', desc: 'Any OS, any device' },
            { icon: Shield, label: 'Private & Secure', desc: 'Direct P2P, no cloud' },
            { icon: Zap, label: 'Lightning Fast', desc: 'LAN speed transfers' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="text-center">
              <Icon className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Index;

export type TransferStatus = 'completed' | 'failed' | 'cancelled' | 'in-progress';
export type TransferDirection = 'sent' | 'received';
export type TransferMode = 'wifi' | 'offline';

export interface TransferRecord {
  id: string;
  fileName: string;
  fileSize: number;
  direction: TransferDirection;
  mode: TransferMode;
  status: TransferStatus;
  deviceName: string;
  timestamp: number;
  progress: number;
}

const STORAGE_KEY = 'beamit-transfer-history';

export function getTransferHistory(): TransferRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addTransferRecord(record: TransferRecord): void {
  const history = getTransferHistory();
  history.unshift(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 200)));
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function generatePairingCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateDeviceId(): string {
  let id = localStorage.getItem('beamit-device-id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('beamit-device-id', id);
  }
  return id;
}

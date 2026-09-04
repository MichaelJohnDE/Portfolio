'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function ObscuredIp({ ip }: { ip: string }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <p 
        className={`text-lg font-mono text-on-surface transition-all duration-300 ${
          !isVisible ? 'blur-md select-none' : ''
        }`}
      >
        {ip}
      </p>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface transition-colors focus:outline-none"
        title={isVisible ? "Hide IP Address" : "Reveal IP Address"}
      >
        {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

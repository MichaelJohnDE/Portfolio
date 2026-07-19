"use client";

import React from 'react';
import { ReactLenis } from 'lenis/react';

export default function ClientProviders({ children }) {
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
}

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

console.log(process.env.SOLID_POD_OIDC_ISSUER);

createRoot(document.getElementById('solid')!).render(<App />);

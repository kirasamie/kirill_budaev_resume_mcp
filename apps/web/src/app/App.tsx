import { Route, Routes } from 'react-router-dom';

import { HomePage } from '@pages/home';
import { ResumePage } from '@pages/resume';
import { SiteFooter } from '@widgets/site-footer';
import { SiteHeader } from '@widgets/site-header';

export const App = () => (
  <div className="flex min-h-screen flex-col">
    <SiteHeader />
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </main>
    <SiteFooter />
  </div>
);

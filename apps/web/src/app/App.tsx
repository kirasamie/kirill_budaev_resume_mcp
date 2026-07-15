import { HomePage } from '@pages/home';
import { SiteFooter } from '@widgets/site-footer';
import { SiteHeader } from '@widgets/site-header';

export const App = () => (
  <div className="flex min-h-screen flex-col">
    <SiteHeader />
    <main className="flex-1">
      <HomePage />
    </main>
    <SiteFooter />
  </div>
);

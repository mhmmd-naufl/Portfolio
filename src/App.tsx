import { About } from './components/About';
import { CustomCursor } from './components/CustomCursor';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { WorkList } from './components/WorkList';

export default function App() {
  return (
    <div className="min-h-screen bg-base font-sans text-ink">
      <CustomCursor />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Hero />
        <WorkList />
        <About />
      </main>
      <Footer />
    </div>
  );
}

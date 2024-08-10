import Hero from './components/layout/Hero';
export default function Home() {
  return (
    <div>
      <Hero />
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-bold mt-48">Welcome to Next Starter Kit</h1>
      </div>
    </div>
  );
}

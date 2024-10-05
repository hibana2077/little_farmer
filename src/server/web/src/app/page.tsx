import HomeContent from '../components/HomeContent';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
          歡迎使用水耕栽培學習平台
        </h1>
        <HomeContent />
      </main>
    </div>
  );
}
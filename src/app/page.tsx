import MainNews from '@/component/MainNews';
import NewsGrid from '@/component/NewsGrid';
import MostRead from '@/component/MostRead';
import type { Article } from '@/types/article';

interface NewsSection {
  title: string;
  curationId: string;
  curationType: string;
  link: string | null;
  count: number;
  articles: Article[];
}

const HIDDEN_SECTIONS = [
  'বিবিসি বাংলা এখন হোয়াটসঅ্যাপে!',
  'বিবিসি বাংলা এখন ইন্সটাগ্রামে!',
];

export default async function Home() {
  let sections: NewsSection[] = [];

  try {
    const res = await fetch(
      'https://news-api-v2.vercel.app/api/news/sections',
      {
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();
    sections = data.data ?? [];
  } catch (error) {
    console.error('NEWS FETCH FAILED:', error);
  }

  // প্রথম section = প্রধান খবর
  const mainNews = sections[0]?.articles ?? [];

  return (
    <div>
      {/* প্রধান খবর + সর্বাধিক পঠিত */}
      <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-4 sm:py-6 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <MainNews news={mainNews} />
        </div>

        <aside className="min-w-0 lg:col-span-1">
          <MostRead />
        </aside>
      </div>

      {/* বাকি সব section */}
      {sections
        .slice(1)
        .filter(section => !HIDDEN_SECTIONS.includes(section.title))
        .map(section => (
          <NewsGrid
            key={section.curationId}
            title={section.title}
            news={section.articles}
          />
        ))}
    </div>
  );
}

import MainNews from '@/component/MainNews';
import NewsGrid from '@/component/NewsGrid';

import MostRead from '@/component/MostRead';

interface Article {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string | null;
  lastPublished: string | null;
  source: string;
}

interface NewsSection {
  title: string;
  curationId: string;
  curationType: string;
  link: string | null;
  count: number;
  articles: Article[];
}

export default async function Home() {
  let sections: NewsSection[] = [];

  try {
    const res = await fetch(
      'https://news-api-v2.vercel.app/api/news/sections',
      {
        next: {
          revalidate: 300,
        },
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
      {/* Marquee */}
     

      {/* প্রধান খবর */}
      <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MainNews news={mainNews} />
        </div>

        <aside className="lg:col-span-1">
          <MostRead/>
        </aside>
      </div>

      {/* বাকি সব section */}
      {sections
        .slice(1)
        .filter(
          section =>
            section.title !== 'বিবিসি বাংলা এখন হোয়াটসঅ্যাপে!' &&
            section.title !== 'বিবিসি বাংলা এখন ইন্সটাগ্রামে!',
        )
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

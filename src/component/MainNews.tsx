import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/types/article';

interface MainNewsProps {
  news: Article[];
}

const MainNews = ({ news }: MainNewsProps) => {
  if (!news || news.length === 0) return null;

  const [firstNews, ...otherNews] = news;
  const { id, title, description, imageUrl, imageAlt, category } = firstNews;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* প্রধান খবর */}
      <div className="card bg-base-100 shadow-sm">
        <figure className="relative aspect-video w-full">
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </figure>
        <div className="card-body p-4 sm:p-6">
          <h2 className="card-title text-lg leading-snug sm:text-2xl">
            <Link href={`/news/${id}`}>{title}</Link>
          </h2>
          <p className="line-clamp-3 text-sm sm:text-base">{description}</p>
          <div className="card-actions justify-end">
            <span className="rounded-xl bg-blue-500 px-3 py-1.5 text-sm font-bold text-amber-50 sm:rounded-2xl sm:p-2.5 sm:text-xl">
              {category}
            </span>
          </div>
        </div>
      </div>

      {/* অন্যান্য খবর */}
      <div className="grid content-start gap-2">
        {otherNews.slice(0, 7).map(item => (
          <Link
            key={item.id}
            href={`/news/${item.id}`}
            className="card bg-base-100 border border-gray-400 p-3 text-sm font-semibold transition-colors hover:border-red-600 hover:text-red-600 sm:p-4 sm:text-base"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;

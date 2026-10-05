import Image from 'next/image';
import Link from 'next/link';

export interface Article {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string;
  lastPublished: string;
  source: string;
}

interface NewsGridProps {
  title: string;
  news: Article[];
}

const NewsGrid = ({ title, news }: NewsGridProps) => {
  if (!news || news.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-4 sm:py-6">
      <div className="mb-4 border-b-2 border-red-600 pb-2">
        <h2 className="text-lg font-semibold sm:text-xl">{title}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {news.map(item => (
          <Link
            key={item.id}
            href={`/news/${item.id}`}
            className="group block overflow-hidden rounded-lg border border-gray-300 bg-white transition-shadow duration-200 hover:shadow-md"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.imageAlt || item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-3 sm:p-4">
              <p className="mb-1 text-xs text-red-600 sm:mb-2 sm:text-sm">
                {item.category}
              </p>
              <h3 className="mb-2 text-base font-semibold leading-snug transition-colors group-hover:text-red-600 sm:text-lg">
                {item.title}
              </h3>
              <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-600">
                {item.description}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(item.firstPublished).toLocaleDateString('bn-BD', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  timeZone: 'Asia/Dhaka',
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewsGrid;

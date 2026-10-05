import Image from 'next/image';
import Link from 'next/link';

/* ---------- Types ---------- */
type TextBlock = { type: 'text'; text: string };
type SubheadingBlock = { type: 'subheading'; text: string };
type ImageBlock = {
  type: 'image';
  url: string;
  width?: number;
  height?: number;
  caption?: string;
  altText?: string;
  copyrightHolder?: string;
};
type Block = TextBlock | SubheadingBlock | ImageBlock;

type Article = {
  id: string;
  title: string;
  imageUrl?: string;
  link: string;
  sourceUrl?: string;
  source: string;
  firstPublished: string;
  lastPublished: string;
  tags?: string[];
  topics?: { id: string; name: string }[];
  body?: Block[];
};

type Props = { params: Promise<{ newsId: string }> };

/* ---------- Helpers ---------- */
const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('bn-BD', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Asia/Dhaka',
  });

const Figure = ({
  block,
  priority = false,
}: {
  block: ImageBlock;
  priority?: boolean;
}) => (
  <figure className="my-5 sm:my-8">
    <Image
      src={block.url}
      alt={block.altText || block.caption || ''}
      width={block.width ?? 1024}
      height={block.height ?? 576}
      sizes="(min-width: 768px) 700px, 100vw"
      priority={priority}
      className="h-auto w-full rounded-lg object-cover sm:rounded-xl"
    />
    {(block.caption || block.copyrightHolder) && (
      <figcaption className="mt-2 text-xs leading-relaxed text-neutral-500 sm:text-sm">
        {block.caption}
        {block.copyrightHolder && (
          <span className="ml-1 text-neutral-400">
            ({block.copyrightHolder})
          </span>
        )}
      </figcaption>
    )}
  </figure>
);

/* ---------- Page ---------- */
const DetailsPage = async ({ params }: Props) => {
  const { newsId } = await params;
  const url = `https://news-api-v2.vercel.app/api/article/${newsId}`;

  let article: Article | null = null;

  try {
    const res = await fetch(url, { next: { revalidate: 600 } });
    const text = await res.text();
    article = JSON.parse(text)?.data ?? null;
  } catch (err) {
    console.error('ARTICLE FETCH FAILED:', url, err);
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl p-4 sm:p-6">
        <p>এই খবরটি এখন পাওয়া যাচ্ছে না।</p>
        <Link href="/" className="text-red-600 hover:underline">
          ← হোমে ফিরে যান
        </Link>
      </div>
    );
  }

  const body = article.body ?? [];

  const [first, ...rest] = body;
  const heroBlock = first?.type === 'image' ? first : null;
  const content = heroBlock ? rest : body;

  return (
    <div className="mx-auto max-w-3xl px-3 py-4 sm:px-4 sm:py-8">
      <Link
        href="/"
        className="mb-3 inline-block text-sm font-semibold text-red-600 hover:underline sm:mb-4"
      >
        ← হোমে ফিরে যান
      </Link>

      <article className="break-words rounded-xl border border-neutral-200 bg-white p-4 text-neutral-900 shadow-sm sm:rounded-2xl sm:p-8 md:p-10">
        {/* ট্যাগ */}
        {article.tags && article.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2 sm:mb-4">
            {article.tags.map(tag => (
              <span
                key={tag}
                className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 sm:px-3"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* শিরোনাম */}
        <h1 className="text-2xl font-extrabold leading-snug tracking-tight sm:text-3xl md:text-4xl">
          {article.title}
        </h1>

        {/* সূত্র ও সময় */}
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-neutral-200 pb-4 text-xs text-neutral-500 sm:mt-4 sm:gap-x-3 sm:pb-5 sm:text-sm">
          <span className="font-semibold text-neutral-700">
            {article.source}
          </span>
          <span aria-hidden>•</span>
          <time dateTime={article.firstPublished}>
            {formatDate(article.firstPublished)}
          </time>
        </div>

        {/* মূল ছবি */}
        {heroBlock ? (
          <Figure block={heroBlock} priority />
        ) : (
          article.imageUrl && (
            <Figure
              block={{
                type: 'image',
                url: article.imageUrl,
                altText: article.title,
              }}
              priority
            />
          )
        )}

        {/* খবরের মূল অংশ */}
        <div>
          {content.map((block, i) => {
            switch (block.type) {
              case 'subheading':
                return (
                  <h2
                    key={i}
                    className="mb-3 mt-8 border-l-4 border-red-600 pl-3 text-xl font-bold sm:mt-10 sm:text-2xl"
                  >
                    {block.text}
                  </h2>
                );
              case 'text':
                return (
                  <p
                    key={i}
                    className="mb-4 text-base leading-7 text-neutral-800 sm:mb-5 sm:text-lg sm:leading-8"
                  >
                    {block.text}
                  </p>
                );
              case 'image':
                return <Figure key={i} block={block} />;
              default:
                return null;
            }
          })}
        </div>

        {/* মূল সূত্র */}
        <div className="mt-8 border-t border-neutral-200 pt-4 text-xs text-neutral-500 sm:mt-10 sm:pt-5 sm:text-sm">
          সূত্র:{' '}
          <a
            href={article.sourceUrl ?? article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-red-600 hover:underline"
          >
            {article.source}-এ মূল খবর পড়ুন
          </a>
        </div>
      </article>
    </div>
  );
};

export default DetailsPage;

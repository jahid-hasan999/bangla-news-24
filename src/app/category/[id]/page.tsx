import NewsGrid from '@/component/NewsGrid';
import type { Article } from '@/types/article';

type CategoryResponse = { title?: string; data?: Article[]; topicId?: string };

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const url = `https://news-api-v2.vercel.app/api/category/${id}`;

  let result: CategoryResponse | null = null;

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    const text = await res.text();
    result = JSON.parse(text);
  } catch (err) {
    console.error('CATEGORY FETCH FAILED:', url, err);
  }

  if (!result?.data) {
    return (
      <p className="container mx-auto px-4 py-6">
        এই ক্যাটেগরির খবর এখন পাওয়া যাচ্ছে না।
      </p>
    );
  }

  return <NewsGrid title={result.title ?? id} news={result.data} />;
};

export default CategoryPage;

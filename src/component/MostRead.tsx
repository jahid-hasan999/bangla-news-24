import Link from 'next/link';

interface MostReadDataType {
  rank: number;
  title: string;
  id: string;
  link: string;
}

const MostRead = async () => {
  const res = await fetch('https://news-api-v2.vercel.app/api/news/most-read');
  const data = await res.json();
  const resData: MostReadDataType[] = data.data ?? [];

  return (
    <div className="bg-base-100 w-full p-3 shadow-sm sm:p-4">
      <h2 className="text-xl font-bold sm:text-2xl">সর্বাধিক পঠিত</h2>
      <ol className="mt-2 grid gap-1">
        {resData.map(item => (
          <li key={item.id} className="rounded-xl p-2 text-sm sm:text-base">
            <Link
              href={`/news/${item.id}`}
              className="flex gap-2 hover:text-red-600"
            >
              <span className="shrink-0 font-bold text-red-600">
                {item.rank}.
              </span>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MostRead;

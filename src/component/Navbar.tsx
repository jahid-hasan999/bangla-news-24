import Link from 'next/link';

type Category = {
  slug: string;
  title: string;
  scrapable: boolean;
  topicId: string | null;
};

const linkClass =
  'block whitespace-nowrap border-b-2 border-transparent px-3 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-red-600 hover:text-red-600';

const Navbar = async () => {
  const res = await fetch('https://news-api-v2.vercel.app/api/categories');
  const data = await res.json();
  const navs: Category[] = data.data ?? [];
  const filternavs = navs.filter(n => n.scrapable);

  return (
    <nav className="border-b border-neutral-200">
      {/* মোবাইলে বামে শুরু (স্ক্রল), md থেকে মাঝখানে */}
      <ul className="container mx-auto flex items-center justify-start gap-1 overflow-x-auto px-4 [scrollbar-width:none] md:justify-center [&::-webkit-scrollbar]:hidden">
        <li className="shrink-0">
          <Link href="/" className={linkClass}>
            হোম
          </Link>
        </li>

        {filternavs.map(nav => (
          <li key={nav.slug} className="shrink-0">
            <Link href={`/category/${nav.slug}`} className={linkClass}>
              {nav.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

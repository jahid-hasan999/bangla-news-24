import Link from 'next/link';

type Category = {
  slug: string;
  title: string;
  scrapable: boolean;
  topicId:string|null
};

const linkClass =
  'block border-b-2 border-transparent px-3 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-red-600 hover:text-red-600';
const Navbar = async () => {
  
  
  const res = await fetch('https://news-api-v2.vercel.app/api/categories');
  const data = await res.json();
  const navs = data.data;
 const filternavs = navs.filter((n:Category) => n.scrapable);
    return (
      <nav className=" border-neutral-200">
        <ul className="mx-auto flex container justify-center items-center gap-1 overflow-x-auto px-4 [scrollbar-width:none]">
          <li className="shrink-0">
            <Link href="/" className={linkClass}>
              হোম
            </Link>
          </li>

          {filternavs.map((nav: Category) => (
            <li key={nav.topicId} className="shrink-0">
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
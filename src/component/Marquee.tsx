import MarqueeText from 'react-marquee-text';
import 'react-marquee-text/dist/styles.css';

interface MarqueeType {
  title: string;
  id: string | number;
}

const Marquee = async () => {
  const res = await fetch('https://news-api-v2.vercel.app/api/news?limit=10');
  const data = await res.json();
  const headLine: MarqueeType[] = data.data ?? [];

  return (
    <div className="bg-red-700 py-1 text-amber-50">
      <div className="container mx-auto flex items-center">
        <div className="shrink-0 bg-red-900 px-2 py-1 text-sm font-bold whitespace-nowrap sm:text-base">
          <p>সর্বশেষ</p>
        </div>

        {/* min-w-0 + overflow-hidden: মোবাইলে পেজ চওড়া হওয়া আটকায় */}
        <div className="min-w-0 flex-1 overflow-hidden text-sm sm:text-base">
          <MarqueeText direction="right" duration={10}>
            {headLine.map(head => (
              <span key={head.id} className="whitespace-nowrap">
                <span>{head.title}</span>
                <span className="mx-3 text-xl font-bold sm:text-3xl">*</span>
              </span>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;

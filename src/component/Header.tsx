import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const date = new Date().toLocaleDateString('bn-BD', {
    dateStyle: 'full',
    timeZone: 'Asia/Dhaka',
  });

  return (
    <header className="container mx-auto flex flex-col items-center gap-3 px-4 py-4 md:grid md:grid-cols-3">
      {/* বাম: শুধু ডেস্কটপে ফাঁকা */}
      <div className="hidden md:block" />

      {/* মাঝ: লোগো + তারিখ */}
      <div className="flex flex-col items-center text-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.webp"
            alt="Bangla News 24"
            height={50}
            width={50}
            className="h-9 w-9 sm:h-[50px] sm:w-[50px]"
          />
          <span className="text-2xl font-bold text-red-600 sm:text-3xl">
            Bangla News 24
          </span>
        </Link>
        <p className="mt-1 text-xs text-neutral-600 sm:text-sm">{date}</p>
      </div>

      {/* ডান: সাইন ইন / সাইন আপ */}
      <div className="flex items-center justify-center gap-2 md:justify-end md:gap-3">
        <Link href="/sign-in" className="btn btn-sm md:btn-md">
          সাইন ইন
        </Link>
        <Link
          href="/sign-up"
          className="btn btn-sm bg-red-700 text-amber-50 md:btn-md"
        >
          সাইন আপ
        </Link>
      </div>
    </header>
  );
};

export default Header;

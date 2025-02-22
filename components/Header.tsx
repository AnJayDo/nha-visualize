import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-center p-4 fixed top-0 left-0 w-full z-50">
      <nav className="hidden md:flex gap-8">
        <Link href="/" className="text-white hover:text-gray-200">
          Home
        </Link>
        <Link href="/players" className="text-white hover:text-gray-200">
          Top Players
        </Link>
        <Link href="/bad-players" className="text-white hover:text-gray-200">
          Worst Players
        </Link>
        <Link href="/teams" className="text-white hover:text-gray-200">
          Top Teams
        </Link>
        <Link href="/player" className="text-white hover:text-gray-200">
          Player Stats
        </Link>
      </nav>
    </header>
  );
}

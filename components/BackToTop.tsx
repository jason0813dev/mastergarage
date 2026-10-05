'use client';

import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after 300px scroll
      setVisible(window.scrollY > 300);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
    type="button"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    aria-label="Back to top"
    className="fixed bottom-6 right-6 z-9999 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-xl hover:bg-gray-900 transition"
  >
    🡹
  </button>
  );
}

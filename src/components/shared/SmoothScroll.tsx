'use client';
import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface SmoothScrollingProps {
  children: ReactNode;
}

const SmoothScrollProvider = ({ children }: Readonly<SmoothScrollingProps>) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPathnameRef = useRef<string>(pathname);
  const isInitialRender = useRef(true);
  const [lenisEnabled, setLenisEnabled] = useState(false);

  const lenis = useLenis();

  // Defer Lenis initialization to prevent scroll lag on first paint
  useEffect(() => {
    // Wait for page to fully render before enabling smooth scroll
    const timer = setTimeout(() => {
      setLenisEnabled(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Handle hash navigation on route change
    const hash = window.location.hash;
    if (hash && lenis) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        lenis.scrollTo(hash, {
          offset: -100,
          duration: 1.2,
        });
      }, 150);
      return;
    }

    // Only scroll to top if pathname actually changed (navigation), not on initial render or reload
    if (!isInitialRender.current && previousPathnameRef.current !== pathname) {
      lenis?.scrollTo(0, { immediate: true });
    }

    // Update refs
    previousPathnameRef.current = pathname;
    isInitialRender.current = false;
  }, [pathname, searchParams, lenis]);

  useEffect(() => {
    if (!lenis) {
      return;
    }

    const handleClick = (ele: Element) => {
      lenis.scrollTo(ele.getAttribute('href') ?? '', {
        offset: -100,
      });
    };

    const elements = document.querySelectorAll('.lenis-scroll-to');
    const clickHandler = (e: Event) => handleClick(e.target as Element);

    elements.forEach((ele) => {
      ele.addEventListener('click', clickHandler);
    });

    return () => {
      elements.forEach((ele) => {
        ele.removeEventListener('click', clickHandler);
      });
    };
  }, [lenis, pathname]);

  return (
    <ReactLenis root options={{ duration: lenisEnabled ? 0.8 : 0, lerp: lenisEnabled ? 0.1 : 1 }}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScrollProvider;

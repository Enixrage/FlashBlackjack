import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, key } = useLocation();

  useEffect(() => {
    // Check if the history state has scroll position saved (for back/forward navigation)
    const scrollPos = window.history.state && window.history.state.scroll;

    if (scrollPos) {
      window.scrollTo(scrollPos.x, scrollPos.y);
    } else {
      // Scroll to top on normal navigation
      window.scrollTo(0, 0);
    }
  }, [pathname, key]);

  // Save scroll position when navigating away
  useEffect(() => {
    const saveScroll = () => {
      const { scrollX, scrollY } = window;
      // Replace history state with scroll info
      window.history.replaceState({ ...window.history.state, scroll: { x: scrollX, y: scrollY } }, '');
    };

    window.addEventListener('scroll', saveScroll);
    return () => {
      window.removeEventListener('scroll', saveScroll);
      saveScroll(); // save once more on unmount
    };
  }, []);

  return null;
};

export default ScrollToTop;

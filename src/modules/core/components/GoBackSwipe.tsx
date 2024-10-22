import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { useSwipeBackStore } from '@/store/swipe-back-store';

const SWIPE_ARROW_WIDTH = 44;

const BackSwipe: React.FC = () => {
  const [arrowVisible, setArrowVisible] = useState(false); // Controls visibility of the arrow
  const arrowRef = useRef<HTMLDivElement>(null); // Ref for the arrow DOM element

  const location = useLocation();
  const navigate = useNavigate();
  const { enabled, setSwipeBackEnabled } = useSwipeBackStore();

  const swipeThreshold = 32; // Minimum swipe distance to trigger navigation

  const { ref } = useSwipeable({
    onSwiping: (eventData) => {
      const positionX = Math.min(eventData.deltaX, SWIPE_ARROW_WIDTH);

      if (eventData.dir === 'Right' && positionX > 0) {
        setArrowVisible(true); // Show the arrow while swiping
        if (arrowRef.current) {
          arrowRef.current.style.translate = `${positionX}px`; // Update arrow position for re-render
          arrowRef.current.style.opacity = `${positionX / SWIPE_ARROW_WIDTH}`; // Update arrow position for re-render
        }
      }
    },
    onSwipedRight: (eventData) => {
      if (eventData.absX >= swipeThreshold) {
        if (arrowRef.current) {
          arrowRef.current.style.translate = `${SWIPE_ARROW_WIDTH}px`; // Ensure arrow is fully visible for feedback
        }
        navigate(-1); // Go back after a brief delay for transition
      }
    },
    onSwiped: () => {
      if (arrowVisible) {
        window.setTimeout(() => {
          if (arrowRef.current) {
            arrowRef.current.style.translate = '0px'; // Slide arrow back off-screen
          }
        }, 100);
        window.setTimeout(() => setArrowVisible(false), 200); // Hide the arrow after animation
      }
    },
    trackTouch: location.pathname !== '/' && enabled, // Track touch events
  });

  // Enable swipe back on page change
  useEffect(() => {
    setSwipeBackEnabled(true);
  }, [location.pathname]);

  // Attach the swipeable events to the body element
  useEffect(() => {
    ref(document.body);
    return () => ref(null); // Clean up event listeners on unmount
  }, []);

  // Styling for the arrow with dynamic left positioning
  const arrowStyle: React.CSSProperties = {
    position: 'fixed',
    left: `-${SWIPE_ARROW_WIDTH}px`, // Use the dynamic position
    top: 'calc(50% - 110.5px)',
    width: SWIPE_ARROW_WIDTH + 'px', // Match the width of the background SVG
    height: '221px', // Match the height of the background SVG
    transition: 'translate 0.1s ease-out, opacity 0.15s ease-out', // Smooth sliding transition
    zIndex: 99,
  };

  return (
    <>
      {arrowVisible && (
        <div ref={arrowRef} style={arrowStyle}>
          {/* Background SVG */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='44'
            height='221'
            viewBox='0 0 44 221'
            fill='none'
          >
            <path
              d='M0 0.5V220.5L16 175.5L36.6619 135.631C45.9951 117.622 46.2387 96.2551 37.3186 78.038L16 34.5L0 0.5Z'
              fill='#583BE8'
            />
          </svg>
          {/* Back Arrow SVG */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            style={{
              position: 'absolute',
              top: 'calc(50% - 18px)',
              left: '10px',
            }}
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M15.4881 4.43057C15.8026 4.70014 15.839 5.17361 15.5694 5.48811L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5695C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51192C14.7001 4.19743 15.1736 4.161 15.4881 4.43057Z'
              fill='#FAFAFA'
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default BackSwipe;

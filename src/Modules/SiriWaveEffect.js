import React from 'react'
import Lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import LottieeSIRI from './lotte-siri.json'
function SiriWaveEffect() {
  const lottieContainer = useRef(null);
  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: lottieContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: LottieeSIRI,
    });
    return () => {
      animation.destroy();
    };
  }, []);

  return <div ref={lottieContainer}/>;
}

export default SiriWaveEffect
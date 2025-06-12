/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, useState } from 'react';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const ref = useRef(null);
  const [showPreviewMessage, setShowPreviewMessage] = useState(false);

  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  const handleEnded = () => {
    setShowPreviewMessage(true);
    setTimeout(() => setShowPreviewMessage(false), 3000);
    onEnded();
  };

  return (
    <div className="relative">
      <audio
        src={activeSong?.attributes?.previews?.[0]?.url}
        ref={ref}
        loop={repeat}
        onEnded={handleEnded}
        onTimeUpdate={onTimeUpdate}
        onLoadedData={onLoadedData}
      />
      {showPreviewMessage && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm">
          Preview ended - This is a 30-second preview
        </div>
      )}
    </div>
  );
};

export default Player;

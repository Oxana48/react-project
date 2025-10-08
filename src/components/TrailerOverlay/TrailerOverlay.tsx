import { useEffect, useState, useRef } from "react";
import CrossAuthSvg from "../../assets/svg/auth-cross.svg?react";
import "./TrailerOverlay.css";

interface TrailerOverlayProps {
  trailerUrl: string | null;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const TrailerOverlay: React.FC<TrailerOverlayProps> = ({
  trailerUrl,
  title,
  isOpen,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const controlTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 3);
      setIsPlaying(true);
      setShowControls(false);
    } else {
      setIsVisible(false);
    }

    return () => {
      if (controlTimeoutRef.current) {
        clearTimeout(controlTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const togglePlayPause = () => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const iframeWindow = iframe.contentWindow;

    if (iframeWindow) {
      if (isPlaying) {
        iframeWindow.postMessage(
          "{'event': 'command', 'func': 'pauseVideo', 'args': '')",
          "*"
        );
      } else {
        iframeWindow.postMessage(
          "{'event': 'command', 'func': 'playVideo', 'args': '')",
          "*"
        );
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleIframeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePlayPause();
    setShowControls(true);

    if (controlTimeoutRef.current) {
      clearTimeout(controlTimeoutRef.current);
    }

    controlTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleMouseMove = () => {
    setShowControls(true);

    if (controlTimeoutRef.current) {
      clearTimeout(controlTimeoutRef.current);
    }
    controlTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`trailer__overlay ${isVisible ? "visible" : ""}`}
      onClick={handleOverlayClick}
      onMouseMove={handleMouseMove}
    >
      <div className="trailer__container">
        <button
          className="trailer__close"
          type="button"
          onClick={onClose}
          aria-label="Закрыть трейлер"
        >
          <CrossAuthSvg width={24} height={24} />
        </button>

        {trailerUrl ? (
          <div className="trailer__wrapper">
            <iframe
              className="trailer__frame"
              ref={iframeRef}
              src={`${trailerUrl}?autoplay=1&mute=0&enablejsapi=1&modestbranding=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              title={`Трейлер фильма: ${title}`}
              onClick={handleIframeClick}
            />

            <div className={`trailer__control ${showControls ? "visible" : ""}`}>
              <div className="trailer__control-overlay" onClick={togglePlayPause}>
                <div className="trailer__control-circle">
                  {isPlaying ? (
                    <span className="trailer__icon">Pause</span>
                  ) : (
                    <span className="trsiler__icon">Play</span>
                  )}
                </div>
              </div>

              <div className="trailer__title">{title}</div>
            </div>
          </div>
        ) : (
          <div className="trailer__error">
            <p>Трелер недоступен</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrailerOverlay;

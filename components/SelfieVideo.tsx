"use client";

import React, { useEffect, useRef, useState } from "react";

interface SelfieVideoProps {
  fullScreen?: boolean;
  className?: string;
}

export default function SelfieVideo({ fullScreen = false, className = "" }: SelfieVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const getVideo = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err: any) {
        setError("Unable to access camera. Please allow camera access.");
      }
    };
    getVideo();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const containerClasses = fullScreen
    ? "absolute inset-0 z-0 w-full h-full overflow-hidden bg-black"
    : "flex flex-col items-center mb-4";

  const videoContainerClasses = fullScreen
    ? "w-full h-full"
    : "rounded-lg overflow-hidden border-2 border-primary bg-black w-40 h-40 flex items-center justify-center relative";

  const videoClasses = fullScreen
    ? "w-full h-full object-cover"
    : "w-full h-full object-cover";

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className={videoContainerClasses}>
        {error ? (
          <span className="text-red-500 text-xs p-2 text-center">{error}</span>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={videoClasses}
            aria-label="Your live selfie video"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
    </div>
  );
}

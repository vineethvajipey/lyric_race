"use client";

import React, { useEffect, useRef, useState } from "react";

export default function SelfieVideo() {
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

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="rounded-lg overflow-hidden border-2 border-primary bg-black w-40 h-40 flex items-center justify-center">
        {error ? (
          <span className="text-red-500 text-xs p-2 text-center">{error}</span>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-40 h-40 object-cover"
            aria-label="Your live selfie video"
          />
        )}
      </div>
    </div>
  );
}

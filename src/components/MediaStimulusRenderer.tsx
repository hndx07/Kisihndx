import React from 'react';
import { DataSoalItem } from '../types';
import { Image, Music, Video, Code, Volume2, Film, Globe } from 'lucide-react';

interface MediaStimulusRendererProps {
  soal: DataSoalItem;
  mode?: 'screen' | 'print' | 'both';
  className?: string;
  hideInPrint?: boolean;
}

export const MediaStimulusRenderer: React.FC<MediaStimulusRendererProps> = ({
  soal,
  mode = 'both',
  className = '',
  hideInPrint = false,
}) => {
  const { mediaType, mediaUrl, embedCode, mediaCaption } = soal;

  // If no media is defined, don't render anything
  if (!mediaType || mediaType === 'none' || (!mediaUrl && !embedCode)) {
    return null;
  }

  // Detect YouTube URL
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  const isYouTube = mediaUrl ? getYouTubeEmbedUrl(mediaUrl) : null;

  return (
    <div className={`my-2 text-center break-inside-avoid ${hideInPrint ? 'print:hidden' : ''} ${className}`}>
      {/* 1. GAMBAR (IMAGE) - Safe constrained print formatting */}
      {mediaType === 'image' && (
        <div className="space-y-1 max-w-full">
          {embedCode ? (
            <div 
              className="max-w-md mx-auto overflow-hidden rounded-lg print:border-none print:shadow-none print:max-h-36 print:max-w-[280px] print:mx-auto print:overflow-hidden [&>img]:max-h-56 [&>img]:mx-auto [&>img]:object-contain [&>img]:rounded-md print:[&>img]:max-h-32 print:[&>img]:max-w-[260px] print:[&>img]:h-auto print:[&>img]:w-auto"
              dangerouslySetInnerHTML={{ __html: embedCode }}
            />
          ) : (
            mediaUrl && (
              <div className="inline-block max-w-full">
                <img
                  src={mediaUrl}
                  alt={mediaCaption || `Gambar Stimulus Soal ${soal.no}`}
                  className="max-h-52 max-w-full sm:max-w-md mx-auto object-contain rounded-lg border border-slate-200 shadow-2xs print:border-none print:shadow-none print:max-h-32 print:max-w-[260px]"
                  loading="lazy"
                />
              </div>
            )
          )}
          {mediaCaption && (
            <p className="text-[10px] sm:text-[11px] font-semibold text-slate-600 italic mt-1 print:text-[9.5px] print:text-slate-800 print:mt-0.5">
              {mediaCaption}
            </p>
          )}
        </div>
      )}

      {/* 2. SUARA / AUDIO (LISTENING) - Interactive on screen, neat badge on print */}
      {mediaType === 'audio' && (
        <div className="space-y-1 max-w-md mx-auto">
          {/* On Screen: Interactive Audio Player */}
          <div className="print:hidden bg-slate-50 border border-slate-300 p-2.5 rounded-xl flex flex-col items-center gap-1.5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 self-start">
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span>Stimulus Suara / Audio Listening</span>
            </div>
            {embedCode ? (
              <div 
                className="w-full flex justify-center [&>audio]:w-full"
                dangerouslySetInnerHTML={{ __html: embedCode }}
              />
            ) : (
              mediaUrl && (
                <audio controls className="w-full h-8" preload="metadata">
                  <source src={mediaUrl} />
                  Browser Anda tidak mendukung pemutar audio.
                </audio>
              )
            )}
            {mediaCaption && (
              <p className="text-[10px] text-slate-500 italic text-left w-full">
                {mediaCaption}
              </p>
            )}
          </div>

          {/* On Print: Clean Institutional Listening Badge on Exam Paper */}
          <div className="hidden print:flex items-center justify-center gap-1.5 py-1 px-3 border border-slate-700 rounded bg-slate-50 text-[10px] font-bold text-slate-900 my-1 mx-auto max-w-sm">
            <Volume2 className="w-3.5 h-3.5 shrink-0" />
            <span>[ 🎧 Audio Listening: {mediaCaption || `Track Soal No. ${soal.no}`} ]</span>
          </div>
        </div>
      )}

      {/* 3. VIDEO - Interactive on screen, neat badge on print */}
      {mediaType === 'video' && (
        <div className="space-y-1 max-w-md mx-auto">
          {/* On Screen: Interactive Video Player */}
          <div className="print:hidden rounded-xl overflow-hidden border border-slate-300 bg-black shadow-xs">
            {embedCode ? (
              <div 
                className="aspect-video w-full flex items-center justify-center [&>iframe]:w-full [&>iframe]:h-full [&>video]:w-full [&>video]:h-full"
                dangerouslySetInnerHTML={{ __html: embedCode }}
              />
            ) : isYouTube ? (
              <div className="aspect-video w-full">
                <iframe
                  src={isYouTube}
                  title={mediaCaption || `Video Stimulus Soal ${soal.no}`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : mediaUrl ? (
              <video controls className="w-full max-h-56">
                <source src={mediaUrl} />
                Browser Anda tidak mendukung pemutar video.
              </video>
            ) : null}
          </div>

          {/* On Print: Clean Video Badge on Exam Paper */}
          <div className="hidden print:flex items-center justify-center gap-1.5 py-1 px-3 border border-slate-700 rounded bg-slate-50 text-[10px] font-bold text-slate-900 my-1 mx-auto max-w-sm">
            <Film className="w-3.5 h-3.5 shrink-0" />
            <span>[ 🎬 Stimulus Video: {mediaCaption || `Video Soal No. ${soal.no}`} ]</span>
          </div>

          {mediaCaption && (
            <p className="print:hidden text-[10px] text-slate-500 italic mt-0.5">
              {mediaCaption}
            </p>
          )}
        </div>
      )}

      {/* 4. CUSTOM EMBED CODE (IFRAME / HTML WIDGET) */}
      {mediaType === 'embed' && embedCode && (
        <div className="space-y-1 max-w-lg mx-auto">
          {/* On Screen: Full Interactive HTML Widget */}
          <div 
            className="print:hidden max-w-full overflow-x-auto rounded-lg border border-slate-200 p-2 bg-slate-50/50 flex justify-center"
            dangerouslySetInnerHTML={{ __html: embedCode }}
          />
          {/* On Print: Protected cleanly framed note, preventing layout breaking */}
          <div className="hidden print:flex items-center justify-center gap-1.5 py-1 px-3 border border-slate-700 rounded bg-slate-50 text-[10px] font-bold text-slate-900 my-1 mx-auto max-w-sm">
            <Globe className="w-3.5 h-3.5 shrink-0" />
            <span>[ 🌐 Lampiran Stimulus Interaktif: {mediaCaption || `Materi Soal No. ${soal.no}`} ]</span>
          </div>
          {mediaCaption && (
            <p className="print:hidden text-[10px] text-slate-500 italic mt-0.5">
              {mediaCaption}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

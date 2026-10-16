'use client'

import { motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { BASE_PATH } from '@/lib/base-path'

function Equalizer({ active }: { active: boolean }) {
  return (
    <span className="flex h-4 items-end gap-[2px]" aria-hidden="true">
      {[0, 1, 2, 3].map((bar) => (
        <span
          key={bar}
          className="w-[3px] origin-bottom rounded-full bg-white"
          style={{
            height: '100%',
            animation: active
              ? `equalize 0.9s ease-in-out ${bar * 0.15}s infinite`
              : 'none',
            transform: active ? undefined : 'scaleY(0.3)',
          }}
        />
      ))}
    </span>
  )
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  // Tracks the user's explicit intent. Once they pause manually, we must NOT
  // auto-resume on tab focus / visibility change. Starts false so the song
  // autoplays on load; the first manual pause flips it to true.
  const userPausedRef = useRef(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.55

    // Only (re)start playback when the user has NOT deliberately paused.
    const tryPlay = () => {
      if (userPausedRef.current) return
      if (audio.paused) void audio.play().catch(() => undefined)
    }

    const unlockAudio = () => {
      document.removeEventListener('pointerdown', unlockAudio, true)
      document.removeEventListener('keydown', unlockAudio, true)
      document.removeEventListener('touchstart', unlockAudio, true)
      document.removeEventListener('click', unlockAudio, true)
      tryPlay()
    }

    const onVisible = () => {
      if (document.visibilityState === 'visible') tryPlay()
    }

    // Attempt immediately on load (works where the browser allows it)...
    tryPlay()
    // ...and when the audio data is ready (covers the race where metadata
    // hasn't loaded yet on first paint).
    audio.addEventListener('canplay', tryPlay)
    // ...and again as soon as the tab gains focus / becomes visible —
    // but tryPlay() bails out if the user chose to pause.
    window.addEventListener('focus', tryPlay)
    document.addEventListener('visibilitychange', onVisible)
    // Browser autoplay policies block SOUND until the first user gesture; there
    // is no way around this on a fresh load. Capture the FIRST interaction
    // anywhere on the page (capture phase, so nothing can swallow it) and start.
    document.addEventListener('pointerdown', unlockAudio, true)
    document.addEventListener('keydown', unlockAudio, true)
    document.addEventListener('touchstart', unlockAudio, true)
    document.addEventListener('click', unlockAudio, true)

    return () => {
      audio.removeEventListener('canplay', tryPlay)
      window.removeEventListener('focus', tryPlay)
      document.removeEventListener('visibilitychange', onVisible)
      document.removeEventListener('pointerdown', unlockAudio, true)
      document.removeEventListener('keydown', unlockAudio, true)
      document.removeEventListener('touchstart', unlockAudio, true)
      document.removeEventListener('click', unlockAudio, true)
    }
  }, [])

  async function togglePlayback() {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      // User deliberately pauses — remember it so focus/visibility won't resume.
      userPausedRef.current = true
      audio.pause()
      return
    }

    // User deliberately plays — clear the paused intent.
    userPausedRef.current = false
    try {
      audio.volume = 0.55
      await audio.play()
    } catch {
      setPlaying(false)
    }
  }

  return (
    <motion.div
      className="fixed bottom-5 right-5 z-50 flex items-center gap-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
    >
      <audio
        ref={audioRef}
        src={`${BASE_PATH}/London_Thumakda.mp3`}
        autoPlay
        loop
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={togglePlayback}
        aria-pressed={playing}
        aria-label={playing ? 'Pause wedding song' : 'Play wedding song'}
        className="diya-glow flex size-14 items-center justify-center gap-1.5 rounded-full bg-champagne text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
      >
        <span className="flex size-5 items-center justify-center">
          {playing ? (
            <Pause className="size-4" aria-hidden="true" />
          ) : (
            <Play className="size-4 translate-x-[1px]" aria-hidden="true" />
          )}
        </span>
        <Equalizer active={playing} />
      </button>
    </motion.div>
  )
}

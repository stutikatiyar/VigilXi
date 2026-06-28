const mono = { fontFamily: "var(--font-geist-mono)" }

export default function Footer() {
  return (
    <footer
      style={mono}
      className="relative z-10 border-t border-white/10 px-10 py-10 text-center tracking-widest"
    >
      <p className="text-xs text-cyan-400/60 mb-2">
        VIGILXI — AI SURVEILLANCE INTELLIGENCE PLATFORM
      </p>
      <p className="text-xs text-gray-600">
        DESIGNED & ENGINEERED BY STUTI © 2026
      </p>
      <p className="text-xs text-gray-700 mt-1">
        ⚡ EVERY FRAME ANALYZED. EVERY THREAT IDENTIFIED. NOTHING ESCAPES. ⚡
      </p>
    </footer>
  )
}
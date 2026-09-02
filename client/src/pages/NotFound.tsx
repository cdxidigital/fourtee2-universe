import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

/** fourtee2 404: archival signal lost state. */
export default function NotFound() {
  return (
    <main className="world-view flex items-center justify-center text-center px-4">
      <div className="max-w-md">
        <p className="section-label mb-8">SIGNAL LOST / 404</p>
        <h1 className="wordmark text-6xl mb-6">fourtee2</h1>
        <h2 className="text-xl tracking-widest uppercase opacity-60 mb-12">The coordinate you requested is not in orbit.</h2>
        <p className="text-sm opacity-40 leading-relaxed mb-12">
          The world signal may have been archived, moved, or is currently out of range. 
          Return to the galaxy core to recalibrate your position.
        </p>
        <Link href="/?galaxy=1" className="platform-action inline-flex items-center gap-3">
          <ArrowLeft size={16} /> RETURN TO GALAXY <b>↗</b>
        </Link>
      </div>
    </main>
  );
}

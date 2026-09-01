import { useEffect, useState } from 'react';
import { FileText, Clock, Calculator, CheckSquare, LineChart } from 'lucide-react';
import './SplashAnimation.css';

export default function SplashAnimation({ onExpandStart, onComplete }: { onExpandStart: () => void, onComplete: () => void }) {
  const [phase, setPhase] = useState<'scattered' | 'assembling' | 'expanding' | 'fading-out'>('scattered');

  useEffect(() => {
    // 1. Give it a tiny moment to render scattered
    const assembleTimer = setTimeout(() => {
      setPhase('assembling');
    }, 100);

    // 2. Wait for assembly animation to finish, then expand
    const expandTimer = setTimeout(() => {
      setPhase('expanding');
    }, 1600);

    // 3. After expansion finishes, fade out splash and show app
    const fadeTimer = setTimeout(() => {
      onExpandStart();
      setPhase('fading-out');
    }, 2200);

    // 4. Unmount
    const endTimer = setTimeout(() => {
      onComplete();
    }, 2700);

    return () => {
      clearTimeout(assembleTimer);
      clearTimeout(expandTimer);
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`splash-wrapper ${phase}`}>
      <div className="splash-box">
        <div className="splash-canvas">
          <div className="splash-block block-1">
            <FileText size={24} color="var(--bg-main)" strokeWidth={2.5} />
          </div>
          <div className="splash-block block-2">
            <Clock size={24} color="var(--bg-main)" strokeWidth={2.5} />
          </div>
          <div className="splash-block block-3">
            <Calculator size={24} color="var(--bg-main)" strokeWidth={2.5} />
          </div>
          <div className="splash-block block-4">
            <CheckSquare size={24} color="var(--bg-main)" strokeWidth={2.5} />
          </div>
          <div className="splash-block block-5">
            <LineChart size={24} color="var(--bg-main)" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>
  );
}

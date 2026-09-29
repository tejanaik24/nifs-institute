// One worker, one object, two poses. t=0 is a neutral posture with the load inside the power zone;
// t=1 is an awkward overhead reach. Every joint is a straight lerp, so any t in between is a real pose.
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const P = (n: [number, number], a: [number, number], t: number): [number, number] => [lerp(n[0], a[0], t), lerp(n[1], a[1], t)];

export const ZONE = { top: 140, bottom: 290 };
const HIP: [number, number] = [168, 262];

export function objectY(t: number) {
  return lerp(204, 34, t);
}

export function Figure({ t, label, bare = false, hideLoad = false }: { t: number; label: string; bare?: boolean; hideLoad?: boolean }) {
  const head = P([168, 96], [262, 140], t);
  const sh = P([168, 138], [237, 164], t);
  const elbow = P([168, 196], [262, 100], t);
  const hand = P([222, 206], [282, 52], t);
  const obj = P([236, 204], [294, 34], t);
  const k1 = P([162, 336], [160, 336], t);
  const k2 = P([176, 338], [178, 338], t);
  const line = (pts: [number, number][]) => pts.map((p) => p.join(",")).join(" ");
  const inZone = obj[1] >= ZONE.top && obj[1] <= ZONE.bottom;

  return (
    <svg viewBox="0 0 360 440" role="img" aria-label={label} className="h-full w-full">
      {!bare && (
        <>
          <rect x="20" y={ZONE.top} width="320" height={ZONE.bottom - ZONE.top} rx="6" fill="var(--primary)" opacity={inZone ? 0.13 : 0.05} stroke="var(--primary)" strokeOpacity={inZone ? 0.9 : 0.35} strokeDasharray="7 6" />
          <text x="30" y={ZONE.top - 8} fontSize="11" fontWeight="600" letterSpacing="2.5" fill="var(--primary)">POWER ZONE</text>
          <line x1="20" y1="410" x2="340" y2="410" stroke="#15130f" strokeOpacity="0.25" strokeWidth="2" />
        </>
      )}
      {!hideLoad && (
        <>
          <rect x={obj[0] - 22} y={obj[1] - 17} width="44" height="34" rx="3" fill="var(--primary)" />
          <rect x={obj[0] - 22} y={obj[1] - 17} width="44" height="8" rx="3" fill="#fff" opacity="0.25" />
        </>
      )}
      {/* body */}
      <g stroke="#15130f" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <polyline points={line([HIP, k1, [168, 404]])} />
        <polyline points={line([HIP, k2, [190, 404]])} />
        <polyline points={line([HIP, sh])} />
        <polyline points={line([sh, elbow, hand])} />
      </g>
      <circle cx={head[0]} cy={head[1]} r="19" fill="#15130f" />
      {/* spine strain line */}
      <polyline points={line([HIP, sh])} stroke="var(--primary)" strokeWidth="3" strokeDasharray="1 7" strokeLinecap="round" fill="none" opacity={Math.min(1, t * 2.2)} />
    </svg>
  );
}

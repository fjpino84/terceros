const TRAZOS = {
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z',
  car: 'M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM3 17v-4l2-5a2 2 0 0 1 1.9-1.4h10.2A2 2 0 0 1 19 8l2 5v4h-2a2 2 0 0 0-4 0H9a2 2 0 0 0-4 0H3Z',
  id: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm3 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-3.2 8c.5-1.8 2-3 4-3s3.5 1.2 4 3H3.8Zm9.2-7h6M13 13h6M13 16h4',
  license: 'M4 6h16v12H4V6Zm2 2h5v5H6V8Zm7 1h6M13 12h6M6 16h12',
  doc: 'M7 3h7l4 4v14H7V3Zm7 0v4h4M9.5 12h5M9.5 15h5M9.5 9h2',
  invoice: 'M6 3h10l3 3v15H6V3Zm3 6h6M9 12h6M9 15h4M6 3l3 3',
  cloud: 'M7 18a4.5 4.5 0 0 1-.4-9 6 6 0 0 1 11.6-1.6A4.5 4.5 0 0 1 17.5 18H7Zm5-6v6m0-6-2.5 2.5M12 12l2.5 2.5',
  check: 'M5 13l4 4L19 7',
  checkCircle: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-4-9 3 3 5-6',
  alertCircle: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5m0 4h.01',
  xCircle: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-3-9 6 0M9 8l6 8M15 8l-6 8',
  arrowRight: 'M5 12h14m-6-6 6 6-6 6',
  match: 'M8 12l3 3 5-6M4 6h16v12H4z',
  calendar: 'M7 3v3m10-3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z',
  shield: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z',
  scan: 'M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 1-1-1h-3M4 16v3a1 1 0 0 0 1 1h3m12-4v3a1 1 0 0 1-1 1h-3M4 12h16',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18Z',
  location: 'M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  home: 'M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9Z',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z',
  upload: 'M12 16V4m0 0 4 4m-4-4L8 8M5 16v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3',
  image: 'M4 5h16v14H4V5Zm3 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM5 17l5-5 3 3 3-4 3 6',
  help: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-2-7a2 2 0 1 1 3-1.7c-.5.4-1 .8-1 1.7v.4M12 17h.01',
  bell: 'M6 10a6 6 0 1 1 12 0v4l2 3H4l2-3v-4Zm4.5 9a1.5 1.5 0 0 0 3 0',
};

export default function Icon({ nombre, size = 20, strokeWidth = 1.8, className = '' }) {
  const path = TRAZOS[nombre];
  if (!path) return null;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Muhammed Muhyudeen — Front End Developer & UI Specialist',
  description: 'Portfolio of Muhammed Muhyudeen, Front End Developer & UI Specialist',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="preloader">
          <div className="pl-name">
            <span className="pl-name-inner">Muhammed Muhyudeen</span>
          </div>
          <div className="pl-bar-wrap">
            <div className="pl-bar"></div>
          </div>
        </div>

        <nav>
          <div className="nav-logo">MMT</div>
          <div className="nav-right">
            <div className="nav-links">
              <a href="/blog" data-cursor="hover">Blog</a>
              <a href="#work" data-cursor="hover">Work</a>
              <a href="#about" data-cursor="hover">About</a>
            </div>
            <button className="theme-btn" id="themeToggle" aria-label="Toggle theme">
              <span className="t-icon">☀</span>
              <span className="t-label">Light</span>
            </button>
          </div>
        </nav>

        <div className="cursor">
          <div className="cursor-arrow">
            <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.38575 1.58356L20.8037 11.2925C21.7262 11.7538 21.6441 13.0645 20.6558 13.3934L13.1234 15.901C12.8715 15.9849 12.671 16.1852 12.5866 16.4371L10.0634 23.9669C9.73277 24.9543 8.42289 25.0348 7.96263 24.1118L1.40879 1.05051C1.03698 -0.0664997 2.05777 0.949392 1.38575 1.58356Z" fill="#FF3D00" stroke="#EDEDE8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="cursor-label">
            <div className="cursor-label-dot"></div>
            <span id="cursorLabelText">Open</span>
          </div>
        </div>

        {children}

        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}

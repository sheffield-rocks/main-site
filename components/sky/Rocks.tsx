export const Rocks = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 w-full z-0 h-[40vh] pointer-events-none flex items-end">
      <svg
        viewBox="0 0 1440 400"
        className="w-full h-full block"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === LAYER 1: Distant City & Hills === */}
        
        {/* Rolling Hills Background */}
        <path
            d="M0,400 L0,250 Q360,150 720,250 T1440,250 L1440,400 Z"
            className="fill-slate-800 opacity-60"
        />

        {/* Sheffield City Silhouette */}
        <g transform="translate(0, 0)">
            <path
                className="fill-slate-800"
                d={`
                    M0,400 
                    L300,400 
                    
                    L320,350 L350,350 L350,330 L380,330 L380,400
                    
                    L400,400 L410,340 L460,340 L470,400
                    
                    L490,400 L490,160 L550,160 L550,400
                    
                    L550,360 L590,360 L590,320 L620,320 L620,400
                    
                    L640,400 L640,280 L655,280 
                    L655,170 
                    L650,170 L650,140 L655,140 
                    L670,90 
                    L685,140 L690,140 L690,170 
                    L685,170
                    L685,280 L700,280 L700,400
                    
                    L720,400
                    Q770,260 820,400 
                    Q850,300 880,400 
                    
                    L900,400 L900,100 L950,80 L950,400
                    
                    L970,400 L970,280 L1020,280 L1020,400
                    
                    L1030,400 L1030,240 
                    L1025,240 L1025,220 L1075,220 L1075,240 
                    L1070,240 L1070,400
                    
                    L1090,400 L1090,280 
                    L1150,280 L1150,250 
                    L1300,250 L1300,280
                    L1360,280 L1360,400
                    
                    L1440,400 L0,400 Z
                `}
            />

            {/* City Details */}
            <g className="fill-white opacity-10">
                {/* Arts Tower Windows */}
                <rect x="500" y="170" width="40" height="2" />
                <rect x="500" y="185" width="40" height="2" />
                <rect x="500" y="200" width="40" height="2" />
                <rect x="500" y="215" width="40" height="2" />
                <rect x="500" y="230" width="40" height="2" />
                <rect x="500" y="260" width="40" height="2" />
                <rect x="500" y="290" width="40" height="2" />
                <rect x="500" y="320" width="40" height="2" />
            </g>
             <g className="fill-sky-200 opacity-10">
                {/* St Pauls Windows */}
                <rect x="910" y="120" width="30" height="40" />
                <rect x="910" y="180" width="30" height="60" />
                <rect x="910" y="280" width="30" height="20" />
            </g>
            {/* Clock on Town Hall */}
            <circle cx="670" cy="155" r="7" className="fill-yellow-100 opacity-20" />

            {/* Owen Building Details */}
             <g className="fill-sky-100 opacity-20">
                 <rect x="1035" y="250" width="2" height="120" />
                 <rect x="1045" y="250" width="2" height="120" />
                 <rect x="1055" y="250" width="2" height="120" />
                 <rect x="1065" y="250" width="2" height="120" />
            </g>

            {/* Park Hill Details */}
             <g className="fill-orange-100 opacity-30">
                <rect x="1100" y="290" width="8" height="8" />
                <rect x="1120" y="310" width="8" height="8" />
                <rect x="1140" y="290" width="8" height="8" />
                
                <rect x="1160" y="260" width="8" height="8" />
                <rect x="1180" y="270" width="8" height="8" />
                <rect x="1200" y="260" width="8" height="8" />
                <rect x="1220" y="270" width="8" height="8" />
                <rect x="1240" y="260" width="8" height="8" />
                <rect x="1260" y="270" width="8" height="8" />
                <rect x="1280" y="260" width="8" height="8" />
                
                <rect x="1310" y="290" width="8" height="8" />
                <rect x="1330" y="310" width="8" height="8" />
            </g>
        </g>

        {/* === LAYER 2: Foreground Cliffs (Framing) === */}
        
        {/* Left Cliff */}
        <g transform="translate(0,0)">
            {/* Main Cliff Body */}
            <path
                d="M-50,400 L-50,100 L150,100 L180,120 L180,300 L250,300 L300,400 Z"
                className="fill-slate-900"
            />
            {/* Cliff Cap */}
            <path
                d="M-50,100 L150,100 L180,120 L170,130 L140,110 L-50,110 Z"
                className="fill-sky-100 opacity-90"
            />
            {/* Shadows */}
            <path d="M50,110 L60,350 L80,350 L70,110 Z" className="fill-black opacity-20" />
            <path d="M100,110 L110,320 L120,320 L115,110 Z" className="fill-black opacity-20" />
        </g>

         {/* Right Cliff */}
        <g transform="translate(0,0)">
             {/* Main Cliff Body - Pushed back to reveal Park Hill */}
            <path
                d="M1360,400 L1380,350 L1400,180 L1440,180 L1440,400 Z"
                className="fill-slate-900"
            />
             {/* Cliff Cap */}
            <path
                d="M1400,180 L1440,180 L1440,210 L1400,210 Z"
                className="fill-sky-100 opacity-80"
            />
            {/* Detail */}
            <path d="M1420,210 L1425,380 L1430,380 L1425,210 Z" className="fill-black opacity-20" />
        </g>
        
        {/* === LAYER 3: Foreground Ground === */}
        <path
            d="M0,400 L1440,400 L1440,350 C1200,360 800,340 500,380 C200,410 0,350 0,350 Z"
            className="fill-slate-950 opacity-40"
        />

      </svg>
    </div>
  );
};

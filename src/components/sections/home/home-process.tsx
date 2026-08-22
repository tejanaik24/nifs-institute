export default function HomeProcess() {
  return (
    <section id="process" className="w-full min-h-screen py-[200px] max-lg:py-[70px] max-md:py-[60px] max-sm:py-[80px] bg-white flex justify-center items-center flex-col overflow-x-hidden">
      <div className="w-[1200px] max-w-full max-lg:w-[90%] max-sm:w-[95%] flex flex-col gap-[64px] max-sm:gap-[32px] justify-center items-center">
        <h2 className="font-sans text-[7vw] max-lg:text-[10vw] font-black leading-[100%] tracking-normal text-center break-words w-full">4 Steps to Your <span className="font-display italic">Safety Career</span></h2>

        <div className="flex flex-col justify-center items-center w-full gap-[64px] max-md:gap-[48px]">
          <div className="flex flex-row max-md:flex-col-reverse justify-center items-center w-full">
            <div className="w-1/2 max-sm:w-full flex flex-col gap-[32px] max-sm:gap-[8px]">
              <div className="text-right flex flex-col gap-[16px] text-slide-left">
                <span className="font-sans text-[48px] max-md:text-[40px] max-sm:text-[28px] font-bold leading-none text-nifs-red">01</span>
                <h3 className="font-sans font-bold text-[60px] max-md:text-[44px] max-sm:text-[32px] text-black leading-[100%]">Apply</h3>
                <p className="text-right font-normal font-sans text-[24px] max-md:text-[15px] text-gray-500">
                  Fill out the online application or visit your nearest NIFS center. Choose from 10+ programs across diploma, postgraduate,
                  and degree levels.
                </p>
              </div>
              <div className="rounded-[48px] max-md:rounded-[32px] h-[40px] bg-gray-200">
                <div className="h-full rounded-[inherit] flex justify-end">
                  <div className="home-bar-fill bg-nifs-red h-full rounded-[inherit]" data-width="100%" />
                </div>
              </div>
            </div>
            <div className="w-1/2 max-sm:w-full flex items-center justify-center p-8">
              <svg viewBox="0 0 200 200" className="w-[180px] h-[180px]">
                <circle cx="100" cy="100" r="80" fill="#DC1711" opacity="0.1" />
                <circle cx="100" cy="100" r="50" fill="#DC1711" opacity="0.15" />
                <text x="100" y="115" textAnchor="middle" fontSize="48" fontWeight="900" fill="#DC1711" fontFamily="Inter">
                  01
                </text>
              </svg>
            </div>
          </div>

          <div className="flex flex-row-reverse max-md:flex-col-reverse justify-center items-center w-full">
            <div className="w-1/2 max-sm:w-full flex flex-col gap-[32px] max-sm:gap-[8px]">
              <div className="flex flex-col gap-[16px] text-slide-right">
                <span className="font-sans text-[48px] max-md:text-[40px] max-sm:text-[28px] font-bold leading-none text-left text-nifs-green">02</span>
                <h3 className="font-sans font-bold text-[60px] max-md:text-[44px] max-sm:text-[32px] text-black leading-[100%] text-left">Assessment</h3>
                <p className="font-normal font-sans text-[24px] max-md:text-[15px] text-left text-gray-500">
                  Our counselors guide you through eligibility verification and help select the right program based on your qualifications
                  and career goals.
                </p>
              </div>
              <div className="rounded-[48px] max-md:rounded-[32px] h-[40px] bg-gray-200">
                <div className="h-full rounded-[inherit] flex justify-start">
                  <div className="home-bar-fill bg-nifs-green h-full rounded-[inherit]" data-width="75%" />
                </div>
              </div>
            </div>
            <div className="w-1/2 max-sm:w-full flex items-center justify-center p-8">
              <svg viewBox="0 0 200 200" className="w-[180px] h-[180px]">
                <circle cx="100" cy="100" r="80" fill="#26BE29" opacity="0.1" />
                <circle cx="100" cy="100" r="50" fill="#26BE29" opacity="0.15" />
                <text x="100" y="115" textAnchor="middle" fontSize="48" fontWeight="900" fill="#26BE29" fontFamily="Inter">
                  02
                </text>
              </svg>
            </div>
          </div>

          <div className="flex flex-row max-md:flex-col-reverse justify-center items-center w-full">
            <div className="w-1/2 max-sm:w-full flex flex-col gap-[32px] max-sm:gap-[8px]">
              <div className="text-right flex flex-col gap-[16px] text-slide-left">
                <span className="font-sans text-[48px] max-md:text-[40px] max-sm:text-[28px] font-bold leading-none text-nifs-orange">03</span>
                <h3 className="font-sans font-bold text-[60px] max-md:text-[44px] max-sm:text-[32px] text-black leading-[100%]">Enroll</h3>
                <p className="text-right font-normal font-sans text-[24px] max-md:text-[15px] text-gray-500">
                  Complete enrollment with flexible payment options. Education loan facility available for all courses. Begin your training
                  at any of our 70+ centers.
                </p>
              </div>
              <div className="rounded-[48px] max-md:rounded-[32px] h-[40px] bg-gray-200">
                <div className="h-full rounded-[inherit] flex justify-end">
                  <div className="home-bar-fill bg-nifs-orange h-full rounded-[inherit]" data-width="50%" />
                </div>
              </div>
            </div>
            <div className="w-1/2 max-sm:w-full flex items-center justify-center p-8">
              <svg viewBox="0 0 200 200" className="w-[180px] h-[180px]">
                <circle cx="100" cy="100" r="80" fill="#FC8010" opacity="0.1" />
                <circle cx="100" cy="100" r="50" fill="#FC8010" opacity="0.15" />
                <text x="100" y="115" textAnchor="middle" fontSize="48" fontWeight="900" fill="#FC8010" fontFamily="Inter">
                  03
                </text>
              </svg>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 max-w-[700px]">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="font-sans text-[48px] max-md:text-[40px] max-sm:text-[28px] font-bold leading-none text-nifs-red">04</span>
              <h3 className="font-sans font-bold text-[60px] max-md:text-[44px] max-sm:text-[32px] text-black leading-[100%]">Placement</h3>
              <p className="font-normal font-sans text-[24px] max-md:text-[15px] text-gray-500 text-center">
                Our dedicated placement cell connects you with top recruiters. Graduate into a career at leading industries across India and
                abroad.
              </p>
            </div>
            <div className="rounded-[48px] h-[40px] bg-gray-200 w-full max-w-[500px]">
              <div className="h-full rounded-[inherit]">
                <div className="home-bar-fill bg-nifs-red h-full rounded-[inherit]" data-width="100%" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <a
            href="#apply"
            className="rounded-[48px] max-md:rounded-[32px] bg-black px-[32px] py-[14px] text-[24px] max-sm:text-[20px] text-nifs-red font-sans font-bold cursor-pointer border-2 border-black hover:bg-nifs-red hover:text-white transition-all duration-300 inline-block"
          >
            Apply for Admission
          </a>
        </div>
      </div>
    </section>
  );
}

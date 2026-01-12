import RevealAnimation from '../animation/RevealAnimation';

const values = [
  {
    title: 'Built for the Bay',
    description: 'Every feature designed around how real garages operate—from intake to invoice.',
    icon: '🔧',
  },
  {
    title: 'Profitability First',
    description: 'See your margins on every job. Know your effective labor rate. Grow your bottom line.',
    icon: '📈',
  },
  {
    title: 'Empowered Technicians',
    description: 'Give your team a mobile portal to clock in, upload photos, and request parts.',
    icon: '👥',
  },
  {
    title: 'Time is Money',
    description: 'Track every minute. Measure efficiency. Eliminate guesswork on job profitability.',
    icon: '⏱️',
  },
];

const OurMission = () => {
  return (
    <section className="max-[1920px]:px-5">
      <div className="bg-background-12 mx-auto max-w-[1880px] rounded-3xl py-20 lg:rounded-4xl lg:py-30 xl:py-39">
        <div className="main-container">
          <div className="mb-10 space-y-4 text-center md:mb-14 lg:mx-auto lg:max-w-[740px]">
            <RevealAnimation delay={0.1}>
              <span className="badge badge-white-v2 text-secondary font-medium">Our Mission</span>
            </RevealAnimation>
            <RevealAnimation delay={0.2}>
              <h2>Help independent garages see their true profit—and grow it.</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.3}>
              <p className="mx-auto max-w-[600px]">
                We believe every garage owner deserves to know exactly how much money they make on every job.
                Not after month-end spreadsheets. Not after expensive accountants. Right now, in real-time.
              </p>
            </RevealAnimation>
          </div>
          {/* Values Grid */}
          <div className="grid grid-cols-12 gap-y-8 md:gap-8">
            {values.map((value, index) => (
              <RevealAnimation key={index} delay={0.2 + index * 0.1} className="col-span-12 md:col-span-6 lg:col-span-3">
                <div className="h-full rounded-[20px] bg-white p-8">
                  <div className="mb-4 text-4xl">{value.icon}</div>
                  <h3 className="text-heading-6 mb-2">{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

OurMission.displayName = 'OurMission';
export default OurMission;

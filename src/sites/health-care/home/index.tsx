import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import Link from "next/link";
import MainHeader from "../header";

export default function View() {
  return (
    <div className="flex-col bg-white">
      {/* HEADER
      ------------- */}
      <MainHeader />
      <WelcomeSection />
      <PitchSection />
      <div className="mx-auto flex w-full max-w-[1200px] flex-col px-10  max-md:px-5">
        <AboutSection />
        <ServiceSection />
        <MedicalTestSection />
        <DoctorsSection />
        <FAQSection />
      </div>
      <CTAButtonSection />
      <AppointmentSection />
      <Footer />
    </div>
  );
}
export function LinkText({
  children = <>This is a link</>,
  reverseColor = false,
  className,
}: {
  children?: React.ReactNode;
  reverseColor?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "transition-all hover:text-purple-500",
        reverseColor ? "text-purple-500" : `text-black`,
        className,
      )}
    >
      {children}
    </div>
  );
}
function Heading3({
  children = <>This is heading 3</>,
  reverseColor = false,
  className,
}: {
  children?: React.ReactNode;
  reverseColor?: boolean;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-[20px] uppercase  max-sm:text-[14px]",
        reverseColor ? "text-white" : `text-black`,
        className,
      )}
    >
      {children}
    </h3>
  );
}
function Heading2({
  reverseColor = false,
  children = <>This is heading 2</>,
  className,
}: {
  reverseColor?: boolean;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-[44px] font-bold leading-[1.3em] max-sm:text-[28px] max-sm:leading-normal",
        reverseColor ? "text-white" : `text-black`,
        className,
      )}
    >
      {children}
    </h2>
  );
}
function Text({
  children = <>This is a text</>,
  reverseColor = false,
  className,
}: {
  children: React.ReactNode;
  reverseColor?: boolean;
  className?: string;
}) {
  return (
    <p
      // className={`max-sm:text-[14px] ${reverseColor ? "text-white" : `text-gray-400`} `}
      className={cn(
        "max-sm:text-[14px]",
        reverseColor ? "text-white" : `text-gray-400`,
        className,
      )}
    >
      {children}
    </p>
  );
}
export function PrimaryButton({
  children = <>Primary Button</>,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "max-sm:max-w-auto h-[45px] bg-purple-600 text-white hover:bg-transparent  hover:ring-2 hover:ring-purple-500",
        className,
      )}
    >
      {children}
    </Button>
  );
}

export function Footer() {
  return (
    <footer>
      <FooterTop />
      <FooterBottom />
    </footer>
  );
}
function FooterTop() {
  return (
    <div className="mt-32 flex w-full  flex-col items-center self-stretch bg-indigo-600 px-5 py-12 max-md:mt-0 max-md:max-w-full">
      <div className="flex w-full max-w-[1200px] flex-col items-start justify-between gap-5 md:flex-row md:gap-10">
        <div className="grid w-full max-w-[350px] gap-3">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/7a36044e-34e4-4540-a88b-4936f96e3ddf?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
            className="w-[150px] overflow-hidden object-contain object-center md:w-[200px]"
          />
          <li className="list-none leading-8 text-white">
            Lorem ipsum dolor sit amet, consec tetur adipiscing elit.
          </li>
        </div>
        <div className="grid w-full max-w-[350px] gap-5">
          <div className="grid gap-3">
            <h3 className="text-2xl font-semibold leading-8 text-white">
              Address
            </h3>
            <ul>
              <li className="list-none leading-8 text-white">
                Trafic point, Shayesta Nagar Habiganj Sadar - 3300, Habiganj
              </li>
            </ul>
          </div>

          <div className="grid gap-3">
            <h3 className="text-2xl font-semibold leading-8 text-white">
              Contact
            </h3>
            <li className="list-none text-white">+1 (234) 567 890</li>
            <li className="list-none text-white">example@mail.com</li>
          </div>
        </div>

        <div className="grid gap-3">
          <h3 className="text-2xl font-semibold leading-8 text-white">
            Explore
          </h3>
          <ul className="leading-8">
            <li className="list-none text-white">Home</li>
            <li className="list-none text-white">About</li>
            <li className="list-none text-white">Services</li>
            <li className="list-none text-white">Team</li>
            <li className="list-none text-white">Blogs</li>
          </ul>
        </div>
        <div className="grid gap-3">
          <h3 className="text-2xl font-semibold leading-8 text-white">
            Resources
          </h3>
          <ul className="leading-8">
            <li className="list-none text-white">Documentation</li>
            <li className="list-none text-white">Privacy Policy</li>
            <li className="list-none text-white">Press Files</li>
            <li className="list-none text-white">FAQs</li>
            <li className="list-none text-white">Contact</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
function FooterBottom() {
  return (
    <div className="flex w-full flex-col items-center self-stretch border-t border-solid border-t-indigo-500 bg-indigo-600 px-5 pb-5 pt-7 max-md:max-w-full">
      <div className="flex w-full max-w-[1198px] items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
        <div className="text-sm leading-6 text-white">
          Copyright © 2023 ASK Project
        </div>
        <div className="flex items-stretch justify-between gap-5">
          <div className="text-center text-sm leading-4 text-white">
            Privacy Policy
          </div>
          <div className="self-start  text-center text-sm leading-4 text-white">
            Terms & Services
          </div>
        </div>
      </div>
    </div>
  );
}

function WelcomeSection() {
  return (
    <div className="flex w-full flex-col items-start self-stretch bg-violet-50 px-5 max-md:max-w-full md:items-center">
      <div className="w-full max-w-[1200px]">
        <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex w-[55%] flex-col items-stretch max-md:ml-0 max-md:w-full">
            <div className="z-[1] my-auto mr-0 flex flex-col max-md:mt-10 max-md:max-w-full">
              <Heading2>Welcome to Meddic</Heading2>
              <Heading3>
                <span>We Are Here to Listen &</span> Heal Your Health Problems
              </Heading3>

              <Text className="mb-6 self-stretch text-base leading-7 text-neutral-500 max-md:max-w-full">
                Discover our diverse services, and let`s walk this path to
                wellness together. Your health, our priority
              </Text>
              <PrimaryButton>Book an appointment</PrimaryButton>
            </div>
          </div>
          <div className="ml-5 flex w-[45%] flex-col items-stretch max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/af7d5e55-05d5-4f4c-8f2d-934a46291ec7?apiKey=da85e7e8aa194b7592d4b6becf2fde0c"
              className="aspect-[0.61] w-full grow overflow-hidden object-contain object-center max-md:max-w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PitchSection() {
  return (
    <div className="flex w-full flex-col items-center self-stretch bg-indigo-600 px-10 py-12 max-md:max-w-full max-md:px-5">
      <div className=" w-full max-w-[1200px] max-md:max-w-full">
        <div className="flex gap-10 max-lg:flex-wrap max-md:flex-col ">
          {[
            {
              title: "Accurate & Accessible",
              subtitle:
                "Swift and efficient processes ensure you receive timely and accurate results.",
            },
            {
              title: "Patient-Centric Approach",
              subtitle:
                "Our focus is on your well-being, offering compassionate and patient-friendly interactions.",
            },
            {
              title: "Digital Reports",
              subtitle:
                "Instantly access your health information securely, anytime,anywhere.",
            },
          ].map((item, i) => (
            <div key={i} className="flex w-full flex-col max-md:w-full">
              <div className="flex grow justify-between gap-10  ">
                <div className="flex h-[76px] w-[76px] shrink-0 flex-col bg-white max-md:h-[60px] max-md:w-[60px]" />
                <div className="flex grow basis-[0%] flex-col items-stretch self-stretch">
                  <div className="mt-[-8px] text-2xl  font-bold leading-8 text-white">
                    {item.title}
                  </div>
                  <div className="mt-3.5 text-base leading-7 text-white">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="flex w-full gap-20 py-32 max-xl:gap-10  max-md:flex-col max-md:items-stretch max-md:gap-0 ">
      <div className="flex w-full gap-10 max-lg:flex-wrap lg:gap-10">
        <div className="relative mt-20 w-full max-xl:mt-0 ">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e46b043b-4006-4533-a024-a49f9aab5ab8?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e46b043b-4006-4533-a024-a49f9aab5ab8?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e46b043b-4006-4533-a024-a49f9aab5ab8?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e46b043b-4006-4533-a024-a49f9aab5ab8?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e46b043b-4006-4533-a024-a49f9aab5ab8?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e46b043b-4006-4533-a024-a49f9aab5ab8?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e46b043b-4006-4533-a024-a49f9aab5ab8?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e46b043b-4006-4533-a024-a49f9aab5ab8?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
            className="w-full rounded-xl object-cover object-center"
          />
        </div>
        <div className="relative w-full ">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bac4cab9-95bb-454f-9e49-a53cb1f1004c?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bac4cab9-95bb-454f-9e49-a53cb1f1004c?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bac4cab9-95bb-454f-9e49-a53cb1f1004c?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bac4cab9-95bb-454f-9e49-a53cb1f1004c?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bac4cab9-95bb-454f-9e49-a53cb1f1004c?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bac4cab9-95bb-454f-9e49-a53cb1f1004c?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bac4cab9-95bb-454f-9e49-a53cb1f1004c?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bac4cab9-95bb-454f-9e49-a53cb1f1004c?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
            className="w-full overflow-hidden object-contain object-center "
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-start">
        <div className="mb-10 mt-10 flex flex-col md:mt-24">
          {/* <SectionHeading
            {...{
              heading: "About Us",
              subheading: (
                <>
                  Dedicated <span> to Your Well-Being</span>
                </>
              ),
            }}
          /> */}
          <Heading2> About Us</Heading2>
          <Heading3>
            <span>Dedicated </span> to Your Well-Being
          </Heading3>
          <div className="mt-7 text-base leading-7 text-neutral-500">
            <span className="font-bold text-indigo-600">Hygienic first</span>
            <span className=" text-neutral-500">
              : Our diagnostic center upholds high cleanliness standards to
              provide a safe and hygienic environment for all our patients,
              ensuring your well-being from the moment you step in.
              <br />
              <br />
            </span>
            <span className="font-bold text-indigo-600">Accurate Reports</span>
            <span className=" text-neutral-500">
              : Rest assured, our reports are not only delivered promptly but
              are also meticulously crafted to provide you with precise and
              reliable health information, ensuring confidence in your results.
              <br />
              <br />
            </span>
            <span className="font-bold text-indigo-600">Patients Priority</span>
            <span className=" text-neutral-500">
              : Our compassionate medical team is committed to creating a
              positive and respectful experience during every visit, making sure
              you feel cared for and valued.
              <br />
              <br />
            </span>
            <span className="font-bold text-indigo-600">Smooth Process</span>
            <span className=" text-neutral-500">
              : From the beginning to the end of your visit, our goal is to make
              your experience seamless and stress-free, ensuring that your
              journey with us is as smooth as possible.
            </span>
          </div>
        </div>
        <PrimaryButton>View our gallery</PrimaryButton>
      </div>
    </div>
  );
}

function ServiceSection() {
  return (
    <section className="pt-20">
      {/* <SectionHeading
        {...{
          heading: "Our Services",
          subheading: (
            <>
              Your Journey to <span>Better Health</span>
            </>
          ),
        }}
      />
       */}
      <Heading2> Our Services</Heading2>
      <Heading3>
        <span>Your Journey to </span> Better Health
      </Heading3>
      <div className="mt-16 self-stretch max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-10 max-lg:gap-5 max-md:flex-col ">
          {[
            {
              icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d5dadffa-790c-4d4d-bf99-40384851242b?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5dadffa-790c-4d4d-bf99-40384851242b?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5dadffa-790c-4d4d-bf99-40384851242b?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5dadffa-790c-4d4d-bf99-40384851242b?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5dadffa-790c-4d4d-bf99-40384851242b?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5dadffa-790c-4d4d-bf99-40384851242b?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5dadffa-790c-4d4d-bf99-40384851242b?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5dadffa-790c-4d4d-bf99-40384851242b?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&",
              title: "Book an Appointment",
              sub: `Simply book an appointment with us. It's the first step towards understanding and improving your health.`,
              button: {
                text: "Start Here",
                url: "#",
              },
            },
            {
              icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d5dadffa-790c-4d4d-bf99-40384851242b?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5dadffa-790c-4d4d-bf99-40384851242b?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5dadffa-790c-4d4d-bf99-40384851242b?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5dadffa-790c-4d4d-bf99-40384851242b?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5dadffa-790c-4d4d-bf99-40384851242b?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5dadffa-790c-4d4d-bf99-40384851242b?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5dadffa-790c-4d4d-bf99-40384851242b?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5dadffa-790c-4d4d-bf99-40384851242b?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&",
              title: "See Your Favorite Doctor",
              sub: `Visit your preferred doctor. We're here to make sure you feel comfortable and heard during every visit.`,
              button: {
                text: "View Doctors List",
                url: "#",
              },
            },
            {
              icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/751dc689-7fda-4414-b221-83298bb95053?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/751dc689-7fda-4414-b221-83298bb95053?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/751dc689-7fda-4414-b221-83298bb95053?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/751dc689-7fda-4414-b221-83298bb95053?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/751dc689-7fda-4414-b221-83298bb95053?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/751dc689-7fda-4414-b221-83298bb95053?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/751dc689-7fda-4414-b221-83298bb95053?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/751dc689-7fda-4414-b221-83298bb95053?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&",
              title: "Symptom Analysis",
              sub: `Easily track your health with our user-friendly symptom
                assessment form. Provide valuable insights to our team, ensuring
                personalized care based on your unique needs.`,
              button: {
                text: "Visit Patient Portal",
                url: "#",
              },
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex w-full grow flex-col justify-start rounded-xl border-2 border-solid border-indigo-900 border-opacity-10 bg-violet-50 px-10 py-10 max-lg:px-5"
            >
              <div className="items-start justify-start self-start">
                <img
                  loading="lazy"
                  srcSet={item.icon}
                  className="w-[80px] overflow-hidden object-contain"
                />
              </div>
              <div className="mt-5 text-lg font-bold leading-8 text-slate-900 md:mt-9 md:text-2xl">
                {item.title}
              </div>
              <div className="mt-3 text-base leading-7 text-neutral-500">
                {item.sub}
              </div>
              <div className="flex h-full items-end pt-10">
                <Link
                  href={item.button.url}
                  className=" text-base font-bold leading-4 text-indigo-600 underline max-md:mt-10"
                >
                  {item.button.text}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MedicalTestSection() {
  return (
    <div className="my-48 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col-reverse justify-between gap-10 max-md:gap-0 md:flex-row">
        <div className="flex w-full max-w-[500px] flex-col items-stretch max-md:ml-0 max-md:w-full">
          <div className="my-auto mb-10 flex flex-col items-stretch max-md:mt-10 max-md:max-w-full">
            <div className="max-w-[400px]">
              <Heading2> Delivering Results</Heading2>
              <Heading3>
                <span>Our Popular </span> Medical Tests
              </Heading3>
            </div>

            <div className="text-base leading-7 text-neutral-500 max-md:max-w-full">
              Navigating your health journey should be clear and
              straightforward. At our diagnostic center, we offer a
              comprehensive range of tests and treatments, designed with your
              well-being in mind
            </div>
            <div className="mt-6 text-lg font-bold leading-8 text-slate-900">
              <ul className="list-disc pl-10">
                <li>Ordinary x-rays</li>
                <li>Ultrasonography</li>
                <li>Radioisotope (nuclear) scanning</li>
                <li>Urine test (CT)</li>
                <li>Magnetic resonance imaging (MRI)</li>
                <li>Positron emission tomography (PET)</li>
              </ul>
            </div>
          </div>
          <PrimaryButton>View All Tests</PrimaryButton>
        </div>
        <div className="ml-5 flex w-[528px] flex-col items-stretch max-md:ml-0">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3ca5f038-8e11-401c-8e4f-475f5e2259e5?apiKey=da85e7e8aa194b7592d4b6becf2fde0c"
            className="overflow-hidden object-contain object-center max-md:mt-10"
          />
        </div>
      </div>
    </div>
  );
}

function DoctorsSection() {
  return (
    <div className="self-stretch  max-md:mt-10 max-md:max-w-full">
      <Heading2> Our Doctors</Heading2>
      <Heading3>
        <span>Meet Our </span> Amazing Doctors
      </Heading3>
      <div
        className="mt-20 grid   gap-10  max-md:items-stretch max-md:gap-5"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(min-content, 250px))",
        }}
      >
        {[
          {
            picture:
              "https://cdn.builder.io/api/v1/image/assets/TEMP/0b7b2bc0-f09e-4c87-994d-1d4a518b6337?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&",
            name: "James Samuels",
            specialty: "Gynecologist",
          },
          {
            picture:
              "https://cdn.builder.io/api/v1/image/assets/TEMP/22befa96-b225-467f-b8fe-b048a893e705?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&",
            name: "Lanna Wattson",
            specialty: "Medicine Specialist",
          },
          {
            picture:
              "https://cdn.builder.io/api/v1/image/assets/TEMP/9485807c-4566-41ac-8b3c-fb54490efbd9?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&",
            name: "Martin Franses",
            specialty: "Cardiology",
          },
          {
            picture:
              "https://cdn.builder.io/api/v1/image/assets/TEMP/54d08101-7221-408d-a3f8-8c9792864510?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&",
            name: "Lara Houston",
            specialty: "Orthopedics",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex w-3/12 flex-col items-stretch max-md:ml-0 max-md:w-full"
          >
            <div className="flex w-full flex-col items-stretch max-md:mt-5">
              <img
                loading="lazy"
                srcSet={item.picture}
                className="w-full overflow-hidden object-contain object-center"
              />
              <h3 className="mb-2 mt-4 text-2xl font-semibold leading-8 text-slate-900">
                {item.name}
              </h3>
              <div className="text-base font-semibold leading-7 text-indigo-600">
                {item.specialty}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <div className="mt-48 self-stretch max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-10 max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex w-[49%] flex-col items-stretch max-md:ml-0 max-md:hidden max-md:w-full">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/51d11c95-9587-4489-9c27-099a585e706f?apiKey=da85e7e8aa194b7592d4b6becf2fde0c"
            className="aspect-[0.78] w-full grow overflow-hidden object-contain object-center max-md:mt-10 max-md:max-w-full"
          />
        </div>
        <div className="ml-5 flex w-[51%] flex-col items-stretch max-md:ml-0 max-md:w-full">
          <div className="my-auto flex flex-col items-stretch max-md:mt-10 max-md:max-w-full">
            <Heading2> FAQs</Heading2>
            <Heading3>
              <span>Frequently Asked </span> Questions
            </Heading3>

            <div className="text-base leading-7 text-neutral-500 max-md:max-w-full">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </div>
            <div className="mt-10 flex flex-col items-stretch overflow-hidden rounded-xl border-2 border-solid border-indigo-900 border-opacity-10 bg-white max-md:mt-10 max-md:max-w-full">
              {/* ---------------------- */}
              {[
                {
                  question: "How do I make an appointment at Meddic?",
                  answer: `We're not always in the position that we want to be at.
                    We're constantly growing. We're constantly making mistakes.
                    We're constantly trying to express ourselves and actualize
                    our dreams.`,
                },
                {
                  question: "Do you have a pediatrician?",
                  answer: `We're not always in the position that we want to be at.
                    We're constantly growing. We're constantly making mistakes.
                    We're constantly trying to express ourselves and actualize
                    our dreams.`,
                },
                {
                  question: "Does your place provide health insurance?",
                  answer: `We're not always in the position that we want to be at.
                    We're constantly growing. We're constantly making mistakes.
                    We're constantly trying to express ourselves and actualize
                    our dreams.`,
                },
              ].map((item, i) => (
                <div
                  className={`flex flex-col items-start bg-white px-5 py-5 max-md:max-w-full [&:not(:last-child)]:border-b-2`}
                  key={i}
                >
                  {/* <AccordionItem item={item} /> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CTAButtonSection() {
  return (
    <div className="mt-40 flex w-full flex-col items-center self-stretch bg-indigo-600 px-10 max-md:mt-10 max-md:max-w-full max-md:py-10">
      <div className="flex w-full max-w-[1200px] items-center justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
        <div className="my-auto flex grow basis-[0%] flex-col items-start max-md:max-w-full">
          <div className="self-stretch text-base font-bold uppercase leading-7 tracking-[4px] text-slate-50 max-md:max-w-full">
            Aim to be best
          </div>
          <div className="mb-8 mt-5 self-stretch text-5xl font-bold leading-[63px] text-white max-md:max-w-full max-md:text-3xl max-md:leading-[50px]">
            The Most Interesting Hospital in The World
          </div>
          <div>
            <PrimaryButton>Book an appointment</PrimaryButton>
          </div>
        </div>
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0be262be-812a-4ae7-be4a-508656c8da2e?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
          className="w-full grow basis-[0%] self-stretch overflow-hidden object-contain object-center max-md:hidden max-md:max-w-full"
        />
      </div>
    </div>
  );
}

function AppointmentSection() {
  return (
    <div className="mx-auto w-full max-w-[1200px] self-center max-xl:px-10 max-lg:mt-10 md:mt-32">
      <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex w-[600px] flex-col items-stretch max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/4c36829f-1c87-4dfe-b53e-79daeadd4bb7?apiKey=da85e7e8aa194b7592d4b6becf2fde0c&"
            className="  w-full grow overflow-hidden object-contain object-center max-md:mt-0 max-md:max-w-full"
          />
        </div>
        <div className="ml-5 flex w-6/12 flex-col items-stretch max-md:ml-0  max-md:mt-[-100vw]  max-md:w-full max-md:p-3">
          <div className=" my-auto flex flex-col bg-white px-5 py-10 max-md:mt-10 max-md:max-w-full max-md:rounded-lg">
            {/* <SectionHeading
              {...{
                heading: "Appointment",
                subheading: (
                  <>
                    Book Your <span>Appointment</span>
                  </>
                ),
              }}
            /> */}
            <Heading2> Appointment</Heading2>
            <Heading3>
              Book Your <span>Appointment</span>
            </Heading3>

            <div className="-mr-5   self-stretch text-base leading-7 text-neutral-500 max-md:max-w-full">
              Your information is secure and we will send you an patient ID
              after successful payment
            </div>
            <div className="mt-12 flex w-20 max-w-full items-stretch gap-1 self-start max-md:mt-10">
              <div className="text-sm leading-4 text-slate-900">Your Name</div>
              <div className="self-start  text-sm leading-4 text-indigo-600">
                *
              </div>
            </div>
            <div className="-mr-5 mt-4 flex h-[57px] shrink-0 flex-col self-stretch rounded-xl border-2 border-solid border-indigo-900 border-opacity-10 bg-slate-50 max-md:max-w-full" />
            <div className="-mr-5 mt-5 flex items-stretch justify-between gap-5 self-stretch max-md:max-w-full max-md:flex-wrap">
              <div className="flex grow basis-[0%] flex-col items-start">
                <div className="flex w-[52px] max-w-full items-stretch gap-1">
                  <div className="text-sm leading-4 text-slate-900">Phone</div>
                  <div className="self-start  text-sm leading-4 text-indigo-600">
                    *
                  </div>
                </div>
                <div className="mt-4 flex h-[57px] shrink-0 flex-col self-stretch rounded-xl border-2 border-solid border-indigo-900 border-opacity-10 bg-slate-50" />
              </div>
              <div className="flex grow basis-[0%] flex-col items-stretch">
                <div className=" text-sm leading-4 text-slate-900">Email</div>
                <div className="mt-4 flex h-[57px] shrink-0 flex-col rounded-xl border-2 border-solid border-indigo-900 border-opacity-10 bg-slate-50" />
              </div>
            </div>
            <div className="-mr-5 mt-5 flex items-stretch justify-between gap-5 self-stretch max-md:max-w-full max-md:flex-wrap">
              <div className="flex grow basis-[0%] flex-col items-start">
                <div className="flex w-10 max-w-full items-stretch gap-0.5">
                  <div className="text-sm leading-4 text-slate-900">Date</div>
                  <div className="self-start  text-sm leading-4 text-indigo-600">
                    *
                  </div>
                </div>
                <div className="mt-4 flex h-[57px] shrink-0 flex-col self-stretch rounded-xl border-2 border-solid border-indigo-900 border-opacity-10 bg-slate-50" />
              </div>
              <div className="flex grow basis-[0%] flex-col items-start">
                <div className="flex w-[42px] max-w-full items-stretch gap-1">
                  <div className="text-sm leading-4 text-slate-900">Time</div>
                  <div className="self-start  text-sm leading-4 text-indigo-600">
                    *
                  </div>
                </div>
                <div className="mt-4 flex h-[57px] shrink-0 flex-col self-stretch rounded-xl border-2 border-solid border-indigo-900 border-opacity-10 bg-slate-50" />
              </div>
            </div>
            <div className="-mr-5 mt-5 self-stretch  text-sm leading-4 text-slate-900 max-md:max-w-full">
              Message
            </div>
            <div className="-mr-5 mt-3 flex h-[150px] shrink-0 flex-col self-stretch rounded-xl border-2 border-solid border-indigo-900 border-opacity-10 bg-slate-50 max-md:max-w-full" />
            <div className="mt-8 w-[194px] max-w-full items-center self-start  rounded-[30px] border-[3px] border-solid border-slate-50 border-opacity-80 bg-indigo-600 px-5 py-5 text-center text-sm font-bold leading-5 text-white">
              Make Appointment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { globalStore, useGlobalStore } from "@/utils/global.store";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function Navbar({ children }: { children: React.ReactNode }) {
  const { navBarFixed } = useGlobalStore();

  return (
    <AnimatePresence initial>
      {!navBarFixed && (
        <motion.div
          className="fixed left-0 right-0 top-0 h-[100px] w-full bg-indigo-500 shadow-lg"
          key={"fixed-navbar"}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
          }}
        >
          <div className="text-center text-6xl font-bold text-white">
            {children}
          </div>
        </motion.div>
      )}
      <motion.div className="absolute left-0 right-0 top-0 h-[100px] w-full bg-transparent">
        <div className="text-center text-6xl font-bold text-white">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    globalStore.setNavBarFixed(!isInView);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="h-[100vh] [&:nth-child(2)]:bg-[#0077ff] [&:nth-child(3)]:bg-[#ffaa00] [&:nth-child(4)]:bg-[#00ff55]"
    >
      <span
        className="text-6xl font-bold text-white"
        style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        {children}
      </span>
    </section>
  );
}

export default function App() {
  return (
    <div>
      <div className="">
        <Navbar>navbar</Navbar>
      </div>
      <Section>Content</Section>
      <Section>in</Section>
      <Section>view!</Section>
    </div>
  );
}

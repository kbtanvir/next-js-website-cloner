export default function Custom404() {
  return (
    <div className="flex-center h-screen bg-slate-900">
      <span
        className="mb-[-20px]  text-[100px] font-bold max-sm:mb-0"
        style={{
          backgroundImage: "linear-gradient(315deg, #7F00FF 35%, #E100FF 50%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        404 page not found
      </span>
    </div>
  );
}

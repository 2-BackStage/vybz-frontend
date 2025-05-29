export default function NicknameUploder({
  defaultValue = '',
  className = '',
}: {
  defaultValue?: string;
  className?: string;
}) {
  return (
    <section
      className={`w-full rounded-xl bg-neutral-800 px-4 py-3 text-left text-indigo-200 ${className}`}
    >
      <p className="text-sm">별칭</p>
      <input
        type="text"
        name="nickname"
        id="nickname"
        defaultValue={defaultValue}
        className="bg-transparent text-lg font-semibold focus:outline-none mt-0.5"
      />
    </section>
  );
}

export default function Spinner({
  size = 5,
  color = 'white',
  className = '',
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`w-${size} h-${size} border-2 border-${color} border-t-transparent rounded-full animate-spin ${className}`}
    />
  );
}

export default function Badge({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 backdrop-blur-sm text-muted ${className}`}>
      {children}
    </span>
  );
}

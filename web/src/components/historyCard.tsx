import { LinkList } from "./ui/LinkList";

interface HistoryCardProps {
  className?: string;
}

export function HistoryCard({ className = "" }: HistoryCardProps) {
    const links: string[] = [];
  return (
    <div
      className={`bg-gray-50 rounded-lg p-4 sm:p-6 w-full max-w-xl ${className}`}
    >
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
          Meus links
        </h2>

        <div className="mt-3 h-px w-full bg-gray-200" />
      </div>

      <div className="flex items-center justify-center min-h-[120px]">
        <LinkList links={links} />
      </div>
    </div>
  );
}

export default HistoryCard;

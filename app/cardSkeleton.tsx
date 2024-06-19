import Skeleton from "react-loading-skeleton";

export default function CardSkeleton() {
  return (
    <div className="h-[300px] w-[400px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="w-3/4 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <Skeleton count={2} />
      </div>
      <div className="font-normal text-gray-700 dark:text-gray-400">
        <Skeleton count={4} />
      </div>
    </div>
  );
}

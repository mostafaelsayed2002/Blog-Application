import Skeleton from "react-loading-skeleton";

export default function CardSkeleton() {
  return (
    <div className="w-full h-full p-4 bg-white border-b border-gray-300 ">
      <h5 className="w-2/3 mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
        <Skeleton count={2} />
      </h5>
      <p className="font-normal text-gray-700">
        <Skeleton count={4} />
      </p>
    </div>
  );
}

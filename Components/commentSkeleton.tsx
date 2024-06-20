import { tree } from "next/dist/build/templates/app-page";
import Skeleton from "react-loading-skeleton";

export default function CommentSkeleton() {
  return (
    <div className="border-b p-4 border-gray-300">
      <div className="flex gap-3 ">
        <div className="">
          <Skeleton width={50} height={50} circle={true} count={1} />
        </div>
        <div className="flex flex-col">
          <p className="font-bold">
            <Skeleton count={1} />
          </p>
          <p className="text-gray-700">
            <Skeleton count={1} />
          </p>
        </div>
      </div>

      <p className="font-normal mt-2">
        <Skeleton count={2} />
        <Skeleton count={1} />
      </p>
    </div>
  );
}

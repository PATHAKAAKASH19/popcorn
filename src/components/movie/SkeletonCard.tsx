import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="rounded-xl w-42 flex flex-col gap-3 pb-4">
      <div className="w-[80%] h-[80%]">
        <Skeleton className="rounded-xl h-50 w-fit" />
      </div>
      <div className="">
        <div>
          <Skeleton className="h-4 w-[250px] line-clamp-1 pl-2  pb-1 text-gray-300" />
          <Skeleton className="h-4 w-[200px] pl-2 text-[12px] tracking-wider text-gray-300" />
        </div>
      </div>
    </div>
  );
}

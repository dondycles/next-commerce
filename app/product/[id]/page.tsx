import { SearchParamsTypes } from "@/types/SearchParamsTypes";
import { formatPrice } from "@/util/PriceFormat";
import AddCart from "./AddCart";
import Image from "next/image";

export default async function ProductItem({ searchParams }: SearchParamsTypes) {
  return (
    <div className=" pt-[96px] p-4 min-h-[100dvh] w-full">
      <div className="flex flex-row flex-wrap gap-4 justify-center items-end bg-base-200 rounded-md p-4">
        <Image
          className="max-h-[500px] h-full max-w-[500px] w-full  aspect-square object-cover rounded-lg mb-0"
          src={searchParams.image}
          width={800}
          height={800}
          alt={searchParams.name}
          priority={true}
        />
        <div className="flex flex-col gap-2 shrink">
          <p className=" text-xl font-black">{searchParams.name}</p>
          <p>{searchParams.description}</p>
          <p className=" text-primary font-bold">
            {searchParams.unit_amount &&
              formatPrice(searchParams.unit_amount as number)}
          </p>
          <AddCart />
        </div>
      </div>
    </div>
  );
}

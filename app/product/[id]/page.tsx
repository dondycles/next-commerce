import { SearchParamsTypes } from "@/types/SearchParamsTypes";
import { formatPrice } from "@/util/PriceFormat";
import AddCart from "./AddCart";
import Image from "next/image";

export default async function ProductItem({ searchParams }: SearchParamsTypes) {
  return (
    <div className=" pt-[96px] w-full ">
      <div className="flex flex-col lg:flex-row gap-4 justify-center bg-base-200 rounded-md p-4">
        <Image
          className="max-h-[500px] h-full lg:max-w-[500px]  w-full  aspect-square object-cover rounded-lg mb-0"
          src={searchParams.image}
          width={800}
          height={800}
          alt={searchParams.name}
          priority={true}
        />
        <div className="flex flex-col gap-2 self-stretch">
          <p className=" text-2xl font-black">{searchParams.name}</p>
          <p>{searchParams.description}</p>
          <p>{searchParams.features}</p>
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

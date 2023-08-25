import { SearchParamsTypes } from "@/types/SearchParamsTypes";
import { formatPrice } from "@/util/PriceFormat";
import AddCart from "./AddCart";
import Image from "next/image";

export default async function ProductItem({ searchParams }: SearchParamsTypes) {
  return (
    <div className=" pt-[96px] p-4 flex flex-row flex-wrap">
      <Image
        className="max-w-[500px] w-full"
        src={searchParams.image}
        width={800}
        height={800}
        alt={searchParams.name}
      ></Image>
      <div className="p-4 flex flex-col gap-2">
        <p className=" text-xl font-black">{searchParams.name}</p>
        <p>{searchParams.description}</p>
        <p>
          {searchParams.unit_amount &&
            formatPrice(searchParams.unit_amount as number)}
        </p>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
}

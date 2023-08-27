import { SearchParamsTypes } from "@/types/SearchParamsTypes";
import { formatPrice } from "@/util/PriceFormat";
import AddCart from "./AddCart";
import Image from "next/image";

export default async function ProductItem({ searchParams }: SearchParamsTypes) {
  return (
    <div className=" pt-[96px] p-4 flex flex-row flex-wrap gap-4">
      <Image
        className="max-w-[500px] aspect-square object-cover w-full rounded-lg"
        src={searchParams.image}
        width={800}
        height={800}
        alt={searchParams.name}
        priority={true}
      ></Image>
      <div className="flex flex-col gap-2">
        <p className=" text-xl font-black">{searchParams.name}</p>
        <p className=" text-xl font-black">{searchParams.id}</p>
        <p>{searchParams.description}</p>
        <p className=" text-primary font-bold">
          {searchParams.unit_amount &&
            formatPrice(searchParams.unit_amount as number)}
        </p>
        <AddCart {...searchParams} id={searchParams.id} />
      </div>
    </div>
  );
}

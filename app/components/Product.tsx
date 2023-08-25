import Image from "next/image";
import { formatPrice } from "@/util/PriceFormat";
import Link from "next/link";
import { ProductType } from "@/types/ProductType";
export default function Product({
  name,
  image,
  unit_amount,
  id,
  description,
  metadata,
}: ProductType) {
  const { features } = metadata;

  return (
    <Link
      href={{
        pathname: "/product/" + id,
        query: { name, image, unit_amount, id, description, features },
      }}
    >
      <div className="bg-black max-w-[300px] text-white">
        <Image
          className="w-[300px] h-[300px] object-cover"
          src={image as string}
          width={400}
          height={400}
          alt={name as string}
        />
        <div className="p-4 flex flex-col gap-2">
          <p className=" text-xl font-black">{name}</p>
          <p>{unit_amount && formatPrice(unit_amount as number)}</p>
        </div>
      </div>
    </Link>
  );
}
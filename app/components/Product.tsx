import Image from "next/image";
import { formatPrice } from "@/util/PriceFormat";
import Link from "next/link";
import { ProductType } from "@/types/ProductType";
import PageAddCart from "./PageAddCart";
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
    <div className="rounded-lg overflow-hidden w-full md:max-w-[300px] bg-base-200 h-fit">
      <Link
        href={{
          pathname: `/product/${id}`,
          query: { id, name, image, unit_amount, description, features },
        }}
      >
        <Image
          className=" w-screen md:w-[300px] h-[300px] object-cover bg-black"
          src={image as string}
          width={800}
          height={800}
          alt={name as string}
          priority={true}
        />
      </Link>
      <div className="p-4 flex flex-col gap-2">
        <p className=" text-xl font-black">{name}</p>
        <p className="font-black text-primary">
          {unit_amount && formatPrice(unit_amount as number)}
        </p>
        <PageAddCart
          id={id}
          image={image}
          name={name}
          unit_amount={unit_amount}
          key={id}
        />
      </div>
    </div>
  );
}

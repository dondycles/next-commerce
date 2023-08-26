import { options } from "@/pages/api/auth/[...nextauth]";
import { formatPrice } from "@/util/PriceFormat";
import { prisma } from "@/util/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";

export const revalidate = 0;

const fetchOrders = async () => {
  const user = await getServerSession(options);
  if (!user) return null;

  const orders = await prisma.order.findMany({
    where: {
      userId: user?.user?.id,
      status: "complete",
    },
    include: {
      products: true,
    },
  });
  return orders;
};

export default async function Dashboard() {
  const orders = await fetchOrders();
  if (orders === null) {
    return <div>Please Log In First To View Your Orders!</div>;
  }
  if (orders?.length === 0) {
    return <div>No Orders Placed!</div>;
  }
  return (
    <main className=" flex flex-col gap-4 pt-[96px] p-4 text-black">
      {orders?.map((order) => {
        return (
          <div
            key={order.id}
            className="flex flex-col gap-4 rounded-lg border-[1px] border-black/25 p-4"
          >
            <div className=" flex flex-col gap-4">
              {order.products.map((product) => {
                return (
                  <div
                    key={product.id}
                    className=" flex flex-row flex-wrap gap-4"
                  >
                    <Image
                      src={product.image as string}
                      width={100}
                      height={100}
                      alt={product.name}
                      className="max-w-[100px] w-full aspect-square object-cover rounded"
                    ></Image>
                    <div className="flex flex-col">
                      <p className="font-black">{product.name}</p>
                      <div className="text-xs">
                        <p>{formatPrice(product.unit_amount)}</p>
                        <p>Qty: {product.quantity}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 flex-col text-xs">
              <p className=" break-all">Order ID: {order.id}</p>
              <p>{new Date(order.createdDate).toDateString()}</p>
              <p>
                Status:{" "}
                <span
                  className={`${
                    order.status === "complete" && " bg-green-500"
                  } ${
                    order.status === "pending" && " bg-yellow-500"
                  } rounded-md py-1 px-2`}
                >
                  {order.status}
                </span>
              </p>
              <p className="font-black text-lg">
                Total: {formatPrice(order.amount)}
              </p>
            </div>
          </div>
        );
      })}
    </main>
  );
}

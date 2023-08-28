import { options } from "@/pages/api/auth/[...nextauth]";
import { formatPrice } from "@/util/PriceFormat";
import { prisma } from "@/util/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";

export const revalidate = 0;

const fetchOrders = async () => {
  const user = await getServerSession(options);
  if (!user) {
    return null;
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user?.user?.id,
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
    return (
      <main className="  flex-col gap-4 pt-[96px] text-base-content min-h-[100dvh] flex items-center justify-center">
        Please Log In First To View Your Orders!
      </main>
    );
  }
  if (orders?.length === 0) {
    return (
      <main className=" flex flex-col gap-4 pt-[96px] text-base-content min-h-[100dvh] items-center justify-center">
        No Orders Placed!
      </main>
    );
  }
  return (
    <main className=" flex flex-col gap-4 pt-[96px] text-base-content">
      {orders?.map((order) => {
        return (
          <div
            key={order.id}
            className=" bg-base-200 flex flex-col gap-4 rounded-lg p-4"
          >
            <div className=" flex flex-col gap-4">
              {order.products.map((product) => {
                return (
                  <div
                    key={product.id}
                    className=" flex flex-row flex-wrap gap-4 bg-base-300 rounded-md"
                  >
                    <Image
                      src={product.image as string}
                      width={100}
                      height={100}
                      alt={product.name}
                      priority={true}
                      className="max-w-[100px] w-full aspect-square object-cover rounded"
                    ></Image>
                    <div className="flex flex-col py-4">
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
                    order.status === "complete" &&
                    " text-success-content bg-success"
                  } ${
                    order.status === "pending" &&
                    " text-warning-content  bg-warning"
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

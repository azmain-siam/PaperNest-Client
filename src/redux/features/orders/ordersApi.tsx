import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
    addOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => {
        console.log(status, "status");
        return {
          url: `/orders/${orderId}`,
          method: "PATCH",
          body: { status },
        };
      },
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderStatusMutation,
} = orderApi;

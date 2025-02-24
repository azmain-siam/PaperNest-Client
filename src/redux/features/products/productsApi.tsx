import { baseApi } from "@/redux/api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
} = productsApi;

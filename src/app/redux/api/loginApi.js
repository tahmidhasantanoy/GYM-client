import { baseApi } from "./baseApi";

const extendedApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (userInfo) => ({
        url: "/login-user",
        method: "POST",
        data: userInfo,
        contentType: "application/json",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginUserMutation } = extendedApi;

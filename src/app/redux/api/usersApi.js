import { emptySplitApi } from './emptySplitApi';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    searchEmail: build.query({
      query: (email) => `search?email=${email}`, 
    }),
  }),
  overrideExisting: false,
});

export const { useSearchEmailQuery } = extendedApi;

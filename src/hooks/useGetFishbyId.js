import { useLazyQuery } from "@apollo/client";
import { GetFishbyId } from "../graphql/query";

export default function useGetFishbyId() {
    const [getData_qry, { data, loading, error }] = useLazyQuery(GetFishbyId);
    return {
        fishInKeranjang: data ? data.fishes : [],
        loading,
        error,
        getData_qry
    };
  }
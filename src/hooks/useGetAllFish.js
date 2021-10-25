import { useQuery } from "@apollo/client";
import { GetAllFish } from "../graphql/query";

export default function useGetData() {
    const { data, loading, error } = useQuery(GetAllFish);
    return {
        fishes: data ? data.fishes : [],
        loading,
        error
    };
  }
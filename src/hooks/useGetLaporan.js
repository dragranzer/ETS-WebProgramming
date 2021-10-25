import { useQuery } from "@apollo/client";
import { GetAllLaporan } from "../graphql/query";

export default function useGetData() {
    const { data, loading, error } = useQuery(GetAllLaporan);
    return {
        laporans: data ? data.laporan : [],
        loading,
        error
    };
  }
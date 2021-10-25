import { useLazyQuery, useQuery } from "@apollo/client";
import { GetUser2 } from "../graphql/query";

export default function useLazyGetUser() {
    
    const [getData_qry, { data, loading, error }] = useLazyQuery(GetUser2);

    return {
        user: data ? data.user : [],
        loading,
        error,
        getData_qry,
    };
  }
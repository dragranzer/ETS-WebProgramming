import { useLazyQuery } from "@apollo/client";
import { GetAdminbyUname } from "../graphql/query";

export default function useGetAdminbyUname() {
    
    const [getData_qry, { data, loading, error }] = useLazyQuery(GetAdminbyUname);

    return {
        admin: data ? data.admin : [],
        loading,
        error,
        getData_qry,
    };
  }
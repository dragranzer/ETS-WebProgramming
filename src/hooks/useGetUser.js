import { useLazyQuery, useQuery } from "@apollo/client";
import { GetUser } from "../graphql/query";

export default function useGetData(props) {
    // console.log(props)
    const { data, loading, error } = useQuery(GetUser, {variables:
        {
            id: props
        }
    });
    // console.log(data)
    return {
      user: data ? data.user : [],
      loading,
      error
    };
  }
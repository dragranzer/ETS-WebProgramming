import { useMutation } from "@apollo/client";
import { UpdateAge } from "../graphql/mutation";
import { GetUser } from "../graphql/query"
export default function useUpdateAge(props) {
  const [updateAge, { loading: loadingUpdateAge }] = useMutation(UpdateAge,{
    refetchQueries: [ {
      query: GetUser,
      variables: { id: props }
    }],
  });
  return {
    updateAge,
    loadingUpdateAge,
  };
}
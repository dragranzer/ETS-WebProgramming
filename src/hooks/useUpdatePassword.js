import { useMutation } from "@apollo/client";
import { UpdatePassword } from "../graphql/mutation";
import { GetUser } from "../graphql/query"
export default function useUpdatePassword(props) {
  const [updatePassword, { loading: loadingUpdatePassword }] = useMutation(UpdatePassword,{
    refetchQueries: [ {
      query: GetUser,
      variables: { id: props }
    }],
  });
  return {
    updatePassword,
    loadingUpdatePassword,
  };
}
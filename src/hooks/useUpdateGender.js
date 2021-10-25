import { useMutation } from "@apollo/client";
import { UpdateGender } from "../graphql/mutation";
import { GetUser } from "../graphql/query"
export default function useUpdateGender(props) {
  const [updateGender, { loading: loadingUpdateGender }] = useMutation(UpdateGender,{
    refetchQueries: [ {
      query: GetUser,
      variables: { id: props }
    }],
  });
  return {
    updateGender,
    loadingUpdateGender,
  };
}
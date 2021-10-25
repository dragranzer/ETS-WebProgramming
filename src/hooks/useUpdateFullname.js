import { useMutation } from "@apollo/client";
import { UpdateFullname } from "../graphql/mutation";
import { GetUser } from "../graphql/query"
export default function useUpdateFullname(props) {

  console.log("masuk useUpdateFullname", props)
  const [updateFullname, { loading: loadingUpdate }] = useMutation(UpdateFullname,{
    refetchQueries: [{
      query: GetUser,
      variables: { id: props }
    }],
  });
  return {
    updateFullname,
    loadingUpdate,
  };
}
import { useMutation } from "@apollo/client";
import { UpdateImage } from "../graphql/mutation";
import { GetUser } from "../graphql/query"
export default function useUpdateImage(props) {
  const [updateImage, { loading: loadingUpdateImage }] = useMutation(UpdateImage,{
    refetchQueries: [ {
      query: GetUser,
      variables: { id: props }
    }],
  });
  return {
    updateImage,
    loadingUpdateImage,
  };
}
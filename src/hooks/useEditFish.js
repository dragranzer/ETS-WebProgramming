import { useMutation } from "@apollo/client";
import { EditFish } from "../graphql/mutation";

export default function useEditFish(props) {
  const [editFish, { loading: loadingEditFish }] = useMutation(EditFish);
  return {
    editFish,
    loadingEditFish,
  };
}
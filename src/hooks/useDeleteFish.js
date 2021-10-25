import { useMutation } from "@apollo/client";
import { GetAllFish } from "../graphql/query";
import { DeleteFish } from "../graphql/mutation";
export default function useDeleteFish() {
  const [deleteFish, { loading: loadingDeleteFish }] = useMutation(DeleteFish, {
    refetchQueries: [GetAllFish],
  });
  return {
    deleteFish,
    loadingDeleteFish,
  };
}
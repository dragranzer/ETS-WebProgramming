import { useMutation } from "@apollo/client";
import { UpdateStockbyID } from "../graphql/mutation";

export default function useUpdateStockbyID(props) {
   // console.log("masuk useUpdateStockbyID", props)
  const [updateStockUpdateStockbyID, { loading: loadingUpdate }] = useMutation(UpdateStockbyID);
  return {
    updateStockUpdateStockbyID,
    loadingUpdate,
  };
}
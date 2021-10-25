import { useMutation } from "@apollo/client";
// import { GetData } from "../graphql/query";
import { InsertBarang } from "../graphql/mutation";
export default function useInsertBarang() {
  const [insertBarang, { loading: loadingInsert }] = useMutation(InsertBarang);
  return {
    insertBarang,
    loadingInsert,
  };
}
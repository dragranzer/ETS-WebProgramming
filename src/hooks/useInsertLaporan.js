import { useMutation } from "@apollo/client";
// import { GetData } from "../graphql/query";
import { InsertLaporan } from "../graphql/mutation";
export default function useInsertLaporan() {
  console.log("masuk insert")
  const [insertLaporan, { loading: loadingInsertLaporan }] = useMutation(InsertLaporan);
  return {
    insertLaporan,
    loadingInsertLaporan,
  };
}
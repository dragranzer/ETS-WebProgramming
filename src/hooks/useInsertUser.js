import { useMutation } from "@apollo/client";
// import { GetData } from "../graphql/query";
import { InsertUser } from "../graphql/mutation";
export default function useInsertUser() {
  const [insertUser, { loading: loadingInsert }] = useMutation(InsertUser);
  return {
    insertUser,
    loadingInsert,
  };
}
import { useMutation } from "@apollo/client";
import { UpdateUsername } from "../graphql/mutation";
import { GetUser } from "../graphql/query"
export default function useUpdateUsername(props) {
  console.log("masuk useUpdateuname",props)
  const [updateUsername, { loading: loadingUpdateUsername }] = useMutation(UpdateUsername,{
    refetchQueries: [
      {
        query: GetUser,
        variables: { id: props }
      }
    ],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true
  });
  return {
    updateUsername,
    loadingUpdateUsername,
  };
}
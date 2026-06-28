import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useMessages = (conversationId) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["messages", conversationId],

    enabled: !!conversationId,

    refetchInterval: 2000,

    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/chat/message/${conversationId}`
      );

      return data;
    },
  });
};

export default useMessages;
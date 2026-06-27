import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useConversations = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/chat/conversations");
      return data;
    },
  });
};

export default useConversations;
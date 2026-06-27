import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useConversation = () => {
  const axiosSecure = useAxiosSecure();

  return useMutation({
    mutationFn: async (userInfo) => {
      const { data } = await axiosSecure.post("/chat/start", userInfo);
      return data;
    },
  });
};

export default useConversation;
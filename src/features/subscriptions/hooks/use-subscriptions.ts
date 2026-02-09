import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export const useSubscriptions = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const { data } = await authClient.customer.state();
      return data;
    },
  });
};

export const useHasActiveSubscription = () => {
  const { data: customerStatem, isLoading, ...rest } = useSubscriptions();

  const hasActiveSubscription = customerStatem?.activeSubscriptions && customerStatem?.activeSubscriptions.length > 0;

  return { hasActiveSubscription,subscription: customerStatem?.activeSubscriptions?.[0], isLoading, ...rest };
};

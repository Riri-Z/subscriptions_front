export interface ApiResponse {
  status: string;
  result: UserStore;
}

export interface UserStore {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: string;
  userSubscriptions: UserSubscription[];
}

export interface UserSubscription {
  id: number;
  startDate: string;
  endDate: string;
  renewalDate: string;
  amount: number;
  billingCycle: string;
  status: string;
  subscription: {
    id: number;
    name: string;
  };
}

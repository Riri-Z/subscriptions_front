export interface ApiResponse<T> {
  statusCode: string;
  body: T;
}
export interface ApiResponseResetEmail {
  statusCode: number;
  body: { message: string };
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

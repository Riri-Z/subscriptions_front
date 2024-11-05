export type ApiResponse = Subscription[];
export interface Subscription {
  id: number;
  userId: number;
  subscriptionId: number;
  startDate: Date | string;
  endDate: Date | string;
  renewalDate: Date | string;
  amount: number;
  billingCycle: BillingCycle;
  status: StatusSubscription;
  subscription: {
    id: number;
    name: string;
    icon_name: string;
    category: string;
  };
}

export interface PostSubscriptions {
  subscriptionName: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  billingCycle: BillingCycle;
  statusSubscription: StatusSubscription;
}

export interface SubscriptionsStore {
  isModalOpen: boolean;
  subscriptions: null | Subscription[];
  subscriptionsCurrentMonth: null | Subscription[];
  loading: boolean;
  error: boolean;
  selectedDate: null | string;
}

export enum StatusSubscription {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  PAUSED = "PAUSED",
}

export enum BillingCycle {
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

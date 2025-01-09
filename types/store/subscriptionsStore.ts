export type ApiResponse<T> = {
  statusCode: number;
  body: T;
};
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
  nextsPayements: string[];
}

export interface PostSubscriptions {
  id?: number;
  subscriptionName: string;
  startDate: Date | string;
  endDate: Date | string;
  amount: number;
  billingCycle: BillingCycle;
  category: SubscriptionCategory;
  statusSubscription: StatusSubscription;
}

export enum SubscriptionCategory {
  LEISURE = "LEISURE",
  FOOD = "FOOD",
  SPORT = "SPORT",
  HEALTH = "HEALTH",
  FINANCE = "FINANCE",
  OTHER = "OTHER",
}

export interface SubscriptionsStore {
  isModalOpen: boolean;
  isOpenDetails: boolean;
  subscriptions: null | Subscription[];
  selectedSubscription: null | Subscription;
  subscriptionsCurrentMonth: null | Subscription[];
  loading: boolean;
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

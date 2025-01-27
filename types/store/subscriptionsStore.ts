export type ApiResponse<T> = {
  statusCode: number;
  body: T;
};
export interface UserSubscription {
  id: number;
  userId: number;
  subscriptionId: number;
  startDate: Date | string;
  endDate: Date | string;
  renewalDate: Date | string;
  amount: number;
  billingCycle: BillingCycle;
  status: StatusSubscription;
  category: string;
  subscription: {
    id: number;
    name: string;
    icon_name: string;
    icon_url: string | null;
  };
  nextsPayements: string[];
  computed?: boolean;
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
  subscriptions: null | UserSubscription[];
  selectedSubscription: null | UserSubscription;
  subscriptionsCurrentMonth: null | UserSubscription[];
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

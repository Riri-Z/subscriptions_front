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
  subscription: Subscription;
  nextsPayements: string[];
  computed?: boolean;
}

export interface Subscription {
  id: number;
  name: string;
  icon_name: string;
  icon_url: string | null;
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

export enum ModalStatus {
  ADD,
  DELETE,
  EDIT,
  NULL,
}

export type ModalDetails = {
  action: ModalStatus;
  subscriptionDetails: UserSubscription | null;
};

export interface SubscriptionsStore {
  isModalOpen: boolean;
  modalDetails: ModalDetails;
  modalAction: ModalStatus;
  isOpenDetails: boolean;
  subscriptions: null | UserSubscription[];
  selectedSubscription: null | UserSubscription;
  subscriptionsCurrentMonth: null | UserSubscription[];
  loading: boolean;
  selectedDate: null | string;
  availableSuggestionSubscriptionWithIcon: AvailableSuggestionSubscriptionWithIcon[];
}

export interface AvailableSuggestionSubscriptionWithIcon {
  id: number;
  name: string;
  icon_name: string | null;
  icon_url: string | null;
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

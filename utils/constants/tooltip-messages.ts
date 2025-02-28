export const tooltipMessages = {
  calendar: {
    header: {
      month: "Sélectionner  un nouveau mois",
      year: "Sélectionner  une nouvelle année",
      total: "Balance du mois en cours",
    },
    badge: {
      computedBadge: "Cliquez pour voir les détails",
      badgeWithIcons: (name: string, amount: string) => {
        return capitalized(name) + " - " + amount + "€";
      },
    },
  },
  subscriptionsDetails: {
    edit: "Mettre à jour les détails de l'abonnement",
    delete: "Supprimer l'abonnement",
  },
};

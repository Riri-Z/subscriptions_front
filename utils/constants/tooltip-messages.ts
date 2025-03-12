export const tooltipMessages = {
  calendar: {
    header: {
      month: "Sélectionner  un nouveau mois",
      year: "Sélectionner  une nouvelle année",
    },
    badge: {
      computedBadge: "Cliquez pour voir les détails",
      badgeWithIcons: (name: string, amount: number) => {
        return `${capitalized(name)} - ${amount} €`;
      },
    },
  },
};

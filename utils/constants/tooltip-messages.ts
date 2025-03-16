export const tooltipMessages = {
  calendar: {
    header: {
      month: "tooltips.calendar.month",
      year: "tooltips.calendar.year",
    },
    badge: {
      computedBadge: "Cliquez pour voir les détails",
      badgeWithIcons: (name: string, amount: number) => {
        return `${capitalized(name)} - ${amount} €`;
      },
    },
  },
};

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en: {
      welcome: "Welcome",
      landingPage: {
        hook: "Keep track of your subscriptions at a glance",
      },
      register: {
        title: "Sign Up",
        info: "Fill out the form to register",
        hasAnAccount: "Already registered  ?",
        redirectToLogin: "Log in",

        form: {
          labels: {
            name: "Username",
            email: "E-mail",
            password: "Password",
          },
          errors: {
            name: {
              required: "Username is required",
              invalidLength: "Username must be at least 4 characters long",
            },
            password: {
              required: "Password is required",
              invalidLength: "Password must be at least 6 characters long",
            },
            email: {
              required: "Email is required",
              invalidFormat:
                "The following format is expected e.g.: email@example.com",
            },
          },
          cta: "Sign Up",
        },
      },
      login: {
        title: "Welcome",
        info: "Log in to continue or",
        resetPassword: "Forgot password?",
        redirectToRegister: "Sign up here",
        form: {
          labels: {
            name: "Username",
            password: "Password",
          },
          errors: {
            name: {
              required: "Username is required",
              invalidLength: "Username must be at least 6 characters long",
            },
            password: {
              required: "Password is required",
              invalidLength: "Password must be at least 6 characters long",
            },
          },
          cta: "Log in",
        },
      },
      resetPassword: {
        title: "Enter your email to receive a password reset link.",
        redirectToLogin: "Back to login page",
        form: {
          labels: {
            email: "Email",
          },
          errors: {
            email: "Email is required",
          },
          cta: "Send",
        },
      },
      dashboard: {
        calendar: {
          days: {
            Lundi: "Monday",
            Mardi: "Tuesday",
            Mercredi: "Wednesday",
            Jeudi: "Thursday ",
            Vendredi: "Friday",
            Samedi: "Saturday",
            Dimanche: "Sunday",
          },
          months: {
            janvier: "January",
            février: "February",
            mars: "March",
            avril: "April",
            mai: "May",
            juin: "June",
            juillet: "July",
            août: "August",
            septembre: "September",
            octobre: "October",
            novembre: "November",
            décembre: "Decembe",
          },
          total: "Total for this month :",
        },
        ctaDetails: "Click to view details",
      },
      subscriptionDetails: {
        title: "Active Subscriptions",
        emptySubscriptions: "No payments scheduled for today",
        addSubscription: "Add a new subscription",
        emptySubscription: "No samples scheduled for today",
        editSubscription: "Edit subscription",
        item: {
          name: "Name",
          amount: "Total",
        },
      },
      formSubscription: {
        name: "Name",
        amount: "Amount",
        start: "Start Date",
        end: "End Date",
        cycle: "Payment Cycle",
        category: "Category",
        cta: {
          save: "Save",
          cancel: "Cancel",
        },
      },
      tooltips: {
        subscriptionDetails: {
          edit: "Update subscription",
          delete: "Delete subscription",
        },
      },
    },
    fr: {
      validation: {
        required: "ok",
      },
      welcome: "Bienvenue",
      landingPage: {
        hook: "Gardez le contrôle de vos abonnements en un clin d'œil",
      },
      register: {
        title: "Inscription",
        info: "Remplissez le formulaire pour vous inscrire",
        hasAnAccount: "Déjà inscrit ?",
        redirectToLogin: "Se connecter",
        form: {
          labels: {
            name: "Nom d'utilisateur",
            email: "E-mail",
            password: "Mot de passe",
          },
          errors: {
            name: {
              required: "Nom d'utilisateur obligatoire",
              invalidLength:
                "Nom d'utilisateur  doit être de 4 charactères minimum",
            },
            password: {
              required: "Mot de passe obligatoire",
              invalidLength:
                "Le mot de passe doit être de 6 charactères minimum",
            },
            email: {
              required: "Email obligatoire",
              invalidFormat:
                "Le format suivant est attendu ex : email@example.com",
            },
          },
          cta: "S'inscrire",
        },
      },
      login: {
        title: "Bienvenue",
        info: "Connectez-vous pour continuer ou",
        resetPassword: "Mot de passe oublié ?",
        redirectToRegister: "Inscrivez-vous ici",
        form: {
          labels: {
            name: "Nom d'utilisateur",
            password: "Mot de passe",
          },
          errors: {
            name: {
              required: "Nom d'utilisateur obligatoire",
              invalidLength:
                "Nom d'utilisateur  doit être de 4 charactères minimum",
            },
            password: {
              required: "Mot de passe obligatoire",
              invalidLength:
                "Le mot de passe doit être de 6 charactères minimum",
            },
          },
          cta: "Connexion",
        },
      },
      resetPassword: {
        title:
          "Saisissez votre e-mail pour recevoir un lien de réinitialisation du mot de passe.",
        redirectToLogin: "Retour à la connexion",
        form: {
          labels: {
            email: "E-mail",
          },
          errors: {
            email: "E-mail obligatoire",
          },
          cta: "Envoyer",
        },
      },
      dashboard: {
        calendar: {
          days: {
            Lundi: "Lundi",
            Mardi: "Mardi",
            Mercredi: "Mercredi",
            Jeudi: "Jeudi",
            Vendredi: "Vendredi",
            Samedi: "Samedi",
            Dimanche: "Dimanche",
          },
          months: {
            janvier: "janvier",
            février: "février",
            mars: "mars",
            avril: "avril",
            mai: "mai",
            juin: "juin",
            juillet: "juillet",
            août: "août",
            septembre: "septembre",
            octobre: "octobre",
            novembre: "novembre",
            décembre: "décembre",
          },
          total: "Total pour ce mois :",
        },
        ctaDetails: "Cliquez pour voir les détails",
      },
      subscriptionDetails: {
        title: "Abonnements actifs",
        emptySubscriptions: "Aucun prélèvement prévu aujourd’hui",
        addSubscription: "Ajouter un abonnement",
        emptySubscription: "Pas de prélevements prévue ce jour",
        editSubscription: "Modifier l'abonnement",
        item: {
          name: "Nom",
          amount: "Montant",
        },
      },
      formSubscription: {
        name: "Nom",
        amount: "Montant",
        start: "Date de début",
        end: "Date de fin",
        cycle: "Cycle de paiement",
        category: "Catégorie",
        cta: {
          save: "Sauvegarder",
          cancel: "Annuler",
        },
      },
      tooltips: {
        subscriptionDetails: {
          edit: "Modifier l'abonnement",
          delete: "Supprimer l'abonnement",
        },
      },
    },
  },
}));

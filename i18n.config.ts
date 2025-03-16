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
                "Please use a valid format (e.g.: email{'@'}example.com)",
            },
          },
          cta: "Sign Up",
        },
      },
      login: {
        title: "Welcome",
        info: "Log in to continue or",
        resetPassword: "Forgot password ?",
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
            décembre: "December",
          },
          total: "Total for this month :",
        },
        ctaDetails: "Click to view details",
      },
      subscriptionDetails: {
        title: "Active Subscriptions",
        emptySubscriptions: "No payments scheduled for today",
        addSubscription: "Add a new subscription",
        emptyCharges: "No charges scheduled for today",
        editSubscription: "Edit subscription",
        item: {
          name: "Name",
          amount: "Total",
        },
      },
      deleteSubscriptionPrompt: {
        delete: {
          title: "Delete Subscription",
          confirmation:
            "Are you sure you want to delete the following subscription",
          cta: {
            continue: "Continue",
            cancel: "Cancel",
          },
        },
      },
      formSubscription: {
        name: "Name",
        amount: "Amount",
        start: "Start Date",
        end: "End Date",
        cycle: "Payment Cycle",
        category: "Category",
        errors: {
          name: {
            length: "Name must be at least 2 characters long",
            required: "A name is mandatory",
          },
          amount: {
            typeError: "Should be a valid amount",
            required: "An amount is mandatory",
          },
          startDate: {
            required: "A start date is mandatory",
          },
          category: {
            required: "A category is mandatory",
          },
        },
        cta: {
          save: "Save",
          cancel: "Cancel",
        },
      },
      toastMessages: {
        deleteSubscriptionMessages: {
          success: "Subscription successfully deleted!",
          error:
            "An error occurred while attempting to delete the subscription",
          invalidSubscription: "Invalid or non-existent subscription.",
        },
        addSubscriptionMessages: {
          success: "Subscription successfully added!",
          error: "An error occurred while adding the subscription",
          subscriptionIncomplet:
            "Sorry, an error occurred with this subscription",
        },
        postSubscriptionMessages: {
          success: "Subscription successfully updated!",
          error: "An error occurred while attempting to update",
          startDateMustBeBeforeEndDate:
            "The start date must be before the end date",
          subscriptionIncomplet:
            "Sorry, an error occurred with this subscription",
        },
        loginMessages: {
          errorUndefined:
            "Unable to connect to the server. Please try again later.",
          wrongCredentials: "Incorrect username or password.",
          unknownError: "An unknown error occurred.",
          missingInput: "Username and password are required",
        },
        registerMessages: {
          success: "User registered, you will be redirected to the login page",
          conflict: "This email address or username already exists",
          error: "Username or email already in use. Please try another value",
          unknownError:
            "Unable to connect to the server. Please try again later.",
        },
      },
      tooltips: {
        subscriptionDetails: {
          edit: "Update subscription",
          delete: "Delete subscription",
        },
        calendar: {
          month: "Select a new month",
          year: "Select a new year",
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
                "Le nom d'utilisateur doit contenir au moins 4 caractères",
            },
            password: {
              required: "Mot de passe obligatoire",
              invalidLength:
                "Le mot de passe doit contenir au moins 6 caractères",
            },
            email: {
              required: "Email obligatoire",
              invalidFormat:
                "Le format suivant est attendu : email{'@'}example.com",
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
                "Le nom d'utilisateur doit contenir au moins 4 caractères",
            },
            password: {
              required: "Mot de passe obligatoire",
              invalidLength:
                "Le mot de passe doit contenir au moins 6 caractères",
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
        addSubscription: "Ajouter un abonnement",
        emptyCharges: "Aucun prélèvement prévu aujourd'hui",
        editSubscription: "Modifier l'abonnement",
        item: {
          name: "Nom",
          amount: "Montant",
        },
      },
      deleteSubscriptionPrompt: {
        delete: {
          title: "Supprimer l'abonnement",
          confirmation:
            "Êtes-vous sûr de vouloir supprimer l'abonnement suivant ",
          cta: {
            continue: "Continuer",
            cancel: "Annuler",
          },
        },
      },
      formSubscription: {
        name: "Nom",
        amount: "Montant",
        start: "Date de début",
        end: "Date de fin",
        cycle: "Cycle de paiement",
        category: "Catégorie",
        errors: {
          name: {
            length: "Le nom doit contenir au moins 2 caractères",
            required: "Un nom est requis",
          },
          amount: {
            typeError: "Doit être un nombre valide",
            required: "Un montant est requis",
          },
          startDate: {
            required: "Une date de début est requise",
          },
          category: {
            required:
              "Catégorie obligatoire. Sélectionnez 'Autre' si aucune option ne convient.",
          },
        },
        cta: {
          save: "Sauvegarder",
          cancel: "Annuler",
        },
      },
      toastMessages: {
        deleteSubscriptionMessages: {
          success: "Abonnement supprimé avec succès !",
          error:
            "Une erreur est survenue lors de la tentative de suppression de l'abonnement",
          invalidSubscription: "Abonnement invalide ou inexistant.",
        },
        addSubscriptionMessages: {
          success: "Abonnement ajouté avec succès!",
          error: "Une erreur est survenue lors de l'ajout de l'abonnement",
          subscriptionIncomplet:
            "Désolé, une erreur est survenue avec cet abonnement",
        },
        postSubscriptionMessages: {
          success: "Abonnement mis à jour avec succès !",
          error: "Une erreur est survenue lors de la tentative de mise à jour",
          startDateMustBeBeforeEndDate:
            "La date de début doit être avant la date de fin",
          subscriptionIncomplet:
            "Désolé, une erreur est survenue avec cet abonnement",
        },
        loginMessages: {
          errorUndefined:
            "Impossible de se connecter au serveur. Veuillez réessayer plus tard.",
          wrongCredentials: "Nom d'utilisateur ou mot de passe incorrect.",
          unknownError: "Une erreur inconnue s'est produite.",
          missingInput: "Nom d'utilisateur et mot de passe obligatoires",
        },
        registerMessages: {
          success:
            "Utilisateur enregistré, vous allez être redirigé vers la page de connexion",
          conflict: "Cette adresse email ou ce nom d'utilisateur existe déjà",
          error:
            "Nom d'utilisateur ou email déjà utilisé. Veuillez essayer une autre valeur",
          unknownError:
            "Impossible de se connecter au serveur. Veuillez réessayer plus tard.",
        },
      },
      tooltips: {
        subscriptionDetails: {
          edit: "Modifier l'abonnement",
          delete: "Supprimer l'abonnement",
        },
        calendar: {
          month: "Sélectionner  un nouveau mois",
          year: "Sélectionner  une nouvelle année",
        },
      },
    },
  },
}));

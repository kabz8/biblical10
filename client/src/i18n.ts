import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav.courses": "Courses",
      "nav.dashboard": "Dashboard",
      "nav.login": "Log in",
      "nav.logout": "Log out",
      "hero.title": "Level Up Your Skills & Career",
      "hero.subtitle": "Join thousands of students learning modern workflows. Step-by-step courses designed to make you unstoppable.",
      "hero.cta": "Explore Courses",
      "course.enroll": "Enroll Now",
      "course.free": "Free",
      "course.start": "Start Learning",
      "course.completed": "Completed"
    }
  },
  fr: {
    translation: {
      "nav.courses": "Cours",
      "nav.dashboard": "Tableau de bord",
      "nav.login": "Connexion",
      "nav.logout": "Déconnexion",
      "hero.title": "Améliorez vos compétences",
      "hero.subtitle": "Rejoignez des milliers d'étudiants. Des cours étape par étape conçus pour vous rendre inarrêtable.",
      "hero.cta": "Explorer les cours",
      "course.enroll": "S'inscrire",
      "course.free": "Gratuit",
      "course.start": "Commencer",
      "course.completed": "Terminé"
    }
  },
  ar: {
    translation: {
      "nav.courses": "الدورات",
      "nav.dashboard": "لوحة القيادة",
      "nav.login": "تسجيل الدخول",
      "nav.logout": "تسجيل خروج",
      "hero.title": "ارتقِ بمهاراتك ومسيرتك المهنية",
      "hero.subtitle": "انضم إلى آلاف الطلاب الذين يتعلمون سير العمل الحديث. دورات خطوة بخطوة مصممة لتجعلك لا تقهر.",
      "hero.cta": "استكشف الدورات",
      "course.enroll": "سجل الان",
      "course.free": "مجانًا",
      "course.start": "ابدأ التعلم",
      "course.completed": "مكتمل"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;

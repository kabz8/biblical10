import { useTranslation } from "react-i18next";

export default function GenericPage({ title }: { title: string }) {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">{t(title)}</h1>
      <p className="text-lg text-muted-foreground">
        This page for {t(title)} is currently under development. Please check back soon!
      </p>
    </div>
  );
}

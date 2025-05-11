
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/components/LanguageProvider";
import { Contact as ContactIcon } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const translations = {
    en: {
      title: "Contact Us",
      subtitle: "Have questions? We'd love to hear from you.",
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Send Message",
      address: "123 Clean Street, Car City",
      phone: "Phone: (123) 456-7890",
      email_contact: "Email: contact@cleanride.com",
      formSuccess: "Thank you for your message! We'll get back to you soon.",
    },
    fr: {
      title: "Contactez-nous",
      subtitle: "Vous avez des questions ? Nous serions ravis de vous entendre.",
      name: "Nom",
      email: "Email",
      message: "Message",
      submit: "Envoyer le message",
      address: "123 Rue Propre, Ville Auto",
      phone: "Téléphone: (123) 456-7890",
      email_contact: "Email: contact@cleanride.com",
      formSuccess: "Merci pour votre message ! Nous vous répondrons bientôt.",
    },
    ar: {
      title: "اتصل بنا",
      subtitle: "هل لديك أسئلة؟ يسعدنا أن نسمع منك.",
      name: "الاسم",
      email: "البريد الإلكتروني",
      message: "الرسالة",
      submit: "إرسال الرسالة",
      address: "١٢٣ شارع نظيف، مدينة السيارات",
      phone: "الهاتف: ٧٨٩٠-٤٥٦ (١٢٣)",
      email_contact: "البريد الإلكتروني: contact@cleanride.com",
      formSuccess: "شكراً على رسالتك! سنرد عليك قريباً.",
    },
  };
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    // Show success toast
    toast({
      title: "Success!",
      description: t("formSuccess"),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`container mx-auto py-12 px-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="flex flex-col items-center mb-12">
        <ContactIcon className="h-12 w-12 mb-4 text-primary" />
        <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
        <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-card rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  {t("name")}
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  {t("email")}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  {t("message")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full min-h-[150px]"
                />
              </div>
              
              <Button type="submit" className="w-full">
                {t("submit")}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="bg-muted rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">
              CleanRide
            </h2>
            <div className="space-y-4 text-lg">
              <p>{t("address")}</p>
              <p>{t("phone")}</p>
              <p>{t("email_contact")}</p>
            </div>
            
            <div className="mt-8">
              <iframe
                title="Map"
                className="w-full h-64 rounded-lg border border-border"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d-73.9876!3d40.7488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU1LjciTiA3M8KwNTknMTUuNCJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen={false}
                aria-hidden="false"
                tabIndex={0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

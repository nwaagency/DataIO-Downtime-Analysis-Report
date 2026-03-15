import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Linkedin, MapPin, ArrowRight, ExternalLink, Clock } from "lucide-react";
import { ScrollAnimationWrapper } from "@/hooks/use-scroll-animation";
import { useToast } from "@/hooks/use-toast";
import blueBackground from "@/assets/Blue Background.png";
import metalGearNoBg from "@/assets/metalGearnoBG.png";

// Web3Forms API (SC Engineering account)
const WEB3FORMS_API_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "ffc72496-1720-4340-8bfe-c03ed308be1e";

const Contact = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Load Web3Forms hCaptcha script once
  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://web3forms.com/client/script.js"]');
    if (existingScript) return;
    const script = document.createElement("script");
    script.src = "https://web3forms.com/client/script.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setStatusMessage("Sending...");

    try {
      const formElement = e.currentTarget;
      const form = new FormData(formElement);
      const captchaResponse = form.get("h-captcha-response");
      if (!captchaResponse) {
        setStatus("error");
        setStatusMessage("Please complete the captcha before sending.");
        toast({
          title: "Captcha required",
          description: "Please complete the captcha and try again.",
          variant: "destructive",
        });
        return;
      }

      form.append("access_key", WEB3FORMS_API_KEY);
      form.append("from_name", "SC Engineering Contact");
      form.append("subject", "New contact from SC Engineering site");
      form.append("from_email", "Sales@SCEngineering.co.za");
      form.append("replyto", formData.email);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setStatusMessage("Message sent! We'll get back to you within 24 hours.");
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        // Reset captcha if present (ensure next submission must solve it again)
        if (typeof window !== "undefined" && (window as any).hcaptcha) {
          (window as any).hcaptcha.reset();
        } else {
          const captchaTextarea = formElement.querySelector<HTMLTextAreaElement>('textarea[name="h-captcha-response"]');
          if (captchaTextarea) captchaTextarea.value = "";
        }
      } else {
        const message = data.message || "There was an issue sending your message. Please try again.";
        setStatus("error");
        setStatusMessage(message);
        toast({
          title: "Something went wrong",
          description: message,
          variant: "destructive",
        });
      }
    } catch (error) {
      setStatus("error");
      setStatusMessage("Network error. Please try again in a moment.");
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-white">
      {/* Hero Banner */}
      <div className="relative w-full overflow-hidden text-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${blueBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1f3f]/95 via-[#12356b]/90 to-[#0c1f3f]/96" />
        <div className="container mx-auto px-4 relative z-10 h-[180px] py-12 md:py-16 lg:py-18 flex flex-col items-center justify-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-3 !-mb-5"
            
          >
            {/* Match hero hierarchy/contrast with About page for consistency */}
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Contact Us
            </h1>
            <div className="h-[3px] w-12 bg-white/80 rounded-full mx-auto" />
            <p className="text-base md:text-lg font-bold text-blue-100/90 max-w-3xl mx-auto leading-relaxed">
              Get in touch to learn more about what we can do for you.
              {/* Southern Composite Engineering (SCE) is a specialist engineering workshop focused on mechatronic design,
              precision manufacturing and practical problem solving. We turn complex ideas into reliable, real world
              systems. */}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-4 pb-4 md:pb-6 space-y-10">
        {/* Main contact card */}
        <ScrollAnimationWrapper animation="fade-up">
          <div className="hidden md:block">
            <Card className="border border-white/30 shadow-2xl rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 blueprint-pattern opacity-[0.04]" />
              <CardContent className="relative grid grid-cols-1 lg:grid-cols-2 lg:items-start gap-8 md:gap-10 py-6 px-4 sm:px-6 md:px-10 bg-white/90 backdrop-blur">
                {/* Vertical divider */}
                <div className="hidden lg:block absolute inset-y-8 left-1/2 -translate-x-1/2 w-px bg-border/60" />

                {/* Left column: contact info */}
                <div className="space-y-6 p-2 pr-0 lg:pl-8 self-start order-2 lg:order-2 ">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">Contact Information</h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Mail,
                        title: "email address",
                        desc: (
                          <div className="space-y-0.5">
                            <a 
                              href="mailto:sales@scengineering.co.za"
                            >
                              sales@scengineering.co.za
                            </a>                        
                          </div>
                        ),
                        href: undefined,
                      },
                      {
                        icon: Clock,
                        title: "Business Hours",
                        desc: (
                          <div className="space-y-0.5">
                            <p>09:00 – 17:00</p>
                            <p>Mon – Fri</p>
                          </div>
                        ),
                        href: undefined,
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="group flex items-start gap-4 p-5 rounded-2xl bg-white/70 border border-border shadow-sm transition-all duration-300 md:hover:-translate-y-[1px] md:hover:shadow-lg md:hover:bg-white/80"
                      >
                        <div className="h-[52px] w-[52px] min-w-[52px] min-h-[52px] rounded-full bg-primary/15 backdrop-blur-sm flex items-center justify-center text-primary shadow-inner">
                          <item.icon size={24} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.title}</p>
                          {item.href ? (
                            item.title.toLowerCase().includes("linkedin") ? (
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-base font-semibold text-foreground hover:text-primary transition-colors"
                              >
                                {item.desc}
                                <ExternalLink size={16} className="opacity-70 group-hover:opacity-100 transition" />
                              </a>
                            ) : (
                              <a
                                href={item.href}
                                className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                              >
                                {item.desc}
                              </a>
                            )
                          ) : (
                            <div className="text-base font-semibold text-foreground">{item.desc}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-dashed border-border/70 p-5 bg-white/80 text-sm text-muted-foreground transition-all duration-300 md:hover:-translate-y-[1px] md:hover:shadow-md">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-primary mt-1" size={20} />
                      <div className="space-y-1">
                        <p className="font-semibold text-foreground">Workshop Location</p>
                        <p className="leading-snug text-[13px]">Prime Park, Mocke Road</p>
                        <p className="leading-snug text-[13px]">Diep River, Western Cape</p>
                        <a
                          href="https://www.google.com/maps?q=Prime%20Park%20Mocke%20Road%20Diep%20River%20Western%20Cape"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary text-xs font-semibold opacity-80 hover:opacity-100 transition"
                        >
                          Get directions
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-border/70 shadow-sm w-full h-[300px] sm:h-[330px] md:h-[380px] lg:h-[430px] xl:h-[400px]">
                    <iframe
                      title="SC Engineering mini map"
                      src="https://www.google.com/maps?q=Prime%20Park%20Mocke%20Road%20Diep%20River%20Western%20Cape&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Right column: form */}
                <div className="relative p-2 lg:pr-8 self-start rounded-2xl order-1 lg:order-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Send Us a Message</h3>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-base font-semibold mb-2 text-foreground">Name <span className="text-red-500">*</span></label>
                      <Input
                          name="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          className={`rounded-2xl shadow-sm placeholder:text-muted-foreground/70 text-base ${status === "error" ? "border-red-400 focus-visible:ring-red-400" : status === "success" ? "border-green-500 focus-visible:ring-green-500" : ""}`}
                        />
                      </div>
                      <div>
                        <label className="block text-base font-semibold mb-2 text-foreground">Email <span className="text-red-500">*</span></label>
                        <Input
                          name="email"
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@email.com"
                          className={`rounded-2xl shadow-sm placeholder:text-muted-foreground/70 text-base ${status === "error" ? "border-red-400 focus-visible:ring-red-400" : status === "success" ? "border-green-500 focus-visible:ring-green-500" : ""}`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                    <label className="block text-base font-semibold text-foreground">Phone (optional)</label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +27 82 123 4567"
                      className={`rounded-2xl shadow-sm placeholder:text-muted-foreground/70 text-base ${status === "error" ? "border-red-400 focus-visible:ring-red-400" : status === "success" ? "border-green-500 focus-visible:ring-green-500" : ""}`}
                    />
                    <p className="text-xs text-muted-foreground">Optional - we'll only call if it helps move your project forward.</p>
                  </div>

                    <div className="space-y-2">
                      <label className="block text-base font-semibold text-foreground">Subject <span className="text-red-500">*</span></label>
                      <Input
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Project or enquiry subject"
                        className={`rounded-2xl shadow-sm placeholder:text-muted-foreground/70 text-base ${status === "error" ? "border-red-400 focus-visible:ring-red-400" : status === "success" ? "border-green-500 focus-visible:ring-green-500" : ""}`}
                      />
                      <p className="text-xs text-muted-foreground">Help us understand what you need.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-base font-semibold text-foreground">Message <span className="text-red-500">*</span></label>
                      <Textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project requirements..."
                        rows={6}
                        maxLength={500}
                        className={`rounded-2xl shadow-sm placeholder:text-muted-foreground/70 text-base ${status === "error" ? "border-red-400 focus-visible:ring-red-400" : status === "success" ? "border-green-500 focus-visible:ring-green-500" : ""}`}
                    />
                    <p className="text-xs text-muted-foreground flex justify-between">
                      <span>{`${formData.message.length}/500`}</span>
                    </p>
                  </div>

                  <div className="flex justify-start">
                    <div className="h-captcha" data-captcha="true" />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      size="lg"
                        className="w-full md:w-auto px-8 h-[52px] font-semibold inline-flex items-center gap-2 transition-all duration-300 md:hover:scale-[1.02] md:hover:shadow-lg"
                        disabled={status === "sending"}
                      >
                        {status === "sending" ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Message
                            <ArrowRight size={18} />
                          </>
                        )}
                      </Button>
                    </div>
                    {status !== "idle" && statusMessage && (
                      <div
                        className={`text-sm mt-1 ${
                          status === "success" ? "text-green-600" : status === "error" ? "text-red-600" : "text-muted-foreground"
                        }`}
                      >
                        {status === "success"
                          ? "Your message has been sent. We’ll get back to you within one business day."
                          : statusMessage}
                      </div>
                    )}
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollAnimationWrapper>

        {/* MOBILE-ONLY STACKED CARDS */}
        <div className="block md:hidden space-y-8">
          {/* Card 1 — Form */}
          <Card className="border border-white/30 shadow-2xl rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 blueprint-pattern opacity-[0.04]" />
            <CardContent className="relative bg-white/90 backdrop-blur py-10 px-4 sm:px-6 space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Send Us a Message</h3>
              {/* FORM — exact copy of original */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="block text-base font-semibold mb-2 text-foreground">Name <span className="text-red-500">*</span></label>
                    <Input
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className={`rounded-2xl shadow-sm placeholder:text-muted-foreground/70 text-base ${status === "error" ? "border-red-400 focus-visible:ring-red-400" : status === "success" ? "border-green-500 focus-visible:ring-green-500" : ""}`}
                    />
                  </div>
                  <div>
                    <label className="block text-base font-semibold mb-2 text-foreground">Email <span className="text-red-500">*</span></label>
                    <Input
                      name="email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@email.com"
                      className={`rounded-2xl shadow-sm placeholder:text-muted-foreground/70 text-base ${status === "error" ? "border-red-400 focus-visible:ring-red-400" : status === "success" ? "border-green-500 focus-visible:ring-green-500" : ""}`}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-base font-semibold text-foreground">Phone (optional)</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +27 82 123 4567"
                    className={`rounded-2xl shadow-sm placeholder:text-muted-foreground/70 text-base ${status === "error" ? "border-red-400 focus-visible:ring-red-400" : status === "success" ? "border-green-500 focus-visible:ring-green-500" : ""}`}
                  />
                  <p className="text-xs text-muted-foreground">Optional - we'll only call if it helps move your project forward.</p>
                </div>
                <div className="space-y-2">
                  <label className="block text-base font-semibold text-foreground">Subject <span className="text-red-500">*</span></label>
                  <Input
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project or enquiry subject"
                    className={`rounded-2xl shadow-sm placeholder:text-muted-foreground/70 text-base ${status === "error" ? "border-red-400 focus-visible:ring-red-400" : status === "success" ? "border-green-500 focus-visible:ring-green-500" : ""}`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-base font-semibold text-foreground">Message <span className="text-red-500">*</span></label>
                  <Textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project requirements..."
                    rows={6}
                    maxLength={500}
                    className={`rounded-2xl shadow-sm placeholder:text-muted-foreground/70 text-base ${status === "error" ? "border-red-400 focus-visible:ring-red-400" : status === "success" ? "border-green-500 focus-visible:ring-green-500" : ""}`}
                  />
                  <p className="text-xs text-muted-foreground flex justify-between">
                    <span>{`${formData.message.length}/500`}</span>
                  </p>
                </div>
                <div className="flex justify-start">
                  <div className="h-captcha" data-captcha="true" />
                </div>
                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full px-8 h-[52px] font-semibold inline-flex items-center gap-2"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending..." : <>Send Message <ArrowRight size={18} /></>}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          {/* Card 2 — Contact Information */}
          <Card className="border border-white/30 shadow-2xl rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 blueprint-pattern opacity-[0.04]" />
            <CardContent className="relative bg-white/90 backdrop-blur py-10 px-4 sm:px-6 space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Contact Information</h3>
              {/* COPY EXACT LEFT COLUMN ELEMENTS FROM ORIGINAL */}
              {/** Business hours block **/}
              <div className="space-y-4">
                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white/70 border border-border shadow-sm w-full">
                  <div className="h-[52px] w-[52px] rounded-full bg-primary/15 flex items-center justify-center text-primary"><Mail size={18} /></div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">email address</p>
                    <a 
                      href="mailto:sales@scengineering.co.za"
                      className="text-base font-semibold text-foreground break-all hover:text-primary transition-colors inline-block"
                    >
                      sales@scengineering.co.za
                    </a>
                    {/* <p className="text-base font-semibold text-foreground leading-snug break-all">sales@scengineering.co.za</p> */}
                  </div>
                </div>
                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white/70 border border-border shadow-sm">
                  <div className="h-[52px] w-[52px] rounded-full bg-primary/15 flex items-center justify-center text-primary"><Clock size={18} /></div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Business Hours</p>
                    <p className="text-base font-semibold text-foreground leading-snug">09:00 – 17:00<br/>Mon – Fri</p>
                  </div>
                </div>
              </div>
              {/* Location block */}
              <div className="rounded-2xl border border-dashed border-border/70 p-5 bg-white/80 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-1" size={20} />
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Workshop Location</p>
                    <p className="leading-snug text-[13px]">Prime Park, Mocke Road</p>
                    <p className="leading-snug text-[13px]">Diep River, Western Cape</p>
                    <a
                      href="https://www.google.com/maps?q=Prime%20Park%20Mocke%20Road%20Diep%20River%20Western%20Cape"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary text-xs font-semibold opacity-80 hover:opacity-100 transition"
                    >
                      Get directions <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
              {/* MAP — same style but controlled height */}
              <div className="rounded-2xl overflow-hidden border border-border/70 shadow-sm w-full h-[260px] sm:h-[300px]">
                <iframe
                  title="SC Engineering mini map"
                  src="https://www.google.com/maps?q=Prime%20Park%20Mocke%20Road%20Diep%20River%20Western%20Cape&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </CardContent>
          </Card>
        </div>


      </div>
    </section>
  );
};

export default Contact;


import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Check, CreditCard, Download, ArrowLeft, ArrowRight } from "lucide-react";
import { MATCHES } from "@/data/matches";
import { getTeamById } from "@/data/teams";
import { getStadiumById } from "@/data/stadiums";

type Zone = "VIP" | "TRIBUNE" | "POPULAIRE";

const STEPS = ["Sièges", "Confirmation", "Paiement", "Billet"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
            i < current ? "bg-primary text-primary-foreground" :
            i === current ? "bg-primary/20 text-primary border border-primary" :
            "bg-muted text-muted-foreground"
          }`}>
            {i < current ? <Check className="w-4 h-4" /> : i + 1}
          </div>
          <span className={`text-xs font-heading hidden sm:inline ${i === current ? "text-primary font-semibold" : "text-muted-foreground"}`}>
            {step}
          </span>
          {i < STEPS.length - 1 && <div className={`w-8 h-px ${i < current ? "bg-primary" : "bg-muted"}`} />}
        </div>
      ))}
    </div>
  );
}

export default function Reservation() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const match = MATCHES.find((m) => m.id === Number(matchId));
  const [step, setStep] = useState(0);
  const [zone, setZone] = useState<Zone | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [ticketId] = useState(`BTK-2026-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`);

  if (!match) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-muted-foreground">Match introuvable.</p>
      </div>
    );
  }

  const home = getTeamById(match.homeTeamId)!;
  const away = getTeamById(match.awayTeamId)!;
  const stadium = getStadiumById(match.stadiumId)!;

  const prices: Record<Zone, number> = {
    VIP: match.priceVip,
    TRIBUNE: match.priceTribune,
    POPULAIRE: match.pricePopulaire,
  };
  const total = zone ? prices[zone] * quantity : 0;

  const zones: { key: Zone; label: string; color: string; desc: string }[] = [
    { key: "VIP", label: "VIP", color: "hsl(var(--gold))", desc: "Sièges centraux premium" },
    { key: "TRIBUNE", label: "Tribune", color: "hsl(var(--secondary))", desc: "Vue dégagée" },
    { key: "POPULAIRE", label: "Populaire", color: "hsl(var(--primary))", desc: "Ambiance garantie" },
  ];

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep(3);
    }, 2500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <button onClick={() => step > 0 ? setStep(step - 1) : navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>

        {/* Match header */}
        <div className="glass p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: home.colors[0], color: home.colors[1] }}>
              {home.shortName.slice(0, 2)}
            </div>
            <span className="font-heading font-semibold text-foreground text-sm">
              {home.shortName} vs {away.shortName}
            </span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: away.colors[0], color: away.colors[1] }}>
              {away.shortName.slice(0, 2)}
            </div>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-3">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{stadium.name}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(match.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</span>
          </div>
        </div>

        <StepIndicator current={step} />

        <AnimatePresence mode="wait">
          {/* STEP 0: Zone selection */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
              <h2 className="text-display text-3xl text-foreground mb-6">CHOISISSEZ VOTRE ZONE</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {zones.map((z) => (
                  <motion.button
                    key={z.key}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setZone(z.key)}
                    className={`glass p-6 text-left transition-all duration-300 ${zone === z.key ? "ring-2 ring-primary" : ""}`}
                    style={{ borderColor: zone === z.key ? z.color : undefined }}
                  >
                    <div className="w-4 h-4 rounded-full mb-3" style={{ background: z.color }} />
                    <h3 className="font-heading font-bold text-foreground">{z.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{z.desc}</p>
                    <p className="font-mono text-lg text-foreground mt-3">{prices[z.key]} <span className="text-xs text-muted-foreground">MAD</span></p>
                  </motion.button>
                ))}
              </div>

              {zone && (
                <div className="glass p-6">
                  <label className="text-sm font-heading text-foreground mb-3 block">Nombre de billets</label>
                  <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg bg-muted text-foreground font-bold">-</button>
                    <span className="font-mono text-2xl text-foreground w-8 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(10, quantity + 1))} className="w-10 h-10 rounded-lg bg-muted text-foreground font-bold">+</button>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="font-mono text-2xl text-primary font-bold">{total} MAD</span>
                  </div>
                  <button onClick={() => setStep(1)} className="btn-neon w-full mt-6 flex items-center justify-center gap-2">
                    Continuer <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 1: Confirmation */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
              <h2 className="text-display text-3xl text-foreground mb-6">RÉCAPITULATIF</h2>
              <div className="glass p-6 space-y-4">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Match</span><span className="text-foreground font-medium">{home.name} vs {away.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Stade</span><span className="text-foreground">{stadium.name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Date</span><span className="text-foreground">{new Date(match.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Zone</span><span className="text-foreground font-bold">{zone}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Quantité</span><span className="text-foreground">{quantity}</span></div>
                <div className="border-t border-border pt-4 flex justify-between">
                  <span className="font-heading font-semibold text-foreground">Total TTC</span>
                  <span className="font-mono text-2xl text-primary font-bold">{total} MAD</span>
                </div>
              </div>
              <button onClick={() => setStep(2)} className="btn-neon w-full mt-6 flex items-center justify-center gap-2">
                Procéder au paiement <CreditCard className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 2: Payment */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
              <h2 className="text-display text-3xl text-foreground mb-6">PAIEMENT</h2>
              <div className="glass p-6 space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Numéro de carte</label>
                  <input className="w-full bg-muted rounded-lg px-4 py-3 text-foreground font-mono text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">Expiration</label>
                    <input className="w-full bg-muted rounded-lg px-4 py-3 text-foreground font-mono text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">CVV</label>
                    <input type="password" className="w-full bg-muted rounded-lg px-4 py-3 text-foreground font-mono text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="•••" />
                  </div>
                </div>
                <div className="border-t border-border pt-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Montant à payer</span>
                  <span className="font-mono text-xl text-primary font-bold">{total} MAD</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className="btn-neon w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {processing ? (
                  <div className="flex items-center gap-2">
                    <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 rounded-full bg-primary-foreground" />
                    <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 rounded-full bg-primary-foreground" />
                    <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 rounded-full bg-primary-foreground" />
                    <span className="ml-2">Traitement en cours...</span>
                  </div>
                ) : (
                  <>Payer {total} MAD</>
                )}
              </button>
            </motion.div>
          )}

          {/* STEP 3: Success */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: "spring" }}>
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-10 h-10 text-primary" />
                </motion.div>
                <h2 className="text-display text-4xl text-foreground">RÉSERVATION CONFIRMÉE !</h2>
              </div>

              {/* Ticket */}
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="glass p-8 max-w-md mx-auto text-center relative overflow-hidden"
                style={{ boxShadow: "var(--shadow-elevated)" }}
              >
                <div className="font-display text-xl text-primary tracking-widest mb-6">BOTOLA TICKET</div>

                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: home.colors[0], color: home.colors[1] }}>
                    {home.shortName.slice(0, 2)}
                  </div>
                  <span className="text-display text-2xl text-muted-foreground">VS</span>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: away.colors[0], color: away.colors[1] }}>
                    {away.shortName.slice(0, 2)}
                  </div>
                </div>
                <p className="font-heading font-semibold text-foreground text-sm mb-1">{home.name} vs {away.name}</p>

                <div className="border-t border-border my-4" />

                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">{new Date(match.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · {new Date(match.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</p>
                  <p className="text-muted-foreground">{stadium.name}, {stadium.city}</p>
                  <p className="text-foreground font-semibold">{zone} · {quantity} billet(s)</p>
                </div>

                <div className="border-t border-border my-4" />

                {/* QR placeholder */}
                <div className="w-32 h-32 bg-foreground/10 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-px w-24 h-24">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className={`${Math.random() > 0.5 ? "bg-foreground" : "bg-transparent"} rounded-[1px]`} />
                    ))}
                  </div>
                </div>

                <p className="font-mono text-xs text-primary">{ticketId}</p>
                <p className="font-mono text-sm text-foreground font-bold mt-2">{total} MAD</p>

                <div className="border-t border-border mt-4 pt-3">
                  <p className="text-[10px] text-muted-foreground">Billet verifie · Non remboursable</p>
                </div>
              </motion.div>

              <div className="flex gap-4 justify-center mt-8">
                <button className="btn-neon flex items-center gap-2">
                  <Download className="w-4 h-4" /> Télécharger PDF
                </button>
                <button onClick={() => navigate("/")} className="btn-outline-neon">
                  Accueil
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

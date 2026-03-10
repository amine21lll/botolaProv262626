import { motion } from "framer-motion";
import { STADIUMS } from "@/data/stadiums";
import StadiumCard from "@/components/stadium/StadiumCard";
import { MapPin, Zap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Stadiums() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Header */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-center"
        >
          <span className="section-tag mx-auto">
            <MapPin className="w-3 h-3" />
            Exploration
          </span>
          <h1 className="text-display text-5xl md:text-7xl text-foreground mb-6">
            NOS <span className="text-primary italic">STADES</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-heading">
            Découvrez les enceintes mythiques qui font battre le cœur de la Botola Pro.
            Infrastructures modernes, ambiances survoltées et passion pure.
          </p>
        </motion.div>
      </section>

      {/* Stadiums Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STADIUMS.map((stadium, i) => (
            <motion.div
              key={stadium.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <StadiumCard stadium={stadium} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

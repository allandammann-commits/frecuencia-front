import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";
import { toast } from "sonner";

const Welcome = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleEnter = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Ingresa tu nombre para continuar");
      return;
    }
    localStorage.setItem("user_name", trimmed);
    navigate("/home");
  };

  return (
    <div className="min-h-screen px-4 pt-10 pb-24 flex flex-col items-center">
      <div className="w-full max-w-md text-center">
        <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold gradient-text mb-2">Bienvenida</h1>
        <p className="text-muted-foreground mb-6">Ingresa tu nombre para entrar</p>

        <form onSubmit={handleEnter} className="glass-card rounded-2xl p-6 space-y-4">
          <div className="text-left">
            <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Tu nombre</label>
            <Input
              id="name"
              placeholder="Ej: Ana"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2"
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-white">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Welcome;
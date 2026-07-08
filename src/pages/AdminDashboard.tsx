import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Eye,
  FlaskConical,
  Lock,
  RefreshCw,
  Search,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DATE_PRESET_OPTIONS,
  filterEventsByEntryDate,
  formatRangeLabel,
  getDefaultCustomDates,
  resolveDateRange,
  type DatePreset,
} from "@/lib/adminDateFilter";
import { buildFunnelMetrics, FUNNEL_STAGES, getStageTooltip, type FunnelStage } from "@/lib/funnelAnalytics";
import { buildLandingVariantMetrics } from "@/lib/landingVariantAnalytics";
import {
  fetchFunnelEvents,
  getSupabaseBuildInfo,
  pingFunnelTracking,
  type FunnelEventRow,
} from "@/lib/funnelTracking";
import { isSupabaseConfigured } from "@/lib/supabase";

import { maskSessionId } from "@/lib/dataPrivacy";
import {
  clearAdminSession,
  getAdminLockoutRemainingMs,
  getStoredAdminKey,
  persistAdminSession,
  registerAdminLoginFailure,
} from "@/lib/adminAuth";

const StageTooltip = ({
  stage,
  children,
}: {
  stage: FunnelStage;
  children: React.ReactNode;
}) => {
  const tip = getStageTooltip(stage);
  if (!tip) return <>{children}</>;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="top" className="max-w-sm text-xs leading-relaxed">
        {tip}
      </TooltipContent>
    </Tooltip>
  );
};

const formatDate = (iso: string) => {
  if (!iso) return "-";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
};

const KpiCard = ({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <div className="rounded-2xl border border-[#E8DFF5] bg-white p-4 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-wide text-[#9B8FAE]">{label}</p>
        <p className="mt-2 text-[28px] font-bold leading-none text-[#3D1A6E]">{value}</p>
        <p className="mt-2 text-[12px] text-[#A89BB8] leading-snug">{hint}</p>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF6FD] text-[#9B6BB8]">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

const VARIANT_LAYOUT_HINT: Record<string, string> = {
  A: "Controle · visual amador bege",
  B: "Clean · minimalista sem comentários",
  C: "Social · estilo feed Facebook",
};

const LandingAbSection = ({
  variantMetrics,
}: {
  variantMetrics: ReturnType<typeof buildLandingVariantMetrics>;
}) => (
  <div className="rounded-2xl border border-[#E8DFF5] bg-white p-5 shadow-sm">
    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <FlaskConical className="h-5 w-5 text-[#9B6BB8]" />
        <div>
          <h2 className="text-lg font-bold">Teste A/B/C da landing</h2>
          <p className="text-xs text-[#9B8FAE]">
            Qual versão da página converte melhor (VSL → checkout)
          </p>
        </div>
      </div>
      {variantMetrics.winnerId && (
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F0FF] border border-[#E8DFF5] px-3 py-1.5 text-xs font-semibold text-[#8B5CB8]">
          <Trophy className="h-3.5 w-3.5" />
          Melhor: Variante {variantMetrics.winnerId}
        </div>
      )}
    </div>

    {variantMetrics.unknownSessions > 0 && (
      <p className="mb-3 text-xs text-[#A89BB8]">
        {variantMetrics.unknownSessions} sessão(ões) sem variante registrada (acessos antes do teste A/B/C).
      </p>
    )}

    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="text-[#7A6B8E]">
          <tr className="border-b border-[#EDE4F7]">
            <th className="px-3 py-2.5 font-semibold">Versão</th>
            <th className="px-3 py-2.5 font-semibold">Sessões</th>
            <th className="px-3 py-2.5 font-semibold">% tráfego</th>
            <th className="px-3 py-2.5 font-semibold">VSL</th>
            <th className="px-3 py-2.5 font-semibold">Oferta</th>
            <th className="px-3 py-2.5 font-semibold">Checkout</th>
            <th className="px-3 py-2.5 font-semibold">VSL → Oferta</th>
            <th className="px-3 py-2.5 font-semibold">Oferta → Checkout</th>
            <th className="px-3 py-2.5 font-semibold text-[#8B5CB8]">VSL → Checkout</th>
          </tr>
        </thead>
        <tbody>
          {variantMetrics.variants.map((variant) => {
            const isWinner = variantMetrics.winnerId === variant.id;
            return (
              <tr
                key={variant.id}
                className={`border-b border-[#F1ECF8] ${isWinner ? "bg-[#FDF9FE]" : ""}`}
              >
                <td className="px-3 py-3 align-top">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FAF6FD] text-xs font-bold text-[#8B5CB8]">
                      {variant.id}
                    </span>
                    <div>
                      <p className="font-semibold text-[#4A2D6E]">{variant.label}</p>
                      <p className="text-[11px] text-[#A89BB8]">{VARIANT_LAYOUT_HINT[variant.id]}</p>
                    </div>
                    {isWinner && (
                      <span className="ml-1 rounded-full bg-[#8B5CB8] px-2 py-0.5 text-[10px] font-bold text-white">
                        TOP
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-3 py-3 font-semibold text-[#4A2D6E]">{variant.sessions}</td>
                <td className="px-3 py-3 text-[#6B5F7A]">{variant.trafficShare}%</td>
                <td className="px-3 py-3 text-[#6B5F7A]">{variant.vslViews}</td>
                <td className="px-3 py-3 text-[#6B5F7A]">{variant.offerViews}</td>
                <td className="px-3 py-3">
                  <span className="font-semibold text-[#4A2D6E]">{variant.checkoutClicks}</span>
                  {variant.checkoutClicks > 0 && (
                    <p className="text-[10px] text-[#A89BB8] mt-0.5">
                      {variant.premiumClicks} prem. · {variant.basicClicks} bás.
                    </p>
                  )}
                </td>
                <td className="px-3 py-3 text-[#6B5F7A]">{variant.vslToOfferRate}%</td>
                <td className="px-3 py-3 text-[#6B5F7A]">{variant.offerToCheckoutRate}%</td>
                <td className="px-3 py-3">
                  <span className={`text-base font-bold ${isWinner ? "text-[#8B5CB8]" : "text-[#4A2D6E]"}`}>
                    {variant.vslToCheckoutRate}%
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {!variantMetrics.hasEnoughData && (
      <p className="mt-3 text-xs text-[#A89BB8] leading-relaxed">
        Precisa de pelo menos 3 sessões por variante com VSL para destacar a vencedora. Continue rodando tráfego.
      </p>
    )}
  </div>
);

const LoginScreen = ({
  onLogin,
  error,
}: {
  onLogin: (key: string) => void;
  error: string | null;
}) => {
  const [key, setKey] = useState("");
  const [pingStatus, setPingStatus] = useState<string | null>(null);
  const [pinging, setPinging] = useState(false);
  const buildInfo = getSupabaseBuildInfo();

  const runPing = async () => {
    setPinging(true);
    setPingStatus(null);
    const err = await pingFunnelTracking();
    setPingStatus(err ? `Erro: ${err}` : "Gravação OK — evento de teste enviado ao Supabase.");
    setPinging(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-[#E8DFF5] bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FAF6FD] text-[#9B6BB8]">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#3D1A6E]">Painel do Funil</h1>
            <p className="text-sm text-[#9B8FAE]">Acesso privado</p>
          </div>
        </div>

        <div className="mb-4 rounded-xl border border-[#EDE4F7] bg-[#FAF6FD] p-3 text-xs leading-relaxed text-[#6B5F7A] space-y-1">
          <p>
            <strong>Build:</strong>{" "}
            {buildInfo.url ? (
              <span className="text-green-700">Supabase URL detectada</span>
            ) : (
              <span className="text-red-600">URL ausente — refaça o deploy na Vercel</span>
            )}
          </p>
          <p>
            <strong>Chave anon:</strong>{" "}
            {!buildInfo.hasKey ? (
              <span className="text-red-600">ausente</span>
            ) : buildInfo.keyLooksValid ? (
              <span className="text-green-700">formato JWT correto (eyJ…)</span>
            ) : (
              <span className="text-red-600">
                formato inválido — use a chave <em>legacy anon</em> (começa com eyJ), não sb_publishable_
              </span>
            )}
          </p>
          {buildInfo.url && (
            <p className="text-[#9B8FAE] break-all">{buildInfo.url}</p>
          )}
        </div>

        {!isSupabaseConfigured ? (
          <p className="text-sm text-[#7A6B8E] leading-relaxed">
            Configure <code className="text-[#9B6BB8]">VITE_SUPABASE_URL</code> e{" "}
            <code className="text-[#9B6BB8]">VITE_SUPABASE_ANON_KEY</code> na Vercel e faça{" "}
            <strong>Redeploy</strong>.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin(key.trim());
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Senha do painel"
              className="w-full rounded-xl border border-[#E8DFF5] px-4 py-3 text-sm text-[#3D1A6E] outline-none focus:ring-2 focus:ring-[#C9A0DC]/40"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="button"
              onClick={() => void runPing()}
              disabled={pinging}
              className="w-full rounded-xl border border-[#E8DFF5] py-2.5 text-sm font-medium text-[#6B5F7A] hover:bg-[#FAF6FD]"
            >
              {pinging ? "Testando gravação…" : "Testar gravação no Supabase"}
            </button>
            {pingStatus && (
              <p className={`text-xs leading-relaxed ${pingStatus.startsWith("Erro") ? "text-red-600" : "text-green-700"}`}>
                {pingStatus}
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#8B5CB8] to-[#9B6BB8] py-3 text-sm font-semibold text-white"
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const AdminDashboard = () => {
  const [adminKey, setAdminKey] = useState(() => getStoredAdminKey() ?? "");
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [events, setEvents] = useState<FunnelEventRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [lockoutMs, setLockoutMs] = useState(0);
  const [datePreset, setDatePreset] = useState<DatePreset>("today");
  const [customFrom, setCustomFrom] = useState(() => getDefaultCustomDates().from);
  const [customTo, setCustomTo] = useState(() => getDefaultCustomDates().to);

  const dateRange = useMemo(
    () => resolveDateRange(datePreset, customFrom, customTo),
    [datePreset, customFrom, customTo],
  );

  const filteredEvents = useMemo(
    () => filterEventsByEntryDate(events, dateRange),
    [events, dateRange],
  );

  const metrics = useMemo(() => buildFunnelMetrics(filteredEvents), [filteredEvents]);
  const variantMetrics = useMemo(() => buildLandingVariantMetrics(filteredEvents), [filteredEvents]);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLockoutMs(getAdminLockoutRemainingMs());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const loadData = useCallback(async (key: string) => {
    setLoading(true);
    try {
      const data = await fetchFunnelEvents(key);
      setEvents(data);
      setLastUpdate(new Date());
      setAuthed(true);
      setLoginError(null);
      persistAdminSession(key);
    } catch {
      setAuthed(false);
      registerAdminLoginFailure();
      setLoginError("Senha inválida ou Supabase não configurado.");
      clearAdminSession();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!adminKey || !isSupabaseConfigured) return;
    void loadData(adminKey);
  }, [adminKey, loadData]);

  useEffect(() => {
    if (!authed || !adminKey) return;
    const interval = window.setInterval(() => {
      void loadData(adminKey);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [authed, adminKey, loadData]);

  const filteredLeads = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return metrics.leads;
    return metrics.leads.filter((lead) => {
      const ref = lead.referral;
      return (
        lead.sessionId.toLowerCase().includes(q) ||
        lead.shortId.toLowerCase().includes(q) ||
        ref.platform.toLowerCase().includes(q) ||
        ref.clickId.toLowerCase().includes(q) ||
        ref.displayLabel.toLowerCase().includes(q) ||
        (lead.landingVariant?.toLowerCase().includes(q) ?? false) ||
        Object.values(lead.stages).some((value) => value.toLowerCase().includes(q))
      );
    });
  }, [metrics.leads, search]);

  if (!authed) {
    const lockoutRemaining = getAdminLockoutRemainingMs();
    return (
      <LoginScreen
        error={
          lockoutMs > 0
            ? `Muitas tentativas. Aguarde ${Math.ceil(lockoutMs / 1000)}s.`
            : loginError
        }
        onLogin={(key) => {
          if (lockoutMs > 0) return;
          setAdminKey(key);
          void loadData(key);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#3D1A6E]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="border-b border-[#E8DFF5] bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-xl font-bold">Painel do Funil</h1>
            <p className="text-sm text-[#9B8FAE]">
              Atualização automática a cada 5s
              {lastUpdate ? ` · ${formatDate(lastUpdate.toISOString())}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                clearAdminSession();
                setAdminKey("");
                setAuthed(false);
                setEvents([]);
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-[#E8DFF5] bg-white px-4 py-2 text-sm font-medium text-[#6B5F7A] hover:bg-[#FAF6FD]"
            >
              Sair
            </button>
            <button
              type="button"
              onClick={() => void loadData(adminKey)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#E8DFF5] bg-white px-4 py-2 text-sm font-medium text-[#6B5F7A] hover:bg-[#FAF6FD]"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Atualizar
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 space-y-6">
        <div className="rounded-2xl border border-[#E8DFF5] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#9B6BB8]" />
              <div>
                <p className="text-sm font-semibold text-[#4A2D6E]">Período</p>
                <p className="text-xs text-[#9B8FAE]">{formatRangeLabel(dateRange)}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {DATE_PRESET_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setDatePreset(option.id)}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    datePreset === option.id
                      ? "bg-[#8B5CB8] text-white"
                      : "border border-[#E8DFF5] bg-[#FAF6FD] text-[#6B5F7A] hover:bg-[#F5F0FF]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          {datePreset === "custom" && (
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
              <label className="flex flex-col gap-1 text-xs text-[#7A6B8E]">
                De
                <input
                  type="date"
                  value={customFrom}
                  onChange={(e) => setCustomFrom(e.target.value)}
                  className="rounded-xl border border-[#E8DFF5] px-3 py-2 text-sm text-[#3D1A6E] outline-none focus:ring-2 focus:ring-[#C9A0DC]/40"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs text-[#7A6B8E]">
                Até
                <input
                  type="date"
                  value={customTo}
                  onChange={(e) => setCustomTo(e.target.value)}
                  className="rounded-xl border border-[#E8DFF5] px-3 py-2 text-sm text-[#3D1A6E] outline-none focus:ring-2 focus:ring-[#C9A0DC]/40"
                />
              </label>
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <KpiCard label="Visitantes" value={metrics.visitors} hint="Abriram a página do quiz" icon={Eye} />
          <KpiCard label="Leads adquiridos" value={metrics.leadsAcquired} hint="Responderam a pergunta 1" icon={Users} />
          <KpiCard label="Taxa de interação" value={`${metrics.interactionRate}%`} hint="Entrada → resposta P1" icon={TrendingUp} />
          <KpiCard label="Leads qualificados" value={metrics.qualifiedLeads} hint="Chegaram na página VSL" icon={Target} />
          <KpiCard label="Fluxos completos" value={metrics.completedFlows} hint="Clicaram no checkout" icon={CheckCircle2} />
        </div>

        <LandingAbSection variantMetrics={variantMetrics} />

        <div className="rounded-2xl border border-[#E8DFF5] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#9B6BB8]" />
            <h2 className="text-lg font-bold">Conversão por etapa</h2>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {FUNNEL_STAGES.map((stage, index) => (
              <StageTooltip key={stage.id} stage={stage}>
                <div className="h-full cursor-help rounded-xl border border-[#EDE4F7] bg-[#FAF6FD] p-2.5 transition-colors hover:border-[#C9A0DC] hover:bg-[#F5F0FF]">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#9B8FAE]">
                    {stage.index}. {stage.group}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-[#4A2D6E]">{stage.label}</p>
                  <p className="mt-2 text-xl font-bold text-[#8B5CB8]">{metrics.stageRates[index]}%</p>
                  <p className="mt-0.5 text-[11px] text-[#A89BB8]">{metrics.stageCounts[index]} leads</p>
                  {index > 0 && metrics.stageDropOffs[index] > 0 && (
                    <p className="mt-1.5 text-[10px] font-semibold text-red-500">
                      −{metrics.stageDropOffs[index]} ({metrics.stageDropOffRates[index]}%)
                    </p>
                  )}
                </div>
              </StageTooltip>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#E8DFF5] bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold mb-1">Perfis do quiz</h2>
            <p className="text-xs text-[#9B8FAE] mb-4">Quem prevalece entre quem completou o teste</p>
            {metrics.profileStats.every((p) => p.count === 0) ? (
              <p className="text-sm text-[#A89BB8]">Nenhum lead completou o quiz ainda.</p>
            ) : (
              <div className="space-y-2">
                {metrics.profileStats.map((item) => (
                  <div
                    key={item.profile}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[#EDE4F7] bg-[#FAF6FD] px-3 py-2.5"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#4A2D6E]">
                        Perfil {item.profile} · {item.tag}
                      </p>
                      <p className="text-xs text-[#7A6B8E] leading-snug mt-0.5">{item.summary}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xl font-bold text-[#8B5CB8]">{item.percent}%</p>
                      <p className="text-[11px] text-[#A89BB8]">{item.count} leads</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-[#E8DFF5] bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Origem do tráfego</h2>
            <div className="space-y-2">
              {metrics.referralChannels.map((item) => (
                <div
                  key={item.channel}
                  className="flex items-center justify-between rounded-xl border border-[#EDE4F7] bg-[#FAF6FD] px-3 py-2.5"
                >
                  <span className="text-sm font-medium text-[#4A2D6E]">{item.label}</span>
                  <span className="text-sm text-[#8B5CB8] font-bold">
                    {item.count} · {item.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E8DFF5] bg-white shadow-sm overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-[#EDE4F7] p-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold">Jornada dos leads</h2>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A89BB8]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar..."
                className="w-full rounded-xl border border-[#E8DFF5] py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#C9A0DC]/40"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#FAF6FD] text-[#7A6B8E]">
                <tr>
                  <th className="px-4 py-3 font-semibold sticky left-0 bg-[#FAF6FD] z-10">ID Lead</th>
                  <th className="px-4 py-3 font-semibold">Variante</th>
                  <th className="px-4 py-3 font-semibold min-w-[180px]">Referral</th>
                  <th className="px-4 py-3 font-semibold">Entrada</th>
                  <th className="px-4 py-3 font-semibold">Progresso</th>
                  {FUNNEL_STAGES.map((stage) => (
                    <th key={stage.id} className="px-4 py-3 font-semibold whitespace-nowrap min-w-[100px]">
                      <StageTooltip stage={stage}>
                        <span className="cursor-help underline decoration-dotted decoration-[#C9A0DC] underline-offset-2">
                          {stage.index}. {stage.label}
                        </span>
                      </StageTooltip>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={FUNNEL_STAGES.length + 5} className="px-4 py-10 text-center text-[#A89BB8]">
                      <p>Nenhum lead encontrado neste período.</p>
                      <p className="mt-2 text-xs max-w-md mx-auto leading-relaxed">
                        Período ativo: <strong className="text-[#7A6B8E]">{formatRangeLabel(dateRange)}</strong>.
                        Tente outro intervalo ou aguarde novos acessos ao funil.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.sessionId} className="border-t border-[#F1ECF8] hover:bg-[#FDF9FE]">
                      <td className="px-4 py-3 font-mono text-xs sticky left-0 bg-white z-10">
                        <div className="font-semibold text-[#4A2D6E]">{lead.shortId}</div>
                        <div className="text-[#A89BB8] font-mono text-[10px]" title={lead.sessionId}>
                          {maskSessionId(lead.sessionId)}
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        {lead.landingVariant ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#FAF6FD] text-xs font-bold text-[#8B5CB8]">
                            {lead.landingVariant}
                          </span>
                        ) : (
                          <span className="text-[#D4C4E8]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top min-w-[200px]">
                        <div className="rounded-lg bg-[#F5F0FF] px-2.5 py-2 text-xs leading-snug text-[#5C3D7A]">
                          <p className="font-semibold text-[#4A2D6E]">{lead.referral.platform}</p>
                          {lead.referral.clickId !== "—" ? (
                            <p className="mt-1 break-all font-mono text-[11px] text-[#6B5F7A]">
                              {lead.referral.clickId}
                            </p>
                          ) : (
                            <p className="mt-1 text-[#A89BB8]">sem id de clique</p>
                          )}
                          {lead.referral.campaign !== "—" && (
                            <p className="mt-1 text-[#9B8FAE]">campanha: {lead.referral.campaign}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-[#6B5F7A]">{formatDate(lead.enteredAt)}</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-[#8B5CB8]">{lead.progressPercent}%</div>
                        {lead.profile != null && (
                          <div className="text-xs text-[#A89BB8]">perfil {lead.profile}</div>
                        )}
                      </td>
                      {FUNNEL_STAGES.map((stage) => (
                        <td key={stage.id} className="px-4 py-3 align-top">
                          {lead.stages[stage.id] ? (
                            <span
                              className={`inline-block max-w-[180px] rounded-lg px-2.5 py-1.5 text-xs leading-snug ${
                                lead.stages[stage.id] === "saiu sem responder"
                                  ? "bg-red-50 text-red-600 border border-red-100"
                                  : "bg-[#F5F0FF] text-[#5C3D7A]"
                              }`}
                            >
                              {lead.stages[stage.id]}
                            </span>
                          ) : (
                            <span className="text-[#D4C4E8]">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

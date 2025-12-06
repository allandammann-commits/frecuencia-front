import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sparkles, MessageSquare, CalendarRange, Brain, AlertTriangle, CheckCircle, ListChecks, Instagram, Heart } from "lucide-react";

const GuideMaster = () => {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="text-accent" />
        <h2 className="font-display text-xl font-semibold">💫 GUÍA MAESTRA: CÓMO USAR LAS FRECUENCIAS PARA RESULTADOS RÁPIDOS Y EFICACES</h2>
      </div>
      <p className="text-sm text-muted-foreground">El plan completo para usar las frecuencias y hacerlas funcionar más rápido y con mayor eficacia</p>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="intro">
          <AccordionTrigger className="text-base">🎯 Introducción: Cómo funciona este sistema</AccordionTrigger>
          <AccordionContent className="space-y-3 text-sm">
            <p>Las frecuencias trabajan en el <span className="font-medium">plano energético</span> (invisible). Tus acciones físicas las <span className="font-medium">anclan en la realidad</span> (visible).</p>
            <div className="rounded-xl p-3 bg-muted/30">
              <pre className="text-xs whitespace-pre-wrap">Frecuencia Correcta + Acción Inteligente + Timing Perfecto = Manifestación Real</pre>
            </div>
            <p>Este no es un manual de "manipulación". Es un sistema de <span className="font-medium">alineación energética + comunicación inteligente</span>.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="parte1">
          <AccordionTrigger className="text-base flex items-center gap-2"><MessageSquare className="h-4 w-4" />📱 Parte 1: Sistema avanzado de mensajes</AccordionTrigger>
          <AccordionContent className="space-y-5 text-sm">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="principios">
                <AccordionTrigger className="text-sm">🧠 Principios de comunicación magnética</AccordionTrigger>
                <AccordionContent className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold">✅ Regla de Oro</p>
                    <p>"Escribe cuando ELIJAS, no cuando NECESITES"</p>
                  </div>
                  <div>
                    <p className="font-semibold">✅ Los 3 estados para escribir</p>
                    <div className="space-y-2">
                      <p><span className="font-medium">1. Estado Neutro (Mejor):</span> sin ansiedad ni expectativa; curiosidad genuina; energía tranquila; después de la frecuencia Amor Permanente.</p>
                      <p><span className="font-medium">2. Estado Alto (Bueno):</span> feliz y empoderada; abundancia; energía magnética; después de la frecuencia Encantamiento.</p>
                      <p><span className="font-medium">3. Estado Bajo (Nunca):</span> tristeza/ansiedad/necesidad; desde el miedo o carencia; después de llorar o stalkerear. Si estás así: NO ESCRIBAS.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="arquetipos">
                <AccordionTrigger className="text-sm">💬 Los 12 arquetipos de mensajes magnéticos</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-semibold">📩 Categoría 1: Reconexión inicial</p>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Tipo 1A: El Pretexto Genuino</p>
                        <pre className="text-xs whitespace-pre-wrap">Opción 1 (si tienen amigos en común):
"Hola! Cómo estás? Hace rato vi a [amigo común] y me acordé de ti. Espero que estés bien 😊"

Opción 2 (si compartieron algo específico):
"Oye, el otro día pasé por [lugar que ambos conocen] y pensé en aquella vez que [anécdota breve]. Qué tiempos jaja ¿Cómo has estado?"

Opción 3 (si él compartió algo público):
"Vi en tu historia lo de [algo que publicó]. Me pareció [interesante/divertido/genial]. ¿Cómo va todo por allá?"

Opción 4 (honesta y directa):
"Hola! Sé que ha pasado tiempo... Solo quería saber cómo estás. Sin presión, solo genuina curiosidad 😊"</pre>
                        <p>⏰ Timing: 10am-1pm o 7pm-9pm • 🎯 Expectativa: puede responder en 1-24 horas. No reenviar.</p>
                      </div>
                      <div>
                        <p className="font-medium">Tipo 1B: La Actualización de Vida</p>
                        <pre className="text-xs whitespace-pre-wrap">Opción 1 (logro personal):
"No sé por qué pero quería compartir esto contigo... [logro]"

Opción 2 (cambio positivo):
"Últimamente he estado trabajando en [hobby/proyecto/salud] y wow... ¿Tú cómo has estado con [tema]?"

Opción 3 (sutil y misteriosa):
"La vida me ha sorprendido últimamente de formas inesperadas. En el buen sentido 😊 ¿Contigo todo bien?"</pre>
                        <p>⏰ Timing: Lunes-Jueves • 🎯 Expectativa: él preguntará detalles. Sé un poco vaga al principio.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold">📩 Categoría 2: Mantenimiento</p>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Tipo 2A: El Check-in Natural</p>
                        <pre className="text-xs whitespace-pre-wrap">Opción 1:
"Feliz [día de la semana]! ¿Cómo viene tu semana?"

Opción 2:
"Estaba viendo [serie/película] y me acordé que tú también la viste. Sin spoilers... ¿qué te pareció el final?"

Opción 3:
"Qué [clima/situación] tan loco hoy, no? ¿Allá igual está así?"

Opción 4:
"Oye, encontré [canción/podcast/lugar] que creo que te gustaría"</pre>
                        <p>⏰ Timing: cada 2-3 días • 🎯 Expectativa: conversaciones cortas pero constantes.</p>
                      </div>
                      <div>
                        <p className="font-medium">Tipo 2B: El Validador Emocional</p>
                        <pre className="text-xs whitespace-pre-wrap">ÉL: "Estoy estresado con el trabajo" • TÚ BIEN:
"Te entiendo completamente... ¿Ya pudiste hacer algo para distraerte o sigues full?"

ÉL: "Mi [familiar] está enfermo" • TÚ BIEN:
"[Nombre], lamento mucho eso 💙 ¿Necesitas hablar o prefieres distraerte un rato? Estoy aquí si necesitas cualquier cosa"

ÉL: "Logré [algo importante]" • TÚ BIEN:
"SABÍA que lo ibas a lograr!! Recuerdo cuando me contabas lo difícil que era y mira dónde estás ahora. Me alegro mucho por ti 💚 Esto se merece una celebración"</pre>
                        <p>⏰ Timing: inmediato cuando comparta algo emocional • 🎯 Expectativa: conexión profunda.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold">📩 Categoría 3: Atracción</p>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Tipo 3A: El Misterioso Estratégico</p>
                        <pre className="text-xs whitespace-pre-wrap">Opción sueño:
"Soñé algo súper random contigo anoche jaja"
ÉL: "¿Qué soñaste?" • TÚ: "Jajaja ya ni me acuerdo bien... cosas de la mente 😅"

Opción recuerdo:
"Acabo de acordarme de algo que me hizo sonreír 😊"
ÉL: "¿De qué?" • TÚ: "De algo tonto que pasó hace tiempo..."

Opción foto misteriosa:
[Foto lugar/objeto] "Esto"
ÉL: "¿Qué es eso?" • TÚ: "Un lugar que encontré hoy. Me dio buena vibra ✨"</pre>
                      </div>
                      <div>
                        <p className="font-medium">Tipo 3B: La Foto Estratégica</p>
                        <pre className="text-xs whitespace-pre-wrap">Selfie casual:
[Foto sonriendo natural] "Qué lindo día hoy ☀️ ¿Tú también?"

Outfit casual pero arreglado:
[Foto de espejo] "Me compré esto y no sé si me queda bien jaja. ¿Opinión sincera?"

Actividad compartida:
[Foto de actividad que a él le gusta] "Finalmente empecé [actividad]. Ahora entiendo por qué te gustaba tanto"

Sutil sensual:
[Detalle no obvio] "Alguien me dijo hoy que tengo [linda sonrisa/ojos bonitos]... ¿tú qué opinas?"</pre>
                        <p>⏰ Timing: fin de semana o tarde-noche • 🎯 Expectativa: cumplido o emoji 🔥</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold">📩 Categoría 4: Cierre/Control</p>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Tipo 4A: El Cierre Elegante</p>
                        <pre className="text-xs whitespace-pre-wrap">"Oye perdona, tengo que irme ya. Tengo [reunión/clase/plan] en un rato. Me encantó hablar contigo 😊 Hablamos pronto!"
"Me están llamando mis amigas. Luego te cuento cómo nos fue! 💕"
"Voy a desconectarme un rato del cel. Necesito un detox digital 😅 Gracias por la charla 💙"</pre>
                      </div>
                      <div>
                        <p className="font-medium">Tipo 4B: El Espacio Estratégico</p>
                        <pre className="text-xs whitespace-pre-wrap">No escribas por 3-5 días después de: varias conversaciones largas; mucho interés; flirteo evidente.
Durante esos días: publica stories sin exceso; si él escribe, responde breve; no inicies tú; Amor Permanente todas las noches.
Él: "Hola! ¿Cómo has estado?" • Tú: "Bien! Anduve algo ocupada estos días. ¿Tú qué tal?"</pre>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold">📩 Categoría 5: Profundización</p>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Tipo 5A: La Vulnerabilidad Selectiva</p>
                        <pre className="text-xs whitespace-pre-wrap">"He estado pensando últimamente en [tema profundo] y me di cuenta de que [reflexión madura]. Siento que he crecido mucho en eso. ¿Tú también?"
"Entendí cosas que antes no veía sobre [situación pasada]. Creo que ambos hemos madurado bastante, ¿no?"
"Agradezco [algo específico que él hizo/fue]. Fue real e importante. Eso no lo voy a olvidar"</pre>
                      </div>
                      <div>
                        <p className="font-medium">Tipo 5B: La Invitación Sutil</p>
                        <pre className="text-xs whitespace-pre-wrap">"[Amigo común] va a [evento/reunión] este [día]. ¿Vas a ir?"
"Acabo de enterarme que van a [concierto/evento]. Estaba pensando en ir"
"¿Qué te parece si un día de estos tomamos un café? Sin presiones, solo ponernos al día"
"¿Sigues yendo a [lugar]? ¿Me recomendarías algún lugar bueno por ahí?"</pre>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="matriz">
                <AccordionTrigger className="text-sm">🎭 Matriz de respuestas inteligentes</AccordionTrigger>
                <AccordionContent className="space-y-3 text-sm">
                  <pre className="text-xs whitespace-pre-wrap">ÉL responde rápido y largo: está interesado. Responde con energía similar pero cierra tú eventualmente. No respondas TAN rápido siempre (20-40 min a veces).
ÉL responde corto: ocupado o no tan interesado aún. Responde corto también. No fuerces conversación. Retírate con gracia: "Ok! Luego hablamos 😊".
ÉL tarda horas: jugando difícil o realmente ocupado. Tarda tú también (o más). No menciones el tiempo. Actúa como si no notaras.
ÉL deja en visto: perdió interés en el tema o se distrajo. NO reenviar. NO preguntar "¿todo bien?". Espera 2-3 días. Retoma con tema NUEVO.
ÉL usa emojis cariñosos (❤️😘🥰): se está abriendo emocionalmente. Corresponde pero sin excederte.
ÉL flirtea: valida sin sobreexponerte. "Jaja gracias 😊" y cambias tema sutilmente.</pre>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="parte2">
          <AccordionTrigger className="text-base flex items-center gap-2"><CalendarRange className="h-4 w-4" />📅 Parte 2: Rutinas de manifestación (14 días)</AccordionTrigger>
          <AccordionContent className="space-y-4 text-sm">
            <p className="font-semibold">🌟 Rutina de 14 días: "Reconexión Magnética" — Objetivo: restablecer comunicación y crear atracción</p>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="d1">
                <AccordionTrigger className="text-sm">Día 1 – Lunes: Reset Energético</AccordionTrigger>
                <AccordionContent>
                  <pre className="text-xs whitespace-pre-wrap">Mañana (20 min):
→ 7:20am: Frecuencia del Encantamiento (5 min)
→ Afirmación espejo: "Hoy comienzo desde mi poder. Soy magnética"
Día: 1 story casual; Mensaje Tipo 1A; actividad feliz
Noche (15 min): Amor Permanente (5 min); journaling; dormir sin celular</pre>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d2">
                <AccordionTrigger className="text-sm">Día 2 – Martes: Siembra de Presencia</AccordionTrigger>
                <AccordionContent>
                  <pre className="text-xs whitespace-pre-wrap">Mañana: Encantamiento (5 min); outfit poderoso y maquillaje
Día: Conversa natural si respondió; cierra tú; story misteriosa; ver 1-2 stories
Noche: Amor Permanente (5 min); visualización 5 min de energía de conversación</pre>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d3">
                <AccordionTrigger className="text-sm">Día 3 – Miércoles: Espacio Estratégico</AccordionTrigger>
                <AccordionContent>
                  <pre className="text-xs whitespace-pre-wrap">Mañana: Encantamiento (5 min)
Día: NO inicies conversación; si él escribe, responde breve; story activa/social; like en 1 foto antigua
Noche: Amor Permanente (5 min); repasar guía</pre>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d4">
                <AccordionTrigger className="text-sm">Día 4 – Jueves: Reconexión Emocional</AccordionTrigger>
                <AccordionContent>
                  <pre className="text-xs whitespace-pre-wrap">Mañana: Encantamiento (5 min)
Día: Si hay conversación: Mensaje 2B (Validador Emocional); si no: Mensaje 3A (Misterioso Estratégico)
Noche: Amor Permanente (5 min); journaling de proceso</pre>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d5">
                <AccordionTrigger className="text-sm">Día 5 – Viernes: Energía Alta</AccordionTrigger>
                <AccordionContent>
                  <pre className="text-xs whitespace-pre-wrap">Mañana: Encantamiento (5 min)
Día: Si conversación va bien: ciérrala tú; sal; stories feliz (2-3)
Noche: NO escribas; Amor Permanente (5 min); dormir temprano</pre>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d6">
                <AccordionTrigger className="text-sm">Día 6 – Sábado: Demostración de Valor</AccordionTrigger>
                <AccordionContent>
                  <pre className="text-xs whitespace-pre-wrap">Mañana: Encantamiento (5 min)
Día: Día completo sin iniciar; si él escribe, responde después de 1-2 horas; actividad que disfrutas; stories social; NO celos
Noche: Amor Permanente si te apetece; descanso del trabajo energético</pre>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d7">
                <AccordionTrigger className="text-sm">Día 7 – Domingo: Protección y Análisis</AccordionTrigger>
                <AccordionContent>
                  <pre className="text-xs whitespace-pre-wrap">Mañana: Protección Amorosa (10 min)
Día: Limpia espacio físico; journaling de señales y ajustes; conversación ligera si aplica
Noche: Amor Permanente (5 min); intenciones para Semana 2; dormir temprano</pre>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d8">
                <AccordionTrigger className="text-sm">Día 8 – Lunes: Reactivación</AccordionTrigger>
                <AccordionContent>
                  <pre className="text-xs whitespace-pre-wrap">Mañana: Encantamiento (5 min)
Día: Si NO has hablado mucho: Mensaje 1B (Actualización de Vida) • Si SÍ hay conversación: Mensaje 3B (Foto Estratégica)
Noche: Amor Permanente (5 min); visualización de encuentro</pre>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d9">
                <AccordionTrigger className="text-sm">Día 9 – Martes: Profundización</AccordionTrigger>
                <AccordionContent>
                  <pre className="text-xs whitespace-pre-wrap">Mañana: Encantamiento (5 min)
Día: Pregunta algo más personal (no invasivo, pero profundo). Responde con más detalle.
Noche: Amor Permanente (5 min); medita 5 min en la conexión</pre>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d10">
                <AccordionTrigger className="text-sm">Día 10 – Miércoles: Control de Ritmo</AccordionTrigger>
                <AccordionContent>
                  <pre className="text-xs whitespace-pre-wrap">Mañana: Encantamiento (5 min)
Día: Si han hablado mucho: frena un poco hoy; responde más espaciado • Si poco: mantén ligera • story misteriosa
Noche: Amor Permanente (5 min); journaling: "Señales positivas que he notado"</pre>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d11">
                <AccordionTrigger className="text-sm">Día 11 – Jueves: Preparación</AccordionTrigger>
                <AccordionContent>
                  <pre className="text-xs whitespace-pre-wrap">Mañana: Encantamiento (5 min) + Protección Amorosa (10 min)
Día: Prepara el terreno para verse — Mensaje Tipo 5B (Invitación Sutil)
Noche: Amor Permanente (5 min); visualiza el encuentro</pre>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d12">
                <AccordionTrigger className="text-sm">Día 12 – Viernes: Acción Física</AccordionTrigger>
                <AccordionContent>
                  <pre className="text-xs whitespace-pre-wrap">Mañana: Encantamiento (5 min)
Día: Si él aceptó verse: confirma lugar/hora; emoción calmada • Si no: sal con amigas, disfruta; stories feliz
Noche: Amor Permanente (5 min); prepara outfit + mentalidad</pre>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="d13">
                <AccordionTrigger className="text-sm">Día 13 – Sábado: Encuentro o Energía Alta</AccordionTrigger>
                <AccordionContent>
                  <pre className="text-xs whitespace-pre-wrap">Mañana: Encantamiento (5 min) x2 si lo verás
Día — Opción A (si se ven): escucha frecuencia antes; durante: sé presente, ríe, disfruta; NO hables del pasado; después: NO escribas esa noche
Día — Opción B (si no se ven): sal y disfruta; stories de vibración alta; conversación ligera
Noche: Amor Permanente (5 min); gratitud por lo avanzado</pre>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mentalidad">
          <AccordionTrigger className="text-base flex items-center gap-2"><Brain className="h-4 w-4" />🧠 Mentalidad ganadora</AccordionTrigger>
          <AccordionContent className="space-y-1 text-sm">
            <p>"Escribo desde el poder, no desde la necesidad"</p>
            <p>"Irradio magnetismo natural, no busco validación"</p>
            <p>"Confío en el proceso. Ya está hecho en lo energético"</p>
            <p>"Mi escudo me protege. Nada puede tocarme"</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="redes">
          <AccordionTrigger className="text-base flex items-center gap-2"><Instagram className="h-4 w-4" />📸 Estrategia de redes sociales</AccordionTrigger>
          <AccordionContent className="space-y-3 text-sm">
            <p className="font-medium">Principio: "Ser vista sin parecer que buscas ser vista"</p>
            <div>
              <p className="font-semibold">Stories estratégicos</p>
              <p>Tipo 1: Ocupada y feliz — 1-2 por día</p>
              <p>Tipo 2: Misteriosa — 2-3 por semana</p>
              <p>Tipo 3: Deseada (fase avanzada) — 1 cada 5-7 días</p>
            </div>
            <div>
              <p className="font-semibold">Nunca publiques</p>
              <p>Triste/llorando, indirectas, despecho, exceso de fotos arreglada, stories cada 10 min, respuestas inmediatas.</p>
            </div>
            <div>
              <p className="font-semibold">Trucos avanzados</p>
              <p>View estratégico • Like selectivo • Reply misterioso</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="senales">
          <AccordionTrigger className="text-base flex items-center gap-2"><CheckCircle className="h-4 w-4" />📊 Señales de que está funcionando</AccordionTrigger>
          <AccordionContent className="space-y-2 text-sm">
            <p>Primeras 72 horas: calma, menos ansiedad, claridad, sueños.</p>
            <p>Primera semana: ve tus stories, da like, coincidencias.</p>
            <p>Segunda semana: inicia conversación, recuerdos, curiosidad.</p>
            <p>Tercera semana: conversaciones largas, propone verse, interés genuino.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="errores">
          <AccordionTrigger className="text-base flex items-center gap-2"><AlertTriangle className="h-4 w-4" />🚨 Errores que arruinan todo</AccordionTrigger>
          <AccordionContent className="space-y-1 text-sm">
            <p>Escribir desde ansiedad; stalkear obsesivamente; responder inmediato siempre; publicar indirectas; hablar con amigas tóxicas; dejar la frecuencia a medias; dudar del proceso.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="regla">
          <AccordionTrigger className="text-base">💎 Regla de Oro Final</AccordionTrigger>
          <AccordionContent className="text-sm">
            <p>"Tu trabajo es vibrar alto y actuar desde el poder. El trabajo del universo es traerlo de vuelta. Confía en el proceso."</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="checklist">
          <AccordionTrigger className="text-base flex items-center gap-2"><ListChecks className="h-4 w-4" />📱 Checklist rápido antes de actuar</AccordionTrigger>
          <AccordionContent className="space-y-1 text-sm">
            <p>[ ] ¿Escuché mi frecuencia hoy?</p>
            <p>[ ] ¿Me siento en paz o ansiosa?</p>
            <p>[ ] ¿Esto viene del poder o la carencia?</p>
            <p>[ ] ¿Parecería magnética o desesperada?</p>
            <p>[ ] ¿Estoy en mi energía femenina alta?</p>
            <p>Si respondiste NO a alguna: ESPERA. No actúes todavía.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default GuideMaster;

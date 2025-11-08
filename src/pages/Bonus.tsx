import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Bonus = () => {
  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <h1 className="font-display text-3xl font-bold gradient-text mb-4">Bonos</h1>

      <Tabs defaultValue="bonus1" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 glass-card rounded-xl p-1 mb-4">
          <TabsTrigger value="bonus1" className="rounded-lg">Bono 1</TabsTrigger>
          <TabsTrigger value="bonus2" className="rounded-lg">Bono 2</TabsTrigger>
        </TabsList>

        <TabsContent value="bonus1">
          <article className="glass-card rounded-2xl p-6 space-y-4 leading-relaxed">
            <header>
              <h2 className="font-display text-2xl font-bold mb-1">Cómo Hacer que Él Te Note en Instagram</h2>
              <p className="text-muted-foreground">(Sin rogar, sin humillarte y sin perseguirlo)</p>
            </header>

            <p>
              Este bono fue creado para ayudarte a activar tu Magnetismo Silencioso en redes sociales, especialmente en Instagram. No vamos a usar indirectas, no vamos a demostrar necesidad, y no vamos a provocar celos baratos. Aquí aprenderás cómo reactivar su curiosidad, su atracción y su interés de forma natural, elegante y emocionalmente inteligente.
            </p>

            <section>
              <h3 className="font-semibold text-lg gradient-text mb-2">Principio Central</h3>
              <div className="grid gap-2">
                <div className="rounded-xl bg-primary/10 p-3">Cuando tú recuperas tu energía, tu presencia se siente.</div>
                <div className="rounded-xl bg-primary/10 p-3">Cuando tú dejas de perseguir, él vuelve a mirar.</div>
              </div>
              <p className="mt-2">El objetivo aquí no es “mostrar que estás bien”, sino volver a transmitir la mujer que él sintió especial.</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg gradient-text mb-2">Paso 1 — Preparar tu Perfil (15–30 minutos)</h3>
              <h4 className="font-medium mb-1">1. Foto de Perfil</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Luz natural (no filtros pesados).</li>
                <li>Rostro claro, mirada suave.</li>
                <li>Sonrisa leve, no forzada.</li>
                <li>Nada de fotos de fiesta o con otros hombres.</li>
                <li>La imagen debe transmitir: calma + feminidad + dulzura.</li>
              </ul>
              <h4 className="font-medium mt-3 mb-1">2. Biografía Magnética</h4>
              <p>Tu bio debe transmitir identidad y vida, no carencia.</p>
              <p className="mt-1">Ejemplos:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Café, paz y pequeños milagros.</li>
                <li>Colecciono atardeceres y risas suaves.</li>
                <li>Historias en mis stories ☕✨</li>
              </ul>
              <h4 className="font-medium mt-3 mb-1">3. Destacadas (Stories Fijos)</h4>
              <p>Crea 3 carpetas visuales:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Vida (momentos simples)</li>
                <li>Bienestar (self-care, calma)</li>
                <li>Momentos (lugares bonitos, sonrisas)</li>
              </ul>
              <p>Esto reconstruye tu identidad visual emocional.</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg gradient-text mb-2">Paso 2 — Agenda de 72 Horas para Activar el Magnetismo</h3>
              <h4 className="font-medium mb-1">Día 1 — Recuperar Presencia y Calma</h4>
              <p>Tu misión hoy es volver a centrarte en ti.</p>
              <p className="mt-1">Publica:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>1 Story sencillo: tú con café, libro o luz de mañana.</li>
              </ul>
              <p className="mt-1">Texto recomendado: Días tranquilos, respirando bonito.</p>
              <p className="mt-1">Reels corto (5–7 segundos) mostrando movimiento suave:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Caminando</li>
                <li>Peinando tu cabello</li>
                <li>Abriendo una ventana</li>
              </ul>
              <ul className="list-disc pl-6 space-y-1">
                <li>NO revises su perfil.</li>
                <li>NO mires si vio tus historias.</li>
              </ul>
              <p>Tu energía: “Mi vida sigue y es bonita”.</p>

              <h4 className="font-medium mt-3 mb-1">Día 2 — Activar Memoria Emocional en Él</h4>
              <p>Hoy usamos estímulos que él ya reconocía en ti.</p>
              <p className="mt-1">Publica:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>1 Foto en el feed: sonriendo de forma natural.</li>
              </ul>
              <p className="mt-1">Caption: Pequeñas cosas que están poniendo mi corazón en orden.</p>
              <p className="mt-1">Stories:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Momento de calma (caminata / desayuno bonito)</li>
                <li>Mini encuesta: ¿Atardecer o amanecer?</li>
              </ul>
              <p>Esto crea interacción sin pedirla.</p>

              <h4 className="font-medium mt-3 mb-1">Día 3 — Generar Curiosidad y Ligero Misterio</h4>
              <p>Hoy él debe sentir que algo está cambiando.</p>
              <p className="mt-1">Publica:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>1 Reels donde se te vea vibrando bonito:
                  <ul className="list-disc pl-6 mt-1 space-y-1">
                    <li>Risa espontánea</li>
                    <li>Música suave</li>
                    <li>Movimiento natural</li>
                  </ul>
                </li>
              </ul>
              <p className="mt-1">Stories: Lugar nuevo o actividad diferente</p>
              <p className="mt-1">Texto breve: Pequeñas cosas, grandes cambios.</p>
              <p className="mt-1">Después de eso: No publiques nada más. El silencio crea espacio para que él piense en ti.</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg gradient-text mb-2">Paso 3 — Interacciones Inteligentes</h3>
              <p>Si él ve tus stories con frecuencia: Mantén la constancia. No lo contactes tú.</p>
              <p className="mt-1">Si él reacciona: Responde suave + cálida + breve:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Jajaja sí, fue divertido.</li>
                <li>Qué lindo que te acordaste.</li>
                <li>Me gustó ese detalle también.</li>
              </ul>
              <p className="mt-1">Si él escribe: No contestes de inmediato. Responde en 20–60 minutos, con calma:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Ahora estoy saliendo, pero me hizo sonreír tu mensaje.</li>
                <li>Luego te leo con calma ❤️.</li>
              </ul>
              <p>Esto transmite interés sin necesidad, cercanía sin urgencia.</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg gradient-text mb-2">Paso 4 — Lo que NO debes hacer (Nunca)</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>❌ Historias llorando o hablando de dolor</li>
                <li>❌ Indirectas o frases de desamor</li>
                <li>❌ Publicaciones intentando provocar celos</li>
                <li>❌ Bombardear el feed con fotos “para llamar la atención”</li>
                <li>❌ Escribirle primero para “romper el hielo”</li>
              </ul>
              <p>Todo eso transmite carencia, no fuerza.</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg gradient-text mb-2">Paso 5 — Señales de que el Método está Funcionando</h3>
              <p>Él:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Aparece constantemente entre los primeros en ver tus stories</li>
                <li>Reacciona a cosas pequeñas (no solo fotos donde te ves atractiva)</li>
                <li>Empieza a comentar o responder</li>
                <li>Comienza a publicar más (para llamar tu atención)</li>
                <li>Pone canciones o frases que parecen “para ti”</li>
              </ul>
              <p>Si ves 2 o más señales, él ya está sintiéndote de nuevo.</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg gradient-text mb-2">Paso 6 — Cuando Él Te Escribe</h3>
              <p>Mantén 3 reglas:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Responde con dulzura, no frialdad.</li>
                <li>Conversa simple, no profunda.</li>
                <li>Cierra tú la conversación primero.</li>
              </ul>
              <p className="mt-1">Ejemplo: Hablamos mañana, me encantó leerte. Buen descanso 😊</p>
              <p>Esto lo deja pensando en ti, no al revés.</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg gradient-text mb-2">Conclusión</h3>
              <p>No necesitas seducir. No necesitas esforzarte. Solo necesitas volver a ser la mujer que genera paz, encanto y calidez.</p>
              <p>Cuando tu energía cambia, él lo siente. Cuando él lo siente, te busca. Y cuando te busca, tú ya estarás lista.</p>
            </section>
          </article>
        </TabsContent>

        <TabsContent value="bonus2">
          <article className="glass-card rounded-2xl p-6 space-y-4 leading-relaxed">
            <header>
              <h2 className="font-display text-2xl font-bold mb-1">BONUS PREMIUM</h2>
              <h3 className="font-display text-xl font-semibold gradient-text">7 Frases que Hacen que Cualquier Hombre Suplique por Ti</h3>
              <p className="text-muted-foreground">(Sin rogar. Sin perseguir. Sin perder tu valor.)</p>
            </header>
          
            <section>
              <h4 className="font-semibold text-lg gradient-text mb-1">Introducción</h4>
              <p>
                Cuando una mujer intenta recuperar a un hombre desde la angustia — explicando, pidiendo, demostrando, justificando — pierde magnetismo.
              </p>
              <p>Un hombre no vuelve porque lo necesitan. Un hombre vuelve cuando siente algo que no puede obtener con nadie más:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Memoria emocional compartida</li>
                <li>Admiración</li>
                <li>Nostalgia</li>
                <li>Percepción de pérdida</li>
                <li>Atracción tranquila</li>
              </ul>
              <p>Estas frases no suplican, no exigen, no manipulan. Están diseñadas para activar en él sentimientos profundos mediante sutileza, calidez y autenticidad.</p>
            </section>
          
            <section>
              <h4 className="font-semibold text-lg gradient-text mb-1">Cómo Usarlas Correctamente</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Envíalas solo cuando estés emocionalmente tranquila. Jamás desde la ansiedad.</li>
                <li>Máximo 1 frase cada 48–72 horas.</li>
                <li>Después de enviar → silencio. No aclares, no expliques, no continúes la conversación.</li>
                <li>Si él responde, contesta suave, corto y con calma.</li>
              </ul>
              <p>El poder no está en la frase. El poder está en la energía con la que la dices y el silencio después.</p>
            </section>
          
            <section>
              <h4 className="font-semibold text-lg gradient-text mb-1">Frase 1 — Activar la Memoria Emocional</h4>
              <p className="text-muted-foreground">Objetivo: recordarle momentos que solo existieron entre ustedes. | Cuándo usar: cuando hay distancia o silencio prolongado.</p>
              <h5 className="font-medium mt-2">1A.</h5>
              <p className="italic">“Hay cosas que solo tú y yo entendemos.”</p>
              <p className="mt-1">Por qué funciona: Él sabe exactamente cuáles son esas cosas. Lo obligas a recordar por sí mismo, sin que tú lo menciones.</p>
              <p className="mt-1">Variaciones:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>“Hay memorias que solo viven entre nosotros dos.”</li>
                <li>“Es curioso cómo ciertos detalles regresan sin avisar.”</li>
              </ul>
              <p className="mt-1">Si él responde: Responde solamente: “Sí. Yo también.” Y detente.</p>
          
              <h5 className="font-medium mt-3">1B.</h5>
              <p className="italic">“A veces aparecen recuerdos que me hacen sonreír sin razón.”</p>
              <p className="mt-1">Cómo se usa: Se envía en un momento neutro. No en días de tensión.</p>
              <p className="mt-1">Qué provoca: Saudade suave → él vuelve a observarte.</p>
            </section>
          
            <section>
              <h4 className="font-semibold text-lg gradient-text mb-1">Frase 2 — Despertar Curiosidad y Saudade</h4>
              <p className="text-muted-foreground">Objetivo: que él perciba que estás cambiando. | Cuándo usar: cuando él cree que ya “te tiene superada”.</p>
              <h5 className="font-medium mt-2">2A.</h5>
              <p className="italic">“Me he estado sintiendo más yo últimamente.”</p>
              <p className="mt-1">Él se pregunta: ¿Qué cambió? ¿Quién la influenció? ¿Estoy quedando fuera?</p>
              <h5 className="font-medium mt-3">2B.</h5>
              <p className="italic">“Hay una paz nueva en mí… y me está gustando.”</p>
              <p className="mt-1">Por qué funciona: La paz es magnética. Lo hace revisar tu perfil, tus historias, tus fotos.</p>
              <p className="mt-1">Variaciones:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>“Estoy cuidando mi energía de otra manera.”</li>
                <li>“Estoy volviendo a mi centro.”</li>
              </ul>
            </section>
          
            <section>
              <h4 className="font-semibold text-lg gradient-text mb-1">Frase 3 — Posicionarte como Mujer de Alto Valor</h4>
              <p className="text-muted-foreground">Objetivo: que él entienda que no vas a aceptar migajas. | Cuándo usar: cuando él está indiferente o ambiguo.</p>
              <h5 className="font-medium mt-2">3A.</h5>
              <p className="italic">“Estoy aprendiendo a elegir lo que también me elige.”</p>
              <p className="mt-1">Esto invierte la dinámica. Ahora él debe moverse hacia ti.</p>
              <h5 className="font-medium mt-3">3B.</h5>
              <p className="italic">“Lo recíproco es lo que permanece.”</p>
              <p className="mt-1">Cómo decirlo: Con voz suave y segura. Sin enojo.</p>
              <p className="mt-1">Efecto: Él entiende: si no te elige con claridad, te pierde.</p>
            </section>
          
            <section>
              <h4 className="font-semibold text-lg gradient-text mb-1">Frase 4 — Abrir la Puerta con Elegancia (sin suplicar)</h4>
              <p className="text-muted-foreground">Objetivo: permitir una reconexión madura. | Cuándo usar: cuando la conversación es calmada.</p>
              <h5 className="font-medium mt-2">4A.</h5>
              <p className="italic">“No quiero lo de antes. Quiero algo más verdadero.”</p>
              <p className="mt-1">Esto transmite evolución emocional.</p>
              <h5 className="font-medium mt-3">4B.</h5>
              <p className="italic">“Si volvemos a coincidir, que sea con más corazón.”</p>
              <p className="mt-1">No le estás pidiendo volver. Le estás mostrando cómo sería si él decide hacerlo.</p>
            </section>
          
            <section>
              <h4 className="font-semibold text-lg gradient-text mb-1">Frase 5 — Activar Miedo a Perderte (de manera madura)</h4>
              <p className="text-muted-foreground">Objetivo: que él perciba tu transformación interna. | Cuándo usar: cuando él está cómodo en la distancia.</p>
              <h5 className="font-medium mt-2">5A.</h5>
              <p className="italic">“Estoy cambiando cosas en mí… y me estoy sorprendiendo.”</p>
              <p className="mt-1">Él siente que podría quedarse fuera de tu nueva versión.</p>
              <h5 className="font-medium mt-3">5B.</h5>
              <p className="italic">“A veces crecer también es soltar lo que dolía sin darnos cuenta.”</p>
              <p className="mt-1">Traducción emocional para él: Si él te lastimó → ahora teme perderte.</p>
            </section>
          
            <section>
              <h4 className="font-semibold text-lg gradient-text mb-1">Frase 6 — El Silencio que Retorna</h4>
              <p className="text-muted-foreground">Objetivo: provocar reflexión profunda. | Cuándo usar: cuando él está orgulloso o racional.</p>
              <h5 className="font-medium mt-2">6A.</h5>
              <p className="italic">“Gracias por lo que aprendí contigo.”</p>
              <p className="mt-1">Y luego: desaparece.</p>
              <p className="mt-1">Él pensará en: ¿Qué aprendiste? ¿Me soltó? ¿Ya me perdió? Ese pensamiento lo rompe por dentro.</p>
              <h5 className="font-medium mt-3">6B.</h5>
              <p className="italic">“Lo auténtico no desaparece. Solo se acomoda.”</p>
              <p className="mt-1">Esta frase llega al corazón del hombre que aún siente algo. Deja que él venga hacia ti.</p>
            </section>
          
            <section>
              <h4 className="font-semibold text-lg gradient-text mb-1">Frase 7 — La Llave del Retorno</h4>
              <p className="text-muted-foreground">Objetivo: abrir posibilidad sin presión ni urgencia. | Cuándo usar: cuando él da señales de acercamiento.</p>
              <h5 className="font-medium mt-2">7A.</h5>
              <p className="italic">“Si algún día sientes que aún hay algo, yo sé escuchar.”</p>
              <p className="mt-1">Calma. Madurez. Poder interno.</p>
              <h5 className="font-medium mt-3">7B.</h5>
              <p className="italic">“Cuando el cariño es real, el tiempo no separa. Solo ordena.”</p>
              <p className="mt-1">Esto desarma cualquier defensa. Aquí es donde él vuelve por decisión propia.</p>
            </section>
          
            <section>
              <h4 className="font-semibold text-lg gradient-text mb-1">Secuencia Recomendada (7–10 días)</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li><span className="font-medium">Día 1:</span> Silencio total + Enfocarte en tu energía → Tú recuperas tu centro</li>
                <li><span className="font-medium">Día 2:</span> Publica una historia tranquila (sin indirectas) → Él vuelve a mirarte</li>
                <li><span className="font-medium">Día 3:</span> Enviar frase 1A o 1B → Se activa la nostalgia</li>
                <li><span className="font-medium">Día 4:</span> Silencio → Él recuerda</li>
                <li><span className="font-medium">Día 5:</span> Enviar frase 3A → Él siente miedo leve a perderte</li>
                <li><span className="font-medium">Día 6:</span> Responder si él escribe → Conversación ligera</li>
                <li><span className="font-medium">Día 7:</span> Enviar frase 7A o 7B → Reapertura emocional</li>
              </ul>
              <p>Si él escribe antes → La secuencia se detiene. Ya funcionó.</p>
            </section>
          
            <section>
              <h4 className="font-semibold text-lg gradient-text mb-1">Conclusión</h4>
              <p>Estas frases no buscan hacer que él vuelva desde la presión. Hacen que él vuelva porque:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Te reconoce como mujer única</li>
                <li>Siente tu crecimiento</li>
                <li>Percibe tu calma</li>
                <li>Entiende que puede perderte</li>
              </ul>
              <p>Y eso… ningún hombre ignora.</p>
            </section>
          </article>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bonus;
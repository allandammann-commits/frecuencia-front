export interface Reply {
  name: string;
  time: string;
  text: string;
  likes: number;
  avatarUrl?: string;
}

export interface Comment {
  id: number;
  name: string;
  time: string;
  text: string;
  likes: number;
  replies?: Reply[];
  avatarUrl?: string;
}

export const commentsData: Comment[] = [
  {
    id: 1,
    name: "María José R.",
    time: "hace 3 días",
    text: "gente yo no soy de comentar estas cosas pero es q no me lo puedo guardar 4 dias y el me mando mensaje como si nada preguntandome como estoy CUATRO DIAS yo q llevaba 2 meses sin saber nada de el",
    likes: 214,
    avatarUrl: "/download.jpg",
  },
  {
    id: 2,
    name: "Valentina M.",
    time: "hace 1 día",
    text: "alguien mas lo esta probando?? yo voy en el dia 2 y todavia nada pero quiero saber si a ustedes les funciono rapido o tardo un poco",
    likes: 67,
    avatarUrl: "/download%20(1).jpg",
    replies: [
      {
        name: "Caro G.",
        time: "hace 1 día",
        text: "ami me tardo 5 dias amiga no desesperes yo tmb estaba asi y de repente me llego un audio de el larguisimo",
        likes: 34,
        avatarUrl: "/avatars-000022118143-24qby4-t500x500.jpg",
      },
      {
        name: "Fernanda L.",
        time: "hace 1 día",
        text: "a mi al tercer dia!! ten paciencia q si funciona",
        likes: 28,
        avatarUrl: "/avatars-000198178907-j8hrw8-t500x500.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "Gabi Torres",
    time: "hace 4 días",
    text: "no voy a dar detalles porq me da cosa pero solo digo q el q me tenia bloqueada hace 1 mes me desbloqueo y me escribio ayer a las 11 de la noche jajaja saquen sus conclusiones",
    likes: 276,
    avatarUrl: "/images.jpg",
  },
  {
    id: 4,
    name: "Ale V.",
    time: "hace 12 horas",
    text: "esto es real?? osea de verdad funciona?? porq yo ya intente de todo y nada y ya no quiero ilusionarme con algo q no sirve",
    likes: 45,
    avatarUrl: "/images%20(1).jpg",
    replies: [
      {
        name: "Sofía H.",
        time: "hace 12 horas",
        text: "amiga yo pensaba igualito te juro dale una oportunidad y mira el video completo porq a mi me cambio todo y eso q mi caso era de los peores",
        likes: 52,
        avatarUrl: "/OIP%20(1).webp",
      },
    ],
  },
  {
    id: 5,
    name: "Camila N.",
    time: "hace 1 día",
    text: "6 dias me llamo llorando diciendome q cometio el peor error de su vida yo estoy en shock todavia no proceso bien lo q paso jaja",
    likes: 189,
    avatarUrl: "/images%20(2).jpg",
  },
  {
    id: 6,
    name: "Isa M.",
    time: "hace 2 días",
    text: "yo lo unico q digo es q hace 10 dias no nos hablabamos y hoy estamos acostados juntos viendo netflix como si nada hubiera pasado no pregunten como porq ni yo se bien jajaja solo confien 🥹",
    likes: 309,
    avatarUrl: "/images%20(3).jpg",
  },
  {
    id: 7,
    name: "Lu Del Valle",
    time: "hace 8 horas",
    text: "chicas a mi me lo recomendo mi prima yo le dije estas loca y me rei hoy mi prima tiene razon y yo le debo una cena 😂 solo vean el video completo y ya",
    likes: 156,
    avatarUrl: "/images%20(4).jpg",
  },
  {
    id: 8,
    name: "Andrea F.",
    time: "hace 5 horas",
    text: "pregunta seria esto funciona si el esta con otra?? porq el mio ya tiene novia nueva y no se si tiene caso",
    likes: 38,
    avatarUrl: "/images%20(5).jpg",
    replies: [
      {
        name: "María José R.",
        time: "hace 5 horas",
        text: "amiga el mio TAMBIEN estaba con otra y mira mi comentario de arriba dale play al video q ahi te explica todo",
        likes: 41,
        avatarUrl: "/download.jpg",
      },
      {
        name: "Gabi Torres",
        time: "hace 5 horas",
        text: "si funciona ami el mio andaba con una y aun asi me busco velo hasta el final el video",
        likes: 29,
        avatarUrl: "/images.jpg",
      },
    ],
  },
  {
    id: 9,
    name: "Dani R.",
    time: "hace 6 horas",
    text: "voy en el dia 3 y ayer me miro todas las historias de instagram y me reacciono a una foto vieja no es mucho pero llevaba semanas sin ni verme las redes asiq algo esta pasando 👀",
    likes: 98,
    avatarUrl: "/images%20(6).jpg",
  },
  {
    id: 10,
    name: "Laura P.",
    time: "hace 2 días",
    text: "5 minutos dura el video y a mi me salvo 3 años de relacion mas no puedo decir solo veanlo entero porfa",
    likes: 178,
    avatarUrl: "/images%20(7).jpg",
  },
];

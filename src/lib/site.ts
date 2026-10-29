export const site = {
  name: "Carlos Mendes",
  title: "Carlos Mendes Advogado",
  tagline: "Advocacia Trabalhista, Previdenciária e Imobiliária",
  email: "carlosmendesadv0@gmail.com",
  phoneDisplay: "(34) 8441-9956",
  /** Somente dígitos com DDI */
  whatsapp: "553484419956",
  social: {
    instagram:
      "https://www.instagram.com/adv.carlosmendes?igsh=OTgxZjZvcm1tbWp6",
    facebook:
      "https://www.facebook.com/profile.php?id=61590414747882",
  },
  oab: ["OAB/MG nº 174.882", "OAB/TO nº 13.548"],
  quote: "O que segue a justiça e a bondade achará a vida, a justiça e a honra. — Provérbios 21:21",
};

export function whatsappLink(message?: string) {
  const text =
    message ??
    "Olá! Vim pelo site do Dr. Carlos Mendes e gostaria de falar sobre o meu caso.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const areas = [
  {
    id: "trabalhista",
    title: "Direito Trabalhista",
    description:
      "Defesa em horas extras, demissões irregulares, acidentes, assédio e regularização de vínculos — com clareza e proximidade em cada etapa.",
    points: [
      "Horas extras, adicionais e verbas rescisórias",
      "Demissões irregulares e verbas devidas",
      "Acidentes, assédio e discriminação",
      "Carteira assinada e trabalho informal",
    ],
  },
  {
    id: "previdenciario",
    title: "Direito Previdenciário",
    description:
      "Aposentadorias, auxílios e revisões junto ao INSS, com análise cuidadosa do seu histórico para buscar o que a lei garante.",
    points: [
      "Aposentadorias e planejamento",
      "Auxílio-doença, invalidez e acidente",
      "BPC/LOAS e pensão por morte",
      "Revisões de benefício",
    ],
  },
  {
    id: "imoveis",
    title: "Revisional de Imóveis",
    description:
      "Proteção do seu patrimônio em financiamentos, contratos, despejo, atraso de obra e regularização de propriedade.",
    points: [
      "Juros abusivos e taxas indevidas",
      "Compra, venda e aluguel",
      "Despejo e reintegração de posse",
      "Usucapião e escritura",
    ],
  },
];

export const steps = [
  {
    n: "01",
    title: "Atendimento inicial",
    text: "A Roberta recolhe o essencial do seu caso com sigilo. Em seguida, o Dr. Carlos analisa a sua situação.",
  },
  {
    n: "02",
    title: "Análise jurídica",
    text: "Documentos, prazos e histórico são avaliados para identificar o que pode ser buscado com segurança.",
  },
  {
    n: "03",
    title: "Estratégia clara",
    text: "Você recebe um caminho objetivo, sem juridiquês e sem promessas vazias — só o que faz sentido para o seu caso.",
  },
  {
    n: "04",
    title: "Acompanhamento",
    text: "Cada passo é explicado com transparência, até a conclusão, com canal direto de atendimento.",
  },
];

export const faqs = [
  {
    q: "Preciso ainda estar empregado para buscar meus direitos trabalhistas?",
    a: "Não necessariamente. Em regra, direitos podem ser pleiteados após o desligamento, mas existem prazos. Por isso, o ideal é analisar o caso o quanto antes.",
  },
  {
    q: "Vocês atendem questões do INSS em todo o Brasil?",
    a: "Sim. Muitas demandas previdenciárias podem ser conduzidas de forma remota, com análise documental e acompanhamento próximo, independentemente da sua cidade.",
  },
  {
    q: "Como funciona o primeiro atendimento?",
    a: "Você conversa com a Roberta, nossa secretária virtual, em poucos minutos. Com as informações iniciais, o Dr. Carlos Mendes avalia o encaminhamento do seu caso.",
  },
  {
    q: "Quais documentos devo separar?",
    a: "Depende da área: carteira de trabalho, holerites e rescisão (trabalhista); CNIS, laudos e cartas do INSS (previdenciário); contratos e boletos (imóveis). Na conversa inicial orientamos o essencial.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "Sim. As informações são usadas apenas para contato e análise do seu caso, com sigilo profissional e em conformidade com a LGPD.",
  },
  {
    q: "Quanto tempo leva um processo?",
    a: "Cada caso tem o seu prazo. Na análise inicial explicamos o cenário realista para a sua situação, sem criar expectativas irreais.",
  },
];

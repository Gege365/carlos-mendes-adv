export type QuestionType = "text" | "options" | "tel" | "textarea";

export type RobertaQuestion = {
  id: string;
  message: string;
  type: QuestionType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
};

export const robertaIntro = [
  "Olá! Seja muito bem-vindo(a). Eu sou a Roberta, secretária do Dr. Carlos Mendes.",
  "Vou fazer o seu atendimento inicial com total sigilo e atenção. Em poucos minutos, o Dr. Carlos poderá analisar o seu caso.",
];

export const robertaQuestions: RobertaQuestion[] = [
  {
    id: "nome",
    message: "Como posso chamá-lo(a)?",
    type: "text",
    placeholder: "Digite o seu nome",
    required: true,
  },
  {
    id: "area",
    message:
      "Prazer em falar com você. Qual área melhor descreve a sua necessidade?",
    type: "options",
    options: [
      "Direito Trabalhista",
      "INSS / Previdenciário",
      "Imóveis / Revisional",
      "Ainda não sei / Outro",
    ],
    required: true,
  },
  {
    id: "situacao",
    message: "Em poucas palavras, o que está acontecendo?",
    type: "textarea",
    placeholder: "Descreva brevemente a sua situação",
    required: true,
  },
  {
    id: "status",
    message: "Qual é a sua situação atual em relação a esse caso?",
    type: "options",
    options: [
      "Ainda empregado(a)",
      "Já fui demitido(a) / desligado(a)",
      "Benefício negado ou cortado pelo INSS",
      "Problema com imóvel / contrato",
      "Outra situação",
    ],
    required: true,
  },
  {
    id: "tempo",
    message: "Há quanto tempo isso vem acontecendo?",
    type: "options",
    options: [
      "Menos de 1 mês",
      "De 1 a 6 meses",
      "De 6 meses a 2 anos",
      "Mais de 2 anos",
      "Não sei dizer",
    ],
    required: true,
  },
  {
    id: "ja_procurou",
    message: "Você já procurou outro advogado sobre este assunto?",
    type: "options",
    options: ["Não, é o primeiro contato", "Sim, mas ainda sem solução", "Sim, e quero uma segunda opinião"],
    required: true,
  },
  {
    id: "cidade",
    message: "Em qual cidade e estado você está?",
    type: "text",
    placeholder: "Ex.: Uberlândia - MG",
    required: true,
  },
  {
    id: "whatsapp",
    message:
      "Qual o melhor WhatsApp para o Dr. Carlos entrar em contato com você?",
    type: "tel",
    placeholder: "(00) 00000-0000",
    required: true,
  },
  {
    id: "horario",
    message: "Qual o melhor horário para retorno?",
    type: "options",
    options: ["Manhã", "Tarde", "Noite", "Qualquer horário"],
    required: true,
  },
  {
    id: "observacao",
    message:
      "Há mais alguma informação importante que o Dr. Carlos precise saber agora? Se não houver, pode responder \"não\".",
    type: "textarea",
    placeholder: "Opcional — digite ou diga não",
    required: false,
  },
];

export const robertaClosing = (nome: string) => [
  `Obrigada, ${nome || "obrigado(a)"}! Registrei as suas informações com cuidado.`,
  "Vou encaminhar o seu caso para o Dr. Carlos Mendes. Em breve ele (ou a equipe) entrará em contato pelo WhatsApp informado.",
  "Se preferir, você também pode falar agora pelo botão abaixo.",
];

export type LeadPayload = {
  answers: Record<string, string>;
  createdAt: string;
  source: string;
};

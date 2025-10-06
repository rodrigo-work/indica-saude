import type { ToolUIPart } from 'ai'

export type MessageType = {
  key: string
  from: 'user' | 'assistant'
  sources?: { href: string; title: string }[]
  versions: {
    id: string
    content: string
  }[]
  reasoning?: {
    content: string
    duration: number
  }
  tools?: {
    name: string
    description: string
    status: ToolUIPart['state']
    parameters: Record<string, unknown>
    result: string | undefined
    error: string | undefined
  }[]
}

export const initialMessages: MessageType[] = [
  // ... existing code ...
]

export const models = [
  // ... existing code ...
  { id: 'gpt-3.5', name: 'GPT-3.5 Turbo' },
  { id: 'gpt-4', name: 'GPT-4' }
]

export const SUGGESTIONS = [
  // ... existing code ...
  'Quais são os sintomas da dengue?',
  'Como prevenir a gripe?',
  'Quais vacinas estão disponíveis?',
  // quero mais sugestões...
  'Quais são os sintomas da gripe?',
  'Como posso melhorar minha alimentação?',
  'O que é hipertensão arterial?',
  'Quais são os benefícios da atividade física regular?'
]

export const MOCK_AI_RESPONSES: Record<string, string> = {
  'Quais são os sintomas da dengue?':
    'Os principais sintomas da dengue incluem febre alta, dores musculares, dor atrás dos olhos, manchas vermelhas na pele e mal-estar geral.',
  'Como prevenir a gripe?':
    'Para prevenir a gripe, recomenda-se lavar as mãos frequentemente, evitar aglomerações, manter ambientes ventilados e tomar a vacina anualmente.',
  'Quais vacinas estão disponíveis?':
    'Atualmente, estão disponíveis vacinas para gripe, COVID-19, hepatite, sarampo, entre outras. Consulte uma unidade de saúde para mais informações.',
  'Quais são os sintomas da gripe?':
    'Os sintomas da gripe incluem febre, tosse, dor de garganta, dores musculares, fadiga e congestão nasal.',
  'Como posso melhorar minha alimentação?':
    'Para melhorar sua alimentação, inclua mais frutas, verduras e legumes na dieta, evite alimentos processados e beba bastante água.',
  'O que é hipertensão arterial?':
    'Hipertensão arterial é uma condição em que a pressão do sangue nas artérias está constantemente elevada, o que pode levar a problemas cardíacos.',
  'Quais são os benefícios da atividade física regular?':
    'A atividade física regular ajuda a melhorar a saúde cardiovascular, controlar o peso, reduzir o estresse e aumentar a energia.',
  'Como posso controlar o estresse no dia a dia?':
    'Para controlar o estresse, pratique técnicas de relaxamento como meditação, exercícios físicos e mantenha uma rotina equilibrada.'
}

# TypeScript

- Nunca utilizar any.
- Utilizar tipos explícitos em funções públicas.
- Preferir interfaces para DTOs e entidades.
- Toda função deve possuir tipo de retorno explícito.
- Não depender da inferência de tipo para retorno de funções.

# React

- Declarar componentes utilizando function.
- Preferir hooks customizados para acesso a APIs.
- Evitar lógica de negócio dentro de componentes.
- Componentes devem ser responsáveis apenas pela interface e interação do usuário.
- Extrair regras de negócio para hooks customizados.

# Next.js

- Utilizar App Router.
- Utilizar Server Components por padrão.
- Utilizar "use client" somente quando necessário.

# React Hook Form

- Sempre que um componente Material UI for integrado ao react-hook-form, utilizar Controller.
- Exemplo: TextField, Select, Autocomplete, Checkbox, RadioGroup e Switch devem ser controlados por Controller.
- Evitar o uso de register em componentes do Material UI.

# UI

- Utilizar Material UI.
- Não utilizar CSS Modules.
- Preferir o prop sx para estilização.

# Dados

- Utilizar React Query para requisições.
- Criar services separados para acesso à API.

# Arquitetura

- Seguir a estrutura de pastas existente.
- Não criar arquivos desnecessários.
- Não implementar regras de negócio dentro de componentes.
- Sempre que houver lógica reutilizável ou regras de negócio, criar hooks customizados.
- Componentes devem permanecer enxutos e focados na renderização.
- Antes de criar uma função, verificar se ela pode ser reutilizada por outros módulos.
- Funções reutilizáveis devem ser extraídas para uma pasta global apropriada.

# Hooks

- Hooks customizados devem possuir tipagem explícita de retorno.
- Centralizar regras de negócio em hooks customizados.
- Centralizar integrações com APIs em hooks customizados.

# Nomenclatura

- Utilizar nomes em português para funções, hooks, services, variáveis e arquivos relacionados às regras de negócio.
- Utilizar nomes claros e descritivos.
- Evitar abreviações desnecessárias.

# Funções

- Declarar funções utilizando a palavra-chave function.
- Evitar funções declaradas com const e arrow function quando não houver necessidade.
- Toda função deve possuir tipo de retorno explícito.

Exemplo correto:

function calcularTotal(items: Item[]): number {
return items.reduce((acc, item) => acc + item.valor, 0);
}

Exemplo incorreto:

const calcularTotal = (items: Item[]) => {
return items.reduce((acc, item) => acc + item.valor, 0);
};

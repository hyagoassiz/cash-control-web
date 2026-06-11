# TypeScript

- Nunca utilizar `any`.
- Utilizar tipos explícitos em funções públicas.
- Toda função deve possuir tipo de retorno explícito.
- Não depender da inferência de tipo para retorno de funções.
- Preferir `interface` para DTOs e entidades.
- Evitar type assertions desnecessários.
- Não criar tipos duplicados.
- Evitar valores mágicos no código.

# React

- Declarar componentes utilizando `function`.
- Componentes devem ser responsáveis apenas pela interface e interação do usuário.
- Evitar lógica de negócio dentro de componentes.
- Extrair regras de negócio para hooks customizados.
- Componentes devem permanecer enxutos e focados na renderização.
- Evitar componentes excessivamente grandes.
- Antes de criar um componente, verificar se ele pode ser reutilizado.

# Next.js

- Utilizar App Router.
- Utilizar Server Components por padrão.
- Utilizar `"use client"` somente quando necessário.
- Buscar dados no servidor sempre que não houver necessidade de interação do usuário.
- Utilizar Client Components apenas quando houver estado, eventos ou hooks do React.
- Não utilizar Pages Router.

# React Hook Form

- Utilizar React Hook Form para formulários.
- Sempre que um componente Material UI for integrado ao React Hook Form, utilizar `Controller`.
- Utilizar `register` apenas para elementos HTML nativos.
- TextField, Select, Autocomplete, Checkbox, RadioGroup e Switch devem ser controlados por `Controller`.

# Material UI

- Utilizar Material UI como biblioteca de componentes.
- Preferir o prop `sx` para estilização.
- Não utilizar CSS Modules.
- Evitar estilos inline quando houver reutilização.
- Componentes compartilhados devem ser reutilizados sempre que possível.

# React Query

- Utilizar React Query para integração com APIs.
- Componentes não devem utilizar `useQuery` ou `useMutation` diretamente.
- Toda integração com React Query deve ser encapsulada em hooks customizados.
- Hooks devem ser responsáveis por orquestrar chamadas de API e regras de negócio relacionadas.

# Services

- Services devem conter apenas chamadas HTTP.
- Services não devem conter regras de negócio.
- Services não devem manipular estado da aplicação.
- Services não devem acessar localStorage, sessionStorage ou cookies diretamente.
- Cada módulo deve possuir seus próprios services quando necessário.

# Arquitetura

- Seguir a estrutura de pastas existente.
- Não criar arquivos desnecessários.
- Não criar abstrações sem necessidade.
- Não criar pastas vazias.
- Organizar funcionalidades por domínio de negócio.
- Criar novos módulos apenas quando houver necessidade real.
- Antes de criar uma função, verificar se ela pode ser reutilizada.
- Funções reutilizáveis devem ser extraídas para uma pasta apropriada.
- Evitar acoplamento entre módulos.
- Priorizar soluções simples.
- Evitar abstrações prematuras.

# Estrutura do Projeto

- Utilizar organização por domínio de negócio.
- Utilizar a pasta `modules` para funcionalidades do sistema.
- Componentes compartilhados devem ficar em `components`.
- Integrações globais devem ficar em `services`.
- Utilitários globais devem ficar em `lib`.

Exemplo:

```txt
src

├── app
├── modules
├── components
├── services
└── lib
```

# Módulos

- Cada módulo deve conter apenas as pastas necessárias.
- Não criar estruturas antecipadamente.

Exemplo:

```txt
modules

└── usuario
    ├── components
    ├── hooks
    ├── services
    └── types
```

# Hooks

- Hooks customizados devem possuir tipagem explícita de retorno.
- Centralizar regras de negócio em hooks customizados.
- Centralizar integrações com APIs em hooks customizados.
- Evitar lógica duplicada entre hooks.

# Nomenclatura

- Utilizar nomes em português para regras de negócio.
- Utilizar nomes em português para componentes.
- Utilizar nomes em português para hooks customizados.
- Utilizar nomes em português para services de domínio.
- Utilizar nomes em português para variáveis.
- Utilizar nomes em português para arquivos relacionados ao domínio.
- Utilizar nomes em português para módulos.
- Utilizar nomes em português para rotas da aplicação.
- Utilizar nomes claros e descritivos.
- Evitar abreviações desnecessárias.
- Utilizar inglês apenas para termos técnicos consolidados pelo ecossistema.

Exemplos:

Correto:

- UsuarioService
- CadastroUsuarioForm
- useCadastrarUsuario
- cadastrarUsuario
- /cadastro
- /entrar
- /transacoes

Incorreto:

- UserService
- SignUpForm
- useSignUp
- createUser
- /signup
- /login

# Funções

- Declarar funções utilizando a palavra-chave `function`.
- Evitar funções declaradas com `const` e arrow function quando não houver necessidade.
- Toda função deve possuir tipo de retorno explícito.

Exemplo correto:

```ts
function calcularTotal(items: Item[]): number {
  return items.reduce((acc, item) => acc + item.valor, 0);
}
```

Exemplo incorreto:

```ts
const calcularTotal = (items: Item[]) => {
  return items.reduce((acc, item) => acc + item.valor, 0);
};
```

# Cash Control

- Priorizar simplicidade.
- Não criar módulos antecipadamente.
- Não criar componentes antecipadamente.
- Não criar abstrações antecipadamente.
- Implementar apenas o necessário para a funcionalidade atual.
- Evoluir a arquitetura conforme o crescimento do sistema.
- Priorizar legibilidade e manutenção do código.

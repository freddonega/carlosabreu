# Nossos Momentos Especiais - Upload de Fotos

Sistema elegante de upload de fotos para casamentos construído com Next.js, TypeScript, React Hook Form, React Query e ImageKit.

## 🚀 Tecnologias

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **React Hook Form** - Gerenciamento de formulários
- **React Query** - Gerenciamento de estado e cache
- **Tailwind CSS** - Estilização
- **ImageKit** - CDN para armazenamento de imagens
- **Zod** - Validação de esquemas
- **Axios** - Cliente HTTP

## 📋 Funcionalidades

- ✅ Upload múltiplo de fotos
- ✅ Drag & drop de arquivos
- ✅ Preview das fotos selecionadas
- ✅ Validação de tamanho (máximo 5MB por foto)
- ✅ Validação de tipos de arquivo (JPEG, PNG, WebP)
- ✅ Interface elegante e romântica
- ✅ Design responsivo para mobile e desktop
- ✅ Feedback visual durante upload
- ✅ Tratamento de erros
- ✅ Tema de casamento com cores românticas

## 🛠️ Configuração

### 1. Instalação das dependências

```bash
pnpm install
```

### 2. Configuração do ImageKit

1. Crie uma conta no [ImageKit](https://imagekit.io/)
2. Obtenha suas credenciais no dashboard
3. Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_IMAGEKIT_URL=https://upload.imagekit.io/api/v1/files/upload
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=sua_chave_publica_aqui
```

### 3. Executando o projeto

```bash
# Desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Executar produção
pnpm start
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
├── components/             # Componentes React
│   └── ImageUpload.tsx    # Componente principal de upload
├── hooks/                  # Hooks personalizados
│   └── useImageUpload.ts  # Hook para gerenciar upload
├── providers/              # Providers React
│   └── QueryProvider.tsx  # Provider do React Query
├── schemas/                # Schemas de validação
│   └── upload.ts          # Schema Zod para upload
├── services/               # Serviços
│   └── imagekit.ts        # Serviço de upload ImageKit
└── types/                  # Tipos TypeScript
    └── upload.ts          # Interfaces de upload
```

## 🎨 Interface

O projeto possui uma interface elegante e romântica com:

- Design de casamento com cores rosa e rosa claro
- Área de drag & drop para upload com gradientes
- Preview em grid das fotos selecionadas
- Botões de ação com efeitos hover elegantes
- Feedback visual durante operações
- Design responsivo para mobile e desktop
- Elementos decorativos e tipografia serif

## 🔧 Desenvolvimento

### Scripts Disponíveis

- `pnpm dev` - Executa o servidor de desenvolvimento
- `pnpm build` - Gera build de produção
- `pnpm start` - Executa o servidor de produção
- `pnpm lint` - Executa o linter

### Padrões de Código

- TypeScript para tipagem estática
- ESLint para linting
- Tailwind CSS para estilização
- Componentes funcionais com hooks
- Separação clara de responsabilidades

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

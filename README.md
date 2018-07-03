<img src="https://avatars1.githubusercontent.com/u/3846050?v=4&s=200" width="127px" height="127px" align="left"/>

# Pilot

A próxima versão da Dashboard Pagar.me

<br>

[![Join the chat at https://gitter.im/pagarme/react-event-components](https://badges.gitter.im/pagarme/pilot.svg)](https://gitter.im/pagarme/pilot?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
<br>


Pilot é o codinome da nova dashboard do Pagar.me. O produto foi criado
a partir de feedbacks dos usuários, para que eles possam ter uma
experiência cada vez mais transparente de sua operação financeira no
Pagar.me, e consigam focar no seu negócio!

## Índice

- [Introdução](#introducao)
- [Tecnologia utilizada](tecnologia-utilizada)
- [Requisitos](#requisitos)
- [Desenvolvimento](#developing)
	- [Clonando o repositório](#clonando-o-repositorio)
	- [Rodando o servidor](#rodando-o-servidor)
- [Cockpit](#cockpit)
	- [O que é?](#o-que-e)
	- [Rodando testes](#rodando-testes)
- [Contribuindo](#contribuindo)
- [Licenças](#licencas)

### Tecnologia utilizada

A stack foi escolhida com base no que empresas como Facebook, AirBnb,
e New York Times estão usando para construir suas experiências. Também foi
levado em consideração a simplicidade, curva de aprendizado e requisitos
como fácil distribuição e entrega progressiva.

Tendo isso em vista, fomos de [React](http://github.com/facebook/react) e [Ramda](https://github.com/ramda/ramda). 
A estrutura do projeto foi iniciada rapidamente usando o [FormerKit Dashboard](https://github.com/pagarme/react-scripts-former-kit-dashboard),
projeto que desenvolvemos baseado no Create React App para nos permitir
criar rapidamente projetos de dashboards.

### Requisitos

Este repositório é um monorepo que aloja os pacotes que compõem o Pilot.
Para instalar as dependências é necessário usar o
[Yarn](https://yarnpkg.com/en) versão 1.0 ou superior, que suporta a
funcionalidade de [Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/).

### Desenvolvimento

Algumas instruções para desenvolver na Pilot:

## Clonando o repositório

Clone o repositório:

```
git clone git@github.com:pagarme/pilot.git
```

## Rodando o servidor

Use o Yarn para instalar as dependências:

```
yarn
```

Entre no diretório do Pilot:

```
cd packages/pilot
```

Inicie a aplicação:

```
yarn start
```

## Cockpit

### O que é?

![cockpit-data-flow](https://user-images.githubusercontent.com/20358128/42246516-48de3114-7ef3-11e8-8428-8b3462b7eb92.png)

O Cockpit é nossa biblioteca para efetuar requests a serviços externos e devolver os dados retornados em um formato estruturado para serem utilizados nas páginas da Pilot. Atualmente, a principal função do Cockpit e fazer a comunicação com a API utilizando o [pagarme-js](https://github.com/pagarme/pagarme-js). Porém, sua estrutura permite interação também com outros serviços, caso haja necessidade. Uma request ao Cockpit equivale a uma ou mais requests na API, onde o dado retornado será tratado para ser renderizado na Pilot.

### Rodando testes no Cockpit

```
cd packages/cockpit
```

```
yarn test
```

## Contribuindo

Para ler informações sobre contribuição, confira nosso guia de contribuição em [CONTRIBUTING.md](CONTRIBUTING.md).

## Licenças

Veja as licenças em [LICENSES](LICENSES.md).

---

[milestones]: https://github.com/pagarme/pilot/milestones
[dashboard-pagarme]: https://dashboard.pagar.me
[react-styleguide]: https://github.com/pagarme/react-style-guide
[git-styleguide]: https://github.com/pagarme/git-style-guide
[storybook]: https://github.com/storybooks/storybook

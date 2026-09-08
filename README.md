# Portfólio — José Cláudio

Site estático em Astro e Tailwind. Os projetos em destaque são recortes das experiências existentes.

## Desenvolvimento

- Node.js conforme engines em package.json; instalar com `npm ci`.
- `npm run dev -- --background`: iniciar servidor local.
- `npm run astro -- dev stop`: encerrar servidor.
- `npm run check`: verificar Astro e TypeScript.
- `npm run lint`: verificar formatação (Prettier; não substitui análise de tipos).
- `npm run format`: formatar fontes.
- `npm run build`: gerar versão estática em dist/.

## Arquitetura visual

Componentes Astro renderizam todo o conteúdo no build. Canvas 2D projeta uma rede 3D com perspectiva, rotação e resposta ao ponteiro; não há WebGL nem framework de animação. As conexões são pré-calculadas. O desenho pausa fora da tela, em abas ocultas e por escolha do visitante. O limite de resolução é 1,75x (1,25x em ponteiros touch), com menos nós em dispositivos touch. Movimento reduzido usa composição estática e desativa parallax e transições.

SVGs conceituais representam robótica, reciclagem de baterias, aerodesign, educação e gestão de dados. Não representam fotografias, resultados medidos ou modelos reais. Fontes do sistema evitam downloads externos. Todo o conteúdo e navegação funcionam sem JavaScript.

## Conteúdo e imagens

Experiências: src/components/Experience.astro. Projetos: Projects.astro. Habilidades: Skills.astro. Estilos: src/styles/portfolio.css. Adicionar fotos reais com os nomes de public/images/README.md e reconstruir o site. Fotos são incluídas somente quando existem, com carregamento tardio e proporções preservadas. Otimizar os arquivos antes de adicionar; os arquivos públicos não são recomprimidos automaticamente. Não há links GitHub ou demos disponíveis no conteúdo original.

## Publicação

O adapter Vercel existente foi mantido. O build também gera dist/, que pode ser servido pelo Nginx no Raspberry Pi. Esta alteração não configura hospedagem nem publica o site.

TypeScript fica na série 6 por compatibilidade com astro check. O override de path-to-regexp mantém a série 6 corrigida usada pelo adapter Vercel.

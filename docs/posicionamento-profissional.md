# Posicionamento profissional — pesquisa em 08/09/2026

Amostra qualitativa de três descrições públicas de empregadores no Brasil. Não é levantamento estatístico do mercado. VERO e SENAI já encerraram inscrições; são referências recentes de requisitos, não recomendações de candidatura.

| Fonte | Sinais da descrição | Evidência já existente no portfólio |
| --- | --- | --- |
| [Eletromidia — Analista de Projetos Junior](https://eletromidia.gupy.io/jobs/11862962?jobBoardSource=gupy_public_page) | Circuitos, protótipos, microcontroladores; Python e ESP32 como diferenciais | Projetos elétricos e eletrônicos do Hórus; ESP32 e Python entre as habilidades |
| [VERO — Analista Telecomunicações](https://vero.gupy.io/jobs/11140208?jobBoardSource=gupy_public_page) | Excel, Power BI, Python, análise operacional, organização e comunicação | Ferramentas já declaradas; pesquisa quantitativa; coordenação e qualidade de dados no IBGE |
| [SENAI SP — Pesquisa e Laboratório II, 489/2026](https://sesisenaisp.empregare.com/pt-br/vaga-analista-de-pesquisa-e-laboratorio-ii-el_175891) | Integração de hardware e firmware, projetos, pesquisa, colaboração e comunicação | AeroDesign, pesquisa CNPq e liderança de engenharia na Spirit |

Decisão editorial: tornar eletrônica/embarcados, dados/automação e liderança/execução visíveis na apresentação, com links para experiências que sustentam o texto. Interesse em redes continua indicado como interesse, sem inventar atuação profissional nessa área. Não foram acrescentadas competências não confirmadas como C/C++, RTOS, CAD de PCB, TCP/IP ou protocolos industriais. Nível acadêmico e cargos foram preservados.

## Ilustrações e modelo financeiro

Robô, avião, professor e mapa são ilustrações conceituais; o mapa não representa uma região ou dados geográficos reais. Os gráficos financeiros apresentam um exemplo hipotético, não resultados da pesquisa CNPq, nem Monte Carlo real: investimento inicial de R$ 100.000 e cinco recebimentos anuais de R$ 32.000 no fim de cada ano, taxa de desconto de 10% a.a. VPL calculado, TIR pela raiz do VPL e payback simples interpolado (3,125 anos). Pressupostos expostos no próprio gráfico.

Animações SVG só rodam com o painel visível. O fundo de partículas limita nós e resolução, desenha no máximo 30 quadros por segundo e não captura cliques. Botão de pausa controla fundo, esfera e cenas. Movimento reduzido e aba oculta interrompem animações. Layout existente de imagem ao lado do texto foi preservado.

Validação dos cálculos: `npm test` executa quatro testes com o runner nativo do Node, incluindo valor presente, raiz da TIR, interpolação do payback, investimento não recuperado e entradas inválidas. Executar também `npm run check`, `npm run lint` e `npm run build`. O build de GitHub Pages foi verificado com `npm run build -- --site https://eomucantc.github.io --base /meu-portfolio`.

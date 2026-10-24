export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  questions: Question[];
}

export const subjects: Subject[] = [
  {
    id: "matematica",
    name: "Matemática",
    icon: "🔢",
    color: "from-blue-500 to-blue-700",
    bgColor: "bg-blue-50 border-blue-200",
    questions: [
      { id: 1, question: "Quanto é 7 × 8?", options: ["54", "56", "58", "62"], correctAnswer: 1, explanation: "7 × 8 = 56" },
      { id: 2, question: "Qual é a raiz quadrada de 144?", options: ["10", "11", "12", "14"], correctAnswer: 2, explanation: "12 × 12 = 144" },
      { id: 3, question: "Quanto é 15% de 200?", options: ["20", "25", "30", "35"], correctAnswer: 2, explanation: "15% de 200 = 0,15 × 200 = 30" },
      { id: 4, question: "Qual é o resultado de 3² + 4²?", options: ["20", "25", "30", "7"], correctAnswer: 1, explanation: "3² + 4² = 9 + 16 = 25" },
      { id: 5, question: "Quanto é 1000 ÷ 8?", options: ["120", "125", "130", "135"], correctAnswer: 1, explanation: "1000 ÷ 8 = 125" },
      { id: 6, question: "Qual é o próximo número primo após 7?", options: ["8", "9", "10", "11"], correctAnswer: 3, explanation: "11 é o próximo número primo após 7" },
      { id: 7, question: "Quanto é 2/3 + 1/3?", options: ["1", "2/3", "3/3", "1/2"], correctAnswer: 0, explanation: "2/3 + 1/3 = 3/3 = 1" },
      { id: 8, question: "Qual é o valor de π (pi) aproximadamente?", options: ["3,14", "2,71", "1,41", "3,33"], correctAnswer: 0, explanation: "π ≈ 3,14159..." },
      { id: 9, question: "Quanto é 9 × 9?", options: ["72", "81", "89", "91"], correctAnswer: 1, explanation: "9 × 9 = 81" },
      { id: 10, question: "Quantos graus tem um ângulo reto?", options: ["45°", "60°", "90°", "180°"], correctAnswer: 2, explanation: "Um ângulo reto tem exatamente 90°" },
      { id: 11, question: "Quanto é 25 × 4?", options: ["80", "90", "100", "110"], correctAnswer: 2, explanation: "25 × 4 = 100" },
      { id: 12, question: "Qual é o MMC de 4 e 6?", options: ["8", "10", "12", "24"], correctAnswer: 2, explanation: "O MMC de 4 e 6 é 12" },
      { id: 13, question: "Quanto é (-3) × (-4)?", options: ["-12", "-7", "7", "12"], correctAnswer: 3, explanation: "Negativo × negativo = positivo: (-3) × (-4) = 12" },
      { id: 14, question: "Quantos lados tem um hexágono?", options: ["5", "6", "7", "8"], correctAnswer: 1, explanation: "Hexágono tem 6 lados" },
      { id: 15, question: "Quanto é 3³?", options: ["9", "18", "27", "81"], correctAnswer: 2, explanation: "3³ = 3 × 3 × 3 = 27" },
      { id: 16, question: "Qual é a área de um quadrado com lado 5 cm?", options: ["10 cm²", "20 cm²", "25 cm²", "30 cm²"], correctAnswer: 2, explanation: "Área = lado² = 5² = 25 cm²" },
      { id: 17, question: "Quanto é 0,5 + 0,25?", options: ["0,50", "0,75", "0,80", "1,00"], correctAnswer: 1, explanation: "0,5 + 0,25 = 0,75" },
      { id: 18, question: "Qual é o MDC de 12 e 18?", options: ["2", "3", "6", "9"], correctAnswer: 2, explanation: "O MDC de 12 e 18 é 6" },
      { id: 19, question: "Quanto é 1/2 de 80?", options: ["20", "30", "40", "50"], correctAnswer: 2, explanation: "1/2 de 80 = 80 ÷ 2 = 40" },
      { id: 20, question: "Quantos centímetros tem 1 metro?", options: ["10", "50", "100", "1000"], correctAnswer: 2, explanation: "1 metro = 100 centímetros" },
    ]
  },
  {
    id: "portugues",
    name: "Português",
    icon: "📚",
    color: "from-green-500 to-green-700",
    bgColor: "bg-green-50 border-green-200",
    questions: [
      { id: 1, question: "Qual é o plural de 'cidadão'?", options: ["Cidadãos", "Cidadões", "Cidadães", "Cidadans"], correctAnswer: 0, explanation: "O plural de cidadão é cidadãos" },
      { id: 2, question: "Qual palavra é um substantivo?", options: ["Bonito", "Correr", "Casa", "Rapidamente"], correctAnswer: 2, explanation: "'Casa' é um substantivo (nome de lugar)" },
      { id: 3, question: "Qual é o sinônimo de 'feliz'?", options: ["Triste", "Alegre", "Cansado", "Bravo"], correctAnswer: 1, explanation: "'Alegre' é sinônimo de 'feliz'" },
      { id: 4, question: "Qual frase está correta?", options: ["Nós vai ao parque", "Nós vamos ao parque", "Nós vamos para o parque", "Nós irá ao parque"], correctAnswer: 1, explanation: "A conjugação correta é 'nós vamos'" },
      { id: 5, question: "Qual é o antônimo de 'grande'?", options: ["Alto", "Largo", "Pequeno", "Longo"], correctAnswer: 2, explanation: "'Pequeno' é o antônimo de 'grande'" },
      { id: 6, question: "Qual é o sujeito da frase: 'O gato dormiu no sofá'?", options: ["Dormiu", "No sofá", "O gato", "Sofá"], correctAnswer: 2, explanation: "'O gato' é o sujeito da oração" },
      { id: 7, question: "Qual palavra está escrita corretamente?", options: ["Exceção", "Excessão", "Exceçao", "Exseção"], correctAnswer: 0, explanation: "A forma correta é 'exceção'" },
      { id: 8, question: "'Eu, tu, ele...' - qual é a próxima pessoa do singular?", options: ["Nós", "Vós", "Ela", "Ele"], correctAnswer: 2, explanation: "A sequência é: eu, tu, ele/ela, nós, vós, eles/elas" },
      { id: 9, question: "Qual é o aumentativo de 'casa'?", options: ["Casarão", "Casebre", "Casinha", "Casona"], correctAnswer: 0, explanation: "'Casarão' é o aumentativo de 'casa'" },
      { id: 10, question: "Qual palavra é um adjetivo?", options: ["Correr", "Bonito", "Mesa", "Ontem"], correctAnswer: 1, explanation: "'Bonito' é um adjetivo (qualifica o substantivo)" },
      { id: 11, question: "Qual é o diminutivo de 'livro'?", options: ["Livrinho", "Livrão", "Livreco", "Livramento"], correctAnswer: 0, explanation: "'Livrinho' é o diminutivo de 'livro'" },
      { id: 12, question: "Quantas sílabas tem a palavra 'borboleta'?", options: ["3", "4", "5", "6"], correctAnswer: 1, explanation: "bor-bo-le-ta = 4 sílabas" },
      { id: 13, question: "Qual é a conjugação correta do verbo 'ser' no pretérito?", options: ["Eu sou", "Eu fui", "Eu serei", "Eu seja"], correctAnswer: 1, explanation: "'Eu fui' é a forma no pretérito perfeito" },
      { id: 14, question: "Qual palavra é um advérbio?", options: ["Casa", "Bonito", "Rapidamente", "Correr"], correctAnswer: 2, explanation: "'Rapidamente' é um advérbio de modo" },
      { id: 15, question: "Qual é o plural de 'mão'?", options: ["Mãos", "Mões", "Mães", "Mans"], correctAnswer: 0, explanation: "O plural de 'mão' é 'mãos'" },
      { id: 16, question: "Qual frase contém um pronome?", options: ["O dia está bonito", "Ela gosta de ler", "Nós corremos rápido", "Todas as alternativas"], correctAnswer: 3, explanation: "'Ela' e 'Nós' são pronomes" },
      { id: 17, question: "Qual é o coletivo de 'lobos'?", options: ["Matilha", "Rebanho", "Alcateia", "Manada"], correctAnswer: 2, explanation: "O coletivo de lobos é 'alcateia'" },
      { id: 18, question: "Qual palavra tem dígrafo?", options: ["Pato", "Chave", "Flor", "Mesa"], correctAnswer: 1, explanation: "'Ch' em 'chave' é um dígrafo" },
      { id: 19, question: "Qual é a classe gramatical de 'rapidamente'?", options: ["Substantivo", "Adjetivo", "Verbo", "Advérbio"], correctAnswer: 3, explanation: "'Rapidamente' é um advérbio de modo" },
      { id: 20, question: "Qual palavra está correta?", options: ["Porque (pergunta)", "Por quê (fim de frase)", "Porque (afirmação)", "Por que (afirmação)"], correctAnswer: 1, explanation: "'Por quê' é usado no fim de frases interrogativas" },
    ]
  },
  {
    id: "geografia",
    name: "Geografia",
    icon: "🌍",
    color: "from-emerald-500 to-emerald-700",
    bgColor: "bg-emerald-50 border-emerald-200",
    questions: [
      { id: 1, question: "Qual é o maior país do mundo em extensão territorial?", options: ["China", "Estados Unidos", "Canadá", "Rússia"], correctAnswer: 3, explanation: "A Rússia é o maior país do mundo com 17,1 milhões de km²" },
      { id: 2, question: "Qual é o rio mais longo do mundo?", options: ["Amazonas", "Nilo", "Mississippi", "Yangtzé"], correctAnswer: 0, explanation: "O Rio Amazonas é considerado o mais longo com cerca de 6.992 km" },
      { id: 3, question: "Quantos continentes existem?", options: ["5", "6", "7", "8"], correctAnswer: 1, explanation: "Existem 6 continentes: América, África, Europa, Ásia, Oceania e Antártida" },
      { id: 4, question: "Qual é a capital do Brasil?", options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"], correctAnswer: 2, explanation: "Brasília é a capital do Brasil desde 1960" },
      { id: 5, question: "Qual é o maior oceano do mundo?", options: ["Atlântico", "Índico", "Pacífico", "Ártico"], correctAnswer: 2, explanation: "O Oceano Pacífico é o maior, cobrindo cerca de 165 milhões de km²" },
      { id: 6, question: "Em qual continente fica o Egito?", options: ["Ásia", "Europa", "África", "Oceania"], correctAnswer: 2, explanation: "O Egito fica no nordeste da África" },
      { id: 7, question: "Qual é o menor país do mundo?", options: ["Mônaco", "Vaticano", "San Marino", "Liechtenstein"], correctAnswer: 1, explanation: "O Vaticano é o menor país do mundo com apenas 0,44 km²" },
      { id: 8, question: "Qual é a montanha mais alta do mundo?", options: ["K2", "Monte Everest", "Kilimanjaro", "Aconcágua"], correctAnswer: 1, explanation: "O Monte Everest tem 8.849 metros de altitude" },
      { id: 9, question: "Qual estado brasileiro tem a maior área?", options: ["Minas Gerais", "Pará", "Amazonas", "Mato Grosso"], correctAnswer: 2, explanation: "O Amazonas é o maior estado brasileiro com 1,55 milhão de km²" },
      { id: 10, question: "Qual é a capital da França?", options: ["Londres", "Madrid", "Paris", "Roma"], correctAnswer: 2, explanation: "Paris é a capital da França" },
      { id: 11, question: "Quantos estados tem o Brasil?", options: ["24", "25", "26", "27"], correctAnswer: 2, explanation: "O Brasil tem 26 estados mais o Distrito Federal" },
      { id: 12, question: "Qual é o deserto mais quente do mundo?", options: ["Gobi", "Saara", "Kalahari", "Atacama"], correctAnswer: 1, explanation: "O Deserto do Saara é o maior deserto quente do mundo" },
      { id: 13, question: "Qual país tem a maior população do mundo?", options: ["Índia", "China", "Estados Unidos", "Indonésia"], correctAnswer: 0, explanation: "A Índia ultrapassou a China como país mais populoso em 2023" },
      { id: 14, question: "Qual é a linha imaginária que divide a Terra em norte e sul?", options: ["Trópico de Câncer", "Linha do Equador", "Meridiano de Greenwich", "Trópico de Capricórnio"], correctAnswer: 1, explanation: "A Linha do Equador divide a Terra em hemisférios Norte e Sul" },
      { id: 15, question: "Em qual estado fica a cidade de Manaus?", options: ["Pará", "Amazonas", "Acre", "Roraima"], correctAnswer: 1, explanation: "Manaus é a capital do estado do Amazonas" },
      { id: 16, question: "Qual é o maior lago de água doce do mundo em área?", options: ["Lago Titicaca", "Lago Superior", "Mar Cáspio", "Lago Vitória"], correctAnswer: 1, explanation: "O Lago Superior é o maior lago de água doce em área" },
      { id: 17, question: "Qual país faz fronteira com o Brasil ao sul?", options: ["Argentina", "Chile", "Peru", "Colômbia"], correctAnswer: 0, explanation: "A Argentina faz fronteira com o Brasil ao sul" },
      { id: 18, question: "Qual é a capital da Austrália?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], correctAnswer: 2, explanation: "Canberra é a capital da Austrália" },
      { id: 19, question: "Qual bioma ocupa a maior parte do território brasileiro?", options: ["Amazônia", "Cerrado", "Mata Atlântica", "Caatinga"], correctAnswer: 0, explanation: "A Amazônia ocupa cerca de 49% do território brasileiro" },
      { id: 20, question: "Qual é o ponto mais alto do Brasil?", options: ["Pico da Neblina", "Pico da Bandeira", "Pico do Cristal", "Serra da Mantiqueira"], correctAnswer: 0, explanation: "O Pico da Neblina com 2.995m é o ponto mais alto do Brasil" },
    ]
  },
  {
    id: "historia",
    name: "História",
    icon: "📜",
    color: "from-amber-500 to-amber-700",
    bgColor: "bg-amber-50 border-amber-200",
    questions: [
      { id: 1, question: "Em que ano o Brasil foi descoberto pelos portugueses?", options: ["1492", "1500", "1510", "1498"], correctAnswer: 1, explanation: "Pedro Álvares Cabral chegou ao Brasil em 22 de abril de 1500" },
      { id: 2, question: "Quem proclamou a Independência do Brasil?", options: ["D. João VI", "D. Pedro I", "D. Pedro II", "Tiradentes"], correctAnswer: 1, explanation: "D. Pedro I proclamou a independência em 7 de setembro de 1822" },
      { id: 3, question: "Em que ano começou a Primeira Guerra Mundial?", options: ["1912", "1914", "1916", "1918"], correctAnswer: 1, explanation: "A Primeira Guerra Mundial começou em 1914" },
      { id: 4, question: "Quem foi o primeiro presidente do Brasil?", options: ["Getúlio Vargas", "Deodoro da Fonseca", "Floriano Peixoto", "Prudente de Morais"], correctAnswer: 1, explanation: "Deodoro da Fonseca foi o primeiro presidente do Brasil" },
      { id: 5, question: "Em que ano foi proclamada a República no Brasil?", options: ["1822", "1888", "1889", "1891"], correctAnswer: 2, explanation: "A República foi proclamada em 15 de novembro de 1889" },
      { id: 6, question: "Qual civilização construiu as pirâmides de Gizé?", options: ["Romana", "Grega", "Egípcia", "Mesopotâmica"], correctAnswer: 2, explanation: "Os antigos egípcios construíram as pirâmides de Gizé" },
      { id: 7, question: "Em que ano acabou a escravidão no Brasil?", options: ["1850", "1871", "1888", "1891"], correctAnswer: 2, explanation: "A Lei Áurea foi assinada em 13 de maio de 1888 pela Princesa Isabel" },
      { id: 8, question: "Quem pintou a Mona Lisa?", options: ["Michelangelo", "Rafael", "Leonardo da Vinci", "Donatello"], correctAnswer: 2, explanation: "Leonardo da Vinci pintou a Mona Lisa no século XVI" },
      { id: 9, question: "Em que ano o homem pisou na Lua pela primeira vez?", options: ["1965", "1967", "1969", "1971"], correctAnswer: 2, explanation: "Neil Armstrong pisou na Lua em 20 de julho de 1969" },
      { id: 10, question: "Qual foi a última dinastia imperial do Brasil?", options: ["Bragança", "Borbón", "Habsburgo", "Tudor"], correctAnswer: 0, explanation: "A dinastia de Bragança reinou no Brasil" },
      { id: 11, question: "Em que ano caiu o Muro de Berlim?", options: ["1987", "1988", "1989", "1990"], correctAnswer: 2, explanation: "O Muro de Berlim caiu em 9 de novembro de 1989" },
      { id: 12, question: "Quem liderou a Revolução Francesa?", options: ["Napoleão", "Robespierre", "Luís XVI", "Voltaire"], correctAnswer: 1, explanation: "Robespierre foi um dos principais líderes da Revolução Francesa" },
      { id: 13, question: "Em que século ocorreu a Revolução Industrial?", options: ["Século XVI", "Século XVII", "Século XVIII", "Século XIX"], correctAnswer: 2, explanation: "A Revolução Industrial começou no século XVIII na Inglaterra" },
      { id: 14, question: "Qual império dominou grande parte da Europa antiga?", options: ["Império Grego", "Império Romano", "Império Persa", "Império Otomano"], correctAnswer: 1, explanation: "O Império Romano dominou grande parte da Europa, África e Oriente Médio" },
      { id: 15, question: "Em que ano terminou a Segunda Guerra Mundial?", options: ["1943", "1944", "1945", "1946"], correctAnswer: 2, explanation: "A Segunda Guerra Mundial terminou em 1945" },
      { id: 16, question: "Quem foi Tiradentes?", options: ["Um presidente", "Um líder da Inconfidência Mineira", "Um descobridor", "Um imperador"], correctAnswer: 1, explanation: "Tiradentes foi líder da Inconfidência Mineira, movimento pela independência" },
      { id: 17, question: "Qual era o nome do navio de Pedro Álvares Cabral?", options: ["Santa Maria", "Nau Capitânia", "Caravela Pinta", "São Gabriel"], correctAnswer: 1, explanation: "Pedro Álvares Cabral viajava na Nau Capitânia" },
      { id: 18, question: "Em que ano foi fundada a cidade de Roma segundo a lenda?", options: ["753 a.C.", "500 a.C.", "100 a.C.", "1 d.C."], correctAnswer: 0, explanation: "Segundo a lenda, Roma foi fundada em 753 a.C. por Rômulo e Remo" },
      { id: 19, question: "Qual país foi o principal colonizador do Brasil?", options: ["Espanha", "Inglaterra", "Portugal", "França"], correctAnswer: 2, explanation: "Portugal colonizou o Brasil a partir de 1500" },
      { id: 20, question: "O que foi a Guerra Fria?", options: ["Uma guerra no Ártico", "Disputa entre EUA e URSS", "Guerra na Antártida", "Conflito no Canadá"], correctAnswer: 1, explanation: "A Guerra Fria foi a disputa ideológica entre EUA e URSS (1947-1991)" },
    ]
  },
  {
    id: "ciencias",
    name: "Ciências",
    icon: "🔬",
    color: "from-purple-500 to-purple-700",
    bgColor: "bg-purple-50 border-purple-200",
    questions: [
      { id: 1, question: "Qual é o planeta mais próximo do Sol?", options: ["Vênus", "Mercúrio", "Marte", "Terra"], correctAnswer: 1, explanation: "Mercúrio é o planeta mais próximo do Sol" },
      { id: 2, question: "Qual é o maior órgão do corpo humano?", options: ["Fígado", "Coração", "Pele", "Pulmão"], correctAnswer: 2, explanation: "A pele é o maior órgão do corpo humano" },
      { id: 3, question: "Qual gás as plantas absorvem durante a fotossíntese?", options: ["Oxigênio", "Nitrogênio", "Gás carbônico", "Hidrogênio"], correctAnswer: 2, explanation: "As plantas absorvem CO₂ (gás carbônico) na fotossíntese" },
      { id: 4, question: "Quantos ossos tem o corpo humano adulto?", options: ["186", "206", "226", "256"], correctAnswer: 1, explanation: "O corpo humano adulto tem 206 ossos" },
      { id: 5, question: "Qual é a fórmula química da água?", options: ["CO₂", "H₂O", "NaCl", "O₂"], correctAnswer: 1, explanation: "A água é composta por 2 átomos de hidrogênio e 1 de oxigênio: H₂O" },
      { id: 6, question: "Qual é o maior planeta do Sistema Solar?", options: ["Saturno", "Júpiter", "Netuno", "Urano"], correctAnswer: 1, explanation: "Júpiter é o maior planeta do Sistema Solar" },
      { id: 7, question: "O que é a gravidade?", options: ["Uma força magnética", "Força de atração entre corpos", "Uma forma de energia", "Um tipo de radiação"], correctAnswer: 1, explanation: "Gravidade é a força de atração entre corpos com massa" },
      { id: 8, question: "Qual é a velocidade da luz?", options: ["150.000 km/s", "200.000 km/s", "300.000 km/s", "400.000 km/s"], correctAnswer: 2, explanation: "A velocidade da luz é aproximadamente 300.000 km/s" },
      { id: 9, question: "Qual é o elemento químico mais abundante no universo?", options: ["Oxigênio", "Carbono", "Hélio", "Hidrogênio"], correctAnswer: 3, explanation: "O hidrogênio é o elemento mais abundante no universo" },
      { id: 10, question: "Quantos planetas tem o Sistema Solar?", options: ["7", "8", "9", "10"], correctAnswer: 1, explanation: "O Sistema Solar tem 8 planetas (Plutão foi reclassificado)" },
      { id: 11, question: "Qual é o processo pelo qual as plantas produzem alimento?", options: ["Respiração", "Digestão", "Fotossíntese", "Transpiração"], correctAnswer: 2, explanation: "A fotossíntese é o processo pelo qual as plantas produzem seu alimento" },
      { id: 12, question: "O que é um vulcão?", options: ["Uma montanha de gelo", "Abertura na crosta terrestre que expele magma", "Um tipo de terremoto", "Uma formação oceânica"], correctAnswer: 1, explanation: "Vulcão é uma abertura na crosta terrestre por onde sai magma, cinzas e gases" },
      { id: 13, question: "Qual é a unidade básica da vida?", options: ["Átomo", "Molécula", "Célula", "Tecido"], correctAnswer: 2, explanation: "A célula é a unidade básica de todos os seres vivos" },
      { id: 14, question: "Qual vitamina é produzida pela exposição ao sol?", options: ["Vitamina A", "Vitamina B", "Vitamina C", "Vitamina D"], correctAnswer: 3, explanation: "A vitamina D é produzida pela pele quando exposta ao sol" },
      { id: 15, question: "O que causa as estações do ano?", options: ["Distância da Terra ao Sol", "Inclinação do eixo da Terra", "Velocidade da Terra", "Fases da Lua"], correctAnswer: 1, explanation: "As estações são causadas pela inclinação do eixo da Terra" },
      { id: 16, question: "Qual é o metal mais abundante na crosta terrestre?", options: ["Ferro", "Alumínio", "Cobre", "Ouro"], correctAnswer: 1, explanation: "O alumínio é o metal mais abundante na crosta terrestre" },
      { id: 17, question: "O que é DNA?", options: ["Um tipo de proteína", "Material genético dos seres vivos", "Uma vitamina", "Um tipo de célula"], correctAnswer: 1, explanation: "DNA é o ácido desoxirribonucleico, material genético dos seres vivos" },
      { id: 18, question: "Qual é o estado físico da água a 100°C ao nível do mar?", options: ["Sólido", "Líquido", "Gasoso", "Plasma"], correctAnswer: 2, explanation: "A 100°C ao nível do mar, a água entra em ebulição (estado gasoso)" },
      { id: 19, question: "Quantos litros de sangue tem aproximadamente um adulto?", options: ["3 litros", "5 litros", "7 litros", "10 litros"], correctAnswer: 1, explanation: "Um adulto tem aproximadamente 5 litros de sangue" },
      { id: 20, question: "O que é um eclipse solar?", options: ["A Terra bloqueia a luz do Sol", "A Lua bloqueia a luz do Sol", "O Sol desaparece", "A Lua fica vermelha"], correctAnswer: 1, explanation: "Eclipse solar ocorre quando a Lua passa entre a Terra e o Sol" },
    ]
  },
  {
    id: "ingles",
    name: "Inglês",
    icon: "🇬🇧",
    color: "from-red-500 to-red-700",
    bgColor: "bg-red-50 border-red-200",
    questions: [
      { id: 1, question: "Como se diz 'cachorro' em inglês?", options: ["Cat", "Dog", "Bird", "Fish"], correctAnswer: 1, explanation: "'Dog' significa cachorro em inglês" },
      { id: 2, question: "Qual é a tradução de 'Good morning'?", options: ["Boa noite", "Bom dia", "Boa tarde", "Até logo"], correctAnswer: 1, explanation: "'Good morning' significa 'Bom dia'" },
      { id: 3, question: "Como se diz 'obrigado' em inglês?", options: ["Please", "Sorry", "Thank you", "Hello"], correctAnswer: 2, explanation: "'Thank you' significa 'obrigado(a)'" },
      { id: 4, question: "Qual é o plural de 'child'?", options: ["Childs", "Children", "Childes", "Childrens"], correctAnswer: 1, explanation: "O plural de 'child' é 'children' (irregular)" },
      { id: 5, question: "Complete: She ___ a student.", options: ["am", "is", "are", "be"], correctAnswer: 1, explanation: "Usamos 'is' com 'she': She is a student" },
      { id: 6, question: "Como se diz 'escola' em inglês?", options: ["Store", "School", "Street", "Sky"], correctAnswer: 1, explanation: "'School' significa escola" },
      { id: 7, question: "Qual é o passado de 'go'?", options: ["Goed", "Gone", "Went", "Going"], correctAnswer: 2, explanation: "O passado de 'go' é 'went' (verbo irregular)" },
      { id: 8, question: "Como se diz 'livro' em inglês?", options: ["Look", "Book", "Lock", "Block"], correctAnswer: 1, explanation: "'Book' significa livro" },
      { id: 9, question: "Qual é o oposto de 'big'?", options: ["Tall", "Small", "Long", "Wide"], correctAnswer: 1, explanation: "'Small' (pequeno) é o oposto de 'big' (grande)" },
      { id: 10, question: "Complete: They ___ playing football.", options: ["is", "am", "are", "be"], correctAnswer: 2, explanation: "Usamos 'are' com 'they': They are playing football" },
      { id: 11, question: "Como se diz 'família' em inglês?", options: ["Friend", "Family", "Father", "Far"], correctAnswer: 1, explanation: "'Family' significa família" },
      { id: 12, question: "Qual dia da semana é 'Wednesday'?", options: ["Segunda", "Terça", "Quarta", "Quinta"], correctAnswer: 2, explanation: "'Wednesday' é quarta-feira" },
      { id: 13, question: "Como se diz 'cor' em inglês?", options: ["Cold", "Color", "Core", "Cord"], correctAnswer: 1, explanation: "'Color' significa cor" },
      { id: 14, question: "Qual é a forma negativa de 'I like'?", options: ["I not like", "I don't like", "I no like", "I doesn't like"], correctAnswer: 1, explanation: "A forma negativa é 'I don't like'" },
      { id: 15, question: "Como se diz 'água' em inglês?", options: ["Water", "Waiter", "Winter", "Winner"], correctAnswer: 0, explanation: "'Water' significa água" },
      { id: 16, question: "Qual é o comparativo de 'good'?", options: ["Gooder", "More good", "Better", "Best"], correctAnswer: 2, explanation: "O comparativo de 'good' é 'better' (irregular)" },
      { id: 17, question: "Complete: ___ you speak Portuguese?", options: ["Are", "Do", "Is", "Does"], correctAnswer: 1, explanation: "Usamos 'Do' para perguntas com 'you': Do you speak Portuguese?" },
      { id: 18, question: "Como se diz 'ano' em inglês?", options: ["Yes", "Year", "You", "Yet"], correctAnswer: 1, explanation: "'Year' significa ano" },
      { id: 19, question: "Qual é o superlativo de 'bad'?", options: ["Badder", "More bad", "Worse", "Worst"], correctAnswer: 3, explanation: "O superlativo de 'bad' é 'worst' (irregular)" },
      { id: 20, question: "Como se diz 'feliz aniversário' em inglês?", options: ["Happy day", "Happy birthday", "Good birthday", "Nice day"], correctAnswer: 1, explanation: "'Happy birthday' significa 'feliz aniversário'" },
    ]
  }
];

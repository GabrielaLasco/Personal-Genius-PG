import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  Sparkles, Dumbbell, User, Flame, Activity, CreditCard, 
  Settings, LogOut, Check, ArrowLeft, RefreshCw, X, ShieldAlert,
  ChevronRight, Mic, Send, Volume2, UserCheck, MessageSquare, AlertTriangle, Camera, Upload
} from "lucide-react";

// --- BANCO DE DADOS COMPLETO COM OS 80+ EXERCÍCIOS E LINKS DIRETO PARA O GOOGLE IMAGENS ---
const DATABASE_EXERCISES = [
  // COXA / QUADRÍCEPS
  { id: "quad_01", nome: "Cadeira extensora", grupo: "Coxa/Quadríceps", musculo: "Parte da frente da coxa", equipamento: "Cadeira Extensora", execucao: "Sente-se na cadeira, apoie bem as costas e estique as pernas para cima devagar.", erros: "Descolar o bumbum do banco ao esticar." },
  { id: "quad_02", nome: "Agachamento livre", grupo: "Coxa/Quadríceps", musculo: "Pernas completas", equipamento: "Peso do corpo", execucao: "Afaste os pés na largura dos ombros, jogue o quadril para trás como se fosse sentar e volte.", erros: "Deixar os joelhos irem para dentro." },
  { id: "quad_03", nome: "Leg press 45 graus", grupo: "Coxa/Quadríceps", musculo: "Pernas e coxas", equipamento: "Aparelho Leg Press", execucao: "Com as costas bem apoiadas, empurre a plataforma com os pés e volte controlando o movimento.", erros: "Tirar a lombar do encosto." },
  { id: "quad_04", nome: "Agachamento no Smith", grupo: "Coxa/Quadríceps", musculo: "Coxas", equipamento: "Barra Guiada Smith", execucao: "Apoie a barra nos ombros e faça o movimento de agachamento com postura firme.", erros: "Colocar os pés muito para a frente." },
  { id: "quad_05", nome: "Cadeira extensora unilateral", grupo: "Coxa/Quadríceps", musculo: "Parte da frente da coxa (uma perna)", equipamento: "Cadeira Extensora", execucao: "Estique uma perna de cada vez, mantendo a outra relaxada.", erros: "Girar o quadril para ajudar." },
  { id: "quad_06", nome: "Agachamento goblet", grupo: "Coxa/Quadríceps", musculo: "Coxas e abdômen", equipamento: "Halter", execucao: "Segure um peso na altura do peito e agache mantendo o tronco reto.", erros: "Jogar o corpo para a frente." },
  { id: "quad_07", nome: "Agachamento sumô com halter", grupo: "Coxa/Quadríceps", musculo: "Coxas e parte interna", equipamento: "Halter", execucao: "Abra bem as pernas com os pés virados para fora, segure o peso embaixo e agache.", erros: "Curvar as costas." },
  { id: "quad_08", nome: "Leg press unilateral", grupo: "Coxa/Quadríceps", musculo: "Coxa (uma perna)", equipamento: "Leg Press", execucao: "Coloque apenas um pé na plataforma e empurre controlando a descida.", erros: "Forçar a descida exagerada." },
  { id: "quad_09", nome: "Agachamento com banco", grupo: "Coxa/Quadríceps", musculo: "Coxas", equipamento: "Banco / Cadeira", execucao: "Desça o bumbum até encostar de leve no banco e levante em seguida.", erros: "Sentar com tudo no banco." },
  { id: "quad_10", nome: "Cadeira extensora controlada", grupo: "Coxa/Quadríceps", musculo: "Parte da frente da coxa", equipamento: "Cadeira Extensora", execucao: "Faça o movimento de esticar a perna bem devagar, sem pressa.", erros: "Fazer o movimento com impulsos rápidos." },

  // POSTERIOR DE COXA
  { id: "post_01", nome: "Mesa flexora", grupo: "Posterior de Coxa", musculo: "Parte de trás da coxa", equipamento: "Mesa Flexora", execucao: "Deite de barriga para baixo e dobre os joelhos trazendo o calcanhar em direção ao bumbum.", erros: "Elevar o quadril do banco." },
  { id: "post_02", nome: "Cadeira flexora", grupo: "Posterior de Coxa", musculo: "Parte de trás da coxa", equipamento: "Cadeira Flexora", execucao: "Sente-se e puxe a alça para trás dobrando os joelhos.", erros: "Descolar o peito do encosto." },
  { id: "post_03", nome: "Stiff com halteres", grupo: "Posterior de Coxa", musculo: "Traseira da coxa e glúteos", equipamento: "Halteres", execucao: "Com os joelhos levemente flexionados, incline o tronco para a frente empurrando o bumbum para trás.", erros: "Arredondar as costas." },
  { id: "post_04", nome: "Stiff com barra", grupo: "Posterior de Coxa", musculo: "Traseira da coxa", equipamento: "Barra", execucao: "Segure a barra e desça rente às pernas inclinando o quadril.", erros: "Dobrar muito os joelhos." },
  { id: "post_05", nome: "Flexora em pé", grupo: "Posterior de Coxa", musculo: "Traseira da coxa", equipamento: "Máquina Flexora em Pé", execucao: "Em pé, apoie o tronco e flexione uma perna para trás.", erros: "Dar trancos com o corpo." },
  { id: "post_06", nome: "Elevação pélvica no solo", grupo: "Posterior de Coxa", musculo: "Glúteos e parte de trás", equipamento: "Solo", execucao: "Deitada de barriga para cima, empurre o quadril para o alto.", erros: "Empurrar a lombar demais." },
  { id: "post_07", nome: "Flexão de pernas com bola", grupo: "Posterior de Coxa", musculo: "Traseira da coxa", equipamento: "Bola de Pilates", execucao: "Com os calcanhares na bola, eleve o quadril e puxe a bola na sua direção.", erros: "Deixar o quadril cair no chão." },
  { id: "post_08", nome: "Pull-through na polia", grupo: "Posterior de Coxa", musculo: "Traseira da coxa", equipamento: "Polia", execucao: "De costas para a polia, puxe o cabo por entre as pernas esticando o quadril.", erros: "Puxar com os braços." },
  { id: "post_09", nome: "Flexora sentada unilateral", grupo: "Posterior de Coxa", musculo: "Traseira da coxa (uma perna)", equipamento: "Cadeira Flexora", execucao: "Dobre o joelho de uma perna de cada vez com calma.", erros: "Girar o quadril para os lados." },
  { id: "post_10", nome: "Bom dia com elástico", grupo: "Posterior de Coxa", musculo: "Traseira da coxa e lombar", equipamento: "Elástico", execucao: "Com o elástico sob os pés, incline o tronco para a frente mantendo as costas retas.", erros: "Olhar para cima durante o movimento." },

  // PANTURRILHA
  { id: "pant_01", nome: "Panturrilha em pé", grupo: "Panturrilha", musculo: "Batata da perna", equipamento: "Máquina de Panturrilha", execucao: "Suba na ponta dos pés o máximo que conseguir e desça alongando bem.", erros: "Dar impulso com os joelhos." },
  { id: "pant_02", nome: "Panturrilha sentada", grupo: "Panturrilha", musculo: "Parte baixa da batata", equipamento: "Máquina Sóleo", execucao: "Sentada com o apoio nas coxas, eleve os calcanhares.", erros: "Fazer movimentos muito curtos." },
  { id: "pant_03", nome: "Panturrilha no leg press", grupo: "Panturrilha", musculo: "Batata da perna", equipamento: "Leg Press", execucao: "Com a ponta dos pés na borda da plataforma, faça o movimento de empurrar.", erros: "Flexionar os joelhos no meio do exercício." },

  // BÍCEPS
  { id: "biceps_01", nome: "Rosca alternada", grupo: "Bíceps", musculo: "Músculo do braço (frente)", equipamento: "Halteres", execucao: "Com os braços ao lado do corpo, levante um peso de cada vez dobrando o cotovelo.", erros: "Mover o cotovelo para a frente." },
  { id: "biceps_02", nome: "Rosca na máquina", grupo: "Bíceps", musculo: "Braço", equipamento: "Máquina de Rosca", execucao: "Apoie os braços no suporte e puxe a alça para cima.", erros: "Tirar o braço do apoio." },
  { id: "biceps_03", nome: "Rosca martelo", grupo: "Bíceps", musculo: "Braço e antebraço", equipamento: "Halteres", execucao: "Com as palmas das mãos viradas uma para a outra, levante os pesos.", erros: "Balançar o tronco." },
  { id: "biceps_04", nome: "Rosca direta com barra", grupo: "Bíceps", musculo: "Braço", equipamento: "Barra", execucao: "Segure a barra com as palmas para cima e levante em direção ao peito.", erros: "Usar o corpo para embalar o peso." },
  { id: "biceps_05", nome: "Rosca direta na polia", grupo: "Bíceps", musculo: "Braço", equipamento: "Polia", execucao: "Puxe a barra da polia para cima mantendo os cotovelos colados ao corpo.", erros: "Soltar o peso rápido demais." },
  { id: "biceps_06", nome: "Rosca Scott", grupo: "Bíceps", musculo: "Braço", equipamento: "Banco Scott", execucao: "Apoie os braços no banco inclinado e levante a barra.", erros: "Esticar o braço de forma brusca embaixo." },
  { id: "biceps_07", nome: "Rosca Scott na máquina", grupo: "Bíceps", musculo: "Braço", equipamento: "Máquina Scott", execucao: "Sentada no aparelho, faça a flexão dos braços controlando.", erros: "Descolar o corpo do banco." },
  { id: "biceps_08", nome: "Rosca concentrada", grupo: "Bíceps", musculo: "Braço (focado)", equipamento: "Halter", execucao: "Com o cotovelo apoiado na parte interna da coxa, faça o movimento de rosca.", erros: "Ajudar com o ombro." },
  { id: "biceps_09", nome: "Rosca inclinada", grupo: "Bíceps", musculo: "Braço", equipamento: "Banco Inclinado", execucao: "Com o banco inclinado para trás, levante os halteres sentindo alongar.", erros: "Mover o cotovelo para a frente." },
  { id: "biceps_10", nome: "Rosca inversa", grupo: "Bíceps", musculo: "Antebraço", equipamento: "Barra", execucao: "Segure a barra com as palmas para baixo e levante.", erros: "Dobrar os punhos." },

  // PEITO
  { id: "peito_01", nome: "Supino com halteres", grupo: "Peito", musculo: "Peitoral", equipamento: "Halteres", execucao: "Deitada de costas, empurre os halteres para cima na direção do teto.", erros: "Deixar os pesos caírem sem controle." },
  { id: "peito_02", nome: "Supino na máquina", grupo: "Peito", musculo: "Peitoral", equipamento: "Chest Press", execucao: "Sentada, empurre as alças para a frente.", erros: "Encolher os ombros na hora de empurrar." },
  { id: "peito_03", nome: "Crucifixo no cabo", grupo: "Peito", musculo: "Peitoral", equipamento: "Crossover", execucao: "Abra os braços e junte as mãos na altura do peito fazendo um abraço largo.", erros: "Flexionar demais os cotovelos." },
  { id: "peito_04", nome: "Supino inclinado", grupo: "Peito", musculo: "Parte superior do peito", equipamento: "Banco Inclinado", execucao: "No banco inclinado, empurre os pesos para cima e para dentro.", erros: "Arquear excessivamente as costas." },
  { id: "peito_05", nome: "Supino inclinado na máquina", grupo: "Peito", musculo: "Parte superior do peito", equipamento: "Máquina Inclinada", execucao: "Empurre as alças da máquina inclinada para cima.", erros: "Tirar as costas do encosto." },
  { id: "peito_06", nome: "Crucifixo inclinado", grupo: "Peito", musculo: "Parte superior do peito", equipamento: "Banco Inclinado + Halteres", execucao: "Abra os braços em formato de abraço e retorne ao centro.", erros: "Esticar os braços por completo." },
  { id: "peito_07", nome: "Crossover polia alta", grupo: "Peito", musculo: "Parte inferior do peito", equipamento: "Crossover", execucao: "Puxe os cabos de cima para baixo cruzando levemente na frente.", erros: "Usar o corpo para embalar." },
  { id: "peito_08", nome: "Crossover polia baixa", grupo: "Peito", musculo: "Parte superior do peito", equipamento: "Crossover", execucao: "Puxe os cabos de baixo para cima na direção do rosto.", erros: "Balançar o tronco." },
  { id: "peito_09", nome: "Flexão de braços", grupo: "Peito", musculo: "Peito e braços", equipamento: "Peso do corpo", execucao: "Com as mãos no chão, desça o peito próximo ao solo e suba.", erros: "Deixar o quadril abaixar sozinho." },
  { id: "peito_10", nome: "Peck deck", grupo: "Peito", musculo: "Peitoral", equipamento: "Peck Deck", execucao: "Com os braços apoiados, feche as almofadas na frente do peito.", erros: "Elevar os ombros durante o fechamento." },

  // COSTAS
  { id: "costas_01", nome: "Remada unilateral", grupo: "Costas", musculo: "Costas", equipamento: "Halter + Banco", execucao: "Com um joelho e mão apoiados no banco, puxe o halter em direção ao quadril.", erros: "Girar o tronco na hora de puxar." },
  { id: "costas_02", nome: "Puxada na frente", grupo: "Costas", musculo: "Costas", equipamento: "Polia Alta", execucao: "Sentada, puxe a barra para baixo em direção ao peito estufado.", erros: "Puxar a barra por trás da cabeça." },
  { id: "costas_03", nome: "Remada baixa", grupo: "Costas", musculo: "Costas", equipamento: "Polia Baixa", execucao: "Com a coluna reta, puxe o pegador em direção à barriga.", erros: "Arredondar as costas para frente." },
  { id: "costas_04", nome: "Remada curvada", grupo: "Costas", musculo: "Costas", equipamento: "Barra", execucao: "Com o tronco inclinado para a frente, puxe a barra até a barriga.", erros: "Dar trancos com o corpo." },
  { id: "costas_05", nome: "Remada cavalinho", grupo: "Costas", musculo: "Costas", equipamento: "Landmine", execucao: "Puxe a barra em direção ao peito com o tronco inclinado.", erros: "Esticar os joelhos totalmente." },
  { id: "costas_06", nome: "Puxada pegada neutra", grupo: "Costas", musculo: "Costas", equipamento: "Polia Alta", execucao: "Puxe o puxador fechado em direção ao peito.", erros: "Inclinar o tronco muito para trás." },
  { id: "costas_07", nome: "Puxada pegada supinada", grupo: "Costas", musculo: "Costas e braços", equipamento: "Polia Alta", execucao: "Com as palmas viradas para você, puxe a barra para baixo.", erros: "Puxar apenas com a força dos braços." },
  { id: "costas_08", nome: "Pullover na polia", grupo: "Costas", musculo: "Costas", equipamento: "Polia Alta", execucao: "Puxe a barra de cima para baixo até encostar nas coxas com braços retos.", erros: "Dobrar os cotovelos demais." },
  { id: "costas_09", nome: "Remada articulada", grupo: "Costas", musculo: "Costas", equipamento: "Máquina", execucao: "Com o peito apoiado no suporte, puxe as alças para trás.", erros: "Tirar o peito do apoio." },
  { id: "costas_10", nome: "Barra fixa assistida", grupo: "Costas", musculo: "Costas", equipamento: "Graviton", execucao: "Suba o corpo na barra com ajuda do apoio de joelhos.", erros: "Chutar com as pernas para subir." },

  // OMBROS
  { id: "ombro_01", nome: "Desenvolvimento com barra", grupo: "Ombros", musculo: "Ombros", equipamento: "Barra", execucao: "Em pé, empurre a barra para cima da cabeça.", erros: "Arquear as costas para conseguir subir." },
  { id: "ombro_02", nome: "Elevação lateral", grupo: "Ombros", musculo: "Lateral do ombro", equipamento: "Halteres", execucao: "Levante os braços para os lados até a altura dos ombros.", erros: "Usar o corpo para balançar e subir o peso." },
  { id: "ombro_03", nome: "Face pull", grupo: "Ombros", musculo: "Parte de trás dos ombros", equipamento: "Polia + Corda", execucao: "Puxe a corda em direção ao rosto abrindo os cotovelos.", erros: "Manter os cotovelos abaixados." },
  { id: "ombro_04", nome: "Desenvolvimento na máquina", grupo: "Ombros", musculo: "Ombros", equipamento: "Máquina", execucao: "Sentada, empurre as alças para cima.", erros: "Tirar as costas do encosto do banco." },
  { id: "ombro_05", nome: "Desenvolvimento com halteres", grupo: "Ombros", musculo: "Ombros", equipamento: "Halteres", execucao: "Empurre os halteres para cima acima da cabeça.", erros: "Bater os pesos no alto." },
  { id: "ombro_06", nome: "Elevação frontal", grupo: "Ombros", musculo: "Frente do ombro", equipamento: "Halteres", execucao: "Levante os pesos para a frente até a altura dos olhos.", erros: "Balançar o tronco." },
  { id: "ombro_07", nome: "Elevação lateral na polia", grupo: "Ombros", musculo: "Lateral do ombro", equipamento: "Polia Baixa", execucao: "Puxe o cabo passando na frente do corpo para o lado.", erros: "Puxar com a força do braço em vez do ombro." },
  { id: "ombro_08", nome: "Crucifixo inverso", grupo: "Ombros", musculo: "Traseira do ombro", equipamento: "Peck Deck Reverso", execucao: "Abra os braços para trás sentindo os ombros.", erros: "Encolher os ombros na orelha." },
  { id: "ombro_09", nome: "Remada alta", grupo: "Ombros", musculo: "Ombros e trapézio", equipamento: "Polia", execucao: "Puxe o cabo para cima levando os cotovelos no alto.", erros: "Subir os punhos acima dos cotovelos." },
  { id: "ombro_10", nome: "Arnold press", grupo: "Ombros", musculo: "Ombros", equipamento: "Halteres", execucao: "Comece com os pesos na altura do peito virados para você e gire ao subir.", erros: "Fazer o giro rápido demais." },

  // TRÍCEPS
  { id: "tricep_01", nome: "Tríceps com elástico", grupo: "Tríceps", musculo: "Tríceps (tchauzinho)", equipamento: "Elástico", execucao: "Com os cotovelos colados ao corpo, estique o elástico para baixo.", erros: "Afastar os cotovelos das costelas." },
  { id: "tricep_02", nome: "Tríceps na polia", grupo: "Tríceps", musculo: "Tríceps", equipamento: "Polia Alta", execucao: "Empurre a barra para baixo esticando totalmente os braços.", erros: "Inclinar o corpo por cima do peso." },
  { id: "tricep_03", nome: "Tríceps testa", grupo: "Tríceps", musculo: "Tríceps", equipamento: "Banco + Barra", execucao: "Deitada, dobre os cotovelos levando a barra perto da testa e estique.", erros: "Mover os ombros para a frente." },
  { id: "tricep_04", nome: "Tríceps corda", grupo: "Tríceps", musculo: "Tríceps", equipamento: "Polia Alta + Corda", execucao: "Empurre a corda para baixo abrindo as pontas no final.", erros: "Trazer os cotovelos para a frente." },
  { id: "tricep_05", nome: "Tríceps francês", grupo: "Tríceps", musculo: "Tríceps", equipamento: "Halter", execucao: "Segure o halter atrás da cabeça e estique os braços para cima.", erros: "Abrir os cotovelos para os lados." },
  { id: "tricep_06", nome: "Tríceps coice", grupo: "Tríceps", musculo: "Tríceps", equipamento: "Halter", execucao: "Com o tronco inclinado, estique o braço para trás.", erros: "Deixar o cotovelo cair." },
  { id: "tricep_07", nome: "Tríceps banco", grupo: "Tríceps", musculo: "Tríceps", equipamento: "Banco", execucao: "Com as mãos no banco, flexione os braços descendo o corpo.", erros: "Ficar muito longe do banco." },
  { id: "tricep_08", nome: "Mergulho nas paralelas", grupo: "Tríceps", musculo: "Tríceps e peito", equipamento: "Paralelas", execucao: "Apoiada nas barras paralelas, flexione os braços descendo.", erros: "Projetar o tronco muito para a frente." },
  { id: "tricep_09", nome: "Tríceps unilateral na polia", grupo: "Tríceps", musculo: "Tríceps (uma mão)", equipamento: "Polia Alta", execucao: "Puxe o puxador para baixo com apenas um braço por vez.", erros: "Movimentar o ombro junto." },
  { id: "tricep_10", nome: "Supino fechado", grupo: "Tríceps", musculo: "Tríceps e peito", equipamento: "Barra + Banco", execucao: "Faça o supino com as mãos mais próximas na barra.", erros: "Abrir os cotovelos para fora." },

  // GLÚTEOS
  { id: "glut_01", nome: "Elevação pélvica com barra", grupo: "Glúteos", musculo: "Glúteos", equipamento: "Barra + Banco", execucao: "Com as costas no banco e a barra no quadril, empurre para cima.", erros: "Empurrar com a força da lombar." },
  { id: "glut_02", nome: "Cadeira abdutora", grupo: "Glúteos", musculo: "Glúteos (lateral)", equipamento: "Máquina Abdutora", execucao: "Sentada, abra as pernas contra a resistência do aparelho.", erros: "Inclininar o tronco para a frente." },
  { id: "glut_03", nome: "Coice no cabo", grupo: "Glúteos", musculo: "Glúteos", equipamento: "Polia Baixa", execucao: "Com a tornozeleira na polia, empurre a perna para trás.", erros: "Girar o quadril para o lado." },
  { id: "glut_04", nome: "Elevação pélvica na máquina", grupo: "Glúteos", musculo: "Glúteos", equipamento: "Máquina Hip Thrust", execucao: "Apoie o quadril na almofada da máquina e empurre para cima.", erros: "Fazer força com as pontas dos pés." },
  { id: "glut_05", nome: "Agachamento sumô", grupo: "Glúteos", musculo: "Glúteos e coxas", equipamento: "Halter / Livre", execucao: "Com as pernas bem abertas, agache controlando o movimento.", erros: "Deixar os joelhos cederem para dentro." },
  { id: "glut_06", nome: "Passada reversa", grupo: "Glúteos", musculo: "Glúteos e pernas", equipamento: "Halteres", execucao: "Dê um passo para trás descendo o corpo na vertical.", erros: "Perder o equilíbrio para os lados." },
  { id: "glut_07", nome: "Afundo búlgaro", grupo: "Glúteos", musculo: "Glúteos", equipamento: "Banco + Halteres", execucao: "Com um pé apoiado no banco atrás, agache com a perna da frente.", erros: "Jogar o joelho da frente muito à frente do pé." },
  { id: "glut_08", nome: "Extensão de quadril na máquina", grupo: "Glúteos", musculo: "Glúteos", equipamento: "Máquina", execucao: "Empurre o apoio para trás com a sola do pé.", erros: "Curvar as costas na hora de empurrar." },
  { id: "glut_09", nome: "Abdução no cabo", grupo: "Glúteos", musculo: "Glúteos", equipamento: "Polia Baixa", execucao: "Em pé ao lado da polia, afaste a perna para o lado.", erros: "Balançar o corpo inteiro." },
  { id: "glut_10", nome: "Step-up no banco", grupo: "Glúteos", musculo: "Glúteos e pernas", equipamento: "Banco + Halteres", execucao: "Suba no banco apoiando um pé de cada vez com firmeza.", erros: "Dar impulso com o pé de trás." },

  // ABDÔMEN
  { id: "abd_01", nome: "Prancha abdominal", grupo: "Abdômen", musculo: "Barriga e core", equipamento: "Solo", execucao: "Apoie os antebraços no chão e mantenha o corpo todo reto e firme.", erros: "Deixar o quadril cair no chão." },
  { id: "abd_02", nome: "Abdominal na polia", grupo: "Abdômen", musculo: "Barriga", equipamento: "Polia Alta + Corda", execucao: "Ajoelhada, puxe o peso flexionando a barriga para baixo.", erros: "Puxar usando a força dos braços." },
  { id: "abd_03", nome: "Elevação de joelhos", grupo: "Abdômen", musculo: "Parte baixa da barriga", equipamento: "Suporte Suspenso", execucao: "Suspensa na barra, levante os joelhos em direção ao peito.", erros: "Balançar o corpo para embalar." },
  { id: "abd_04", nome: "Abdominal na máquina", grupo: "Abdômen", musculo: "Barriga", equipamento: "Máquina Abdominal", execucao: "Sentada, faça o movimento de fechar o tronco contra o peso.", erros: "Puxar com o pescoço." },
  { id: "abd_05", nome: "Abdominal infra no solo", grupo: "Abdômen", musculo: "Parte baixa da barriga", equipamento: "Solo", execucao: "Deitada, levante as pernas ou o quadril do chão.", erros: "Retirar a lombar do colchonete." },
  { id: "abd_06", nome: "Abdominal bicicleta", grupo: "Abdômen", musculo: "Oblíquos", equipamento: "Solo", execucao: "Alterne o cotovelo em direção ao joelho oposto.", erros: "Puxar a cabeça com as mãos." },
  { id: "abd_07", nome: "Prancha lateral", grupo: "Abdômen", musculo: "Lateral da barriga", equipamento: "Solo", execucao: "Apoiada em um antebraço de lado, mantenha o quadril alto.", erros: "Deixar o quadril abaixar." },
  { id: "abd_08", nome: "Dead bug", grupo: "Abdômen", musculo: "Abdômen", equipamento: "Solo", execucao: "Deitada, estique braço e perna opostos mantendo a lombar colada no chão.", erros: "Descolar a lombar do chão." },
  { id: "abd_09", nome: "Abdominal na bola", grupo: "Abdômen", musculo: "Barriga", equipamento: "Bola de Pilates", execucao: "Com a lombar na bola, faça o movimento de encolher o abdômen.", erros: "Escorregar da bola." },
  { id: "abd_10", nome: "Elevação de pernas estendidas", grupo: "Abdômen", musculo: "Parte baixa da barriga", equipamento: "Solo", execucao: "Deitada, suba e desça as pernas retas com controle.", erros: "Arquear as costas ao descer." }
];

export default function App() {
  const [activeTab, setActiveTab] = useState("perfil");

  // Garante que ao alternar qualquer aba, a página sempre rola para o topo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  // --- ESTADOS DO PERFIL DO ALUNO (INICIALMENTE VAZIOS) ---
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("pg_ia_profile");
      return saved ? JSON.parse(saved) : {
        nome: "",
        idade: "",
        peso: "",
        altura: "",
        gordura: "",
        musculo: "",
        musculoPorcentagem: "",
        aguaCorpo: "",
        massaOssea: "",
        visceral: "",
        dorAtual: [],
        objetivo: "Emagrecimento"
      };
    } catch {
      return {
        nome: "",
        idade: "",
        peso: "",
        altura: "",
        gordura: "",
        musculo: "",
        musculoPorcentagem: "",
        aguaCorpo: "",
        massaOssea: "",
        visceral: "",
        dorAtual: [],
        objetivo: "Emagrecimento"
      };
    }
  });

  const [bioHistory, setBioHistory] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("pg_ia_bio_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [saveFeedback, setSaveFeedback] = useState(false);
  const handleSaveProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    localStorage.setItem("pg_ia_profile", JSON.stringify(profile));
    setSaveFeedback(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setSaveFeedback(false), 3500);
  };

  const [bioFeedback, setBioFeedback] = useState(false);
  const handleSaveBioimpedance = () => {
    const newEntry = {
      data: new Date().toLocaleDateString('pt-BR'),
      musculo: profile.musculo || "0",
      musculoPorcentagem: profile.musculoPorcentagem || "0",
      gordura: profile.gordura || "0",
      visceral: profile.visceral || "0",
      aguaCorpo: profile.aguaCorpo || "0",
      massaOssea: profile.massaOssea || "0"
    };
    const updatedHistory = [newEntry, ...bioHistory];
    setBioHistory(updatedHistory);
    localStorage.setItem("pg_ia_bio_history", JSON.stringify(updatedHistory));
    setBioFeedback(true);
    setTimeout(() => setBioFeedback(false), 3000);
  };

  const imcCalculated = useMemo(() => {
    const p = parseFloat(profile.peso);
    const a = parseFloat(profile.altura);
    if (!p || !a || a <= 0) return "0.0";
    return (p / (a * a)).toFixed(1);
  }, [profile.peso, profile.altura]);

  // --- ESTADOS DE GERAÇÃO DE TREINO ILIMITADO ---
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>(['Coxa/Quadríceps']);
  const [muscleCounts, setMuscleCounts] = useState<Record<string, number>>({ 'Coxa/Quadríceps': 3 });
  const [experienceLevel, setExperienceLevel] = useState("Iniciante");
  const [equipmentImages, setEquipmentImages] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Record<number, boolean>>({});
  
  const [workoutList, setWorkoutList] = useState<any[] | null>(() => {
    try {
      const saved = localStorage.getItem("pg_ia_workout_list");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeSwapId, setActiveSwapId] = useState<number | null>(null);
  const [selectedHelpExercise, setSelectedHelpExercise] = useState<any | null>(null);

  // --- ESTADOS DO CHAT DA PG ---
  const [chatMessages, setChatMessages] = useState<any[]>([
    { role: "assistant", text: `Olá! Sou a PG, sua parceira pessoal de treinos. Estou aqui para te ajudar com seus treinos, exercícios e cuidados com o corpo. Como posso te ajudar hoje?` }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isAiResponding]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = textToSend !== undefined ? textToSend : chatInput;
    if (!messageContent.trim()) return;

    const newMessages = [...chatMessages, { role: "user", text: messageContent }];
    setChatMessages(newMessages);
    if (textToSend === undefined) setChatInput("");
    setIsAiResponding(true);

    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const systemPrompt = `Você é a PG, assistente pessoal de treinos. Seja simpática, educada, acolhedora, madura e muito direta ao ponto (1 a 2 frases breves).

DIRETRIZES DE LINGUAGEM E TRATAMENTO:
1. NUNCA use termos de dengo ou exagero como "meu bem", "meu anjo", "minha querida", "amor". Mantenha um tom profissional, amigável e natural.
2. Identifique o nome cadastrado no perfil do usuário (${profile.nome || "Aluna/Aluno"}).
   - Se for um nome feminino (ex: Maria, Juliana, Ana), use pronomes femininos (aluna, dedicada, pronta, etc.).
   - Se for um nome masculino (ex: João, Carlos, Pedro), use pronomes masculinos (aluno, dedicado, pronto, etc.).
   - Se o usuário tiver ou informar um apelido, pode chamá-lo pelo apelido.
3. Evite fazer muitas perguntas. Faça APENAS O ESTRITAMENTE NECESSÁRIO.

REGRA ABSOLUTA DE MONTAGEM E SUBSTITUIÇÃO DE TREINO COM FOTOS:
- Sempre que houver fotos anexadas do espaço ou aparelhos da academia (${equipmentImages.length} foto(s) anexada(s)), Monte e Substitua treinos ESTRITAMENTE combinando:
  1. Apenas os aparelhos/máquinas que aparecem visivelmente nas fotos enviadas.
  2. Movimentos livres com peso corporal, halteres ou anilhas simples.
- NUNCA sugira uma máquina ou equipamento que NÃO esteja nas fotos enviadas.
- Ao sugerir substituições para um aparelho ocupado, mantenha rigorosamente a mesma regra: use apenas aparelhos já fotografados ou exercícios livres seguros, respeitando o ambiente da academia e eventuais limitações/dores relatadas.

FLUXO RÍGIDO QUANDO O ALUNO RELATAR DOR OU INCOMODO EM UM EXERCÍCIO:
1. Se o aluno disser que sentiu dor, responda com empatia e pergunte APENAS: "Onde exatamente está doendo?" (caso ele ainda não tenha especificado a região).
2. Se já souber o local ou o exercício, explique brevemente a correção do movimento e faça a única pergunta permitida: "A dor continuou?"
3. Se o aluno disser que A DOR PERSISTIU (resposta positiva):
   - Sugira imediatamente que ele pare e NÃO faça mais exercícios para esse músculo hoje, descansando a região.
   - NÃO FAÇA MAIS PERGUNTAS.
4. Se o aluno INSISTIR expressamente que quer continuar treinando mesmo assim:
   - Busque e recomende um exercício substituto ultra seguro que proteja e preserve 100% essa região dolorida.

Informações do usuário: Nome: ${profile.nome || "Usuário"}, Objetivo: ${profile.objetivo}, Dores ativas: ${Array.isArray(profile.dorAtual) ? profile.dorAtual.join(', ') : profile.dorAtual}.`;

      const payload = {
        contents: newMessages.map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }]
        })),
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Entendido! Como posso te ajudar com o seu treino hoje?";

      setChatMessages(prev => [...prev, { role: "assistant", text: aiReply }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, { role: "assistant", text: "Tive um probleminha de conexão. Pode repetir a sua dúvida?" }]);
    } finally {
      setIsAiResponding(false);
    }
  };

  const toggleVoiceListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Seu navegador não suporta reconhecimento de voz.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setChatInput(transcript);
        // Coloca o texto diretamente na barra de diálogo sem enviar automaticamente
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Função interna para encontrar e falar obrigatoriamente com voz feminina jovem (~25 anos) e sotaque pt-BR
    const doSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      
      // Filtra de forma extremamente rigorosa com sotaque pt-BR, excluindo vozes masculinas
      const femaleVoices = voices.filter(v => {
        const name = v.name.toLowerCase();
        const lang = v.lang.toLowerCase();
        
        const isMale = name.includes('male') || name.includes('homem') || name.includes('felipe') || 
                       name.includes('daniel') || name.includes('ricardo') || name.includes('helio') ||
                       name.includes('edson') || name.includes('george') || name.includes('guy') || name.includes('boy');
                       
        return (lang.includes('pt-br') || lang.includes('pt_br') || lang.includes('brazil') || lang.includes('br')) && !isMale;
      });

      // Prioriza vozes femininas jovens e bem articuladas do Google/Microsoft em português do Brasil
      const bestFemale = femaleVoices.find(v => {
        const n = v.name.toLowerCase();
        return n.includes('luciana') || n.includes('maria') || n.includes('francisca') || n.includes('female') || n.includes('feminina') || n.includes('google português');
      }) || femaleVoices[0] || voices.find(v => v.lang.includes('pt'));

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.65; // Fala ultra fluida, rápida e sem pausas desnecessárias
      utterance.pitch = 1.55; // Tom de voz mais elevado, jovem, animado e entusiasmado (~25 anos)

      if (bestFemale) {
        utterance.voice = bestFemale;
      }

      window.speechSynthesis.speak(utterance);
    };

    // Garante o carregamento das vozes do navegador antes da execução
    if (window.speechSynthesis.getVoices().length > 0) {
      doSpeak();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        doSpeak();
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  };

  const muscleOptions = [
    { id: 'Coxa/Quadríceps', label: '🦵 Coxa/Quadríceps' },
    { id: 'Posterior de Coxa', label: '🦵 Posterior de Coxa' },
    { id: 'Panturrilha', label: '🦶 Panturrilha' },
    { id: 'Bíceps', label: '💪 Bíceps & Antebraço' },
    { id: 'Tríceps', label: '🥊 Tríceps' },
    { id: 'Peito', label: '🛡️ Peito' },
    { id: 'Costas', label: '🪵 Costas' },
    { id: 'Ombros', label: '🦅 Ombros' },
    { id: 'Glúteos', label: '🍑 Glúteos' },
    { id: 'Abdômen', label: '⚡ Abdômen' }
  ];

  const toggleMuscle = (muscleId: string) => {
    if (selectedMuscles.includes(muscleId)) {
      if (selectedMuscles.length === 1) return;
      setSelectedMuscles(selectedMuscles.filter(m => m !== muscleId));
      const newCounts = { ...muscleCounts };
      delete newCounts[muscleId];
      setMuscleCounts(newCounts);
    } else {
      setSelectedMuscles([...selectedMuscles, muscleId]);
      setMuscleCounts({ ...muscleCounts, [muscleId]: 3 });
    }
  };

  const updateMuscleCount = (muscleId: string, count: number) => {
    const val = Math.max(1, Math.min(10, count));
    setMuscleCounts({ ...muscleCounts, [muscleId]: val });
  };

  const togglePainArea = (area: string) => {
    const current = Array.isArray(profile.dorAtual) ? profile.dorAtual : [];
    if (current.includes(area)) {
      setProfile({ ...profile, dorAtual: current.filter((item: string) => item !== area) });
    } else {
      if (area === 'Nenhuma') {
        setProfile({ ...profile, dorAtual: ['Nenhuma'] });
      } else {
        const filtered = current.filter((item: string) => item !== 'Nenhuma');
        setProfile({ ...profile, dorAtual: [...filtered, area] });
      }
    }
  };

  const getPainSpecificMessage = (joint: string) => {
    switch (joint) {
      case 'Ombro':
        return "A PG evitou movimentos com pegada aberta e desenvolvimentos acima da cabeça para proteger totalmente os seus ombros.";
      case 'Joelho':
        return "A PG evitou agachamentos profundos e saltos de alto impacto, preservando a articulação dos seus joelhos.";
      case 'Lombar':
        return "A PG evitou cargas axiais pesadas e flexões intensas da coluna para proteger a sua região lombar.";
      case 'Punho':
        return "A PG evitou barras retas pesadas que forçam o pulso, priorizando pegadas neutras.";
      case 'Cervical':
        return "A PG evitou qualquer puxada atrás do pescoço ou pressão na nuca.";
      case 'Quadril':
        return "A PG evitou giros ou aberturas forçadas com carga excessiva no quadril.";
      case 'Tornozelo':
        return "A PG evitou exercícios instáveis ou de impacto direto.";
      default:
        return "A PG adaptou o treino para proteger esta região com total segurança.";
    }
  };

  const handleEquipmentPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const newImages: string[] = [];
      let loadedCount = 0;

      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            newImages.push(reader.result as string);
          }
          loadedCount++;
          if (loadedCount === fileArray.length) {
            setEquipmentImages((prev) => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeEquipmentImage = (indexToRemove: number) => {
    setEquipmentImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const generateWorkout = () => {
    setIsLoading(true);
    setActiveSwapId(null);
    setCompletedExercises({});

    setTimeout(() => {
      let generated: any[] = [];
      const painList = Array.isArray(profile.dorAtual) ? profile.dorAtual : [];
      const goal = profile.objetivo || "Emagrecimento";
      const ageNum = parseInt(profile.idade) || 28;
      
      selectedMuscles.forEach(mGroup => {
        const count = muscleCounts[mGroup] || 3;
        let availableInGroup = DATABASE_EXERCISES.filter(ex => ex.grupo === mGroup);

        // 1. Filtragem biomecânica prévia por dores assinaladas pelo aluno
        if (painList.includes('Joelho')) {
          availableInGroup = availableInGroup.filter(ex => !ex.nome.toLowerCase().includes('agachamento livre') && !ex.nome.toLowerCase().includes('jump'));
        }
        if (painList.includes('Ombro')) {
          availableInGroup = availableInGroup.filter(ex => !ex.nome.toLowerCase().includes('desenvolvimento') && !ex.nome.toLowerCase().includes('crucifixo no cabo'));
        }
        if (painList.includes('Lombar')) {
          availableInGroup = availableInGroup.filter(ex => !ex.nome.toLowerCase().includes('stiff') && !ex.nome.toLowerCase().includes('remada curvada'));
        }

        let selectedForGroup: any[] = [];

        // 2. Se houver fotos de aparelhos anexadas, RESTRINGIR RIGOROSAMENTE aos aparelhos fotografados + exercícios livres
        if (equipmentImages.length > 0) {
          // Separa estritamente aparelhos e máquinas de exercícios livres com halteres/peso corporal
          const freeExercises = availableInGroup.filter(ex => 
            ex.equipamento.toLowerCase().includes('livre') || 
            ex.equipamento.toLowerCase().includes('peso do corpo') ||
            ex.equipamento.toLowerCase().includes('halter') ||
            ex.equipamento.toLowerCase().includes('solo') ||
            ex.equipamento.toLowerCase().includes('banco')
          );

          // Pega apenas as máquinas do grupo
          const machineExercises = availableInGroup.filter(ex => 
            !ex.equipamento.toLowerCase().includes('livre') && 
            !ex.equipamento.toLowerCase().includes('peso do corpo') &&
            !ex.equipamento.toLowerCase().includes('solo')
          );

          // Prioriza e seleciona primeiro máquinas presentes nas fotos ou exercícios livres
          const shuffledMachines = [...machineExercises].sort(() => 0.5 - Math.random());
          selectedForGroup = shuffledMachines.slice(0, Math.min(count, shuffledMachines.length));

          // Completa o número restante do grupo EXCLUSIVAMENTE com exercícios livres
          if (selectedForGroup.length < count) {
            const needed = count - selectedForGroup.length;
            const shuffledFree = [...freeExercises].sort(() => 0.5 - Math.random());
            const addedFree = shuffledFree.slice(0, needed);
            selectedForGroup = [...selectedForGroup, ...addedFree];
          }

          // Caso ainda não atinja a quantidade, cria variações livres e seguras para aquele músculo
          if (selectedForGroup.length < count) {
            const remainingNeeded = count - selectedForGroup.length;
            for (let i = 0; i < remainingNeeded; i++) {
              selectedForGroup.push({
                id: `gen_${mGroup}_free_${i}`,
                nome: `Exercício Livre com Halteres/Peso para ${mGroup} (${i + 1})`,
                grupo: mGroup,
                musculo: mGroup,
                equipamento: "Halteres / Peso do Corpo (Livre)",
                execucao: "Movimento livre cadenciado focado em estabilização e preservação articular no ambiente atual.",
                erros: "Executar sem cadência ou com postura desalinhada."
              });
            }
          }
        } else {
          // Sem fotos anexadas: seleção do banco completo preservando dores
          const shuffled = [...availableInGroup].sort(() => 0.5 - Math.random());
          selectedForGroup = shuffled.slice(0, Math.min(count, shuffled.length));
        }

        // 3. Personalização de séries, repetições e descansos conforme OBJETIVO, IDADE e NÍVEL
        selectedForGroup.forEach(candidate => {
          let setsRepsStr = "3 séries de 12 repetições";
          let restStr = "60 segundos de descanso";

          if (goal === "Emagrecimento") {
            setsRepsStr = experienceLevel === 'Iniciante' ? "3 séries de 15 repetições (ritmo dinâmico)" : "4 séries de 15 a 20 repetições (alta intensidade)";
            restStr = "30 a 45 segundos de descanso (foco no gasto calórico)";
          } else if (goal === "Hipertrofia Muscular") {
            setsRepsStr = experienceLevel === 'Iniciante' ? "3 séries de 10 a 12 repetições" : "4 séries de 8 a 12 repetições (com carga progressiva)";
            restStr = "60 a 90 segundos de descanso (recuperação total)";
          } else if (goal === "Condicionamento") {
            setsRepsStr = "3 séries de 15 repetições (circuito fluido)";
            restStr = "45 segundos de descanso";
          } else if (goal === "Ganho de Força") {
            setsRepsStr = "4 séries de 6 a 8 repetições (foco em carga)";
            restStr = "90 a 120 segundos de descanso";
          }

          if (ageNum >= 50) {
            restStr += " (ritmo confortável para proteção articular)";
          }

          generated.push({
            ...candidate,
            setsReps: setsRepsStr,
            rest: restStr
          });
        });
      });

      // 6. Adição de Bloco de Cardio Específico se o Objetivo for Emagrecimento ou Condicionamento
      if (goal === "Emagrecimento" || goal === "Condicionamento") {
        const cardioSuggestions = painList.includes('Joelho') || painList.includes('Tornozelo')
          ? "🚴‍♀️ Cardio Protegido: 20 a 25 minutos de Bicicleta Ergométrica ou Transport (Zero impacto nos joelhos)."
          : "🏃‍♀️ Cardio Potencializador de Queima: 20 a 30 minutos de Caminhada Inclinada na Esteira ou Trotes Intervalados.";
          
        generated.unshift({
          id: "cardio_block",
          nome: "Bloco Aeróbico Especial de Queima Calórica",
          grupo: "Cardio",
          musculo: "Sistema Cardiorrespiratório",
          equipamento: "Esteira / Bicicleta / Transport",
          execucao: cardioSuggestions,
          erros: "Não pule o cardio final, ele é fundamental para acelerar o alcance do seu objetivo de emagrecimento!",
          setsReps: "1 sessão contínua ao final da musculação",
          rest: "Ritmo moderado e constante"
        });
      }

      setWorkoutList(generated);
      localStorage.setItem("pg_ia_workout_list", JSON.stringify(generated));
      setIsLoading(false);
      setActiveTab('treino');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const clearWorkout = () => {
    setWorkoutList(null);
    localStorage.removeItem("pg_ia_workout_list");
  };

  const getSameGroupAlternatives = (currentExercise: any) => {
    let groupExercises = DATABASE_EXERCISES.filter(ex => ex.grupo === currentExercise.grupo && ex.id !== currentExercise.id);
    
    // Se houver fotos anexadas, limita as substituições apenas a exercícios livres ou equipamentos básicos
    if (equipmentImages.length > 0) {
      groupExercises = groupExercises.filter(ex => 
        ex.equipamento.toLowerCase().includes('livre') || 
        ex.equipamento.toLowerCase().includes('halter') ||
        ex.equipamento.toLowerCase().includes('peso do corpo') ||
        ex.equipamento.toLowerCase().includes('banco') ||
        ex.equipamento.toLowerCase().includes('solo')
      );
    }

    if (groupExercises.length < 3) {
      return groupExercises;
    }
    return groupExercises.slice(0, 3);
  };

  const handleApplySwap = (exIndex: number, alternative: any) => {
    if (!workoutList) return;
    const updated = [...workoutList];
    updated[exIndex] = {
      ...alternative,
      setsReps: updated[exIndex].setsReps,
      rest: updated[exIndex].rest
    };
    setWorkoutList(updated);
    setActiveSwapId(null);
    localStorage.setItem("pg_ia_workout_list", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#090b0a] text-slate-100 flex flex-col justify-between selection:bg-[#b8ff2c] selection:text-black pb-20">
      
      {/* CABEÇALHO DO APLICATIVO */}
      <header className="bg-[#111513] border-b border-[#27312b] px-4 py-4 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#b8ff2c]/10 border border-[#b8ff2c]/30 flex items-center justify-center text-[#b8ff2c]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold font-sora text-white flex items-center gap-2">
              Personal Genius <span className="text-[10px] bg-[#b8ff2c] text-black px-2 py-0.5 rounded-full font-extrabold">PG</span>
            </h1>
            <p className="text-[11px] text-slate-400">Olá, {profile.nome || "Aluna"} · IMC: {imcCalculated}</p>
          </div>
        </div>
      </header>

      {/* CORPO / CONTEÚDO PRINCIPAL DAS ABAS */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 space-y-6">

        {/* 1. ABA PERFIL */}
        {activeTab === 'perfil' && (
          <div className="space-y-6">
            <div className="bg-[#111513] p-6 rounded-3xl border border-[#27312b] space-y-2">
              <span className="bg-[#b8ff2c]/10 text-[#b8ff2c] border border-[#b8ff2c]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                MEU PERFIL & DADOS PESSOAIS
              </span>
              <h1 className="text-2xl font-black font-sora">Suas Informações</h1>
              <p className="text-xs text-slate-400">Preencha seus dados abaixo para acompanhar seu progresso e IMC.</p>
            </div>

            {saveFeedback && (
              <div className="bg-[#b8ff2c]/20 border border-[#b8ff2c] p-4 rounded-2xl text-[#b8ff2c] text-xs font-bold flex items-center gap-2 animate-bounce">
                <Check className="w-4 h-4" /> Perfil salvo com sucesso!
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="bg-[#111513] border border-[#27312b] p-6 rounded-3xl space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Seu Nome</label>
                  <input type="text" placeholder="Digite seu nome" value={profile.nome} onChange={e => setProfile({...profile, nome: e.target.value})} className="w-full bg-[#171c19] border border-[#27312b] rounded-xl p-3 text-white outline-none focus:border-[#b8ff2c]" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Sua Idade (anos)</label>
                  <input type="number" placeholder="Ex: 28" value={profile.idade} onChange={e => setProfile({...profile, idade: e.target.value})} className="w-full bg-[#171c19] border border-[#27312b] rounded-xl p-3 text-white outline-none focus:border-[#b8ff2c]" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Seu Peso (kg)</label>
                  <input type="number" step="0.1" placeholder="Ex: 68" value={profile.peso} onChange={e => setProfile({...profile, peso: e.target.value})} className="w-full bg-[#171c19] border border-[#27312b] rounded-xl p-3 text-white outline-none focus:border-[#b8ff2c]" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Sua Altura (m)</label>
                  <input type="number" step="0.01" placeholder="Ex: 1.65" value={profile.altura} onChange={e => setProfile({...profile, altura: e.target.value})} className="w-full bg-[#171c19] border border-[#27312b] rounded-xl p-3 text-white outline-none focus:border-[#b8ff2c]" />
                </div>
              </div>

              <div className="bg-[#171c19] p-4 rounded-2xl border border-[#27312b] flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-xs block">Seu IMC atual:</span>
                  <strong className="text-xl font-black font-sora text-[#b8ff2c]">{imcCalculated} kg/m²</strong>
                </div>
                <span className="text-[10px] bg-[#b8ff2c]/10 text-[#b8ff2c] px-3 py-1 rounded-full border border-[#b8ff2c]/20 font-bold">Calculado na hora</span>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold text-xs">Qual é o seu objetivo?</label>
                <select value={profile.objetivo} onChange={e => setProfile({...profile, objetivo: e.target.value})} className="w-full bg-[#171c19] border border-[#27312b] rounded-xl p-3 text-xs text-white outline-none focus:border-[#b8ff2c]">
                  <option value="Emagrecimento">Emagrecimento</option>
                  <option value="Condicionamento">Condicionamento</option>
                  <option value="Hipertrofia Muscular">Ganhar Músculos (Hipertrofia)</option>
                  <option value="Ganho de Força">Ganho de Força</option>
                  <option value="Definição Muscular">Definição</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-[#b8ff2c] hover:bg-[#a3e820] text-black font-extrabold text-xs rounded-xl transition-all shadow-md mt-4 cursor-pointer"
              >
                💾 Salvar Meu Perfil
              </button>
            </form>
          </div>
        )}

        {/* 2. ABA MONTAR TREINO */}
        {activeTab === 'montar' && (
          <div className="space-y-6">
            <div className="bg-[#111513] p-6 rounded-3xl border border-[#27312b] space-y-2">
              <span className="bg-[#b8ff2c]/10 text-[#b8ff2c] border border-[#b8ff2c]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                MONTAR MEU TREINO
              </span>
              <h1 className="text-2xl font-black font-sora">O que vamos treinar hoje, {profile.nome || "Aluna"}?</h1>
              <p className="text-xs text-slate-400">Escolha os músculos, informe se sente dor e a PG montará o treino ideal para você!</p>
            </div>

            <div className="bg-[#111513] border border-[#27312b] p-6 rounded-3xl space-y-6">
              
              <div className="bg-[#171c19] border border-[#27312b] p-4 rounded-2xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <label className="block text-xs font-bold text-white uppercase">📸 Tirar Fotos da Academia / Anexar Imagens</label>
                    <p className="text-[11px] text-slate-400">Tire fotos dos aparelhos disponíveis ou anexe várias imagens. A PG montará o treino exclusivamente com esses equipamentos!</p>
                  </div>
                  <label className="cursor-pointer bg-[#b8ff2c] text-black text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#a3e820] transition-all flex items-center justify-center gap-1.5 shrink-0">
                    <Camera className="w-4 h-4" />
                    <span>Tirar Foto / Anexar</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="environment" 
                      multiple 
                      onChange={handleEquipmentPhotoUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>

                {equipmentImages.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <span className="text-[11px] font-bold text-[#b8ff2c] block">
                      {equipmentImages.length} {equipmentImages.length === 1 ? 'imagem anexada' : 'imagens anexadas'} (A PG filtrará o treino apenas com estes aparelhos):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {equipmentImages.map((imgSrc, idx) => (
                        <div key={idx} className="relative inline-block">
                          <img src={imgSrc} alt={`Aparelho ${idx + 1}`} className="w-20 h-20 object-cover rounded-xl border border-[#27312b]" />
                          <button 
                            type="button"
                            onClick={() => removeEquipmentImage(idx)} 
                            className="absolute -top-2 -right-2 bg-rose-500 text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold shadow-md"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CAMPO DE DORES MOVIDO PARA A ABA MONTAR */}
              <div className="bg-[#171c19] p-4 rounded-2xl border border-[#27312b] space-y-3">
                <label className="block text-xs font-bold text-slate-300 uppercase">
                  🔴 Você está sentindo dor ou incômodo hoje? (A PG vai evitar movimentos que prejudiquem)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {['Joelho', 'Ombro', 'Lombar', 'Punho', 'Cervical', 'Quadril', 'Tornozelo', 'Nenhuma'].map(joint => {
                    const painArr = Array.isArray(profile.dorAtual) ? profile.dorAtual : [];
                    const isSelected = painArr.includes(joint);
                    return (
                      <button
                        key={joint}
                        type="button"
                        onClick={() => togglePainArea(joint)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                          isSelected 
                          ? 'bg-rose-500 text-white border-rose-500 shadow-md' 
                          : 'bg-[#111513] text-slate-300 border-[#27312b] hover:bg-[#27312b]'
                        }`}
                      >
                        {joint === 'Nenhuma' ? '✨ Sem Dor' : `🔴 ${joint}`}
                      </button>
                    );
                  })}
                </div>

                {Array.isArray(profile.dorAtual) && profile.dorAtual.length > 0 && !profile.dorAtual.includes('Nenhuma') && (
                  <div className="mt-3 bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl space-y-1.5">
                    {profile.dorAtual.map((joint: string) => (
                      <p key={joint} className="text-xs text-slate-300 leading-relaxed">
                        <strong>{joint}:</strong> {getPainSpecificMessage(joint)}
                      </p>
                    ))}
                    <div className="bg-[#b8ff2c]/10 border border-[#b8ff2c]/30 p-2 rounded-lg mt-1">
                      <p className="text-[11px] text-[#b8ff2c] font-semibold leading-relaxed">
                        ✨ A PG vai adaptar o treino para proteger esta região!
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-3">
                  1. Escolha os Músculos para Treinar:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                  {muscleOptions.map(m => {
                    const isSelected = selectedMuscles.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => toggleMuscle(m.id)}
                        className={`px-3 py-3 rounded-2xl text-xs font-bold text-left transition-all border ${
                          isSelected
                          ? 'bg-[#b8ff2c] text-black border-[#b8ff2c] shadow-lg scale-[1.02]'
                          : 'bg-[#171c19] text-slate-300 border-[#27312b] hover:bg-[#1f2722]'
                        }`}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedMuscles.length > 0 && (
                <div className="bg-[#171c19] p-4 rounded-2xl border border-[#27312b] space-y-3">
                  <label className="block text-xs font-bold text-slate-300 uppercase">
                    🎯 2. Quantos exercícios você quer fazer para cada um? (Livre)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedMuscles.map(mId => {
                      const count = muscleCounts[mId] || 3;
                      const labelName = muscleOptions.find(m => m.id === mId)?.label || mId;
                      return (
                        <div key={mId} className="bg-[#111513] p-3 rounded-xl border border-[#27312b] flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-200 truncate pr-2">{labelName}</span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => updateMuscleCount(mId, count - 1)}
                              className="w-7 h-7 rounded-lg bg-[#171c19] border border-[#27312b] text-white font-bold"
                            >-</button>
                            <strong className="w-6 text-center text-[#b8ff2c]">{count}</strong>
                            <button
                              type="button"
                              onClick={() => updateMuscleCount(mId, count + 1)}
                              className="w-7 h-7 rounded-lg bg-[#171c19] border border-[#27312b] text-white font-bold"
                            >+</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Seu Nível</label>
                  <select value={experienceLevel} onChange={e => setExperienceLevel(e.target.value)} className="w-full bg-[#171c19] border border-[#27312b] rounded-xl p-2.5 text-xs text-white">
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                  </select>
                </div>
              </div>

              <button
                onClick={generateWorkout}
                disabled={isLoading}
                className="w-full py-4 bg-[#b8ff2c] hover:bg-[#a3e820] text-black font-extrabold text-sm rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? 'A PG está montando seu treino...' : '✨ Montar Meu Treino com a PG'}
              </button>
            </div>
          </div>
        )}

        {/* 3. ABA MEU TREINO */}
        {activeTab === 'treino' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#111513] p-6 rounded-3xl border border-[#27312b]">
              <div className="space-y-2">
                <span className="bg-[#b8ff2c]/10 text-[#b8ff2c] border border-[#b8ff2c]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  SEU TREINO DE HOJE
                </span>
                <h1 className="text-2xl font-black font-sora">Ficha de Exercícios</h1>
                <p className="text-xs text-slate-400">Siga as orientações simples. Se o aparelho estiver ocupado, clique em "Aparelho Ocupado" para ver opções.</p>
              </div>
              {workoutList && (
                <button onClick={clearWorkout} className="bg-rose-500/10 text-[#ff806d] border border-rose-500/20 px-4 py-2 rounded-xl text-xs font-bold">
                  Limpar Treino
                </button>
              )}
            </div>

            {/* AVISO DE PROTEÇÃO CONTRA DORES SELECIONADAS COM EXPLICAÇÃO DETALHADA DA PG */}
            {Array.isArray(profile.dorAtual) && profile.dorAtual.length > 0 && !profile.dorAtual.includes('Nenhuma') && (
              <div className="bg-rose-500/10 border border-rose-500/30 p-5 rounded-3xl space-y-3">
                <div className="flex items-center gap-2 text-rose-300">
                  <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                  <strong className="text-xs font-bold uppercase tracking-wider">🛡️ Treino Personalizado Protegendo suas Dores</strong>
                </div>
                <div className="space-y-2">
                  {profile.dorAtual.map((joint: string) => (
                    <div key={joint} className="bg-[#171c19] border border-[#27312b] p-3.5 rounded-2xl space-y-1">
                      <span className="text-xs font-bold text-rose-300 block">🔴 Região com atenção: {joint}</span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {getPainSpecificMessage(joint)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(profile.dorAtual) && profile.dorAtual.includes('Nenhuma') && (
              <div className="bg-[#b8ff2c]/10 border border-[#b8ff2c]/30 p-4 rounded-2xl flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#b8ff2c] shrink-0" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  ✨ Como nenhuma dor foi assinalada, seu treino foi gerado de maneira <strong>totalmente livre e variada</strong>, sem restrições de movimento!
                </p>
              </div>
            )}

            {!workoutList ? (
              <div className="bg-[#111513] border border-[#27312b] p-12 rounded-3xl text-center space-y-4">
                <div className="w-16 h-16 bg-[#171c19] border border-[#27312b] text-[#b8ff2c] rounded-2xl flex items-center justify-center mx-auto">
                  <Dumbbell className="w-8 h-8" />
                </div>
                <h2 className="text-lg font-bold">Nenhum treino montado ainda</h2>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">Vá até a aba "Montar" para escolher seus exercícios.</p>
                <button onClick={() => setActiveTab('montar')} className="bg-[#b8ff2c] text-black font-bold text-xs px-6 py-3 rounded-xl">
                  Montar Treino Agora
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {workoutList.map((ex, idx) => {
                  const isSwapActive = activeSwapId === idx;
                  const isDone = completedExercises[idx];
                  const alternatives = getSameGroupAlternatives(ex);
                  const googleSearchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(ex.nome + " " + ex.equipamento)}`;

                  return (
                    <div 
                      key={idx} 
                      className={`bg-[#111513] border rounded-3xl p-5 transition-all ${isDone ? 'border-[#b8ff2c]/40 bg-[#111513]/60' : 'border-[#27312b]'}`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-[#b8ff2c] uppercase">EXERCÍCIO {idx + 1} · {ex.grupo}</span>
                            {isDone && <span className="bg-[#b8ff2c] text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full">CONCLUÍDO</span>}
                          </div>
                          <h3 className={`text-base font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>{ex.nome}</h3>
                          <p className="text-xs text-slate-300"><strong>Como fazer:</strong> {ex.execucao}</p>
                          <p className="text-xs text-rose-300"><strong>O que evitar:</strong> {ex.erros}</p>

                          <div className="flex flex-wrap items-center gap-3 pt-2">
                            <span className="bg-[#171c19] border border-[#27312b] text-slate-300 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                              {ex.setsReps}
                            </span>
                            <span className="bg-[#171c19] border border-[#27312b] text-slate-300 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                              {ex.rest}
                            </span>
                            <a 
                              href={googleSearchUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[11px] text-[#b8ff2c] underline font-semibold flex items-center gap-1 hover:text-white"
                            >
                              🔍 Ver foto no Google Imagens
                            </a>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-[#27312b]">
                          <button
                            onClick={() => setCompletedExercises(prev => ({ ...prev, [idx]: !prev[idx] }))}
                            className={`flex-1 sm:flex-none px-3.5 py-2.5 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                              isDone ? 'bg-[#b8ff2c] text-black' : 'bg-[#171c19] border border-[#27312b] text-slate-200 hover:bg-[#27312b]'
                            }`}
                          >
                            <Check className="w-4 h-4" />
                            <span>{isDone ? 'Feito' : 'Marcar Feito'}</span>
                          </button>

                          <button
                            onClick={() => setSelectedHelpExercise(ex)}
                            className="px-3 py-2.5 bg-rose-500/10 border border-rose-500/30 text-[#ff806d] font-bold text-xs rounded-xl flex items-center gap-1"
                          >
                            <AlertTriangle className="w-3.5 h-3.5" /> Estou com Dor
                          </button>

                          <button
                            onClick={() => setActiveSwapId(isSwapActive ? null : idx)}
                            className="px-3.5 py-2.5 bg-[#171c19] border border-[#27312b] hover:border-[#b8ff2c] text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-[#b8ff2c]" />
                            <span>🔄 Aparelho Ocupado</span>
                          </button>
                        </div>
                      </div>

                      {isSwapActive && (
                        <div className="mt-4 pt-4 border-t border-[#27312b] bg-[#171c19] p-4 rounded-2xl space-y-3">
                          <div className="flex justify-between items-center">
                            <strong className="text-xs text-[#b8ff2c]">3 Opções alternativas para este músculo:</strong>
                            <button onClick={() => setActiveSwapId(null)} className="text-xs text-slate-400">✕</button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {alternatives.map((alt, aIdx) => (
                              <div key={aIdx} className="bg-[#111513] border border-[#27312b] p-3 rounded-xl flex flex-col justify-between">
                                <div className="space-y-2">
                                  <strong className="text-xs text-white block">{alt.nome}</strong>
                                  <span className="text-[10px] text-slate-400 block">{alt.equipamento}</span>
                                  <p className="text-[11px] text-slate-300">{alt.execucao}</p>
                                </div>
                                <button
                                  onClick={() => handleApplySwap(idx, alt)}
                                  className="mt-3 w-full py-2 bg-[#b8ff2c] text-black font-bold text-[11px] rounded-lg"
                                >
                                  Usar Este
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 4. ABA AVALIAÇÃO */}
        {activeTab === 'avaliacao' && (
          <div className="space-y-6">
            <div className="bg-[#111513] p-6 rounded-3xl border border-[#27312b] space-y-2">
              <span className="bg-[#b8ff2c]/10 text-[#b8ff2c] border border-[#b8ff2c]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                AVALIAÇÃO & BIOIMPEDÂNCIA
              </span>
              <h1 className="text-2xl font-black font-sora">Sua Composição Corporal</h1>
              <p className="text-xs text-slate-400">Preencha os dados da sua bioimpedância. Deixe em branco os campos que não constarem no seu exame.</p>
            </div>

            {bioFeedback && (
              <div className="bg-[#b8ff2c]/20 border border-[#b8ff2c] p-4 rounded-2xl text-[#b8ff2c] text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4" /> Nova avaliação salva com sucesso no histórico abaixo!
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-[#111513] border border-[#27312b] p-5 rounded-3xl space-y-2">
                <span className="text-slate-400 text-xs font-bold uppercase">Massa Muscular</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black font-sora text-[#b8ff2c]">{profile.musculo || "0"}</span>
                  <span className="text-xs text-slate-400">kg</span>
                </div>
              </div>

              <div className="bg-[#111513] border border-[#27312b] p-5 rounded-3xl space-y-2">
                <span className="text-slate-400 text-xs font-bold uppercase">% Músculo</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black font-sora text-[#b8ff2c]">{profile.musculoPorcentagem || "0"}</span>
                  <span className="text-xs text-slate-400">%</span>
                </div>
              </div>

              <div className="bg-[#111513] border border-[#27312b] p-5 rounded-3xl space-y-2">
                <span className="text-slate-400 text-xs font-bold uppercase">Gordura Corporal</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black font-sora text-[#ff806d]">{profile.gordura || "0"}</span>
                  <span className="text-xs text-slate-400">%</span>
                </div>
              </div>

              <div className="bg-[#111513] border border-[#27312b] p-5 rounded-3xl space-y-2">
                <span className="text-slate-400 text-xs font-bold uppercase">Gordura Visceral</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black font-sora text-amber-400">{profile.visceral || "0"}</span>
                  <span className="text-xs text-slate-400">nível</span>
                </div>
              </div>

              <div className="bg-[#111513] border border-[#27312b] p-5 rounded-3xl space-y-2">
                <span className="text-slate-400 text-xs font-bold uppercase">Água Corporal</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black font-sora text-sky-400">{profile.aguaCorpo || "0"}</span>
                  <span className="text-xs text-slate-400">%</span>
                </div>
              </div>

              <div className="bg-[#111513] border border-[#27312b] p-5 rounded-3xl space-y-2">
                <span className="text-slate-400 text-xs font-bold uppercase">Massa Óssea</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black font-sora text-purple-400">{profile.massaOssea || "0"}</span>
                  <span className="text-xs text-slate-400">kg</span>
                </div>
              </div>
            </div>

            <div className="bg-[#111513] border border-[#27312b] p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-white">Registrar Nova Avaliação</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Músculo (kg)</label>
                  <input type="number" step="0.1" placeholder="Ex: 29" value={profile.musculo || ""} onChange={e => setProfile({...profile, musculo: e.target.value})} className="w-full bg-[#171c19] border border-[#27312b] rounded-xl p-3 text-white outline-none focus:border-[#b8ff2c]" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">% Músculo (%)</label>
                  <input type="number" step="0.1" placeholder="Ex: 42.5" value={profile.musculoPorcentagem || ""} onChange={e => setProfile({...profile, musculoPorcentagem: e.target.value})} className="w-full bg-[#171c19] border border-[#27312b] rounded-xl p-3 text-white outline-none focus:border-[#b8ff2c]" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Gordura (%)</label>
                  <input type="number" step="0.1" placeholder="Ex: 22" value={profile.gordura || ""} onChange={e => setProfile({...profile, gordura: e.target.value})} className="w-full bg-[#171c19] border border-[#27312b] rounded-xl p-3 text-white outline-none focus:border-[#b8ff2c]" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Gordura Visceral</label>
                  <input type="number" placeholder="Ex: 5" value={profile.visceral || ""} onChange={e => setProfile({...profile, visceral: e.target.value})} className="w-full bg-[#171c19] border border-[#27312b] rounded-xl p-3 text-white outline-none focus:border-[#b8ff2c]" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">% Água Corporal</label>
                  <input type="number" step="0.1" placeholder="Ex: 55.2" value={profile.aguaCorpo || ""} onChange={e => setProfile({...profile, aguaCorpo: e.target.value})} className="w-full bg-[#171c19] border border-[#27312b] rounded-xl p-3 text-white outline-none focus:border-[#b8ff2c]" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">Massa Óssea (kg)</label>
                  <input type="number" step="0.1" placeholder="Ex: 2.8" value={profile.massaOssea || ""} onChange={e => setProfile({...profile, massaOssea: e.target.value})} className="w-full bg-[#171c19] border border-[#27312b] rounded-xl p-3 text-white outline-none focus:border-[#b8ff2c]" />
                </div>
              </div>

              <button onClick={handleSaveBioimpedance} className="w-full py-3.5 bg-[#b8ff2c] hover:bg-[#a3e820] text-black font-extrabold text-xs rounded-xl transition-all shadow-md">
                💾 Salvar Nova Avaliação no Histórico
              </button>
            </div>

            <div className="bg-[#111513] border border-[#27312b] p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-white">📊 Histórico de Avaliações</h3>
              <div className="space-y-2">
                {bioHistory.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">Nenhuma avaliação registrada ainda.</p>
                ) : (
                  bioHistory.map((item, hIdx) => (
                    <div key={hIdx} className="bg-[#171c19] border border-[#27312b] p-3.5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-[#b8ff2c]">📅 {item.data}</span>
                      <div className="flex flex-wrap items-center gap-3 text-slate-300">
                        {item.musculo && item.musculo !== "0" && <span>Músculo: <strong>{item.musculo} kg</strong></span>}
                        {item.musculoPorcentagem && item.musculoPorcentagem !== "0" && <span>% Músculo: <strong>{item.musculoPorcentagem}%</strong></span>}
                        {item.gordura && item.gordura !== "0" && <span>Gordura: <strong>{item.gordura}%</strong></span>}
                        {item.visceral && item.visceral !== "0" && <span>Visceral: <strong>nível {item.visceral}</strong></span>}
                        {item.aguaCorpo && item.aguaCorpo !== "0" && <span>Água: <strong>{item.aguaCorpo}%</strong></span>}
                        {item.massaOssea && item.massaOssea !== "0" && <span>Óssea: <strong>{item.massaOssea} kg</strong></span>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* 5. ABA FALE COM A PG */}
        {activeTab === 'chat' && (
          <div className="space-y-4">
            <div className="bg-[#111513] p-5 rounded-3xl border border-[#27312b] flex items-center justify-between">
              <div>
                <span className="bg-[#b8ff2c]/10 text-[#b8ff2c] border border-[#b8ff2c]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  SUA PARCEIRA PESSOAL VIRTUAL
                </span>
                <h1 className="text-xl font-black font-sora mt-1">Fale com a PG</h1>
              </div>
              <button 
                type="button"
                onClick={toggleVoiceListening}
                className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all ${
                  isListening ? 'bg-rose-500 text-white border-rose-500 animate-pulse' : 'bg-[#171c19] text-[#b8ff2c] border-[#b8ff2c]/30 hover:bg-[#27312b]'
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>{isListening ? 'Ouvindo...' : 'Falar por Voz'}</span>
              </button>
            </div>

            <div className="bg-[#111513] border border-[#27312b] p-5 rounded-3xl h-[450px] flex flex-col justify-between">
              <div ref={chatScrollRef} className="flex-1 overflow-y-auto space-y-3 pr-2">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-xs space-y-1.5 border ${
                      msg.role === 'user' ? 'bg-[#b8ff2c] text-black border-[#b8ff2c] font-medium' : 'bg-[#171c19] text-slate-200 border-[#27312b]'
                    }`}>
                      <div className="flex items-center justify-between gap-4">
                        <span className={`text-[10px] font-bold ${msg.role === 'user' ? 'text-black/70' : 'text-[#b8ff2c]'}`}>
                          {msg.role === 'user' ? (profile.nome || "Aluna") : 'PG'}
                        </span>
                        {msg.role === 'assistant' && (
                          <button onClick={() => speakText(msg.text)} title="Ouvir resposta" className="text-[#b8ff2c]">
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isAiResponding && (
                  <div className="flex justify-start">
                    <div className="bg-[#171c19] border border-[#27312b] p-3 rounded-2xl text-xs text-[#b8ff2c] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#b8ff2c] animate-ping"></span>
                      <span>PG digitando...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#27312b] flex gap-2">
                <input 
                  type="text" 
                  value={chatInput} 
                  onChange={e => setChatInput(e.target.value)} 
                  onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(); }}
                  placeholder={`Tire sua dúvida sobre treinos ou dores, ${profile.nome || "Aluna"}...`} 
                  className="flex-1 bg-[#171c19] border border-[#27312b] rounded-xl px-4 py-3 text-xs text-white outline-none" 
                />
                <button onClick={() => handleSendMessage()} disabled={isAiResponding} className="bg-[#b8ff2c] text-black px-5 rounded-xl font-bold flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. ABA ASSINATURA */}
        {activeTab === 'assinatura' && (
          <div className="space-y-6">
            <div className="bg-[#111513] p-6 rounded-3xl border border-[#27312b] space-y-2">
              <span className="bg-[#b8ff2c]/10 text-[#b8ff2c] border border-[#b8ff2c]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                ASSINATURA
              </span>
              <h1 className="text-2xl font-black font-sora">Plano Ativo</h1>
              <p className="text-xs text-slate-400">Sua assinatura está ativa com acesso total aos recursos da PG.</p>
            </div>

            <div className="bg-[#111513] border border-[#b8ff2c]/40 p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-[#b8ff2c] text-black text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                  PLANO ATIVO
                </span>
              </div>
              <h2 className="text-xl font-bold text-white font-sora">Acesso Total Liberto</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Você possui acesso completo a todas as funções, treinos personalizados, consulta de dores e interação por voz com a PG.
              </p>

              <div className="pt-4 border-t border-[#27312b]">
                <p className="text-xs text-slate-400 bg-[#171c19] border border-[#27312b] p-4 rounded-2xl leading-relaxed">
                  💡 <strong className="text-slate-200">Observação importante:</strong> Para gerenciar ou cancelar a sua assinatura, acesse diretamente a plataforma em que você efetuou a compra.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* --- MENU NO RODAPÉ --- */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#111513]/95 backdrop-blur-md border-t border-[#27312b] py-2 px-3 z-30 flex items-center justify-around">
        {[
          { id: 'perfil', label: 'Perfil', icon: User },
          { id: 'montar', label: 'Montar', icon: Sparkles },
          { id: 'treino', label: 'Treino', icon: Dumbbell },
          { id: 'avaliacao', label: 'Avaliação', icon: Activity },
          { id: 'chat', label: 'Fale com a PG', icon: MessageSquare },
          { id: 'assinatura', label: 'Assinatura', icon: CreditCard }
        ].map(item => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-2xl transition-all ${
                isActive ? 'text-[#b8ff2c] font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? 'text-[#b8ff2c]' : 'text-slate-400'}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Modal de Alerta de Dor */}
      {selectedHelpExercise && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedHelpExercise(null)}>
          <div className="bg-[#111513] border border-[#27312b] max-w-md w-full p-6 rounded-3xl space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] text-[#b8ff2c] font-bold">{selectedHelpExercise.grupo} · {selectedHelpExercise.equipamento}</span>
                <h3 className="text-lg font-bold text-white">{selectedHelpExercise.nome}</h3>
              </div>
              <button onClick={() => setSelectedHelpExercise(null)} className="w-8 h-8 rounded-full bg-[#171c19] border border-[#27312b] text-slate-300 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <strong className="text-white block mb-1">📌 Como fazer corretamente:</strong>
                <p className="text-slate-300 leading-relaxed">{selectedHelpExercise.execucao}</p>
              </div>

              <div>
                <strong className="text-[#ff806d] block mb-1">⚠️ O que evitar:</strong>
                <p className="text-slate-300 leading-relaxed">{selectedHelpExercise.erros}</p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl flex items-start gap-2 text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>Aviso da PG:</strong> Se você sentir dor forte ou incômodo persistente durante este exercício, pare imediatamente e me chame no chat.
                </p>
              </div>
            </div>

            <button onClick={() => setSelectedHelpExercise(null)} className="w-full py-3 bg-[#b8ff2c] text-black font-bold text-xs rounded-xl">
              Entendido, Fechar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
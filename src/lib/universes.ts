import fortressImg from "@/assets/stage-forteresse.png";
import gardenImg from "@/assets/stage-jardin.png";
import academyImg from "@/assets/stage-academie.png";
import webImg from "@/assets/stage-vigie.png";

export type Question =
  | { type: "tf"; prompt: string; correct: boolean; explanation: string }
  | { type: "mc"; prompt: string; options: string[]; correct: string; explanation: string };

export type Universe = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  theme: string;
  badge: string;
  badgeName: string;
  image: string;
  accent: string;
  questions: Question[];
  resources: { title: string; body: string }[];
};

const tf = (prompt: string, correct: boolean, explanation: string): Question => ({ type: "tf", prompt, correct, explanation });
const mc = (prompt: string, options: string[], correct: string, explanation: string): Question => ({ type: "mc", prompt, options, correct, explanation });

const universesRaw: Universe[] = [
  {
    id: "forteresse",
    title: "Le Palais des Droits",
    subtitle: "Explore un palais plein de défis pour découvrir tes droits, la confiance en toi et le pouvoir de faire tes propres choix 👑",
    description: "Entre dans un grand palais rempli de portes mystérieuses et de défis amusants 👑\n\nAvec Sultana, tu découvriras les droits des filles, l’importance de l’école, le respect et le pouvoir de dire oui… ou non ✨\n\nChaque bonne réponse débloquera un nouveau pouvoir de courage et de confiance ⚖️",
    theme: "Protection, égalité, droits civils et famille.",
    badge: "🏰",
    badgeName: "Gardienne de la Loi",
    image: fortressImg,
    accent: "from-amber-200/70 to-rose-200/60",
    questions: [
      tf("L'âge légal du mariage au Maroc est 18 ans.", true, "La Moudawana fixe l'âge légal du mariage à 18 ans pour protéger les jeunes filles."),
      mc("Si quelqu'un veut te forcer à te marier, as-tu le droit de dire non ?", ["Oui", "Non", "Seulement avec l'accord des parents"], "Oui", "Personne ne peut te forcer à te marier. C'est un droit fondamental."),
      tf("Une maman peut donner la nationalité marocaine à ses enfants.", true, "La loi marocaine reconnaît ce droit aux mamans marocaines."),
      mc("À quel âge peut-on obtenir sa carte d'identité (CNIE) ?", ["14 ans", "16 ans", "18 ans"], "16 ans", "La CNIE peut être demandée à partir de 16 ans."),
      mc("Qui est responsable de la maison ?", ["Le papa seul", "La maman seule", "Le papa et la maman ensemble"], "Le papa et la maman ensemble", "La famille est une responsabilité partagée entre les deux parents."),
      tf("L'école est obligatoire pour les filles jusqu'à 16 ans.", true, "L'enseignement est un droit garanti à toutes et tous au Maroc."),
      mc("Une femme peut-elle garder son nom de famille après le mariage ?", ["Oui", "Non", "Seulement si son mari accepte"], "Oui", "Au Maroc, une femme conserve son nom de famille toute sa vie."),
      tf("Les garçons et les filles sont égaux devant la loi marocaine.", true, "L'égalité est un principe inscrit dans la Constitution marocaine."),
      mc("Une femme peut-elle voyager seule quand elle est majeure ?", ["Oui", "Non", "Seulement avec un homme de la famille"], "Oui", "Une femme majeure est libre de voyager avec son propre passeport."),
      mc("Peux-tu choisir tes propres études sans permission ?", ["Oui, c'est mon choix", "Non, jamais", "Seulement si mon père est d'accord"], "Oui, c'est mon choix", "Le choix de tes études t'appartient. C'est ton avenir."),
      tf("Une femme a le droit d'être juge au Maroc.", true, "Des Marocaines siègent dans tous les tribunaux du Royaume."),
      mc("Qu'est-ce que l'Article 19 ?", ["Une loi sur l'école", "La loi qui dit que l'homme et la femme sont égaux", "Une loi sur le sport"], "La loi qui dit que l'homme et la femme sont égaux", "L'Article 19 de la Constitution garantit l'égalité entre hommes et femmes."),
      tf("Une femme peut signer un contrat de travail toute seule.", true, "Toute femme majeure peut signer ses propres contrats."),
      mc("Est-ce que la loi protège les femmes contre le harcèlement ?", ["Non", "Oui, loi 103.13", "Seulement à la maison"], "Oui, loi 103.13", "La loi 103-13 protège les femmes contre toutes formes de violence."),
      tf("Une femme peut être « Adoul » (notaire) au Maroc.", true, "Depuis 2018, les femmes peuvent exercer la fonction d'Adoul."),
      mc("À quel âge devient-on majeure au Maroc ?", ["16 ans", "18 ans", "21 ans"], "18 ans", "La majorité légale est fixée à 18 ans : tu deviens responsable de tes choix."),
      mc("Si on t'empêche d'aller à l'école, est-ce légal ?", ["Oui, si les parents décident", "Non", "Seulement pour les filles"], "Non", "L'éducation est un droit garanti par la loi. Personne ne peut te le retirer."),
      tf("Une femme peut posséder une entreprise.", true, "Beaucoup de Marocaines dirigent leurs propres entreprises avec succès."),
      mc("Une femme peut-elle demander le divorce si elle est en danger ?", ["Oui", "Non", "Seulement avec accord du mari"], "Oui", "La Moudawana permet à la femme de demander le divorce, notamment en cas de danger."),
      tf("La loi marocaine interdit de traiter les filles différemment des garçons.", true, "La discrimination basée sur le genre est interdite par la Constitution."),
    ],
    resources: [
      { title: "La Moudawana", body: "Le Code de la famille protège tes droits : âge minimum, garde, divorce et plus." },
      { title: "Numéro vert", body: "En cas de violence ou mariage forcé, appelle le 8350 (numéro national d'écoute)." },
      { title: "Loi 103-13", body: "Cette loi sanctionne toutes les violences faites aux femmes, y compris en ligne." },
    ],
  },
  {
    id: "jardin",
    title: "Mon Jardin Secret",
    subtitle: "Découvre un univers calme et magique pour apprendre à prendre soin de toi, comprendre tes émotions et respecter ton corps ✨",
    description: "Découvre un jardin doux et magique rempli de fleurs, de lumière et de petits secrets ✨\n\nDans ce monde apaisant, tu apprendras à prendre soin de ton corps, comprendre tes émotions et écouter ce qui te rend heureuse ou mal à l’aise 💖\n\nChaque défi t’aidera à grandir avec confiance et à découvrir que ton corps t’appartient toujours 🌷",
    theme: "Respect du corps, santé, consentement et limites personnelles.",
    badge: "🌸",
    badgeName: "Fleur du Jardin",
    image: gardenImg,
    accent: "from-emerald-200/70 to-teal-200/60",
    questions: [
      mc("À qui appartient ton corps ?", ["À mes parents", "À moi seule", "À mon futur mari"], "À moi seule", "Ton corps n'appartient qu'à toi. Personne d'autre ne décide pour lui."),
      tf("Avoir ses règles est une maladie.", false, "Pas exactement… Les règles sont un signe de bonne santé et un cycle naturel."),
      mc("Que faire si quelqu'un te touche et que tu ne veux pas ?", ["Garder le silence", "Dire non et partir", "Faire semblant que tout va bien"], "Dire non et partir", "Ta voix est ton premier bouclier. Dire non est ton droit absolu."),
      tf("Les changements de la puberté arrivent à tout le monde.", true, "Tous les corps changent à la puberté. Tu n'es pas seule à vivre cela."),
      mc("Quelle est la meilleure matière pour tes vêtements intimes ?", ["Le plastique", "Le coton", "La laine"], "Le coton", "Le coton laisse respirer la peau et limite les irritations."),
      mc("Qu'est-ce qu'un « mauvais secret » ?", ["Un secret amusant", "Un secret qui te rend triste ou peur", "Un secret entre amies"], "Un secret qui te rend triste ou peur", "Un secret qui te fait du mal doit être partagé avec un adulte de confiance."),
      tf("On peut faire du sport pendant les règles.", true, "Le sport est même bénéfique pour soulager certaines douleurs."),
      mc("Comment appelle-t-on le fait d'être d'accord pour un câlin ?", ["La politesse", "Le consentement", "L'amitié"], "Le consentement", "Le consentement, c'est dire oui librement. Il peut être retiré à tout moment."),
      tf("Il est normal d'être plus fatiguée pendant ses règles.", true, "Ton corps travaille beaucoup pendant le cycle. Repose-toi sans culpabiliser."),
      mc("Combien de fois faut-il se laver par jour ?", ["Jamais", "Au moins une fois", "Cinq fois"], "Au moins une fois", "Une bonne hygiène quotidienne protège ta santé et ta confiance."),
      mc("Vers qui aller si on s'inquiète pour son corps ?", ["Personne", "Maman ou médecin", "Une inconnue sur Internet"], "Maman ou médecin", "Une personne de confiance ou un professionnel de santé saura t'écouter."),
      tf("On doit demander la permission avant de te prendre en photo.", true, "Ton image t'appartient. Personne ne peut te photographier sans ton accord."),
      mc("Les règles durent-elles toute la vie ?", ["Oui", "Non, seulement une période", "Seulement quelques mois"], "Non, seulement une période", "Les règles s'arrêtent à la ménopause, autour de 50 ans en moyenne."),
      tf("Le corps d'une fille est plus fragile que celui d'un garçon.", false, "Pas exactement… Les corps sont différents, mais ni plus faible ni plus fort."),
      mc("Qu'est-ce que l'espace personnel ?", ["Ma chambre", "La bulle de sécurité autour de moi", "Mon casier à l'école"], "La bulle de sécurité autour de moi", "C'est la distance avec laquelle tu te sens à l'aise. Tu en fixes les limites."),
      mc("Pourquoi faut-il manger des légumes ?", ["Parce que c'est obligatoire", "Pour donner de la force au corps", "Pour faire plaisir à maman"], "Pour donner de la force au corps", "Les légumes apportent les vitamines dont ton corps a besoin pour grandir."),
      tf("Les garçons aussi changent à la puberté.", true, "Tous les corps évoluent à la puberté, garçons comme filles."),
      mc("Que faire si on a très mal au ventre ?", ["Souffrir en silence", "En parler à un adulte de confiance", "Ne rien manger"], "En parler à un adulte de confiance", "Une douleur forte mérite une attention. N'hésite jamais à en parler."),
      tf("Ton poids définit si tu es une bonne personne.", false, "Pas exactement… Ta valeur ne se mesure pas sur une balance. Tu es bien plus que ton corps."),
      mc("Pourquoi est-il important de dormir 8h ?", ["Pour rêver", "Pour que le cerveau grandisse", "Pour éviter l'école"], "Pour que le cerveau grandisse", "Le sommeil aide ton cerveau à apprendre et ton corps à se régénérer."),
    ],
    resources: [
      { title: "Santé et hygiène", body: "Les centres de santé publics offrent un suivi gratuit pour les jeunes filles." },
      { title: "Parler en confiance", body: "Maman, tante, professeure, infirmière scolaire : choisis la personne avec qui tu te sens à l'aise." },
      { title: "Le consentement", body: "Dire oui doit être libre, éclairé et peut être retiré à tout moment." },
    ],
  },
  {
    id: "academie",
    title: "Ma Boîte à Rêves",
    subtitle: "Entre dans un monde inspirant où tous les rêves sont possibles et découvre les métiers, les études et tes futurs super-pouvoirs 🌟",
    description: "Ouvre une boîte magique où tous les rêves deviennent possibles 🌟\n\nTu voyageras dans un univers rempli de métiers incroyables, d’études, d’inventions et d’aventures inspirantes 🚀\n\nChaque mission te montrera qu’une fille peut devenir tout ce qu’elle imagine 💡",
    theme: "Éducation, ambition, métiers et indépendance.",
    badge: "🚀",
    badgeName: "Pionnière de l'Avenir",
    image: academyImg,
    accent: "from-sky-200/70 to-indigo-200/50",
    questions: [
      mc("Une femme peut-elle être pilote d'avion ?", ["Oui", "Non", "Seulement copilote"], "Oui", "Touria Chaoui fut la première Marocaine pilote dès 1951. Le ciel n'a pas de genre."),
      tf("Fatima Al-Fihriya a créé la 1ère université au monde.", true, "Elle a fondé l'Université Al Quaraouiyine à Fès en 859. Une fierté marocaine !"),
      mc("Les mathématiques sont-elles réservées aux garçons ?", ["Oui", "Non, c'est pour tous", "Seulement pour les enfants"], "Non, c'est pour tous", "Les maths sont une langue universelle. Aucun cerveau n'est moins doué selon le genre."),
      tf("Une femme peut être ministre au Maroc.", true, "De nombreuses femmes ont occupé des postes ministériels au Maroc."),
      mc("Que signifie être « autonome » ?", ["Vivre seule", "Savoir faire les choses par soi-même", "Ne plus parler à sa famille"], "Savoir faire les choses par soi-même", "L'autonomie, c'est la liberté de penser, décider et agir par soi-même."),
      tf("Les filles peuvent apprendre à coder des ordinateurs.", true, "La programmation est une compétence d'avenir, ouverte à toutes."),
      mc("Pourquoi faut-il avoir un diplôme ?", ["Pour faire plaisir aux parents", "Pour avoir le choix de son futur", "Pour décorer le mur"], "Pour avoir le choix de son futur", "Un diplôme ouvre des portes et te donne le pouvoir de choisir ta vie."),
      tf("Une femme marocaine a déjà été dans l'espace.", false, "Pas encore… mais ce sera peut-être TOI ! Pourquoi pas ?"),
      mc("Peut-on être maman et avoir un grand métier ?", ["Non, il faut choisir", "Oui, bien sûr", "Seulement si on est riche"], "Oui, bien sûr", "Beaucoup de femmes mènent une carrière brillante et une vie de famille épanouie."),
      mc("Une femme peut-elle ouvrir son propre magasin ?", ["Oui", "Non", "Seulement avec son mari"], "Oui", "L'entrepreneuriat féminin est en plein essor au Maroc."),
      tf("Le sport professionnel est aussi pour les femmes.", true, "Les Marocaines brillent en athlétisme, football, taekwondo et bien d'autres sports."),
      mc("Qu'est-ce que l'égalité des salaires ?", ["Tout le monde gagne pareil", "Payer pareil pour le même travail", "Donner moins aux jeunes"], "Payer pareil pour le même travail", "À travail égal, salaire égal : c'est un principe de justice."),
      mc("Qui peut devenir ingénieure ?", ["Seulement les garçons", "Toute fille qui travaille bien à l'école", "Personne"], "Toute fille qui travaille bien à l'école", "Le talent et le travail font l'ingénieure, pas le genre."),
      tf("Une femme peut diriger une ville entière.", true, "Plusieurs femmes ont été élues maires au Maroc, notamment à Marrakech."),
      mc("Pourquoi l'argent de poche est-il utile ?", ["Pour acheter des bonbons", "Pour apprendre à gérer son budget", "Pour le donner aux amies"], "Pour apprendre à gérer son budget", "Gérer un peu d'argent jeune, c'est apprendre l'autonomie financière."),
      tf("Il existe des métiers interdits aux femmes au Maroc.", false, "Pas exactement… Aucun métier n'est interdit aux femmes au Maroc."),
      mc("Que faire si on rate un examen ?", ["Tout abandonner", "Recommencer et ne pas abandonner", "Pleurer pour toujours"], "Recommencer et ne pas abandonner", "Échouer fait partie d'apprendre. Les plus grandes recommencent toujours."),
      mc("Une fille peut-elle être chef de chantier ?", ["Oui", "Non", "Seulement si elle est forte"], "Oui", "Le bâtiment, l'industrie, la mécanique : tous les métiers sont accessibles."),
      tf("Les filles sont de meilleures lectrices que les garçons.", false, "Pas exactement… Chacun est différent. Il n'y a pas de règle générale."),
      mc("Quel est le pouvoir secret des études ?", ["La richesse", "La liberté", "La popularité"], "La liberté", "Étudier, c'est bâtir ta liberté de choisir ta vie. C'est ton plus grand trésor."),
    ],
    resources: [
      { title: "Bourses d'études", body: "L'État et plusieurs ONG proposent des bourses pour les filles brillantes en milieu rural." },
      { title: "Pionnières marocaines", body: "Fatima Al-Fihriya, Touria Chaoui, Merieme Chadid, Saâdia Ouazzani… elles ont ouvert la voie." },
      { title: "Orientation", body: "Renseigne-toi auprès des conseillers d'orientation : il existe des centaines de métiers." },
    ],
  },
  {
    id: "vigie",
    title: "Le Club des Amies",
    subtitle: "Apprends à rester en sécurité, faire les bons choix et avancer avec confiance à l'école, dans la rue et sur Internet 💖",
    description: "Bienvenue dans le Club des Amies, un endroit joyeux où les copines apprennent à s’aider et à rester en sécurité 💖\n\nTu découvriras comment faire les bons choix à l’école, dans la rue, avec les autres et sur Internet 🌐\n\nGrâce à Sultana et ses amies, tu apprendras à avancer avec confiance, intelligence et gentillesse ✨",
    theme: "Sécurité numérique et conscience d'Internet.",
    badge: "🛡️",
    badgeName: "Vigie du Web",
    image: webImg,
    accent: "from-violet-300/60 to-fuchsia-200/50",
    questions: [
      mc("Doit-on donner son mot de passe à sa meilleure amie ?", ["Oui, c'est ma meilleure amie", "Non, c'est privé", "Seulement à mes parents"], "Non, c'est privé", "Un mot de passe ne se partage avec personne, même la meilleure amie. C'est ton intimité numérique."),
      tf("Tout ce qu'on voit sur Internet est vrai.", false, "Pas exactement… Beaucoup d'informations en ligne sont fausses. Vérifie toujours tes sources."),
      mc("Que faire si un inconnu t'envoie un message ?", ["Lui répondre poliment", "Ne pas répondre et bloquer", "Lui donner mon adresse"], "Ne pas répondre et bloquer", "Un inconnu en ligne reste un inconnu. Bloque et signale."),
      tf("Poster la photo d'une amie sans lui demander est interdit.", true, "L'image d'une personne lui appartient. C'est une règle de respect et de loi."),
      mc("Qu'est-ce qu'un « filtre » ?", ["Un objet pour boire", "Un outil qui change la réalité des photos", "Un type de mot de passe"], "Un outil qui change la réalité des photos", "Les filtres modifient la réalité. Les visages parfaits en ligne sont rarement réels."),
      mc("Pourquoi ne pas dire où tu habites en ligne ?", ["Parce que c'est secret", "Pour rester en sécurité", "Pour ne pas faire jaloux"], "Pour rester en sécurité", "Ton adresse, ton école, ta routine : ces infos peuvent être utilisées contre toi."),
      tf("Le cyber-harcèlement est puni par la loi marocaine.", true, "La loi 103-13 sanctionne toute violence numérique."),
      mc("Si tu es triste à cause d'un message, que fais-tu ?", ["Je le garde pour moi", "J'en parle à mes parents", "Je réponds méchamment"], "J'en parle à mes parents", "Tu n'es jamais seule. Parler à un adulte de confiance, c'est se protéger."),
      tf("On peut devenir amie pour de vrai avec quelqu'un qu'on ne voit qu'en ligne.", false, "Pas exactement… Reste prudente : derrière un écran, on ne sait jamais qui est vraiment là."),
      mc("Qu'est-ce qu'une « Fake News » ?", ["Une bonne nouvelle", "Une fausse information", "Une info sportive"], "Une fausse information", "Les fake news circulent vite. Vérifie avant de partager."),
      mc("Comment créer un bon mot de passe ?", ["Mon prénom et ma date de naissance", "Avec des lettres, chiffres et signes", "Le même partout"], "Avec des lettres, chiffres et signes", "Long, varié, unique : un bon mot de passe te protège vraiment."),
      tf("On peut supprimer une photo d'Internet pour toujours.", false, "Pas exactement… Une photo peut être copiée et rester en ligne. Réfléchis avant de poster."),
      mc("Pourquoi limiter le temps d'écran ?", ["Pour économiser la batterie", "Pour protéger ses yeux et son sommeil", "Pour ennuyer ses parents"], "Pour protéger ses yeux et son sommeil", "Trop d'écrans fatigue les yeux, le cerveau et perturbe le sommeil."),
      tf("Les jeux vidéo aident à devenir plus intelligente.", true, "Avec modération, ils développent la réflexion, la stratégie et la mémoire."),
      mc("Que faire si quelqu'un te menace sur Facebook ?", ["Effacer le message", "Prendre une capture d'écran et prévenir un adulte", "Répondre par une menace"], "Prendre une capture d'écran et prévenir un adulte", "Une preuve écrite t'aidera à signaler et te protéger."),
      mc("Est-ce poli de commenter méchamment une photo ?", ["Oui, c'est mon avis", "Non, le respect est partout", "Seulement entre amies"], "Non, le respect est partout", "Le respect ne s'arrête pas à l'écran. Tes mots ont un vrai pouvoir."),
      tf("Tes parents ont le droit de savoir ce que tu fais en ligne.", true, "Tes parents te protègent. Le dialogue avec eux est ta meilleure sécurité."),
      mc("Un lien bizarre arrive par message, cliques-tu ?", ["Oui, par curiosité", "Non, c'est peut-être un virus", "Seulement si c'est joli"], "Non, c'est peut-être un virus", "Un lien suspect peut voler tes données. Dans le doute, ne clique jamais."),
      tf("Une fille peut être une experte en cybersécurité.", true, "La cybersécurité a besoin de cerveaux brillants, et le tien en fait partie."),
      mc("Quel est l'outil le plus puissant sur Internet ?", ["Un ordinateur rapide", "Ton cerveau !", "Un bon Wi-Fi"], "Ton cerveau !", "Ton esprit critique est ta plus grande arme. Réfléchis, doute, vérifie."),
    ],
    resources: [
      { title: "Signaler", body: "Sur Instagram, TikTok, WhatsApp : utilise le bouton « Signaler ». Pour les cas graves : police judiciaire." },
      { title: "Loi 103-13", body: "Cette loi marocaine sanctionne les violences faites aux femmes, y compris en ligne." },
      { title: "Esprit critique", body: "Avant de croire ou partager : qui dit ça ? quelle source ? quelle preuve ?" },
    ],
  },
];

const universesOrder = ["jardin", "forteresse", "academie", "vigie"] as const;
export const universes: Universe[] = universesOrder.map((id) => universesRaw.find((u) => u.id === id)!);

export const getUniverse = (id: string) => universes.find((u) => u.id === id);

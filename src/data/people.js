const people_pics = {
  "fayis": "/people/Faculty Coordinator/Fayis T P.jpeg",
  "aashika": "/people/Secretary General/Aashika P Sajan.jpg",
  "fathima": "/people/Fathima Thaha.jpg",
  "shawn": "/people/Shawn Jose.jpg",
};

const mainMembers = [
  { name: "Fayis T P", position: "Faculty Coordinator", tagline: "Faculty Coordinator · TKM MUN", imageUrl: people_pics.fayis },
  { name: "Aashika P Sajan", position: "Secretary General", tagline: "Secretary General · TKM MUN", imageUrl: people_pics.aashika },
  { name: "Fathima Thaha", position: "Deputy Secretary General", tagline: "Deputy Secretary General · TKM MUN", imageUrl: people_pics.fathima },
  { name: "Shawn Jose", position: "Director General", tagline: "Director General · TKM MUN", imageUrl: people_pics.shawn },
];

const otherMembers = {
  technical: {
    "nandana_manoj": "/people/Technical/Nandana Manoj.jpg",
  },

  operations: {
    "hafiz_ahmed": "/people/Operations/Hafiz Ahmed.jpg",
    "hafiz_rahuman_n": "/people/Operations/HAFIZ RAHUMAN N.jpg",
  },

  delegate_affairs: {
    "adhirath": "/people/Delegate affairs/Adhirath.jpg",
    "anaswara_s": "/people/Delegate affairs/Anaswara S.jpg",
    "irin_mariya": "/people/Delegate affairs/Irin Mariya.jpg",
  },

  political_affairs: {
    "muhammed_ajzal": "/people/Political Affairs/Muhammed Ajzal.jpg",
  },

  media: {
    "nathan_k_alexander": "/people/Media/Nathan K Alexander.jpg",
    "nadhran_bin_urooj": "/people/Media/Nadhran Bin Urooj.jpeg",
    "mohammed_nas": "/people/Media/Mohammed Nas portrait.jpg",
  },

  design: {
    "abhishek": "/people/Design/Abhishek.jpg",
    "manya_rajeevan": "/people/Design/Manya Rajeevan.jpg",
  },

  marketing: {
    "chaithanya_j_nair": "/people/Marketing/Chaithanya J Nair.jpg",
  },

  finance: {
    "prathul_k": "/people/Finance/Prathul K.jpg",
  },

  hospitality: {
    "ananya_neenu_anil": "/people/Hospitality/Ananya Neenu Anil.jpg",
  },

  creative: {
    "athira_mani": "/people/Creative/Athira Mani.jpg",
  },

  sponsorship: {
    "aswinraj_h": "/people/Sponsorship/Aswinraj H.jpg",
  },

  cultural_affairs: {
    "athila_zubair_n_v": "/people/Cultural Affairs/Athila Zubair N V.jpg",
  },

  logistics: {
    "hanin_afsal": "/people/LOGISTICS/Hanin Afsal.jpg",
  },

  documentation: {
    "parthiv_e_p": "/people/Documentation/Parthiv E P.jpg",
  },

  publicity: {
    "niramayan_s": "/people/PUBLICITY/Niramayan S.jpg",
  },

  accommodation: {
    "mydhily_s_pillai": "/people/Accomodation/Mydhily S Pillai.jpg",
    "sharafath_salim": "/people/Accomodation/Sharafath Salim.jpg",
  },

  membership: {
    "nandana_sankar": "/people/Membership/Nandana Sankar.jpg",
  },

  transportation: {
    "ajmal_n": "/people/Transportation/Ajmal N.jpg",
    "virajit_manoj": "/people/Transportation/Virajit Manoj.jpg",
  },

  general_volunteering: {
    "aswan": "/people/General Volunteering/Aswan.jpg",
    "gowri_p": "/people/General Volunteering/Gowri P.jpg",
    "shobika": "/people/General Volunteering/Shobika.jpg",
    "sreya_sunil": "/people/General Volunteering/Sreya Sunil.jpg",
    "sruthi": "/people/General Volunteering/Sruthi.jpg",
  }

};

// Overrides the default "USG <Category>" title shown on a member's card.
const memberTitles = {
  nadhran_bin_urooj: "Social Media Head, USG Media",
  mohammed_nas: "Social Media Head, USG Media",
};

export { people_pics, mainMembers, otherMembers, memberTitles };
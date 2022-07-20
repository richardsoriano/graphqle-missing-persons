const missing_persons = [
  {
    id: "1001",
    first_name: "Jon",
    last_name: "Snow",
    city: "The Wall",
    age: "19",
    missing_since: "07/07/2022",
    guardian: "1101",
  },
  {
    id: "1002",
    first_name: "Aria",
    last_name: "Stark",
    city: "Wintefell",
    age: "13",
    missing_since: "06/01/2020",
    guardian: "1101",
  },
  {
    id: "1003",
    first_name: "Priestess",
    last_name: "Melissandre",
    city: "Winterfell",
    age: "255",
    missing_since: "05/01/2019",
    guardian: "1102",
  },
  {
    id: "1004",
    first_name: "Gregor the Mountain",
    last_name: "Clegane",
    city: "Los Angeles",
    age: "55",
    missing_since: "05/01/2019",
    guardian: "1102",
  },
  {
    id: "1005",
    first_name: "Geoffrey",
    last_name: "Baratheon",
    city: "Kings Landing",
    age: "18",
    missing_since: "05/19/2020",
    guardian: "1103",
  },
  {
    id: "1006",
    first_name: "Myrcella",
    last_name: "Lannister",
    city: "Kings Landing",
    age: "12",
    missing_since: "02/14/2020",
    guardian: "1101",
  },
]

const guardians = [
  {
    id: "1101",
    first_name: "Eddard Ned",
    last_name: "Stark",
    city: "Wintefell",
  },
  {
    id: "1102",
    first_name: "Walder",
    last_name: "Frey",
    city: "Rivverlands",
  },
  {
    id: "1103",
    first_name: "Cersei",
    last_name: "Lannister",
    city: "Kings Landing",
  },
  {
    id: "1104",
    first_name: "Jamie",
    last_name: "Lannister",
    city: "Kings Landing",
  },
]

const witnesses = [
  {
    id: "2001",
    name: "Faceless Man",
    city: "Westeross",
  },
  {
    id: "2002",
    name: "Hodor",
    city: "Winterfell",
  },
  {
    id: "2003",
    name: "Gregor The Mountain Clegane",
    city: "Kings Landing",
  },
  {
    id: "2004",
    name: "Daenerys Targaryen Queen of Dragons",
    city: "The Seven Kingdoms",
  },
]

const messages = [
  {
    id: "2100",
    title: "Cautious Meet",
    body: "I want to meet this so-called King of the North",
    missing_person: "1001",
    witness: "2004",
  },
  {
    id: "2101",
    title: "From mute witness",
    body: "If you find her, do not confront her. Tell her that her family loves her",
    missing_person: "1002",
    witness: "2002",
  },
]

const db = {
  missing_persons,
  guardians,
  witnesses,
  messages,
}

export { db as default }

export const users = [
  {
    id: 1,
    conversations: [],
    email: "adam",
    name: "Adam",
    password: "",
    sentMessages: [],
  },
  {
    id: 2,
    conversations: [],
    email: "anna",
    name: "Anna",
    password: "",
    sentMessages: [],
  },
  {
    id: 3,
    conversations: [],
    email: "jakub",
    name: "Jakub",
    password: "",
    sentMessages: [],
  },
  {
    id: 4,
    conversations: [],
    email: "aneta",
    name: "Aneta",
    password: "",
    sentMessages: [],
  },
];

export const apiUrl = "http://azmessenger-api.herokuapp.com";

export const loggedUserId = (userName: string): number => {
  return userName.startsWith("/adam")
    ? 1
    : userName === "/anna"
    ? 2
    : userName === "/jakub"
    ? 3
    : userName === "/david"
    ? 4
    : userName === "/aneta"
    ? 5
    : 0;
};

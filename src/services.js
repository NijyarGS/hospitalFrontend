function getMockData(Data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Data);
    }, 1000);
  });
}

export async function getCasesData() {
  const res = await getMockData(caseData);
  return res;
}

export async function getCaseById(caseId) {
  const data = await getMockData(caseData);
  const res = res.find((e) => e.id == caseId);
  return res;
}

export async function getUserData(data) {
  // const res = await getMockData(userData);

  if (data.username && data.password) {
    if (data.username !== userData[1].username)
      return messagesObject(false, "error.username");
    if (data.password !== userData[1].password)
      return messagesObject(false, "error.password");
    else return messagesObject(true, "Success");
  } else return messagesObject(false, "error.invalid");
}

export async function getDoctorsData() {
  const res = await getMockData(doctorData);
  return res;
}

const caseData = [
  {
    id: 1,
    patient: "Ahmed",
    doctorId: 1,
    birthDate: "1991-01-01",
    dateOfEntery: "2021-09-01",
    status: 2,
  },
  {
    id: 2,
    patient: "Sara",
    doctorId: 2,
    birthDate: "1996-01-01",
    dateOfEntery: "2021-08-15",
    status: 1,
  },
  {
    id: 3,
    patient: "Ahmed",
    doctorId: 3,
    birthDate: "1976-01-01",
    dateOfEntery: "2021-07-20",
    status: 1,
  },
  {
    id: 4,
    patient: "Ali",
    doctorId: 4,
    birthDate: "1971-01-01",
    dateOfEntery: "2021-06-10",
    status: 2,
  },
  {
    id: 5,
    patient: "Mohamed",
    doctorId: 5,
    birthDate: "1991-01-01",
    dateOfEntery: "2021-05-05",
    status: 1,
  },
  {
    id: 6,
    patient: "Ali",
    doctorId: 2,
    birthDate: "1988-01-01",
    dateOfEntery: "2021-05-05",
    status: 2,
  },
  {
    id: 7,
    patient: "Omar",
    doctorId: 5,
    birthDate: "1991-01-01",
    dateOfEntery: "2021-05-05",
    status: 1,
  },
  {
    id: 8,
    patient: "Sara",
    doctorId: 2,
    birthDate: "1993-01-01",
    dateOfEntery: "2021-08-15",
    status: 1,
  },
  {
    id: 9,
    patient: "Hassan",
    doctorId: 3,
    birthDate: "1981-01-01",
    dateOfEntery: "2021-04-12",
    status: 2,
  },
  {
    id: 10,
    patient: "Fatima",
    doctorId: 1,
    birthDate: "1986-01-01",
    dateOfEntery: "2021-03-22",
    status: 1,
  },
  {
    id: 11,
    patient: "Khalid",
    doctorId: 4,
    birthDate: "1992-01-01",
    dateOfEntery: "2021-02-18",
    status: 2,
  },
  {
    id: 12,
    patient: "Layla",
    doctorId: 5,
    birthDate: "1994-01-01",
    dateOfEntery: "2021-01-30",
    status: 1,
  },
  {
    id: 13,
    patient: "Youssef",
    doctorId: 2,
    birthDate: "1989-01-01",
    dateOfEntery: "2021-01-15",
    status: 2,
  },
  {
    id: 14,
    patient: "Mona",
    doctorId: 3,
    birthDate: "1997-01-01",
    dateOfEntery: "2020-12-25",
    status: 1,
  },
  {
    id: 15,
    patient: "Nour",
    doctorId: 1,
    birthDate: "1983-01-01",
    dateOfEntery: "2020-11-10",
    status: 2,
  },
];
const doctorData = [
  { id: 1, name: "Ahmed" },
  { id: 2, name: "Ali" },
  { id: 3, name: "Mohamed" },
  { id: 4, name: "Amr" },
  { id: 5, name: "Osama" },
];

const status = [
  { value: "Active", id: 1 },
  { value: "Done", id: 2 },
];

const userData = [
  {
    username: "Ahmed",
    password: "12345678",
  },
  {
    username: "test",
    password: "test",
  },
];

const messagesObject = (succed, message) => {
  return {
    status: succed ? "success" : "error",
    message: message,
  };
};

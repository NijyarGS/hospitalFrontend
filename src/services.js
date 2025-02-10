export async function getCasesData() {
  const res = await getMockData(caseData);
  return res;
}

export async function getUserData(data) {
  const res = await getMockData(userData);

  if (data.username && data.password) {
    if (data.username !== userData[1].username)
      return messagesObject(false, "error.username");
    if (data.password !== userData[1].password)
      return messagesObject(false, "error.password");
    else return messagesObject(true, "Success");
  } else return messagesObject(false, "error.invalid");
}

function getMockData(Data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Data);
    }, 1000);
  });
}

const caseData = [
  {
    patient: "Ahmed",
    doctorId: 1,
    age: 30,
    dateOfEntery: "2021-09-01",
    status: 2,
  },
  {
    patient: "Sara",
    doctorId: 2,
    age: 25,
    dateOfEntery: "2021-08-15",
    status: 1,
  },
  {
    patient: "Ahmed",
    doctorId: 3,
    age: 45,
    dateOfEntery: "2021-07-20",
    status: 1,
  },
  {
    patient: "Ali",
    doctorId: 4,
    age: 50,
    dateOfEntery: "2021-06-10",
    status: 2,
  },
  {
    patient: "Mohamed",
    doctorId: 5,
    age: 30,
    dateOfEntery: "2021-05-05",
    status: 1,
  },
  {
    patient: "Ali",
    doctorId: 2,
    age: 33,
    dateOfEntery: "2021-05-05",
    status: 2,
  },
  {
    patient: "Omar",
    doctorId: 5,
    age: 30,
    dateOfEntery: "2021-05-05",
    status: 1,
  },
  {
    patient: "Sara",
    doctorId: 2,
    age: 28,
    dateOfEntery: "2021-08-15",
    status: 1,
  },
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

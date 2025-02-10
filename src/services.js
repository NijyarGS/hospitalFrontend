export function getCasesData() {
  return getMockData(caseData);
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

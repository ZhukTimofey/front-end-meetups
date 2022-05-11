import { Meetup } from "../MainPage/Meetups/MeetupsStore";
import faker from "faker";
import { DateTime } from "luxon";

export const speakers = [
  {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
  },
];
export const users = {
  data: [
    {
      id: "b4ba2b84-521f-4645-9cc3-518b8a35cda3",
      name: "Lavern",
      password: "private",
      surname: "Gerlach",
      post: "Regional Factors Executive",
      roles: "EMPLOYEE",
    },
    {
      id: "63e5aa79-6925-4761-9626-a6d3092ef55e",
      name: "Garrison",
      password: "private",
      surname: "Blick",
      post: "Future Security Orchestrator",
      roles: "CHIEF",
    },
    {
      id: "449f088a-9819-4dec-a0b9-6b18557b0865",
      name: "Vicky",
      password: "private",
      surname: "Feest",
      post: "Legacy Solutions Developer",
      roles: "EMPLOYEE",
    },
    {
      id: "076e3ecf-bc3b-4775-b3b5-e98445f1814b",
      name: "Alvah",
      password: "private",
      surname: "Cormier",
      post: "Senior Assurance Specialist",
      roles: "EMPLOYEE",
    },
    {
      id: "5b1576ba-7b66-4a6f-94de-caacb820e6ae",
      name: "Zakary",
      password: "private",
      surname: "Thiel",
      post: "Legacy Division Administrator",
      roles: "EMPLOYEE",
    },
  ],
};
export const speakersID = speakers.map((speaker) => speaker.id);

export const meetupProps: Meetup = {
  author: {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
  },
  excerpt: faker.lorem.paragraph(),
  finish: DateTime.fromJSDate(faker.datatype.datetime()).toISO(),
  goCount: 64,
  id: faker.datatype.uuid(),
  isOver: faker.datatype.boolean(),
  modified: faker.datatype.uuid(),
  place: faker.address.streetName(),
  speakers: speakers,
  start: DateTime.fromJSDate(faker.datatype.datetime()).toISO(),
  status: "CONFIRMED",
  subject: faker.lorem.sentence(),
};
export const themeProps: Meetup = {
  author: {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
  },
  excerpt: faker.lorem.paragraph(),
  finish: DateTime.fromJSDate(faker.datatype.datetime()).toISO(),
  goCount: faker.datatype.number(),
  id: faker.datatype.uuid(),
  isOver: faker.datatype.boolean(),
  modified: faker.datatype.uuid(),
  place: faker.address.streetName(),
  speakers: [
    {
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
    },
  ],
  start: DateTime.fromJSDate(faker.datatype.datetime()).toISO(),
  status: "DRAFT",
  subject: faker.lorem.sentence(),
};
export const requestProps: Meetup = {
  author: {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
  },
  excerpt: faker.lorem.paragraph(),
  finish: DateTime.fromJSDate(faker.datatype.datetime()).toISO(),
  goCount: faker.datatype.number(),
  id: faker.datatype.uuid(),
  isOver: faker.datatype.boolean(),
  modified: faker.datatype.uuid(),
  place: faker.address.streetName(),
  speakers: [
    {
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
    },
  ],
  start: DateTime.fromJSDate(faker.datatype.datetime()).toISO(),
  status: "REQUEST",
  subject: faker.lorem.sentence(),
};

export const themesMeetups: Meetup[] = [themeProps, themeProps, themeProps];
export const requestedMeetups: Meetup[] = [requestProps, requestProps];

export const meetupsMockedData: { data: Meetup[] } = {
  data: [...themesMeetups, ...requestedMeetups, meetupProps],
};

export const newsProps = {
  id: faker.datatype.uuid(),
  publicationDate: DateTime.fromJSDate(faker.datatype.datetime()).toISO(),
  title: faker.lorem.sentence(),
  text: faker.lorem.sentence(),
  image: undefined,
};
export const newsPropsArray = [newsProps, newsProps, newsProps, newsProps];
export const speakerArray = [
  {
    value: faker.datatype.uuid(),
    label: `${faker.name.firstName()} ${faker.name.lastName()}`,
  },
  {
    value: faker.datatype.uuid(),
    label: `${faker.name.firstName()} ${faker.name.lastName()}`,
  },
  {
    value: faker.datatype.uuid(),
    label: `${faker.name.firstName()} ${faker.name.lastName()}`,
  },
];
export const reqData = {
  subject: faker.lorem.sentence(),
  speakers: speakerArray,
  excerpt: faker.lorem.sentence(),
};

import { MeetupCreationStore } from "./MeetupCreationStore";
import { NotificationStore } from "../Notifications/NotificationStore";
import axios from "axios";
import { meetupProps, reqData, speakersID, users } from "../../utils/testData";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("Testing set functions", () => {
  it("test default values", async () => {
    const meetupCreationStore = new MeetupCreationStore(
      new NotificationStore()
    );
    meetupCreationStore.setDefaultValues(meetupProps);
    expect(meetupCreationStore.speakers).toStrictEqual(speakersID);
  });
});
describe("Test get functions", () => {
  it("get users test", async () => {
    const meetupCreationStore = new MeetupCreationStore(
      new NotificationStore()
    );
    mockedAxios.get.mockResolvedValue(users);
    await meetupCreationStore.getUsers();
    expect(meetupCreationStore.users).toStrictEqual(users.data);
  });
});
describe("Test set functions", () => {
  it("author initialization", async () => {
    const meetupCreationStore = new MeetupCreationStore(
      new NotificationStore()
    );
    meetupCreationStore.initAuthor(meetupProps.author);
    expect(meetupCreationStore.author).toStrictEqual(meetupProps.author);
  });
  it("required field set function", async () => {
    const meetupCreationStore = new MeetupCreationStore(
      new NotificationStore()
    );
    meetupCreationStore.requiredFields(reqData);
    expect(meetupCreationStore.subject).toStrictEqual(reqData.subject);
    expect(meetupCreationStore.excerpt).toStrictEqual(reqData.excerpt);
    expect(meetupCreationStore.speakers).toStrictEqual(
      reqData.speakers.map((speaker) => speaker.value)
    );
  });
});

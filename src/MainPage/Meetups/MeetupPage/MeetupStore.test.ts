import { MeetupStore } from "./MeetupStore";
import axios from "axios";
import { NotificationStore } from "../../Notifications/NotificationStore";
import { meetupProps, requestProps, themeProps } from "../../../utils/testData";

const resp = { data: themeProps };
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("Testing init  function", () => {
  it("Set userInfo if user logged in", async () => {
    const meetupStore = new MeetupStore(new NotificationStore());
    mockedAxios.get.mockResolvedValue(resp);
    await meetupStore.init("");
    expect(meetupStore.meetup).toStrictEqual(resp.data);
    expect(meetupStore.participants).toStrictEqual(resp.data);
  });
});

describe("Testing computed value", () => {
  it("Testing moderated meetup response", async () => {
    const meetupStore = new MeetupStore(new NotificationStore());
    mockedAxios.get.mockResolvedValue({ data: requestProps });
    await meetupStore.init("");
    expect(meetupStore.isModeratedMeetup).toStrictEqual(true);
  });
  it("Testing theme response", async () => {
    const meetupStore = new MeetupStore(new NotificationStore());
    mockedAxios.get.mockResolvedValue(resp);
    await meetupStore.init("");
    expect(meetupStore.isModeratedMeetup).toStrictEqual(false);
  });
  it("Testing confirmed meetup response", async () => {
    const meetupStore = new MeetupStore(new NotificationStore());
    mockedAxios.get.mockResolvedValue({ data: meetupProps });
    await meetupStore.init("");
    expect(meetupStore.isModeratedMeetup).toStrictEqual(false);
  });
});

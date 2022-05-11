import { MeetupsStore } from "./MeetupsStore";
import { NotificationStore } from "../Notifications/NotificationStore";
import axios from "axios";
import {
  meetupsMockedData,
  requestedMeetups,
  themesMeetups,
} from "../../utils/testData";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
test("Testing getting of the meetups", async () => {
  const meetupsStore = new MeetupsStore(new NotificationStore());
  mockedAxios.get.mockResolvedValue(meetupsMockedData);
  await meetupsStore.sendGetRequest();
  expect(meetupsStore.meetups).toStrictEqual(meetupsMockedData.data);
});
describe("Testing computed functions", () => {
  it("Test computed func for themes", async () => {
    const meetupsStore = new MeetupsStore(new NotificationStore());
    mockedAxios.get.mockResolvedValue(meetupsMockedData);
    await meetupsStore.sendGetRequest();
    expect(meetupsStore.getMeetupsThemes).toStrictEqual(themesMeetups);
    expect(meetupsStore.getMeetupsModerated).toStrictEqual(requestedMeetups);
  });
  it("Test computed func for moderated meetups", async () => {
    const meetupsStore = new MeetupsStore(new NotificationStore());
    mockedAxios.get.mockResolvedValue(meetupsMockedData);
    await meetupsStore.sendGetRequest();
    expect(meetupsStore.getMeetupsModerated).toStrictEqual(requestedMeetups);
  });
});

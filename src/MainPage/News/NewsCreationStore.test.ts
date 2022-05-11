import axios from "axios";
import { NewsCreationStore } from "./NewsCreationStore";
import { NotificationStore } from "../Notifications/NotificationStore";
import { newsProps } from "utils/testData";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("Testing news creation store", () => {
  it("initialization of creation store", async () => {
    const newsCreationStore = new NewsCreationStore(new NotificationStore());
    mockedAxios.get.mockResolvedValue({ data: newsProps });
    await newsCreationStore.initEditingStore("");
    expect(newsCreationStore.id).toStrictEqual(newsProps.id);
    expect(newsCreationStore.title).toStrictEqual(newsProps.title);
    expect(newsCreationStore.text).toStrictEqual(newsProps.text);
    expect(newsCreationStore.image).toStrictEqual(newsProps.image);
  });
  it("computed func after init", async () => {
    const newsCreationStore = new NewsCreationStore(new NotificationStore());
    mockedAxios.get.mockResolvedValue({ data: newsProps });
    await newsCreationStore.initEditingStore("");
    expect(newsCreationStore.isInit).toStrictEqual(true);
  });
  it("computed func before init", async () => {
    const newsCreationStore = new NewsCreationStore(new NotificationStore());
    expect(newsCreationStore.isInit).toStrictEqual(false);
  });
});

import axios from "axios";
import { NewsStore } from "./NewsStore";
import { NotificationStore } from "../Notifications/NotificationStore";
import { newsPropsArray } from "utils/testData";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("Testing store for all news", () => {
  it("get news request", async () => {
    const newsStore = new NewsStore(new NotificationStore());
    mockedAxios.get.mockResolvedValue({ data: newsPropsArray });
    await newsStore.getNews();
    expect(newsStore.news).toStrictEqual(newsPropsArray);
  });
});

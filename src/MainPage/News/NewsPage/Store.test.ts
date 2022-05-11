import axios from "axios";
import { News } from "./Store";
import { NotificationStore } from "../../Notifications/NotificationStore";
import { newsProps } from "../../../utils/testData";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("Testing news Store", () => {
  it("get news request", async () => {
    const newsStore = new News(new NotificationStore());
    mockedAxios.get.mockResolvedValue({ data: newsProps });
    await newsStore.initStore("");
    expect(newsStore.id).toStrictEqual(newsProps.id);
    expect(newsStore.text).toStrictEqual(newsProps.text);
    expect(newsStore.title).toStrictEqual(newsProps.title);
  });
  it("delete news successfully", async () => {
    const newsStore = new News(new NotificationStore());
    mockedAxios.delete.mockResolvedValue({});
    await newsStore.deleteNews("");
    expect(newsStore.isNewsDeleted).toStrictEqual(true);
  });
  it("delete news failed", async () => {
    const newsStore = new News(new NotificationStore());
    mockedAxios.delete.mockRejectedValue({});
    await newsStore.deleteNews("");
    expect(newsStore.isNewsDeleted).toStrictEqual(false);
  });
});

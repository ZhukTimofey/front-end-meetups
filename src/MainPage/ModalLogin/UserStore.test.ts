import { UserStore } from "./UserStore";
import axios from "axios";
import { NotificationStore } from "../Notifications/NotificationStore";

const resp = {
  data: {
    user: {
      id: "1234112341234w",
      name: "Lavern",
      password: "private",
      post: "CHIEF",
      roles: "CHIEF",
      surname: "Gerlach",
    },
  },
};
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("Testing function setInfoOfLoggedUser", () => {
  it("Set userInfo if user logged in", async () => {
    const userStore = new UserStore(new NotificationStore());
    mockedAxios.get.mockResolvedValue(resp);
    await userStore.setInfoOfLoggedUser();
    expect(userStore.userInfo).toStrictEqual(resp.data.user);
  });
  it("Set userInfo if user logged out", async () => {
    const userStore = new UserStore(new NotificationStore());
    mockedAxios.get.mockRejectedValue({});
    axios.post = jest.fn().mockRejectedValue({});
    await userStore.setInfoOfLoggedUser();
    expect(userStore.userInfo).toStrictEqual({});
    expect(userStore.isAuth).toStrictEqual(false);
  });
});

describe("Testing log in function", () => {
  it("Is data correct if request successfully", async () => {
    const userStore = new UserStore(new NotificationStore());
    mockedAxios.post.mockResolvedValue(resp);
    await userStore.login({ username: "Lavern", password: "private" });
    expect(userStore.userInfo).toStrictEqual(resp.data.user);
    expect(userStore.isAuth).toStrictEqual(true);
    expect(userStore.isRespUnauthorized).toStrictEqual(false);
  });
  it("Is data correct if request failed", async () => {
    const userStore = new UserStore(new NotificationStore());
    mockedAxios.post.mockRejectedValue({});
    await userStore.login({ username: "Lavern", password: "privatedawdasdaw" });
    expect(userStore.userInfo).toStrictEqual({});
    expect(userStore.isAuth).toStrictEqual(false);
    expect(userStore.isRespUnauthorized).toStrictEqual(true);
  });
});
describe("Testing logged out function", () => {
  it("Is isAuth and userInfo correct if request successfully", async () => {
    const userStore = new UserStore(new NotificationStore());
    mockedAxios.get.mockResolvedValue({});
    await userStore.logout();
    expect(userStore.userInfo).toStrictEqual({});
    expect(userStore.isAuth).toStrictEqual(false);
  });
  it("Is isAuth correct if request failed", async () => {
    const userStore = new UserStore(new NotificationStore());
    mockedAxios.get.mockRejectedValue({});
    await userStore.logout();
    expect(userStore.isAuth).toStrictEqual(true);
  });
});

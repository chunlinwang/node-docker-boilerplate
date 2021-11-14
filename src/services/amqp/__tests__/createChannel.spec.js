const amqplib = require("amqplib");
const createChannel = require("../createChannel");

jest.mock("amqplib");
describe("create channel tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("create channel error", async () => {
    await expect(() => createChannel("uri")).rejects.toThrow();
  });

  test("create channel ok", async () => {
    const mCh = { assertExchange: jest.fn(), publish: jest.fn() };
    const mConn = {
      createChannel: jest.fn().mockResolvedValueOnce(mCh),
      close: jest.fn(),
    };
    const connectSpy = jest
      .spyOn(amqplib, "connect")
      .mockResolvedValueOnce(mConn);

    await createChannel("amqp://uri");
    expect(connectSpy).toBeCalledWith("amqp://uri");
    expect(mConn.createChannel).toBeCalledTimes(1);
  });
});

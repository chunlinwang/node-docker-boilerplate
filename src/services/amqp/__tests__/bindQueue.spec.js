const amqplib = require("amqplib-mocks");
const bindQueue = require("../bindQueue");

jest.setMock("amqplib", amqplib);

describe("bind queue test", () => {
  let ch;
  beforeEach(async () => {
    const connection = await amqplib.connect("some-random-uri");
    ch = await connection.createChannel();
    ch.assertExchange("ex", "direct");
    ch.assertQueue("q");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("bind exchange and q", async () => {
    const spy = jest.spyOn(ch, "bindQueue");
    bindQueue(ch, "q", "ex", "test");
    expect(spy).toBeCalledWith("q", "ex", "test", {});
  });
});

const amqplib = require("amqplib-mocks");
const publisher = require("../publisher");

jest.setMock("amqplib", amqplib);

describe("publisher msg tests", () => {
  let ch;
  beforeEach(async () => {
    const connection = await amqplib.connect("some-random-uri");
    ch = await connection.createChannel();
    ch.assertExchange("ex", "direct");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("publisher msg", async () => {
    const spy = jest.spyOn(ch, "publish");

    publisher(ch, "ex", "test", "test");
    expect(spy).toBeCalledWith("ex", "test", Buffer.from("test"), {});
  });
});

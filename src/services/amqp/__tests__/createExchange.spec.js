const amqplib = require("amqplib-mocks");
const createExchange = require("../createExchange");

jest.setMock("amqplib", amqplib);

describe("create exchange tests", () => {
  let ch;
  beforeEach(async () => {
    const connection = await amqplib.connect("some-random-uri");
    ch = await connection.createChannel();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("create exchange", async () => {
    const spy = jest.spyOn(ch, "assertExchange");
    createExchange(ch, "q", "direct");
    expect(spy).toBeCalledWith("q", "direct", {});
  });
});

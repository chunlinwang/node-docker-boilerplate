const amqplib = require("amqplib-mocks");
const createQueue = require("../createQueue");

jest.setMock("amqplib", amqplib);

describe("create queue tests", () => {
  let ch;
  beforeEach(async () => {
    const connection = await amqplib.connect("some-random-uri");
    ch = await connection.createChannel();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("create queue", async () => {
    const spy = jest.spyOn(ch, "assertQueue");

    createQueue(ch, "q");
    expect(spy).toBeCalledWith("q", {});
  });
});

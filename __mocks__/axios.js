const mockAxios = jest.createMockFromModule("axios");

function createMock() {
  return {
    get: jest.fn(),
    post: jest.fn(),
  };
}

mockAxios.create = createMock;

module.exports = mockAxios;

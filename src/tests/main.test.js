const { handlerExchangeCurrency } = require('../main');

describe('testes da função handlerExchangeCurrency', () => {
  it('testa se handlerExchangeCurrency é um função', () => {
    expect(typeof handlerExchangeCurrency).toEqual('function');
  });
});

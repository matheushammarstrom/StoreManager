const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../services/sales');
const salesModel = require('../../../models/sales');

describe('Services Tests: ',()=>{
  describe('List all sales',()=>{
    const modelResponse = [{ date: '2021-09-09  00:45:32', product_id: 2, quantity: 3, sale_id: 4}];
    const serviceSuccessResponse = {code: 200, data: [{date: '2021-09-09  00:45:32', productId: 2, quantity: 3, saleId: 4}]};
    describe('List all sales',()=> {
      before(() => {
        sinon.stub(salesModel, 'getAll').resolves(modelResponse);
      })
  
      after(() => {
        salesModel.getAll.restore();
      });
      it('Retorna um objeto contendo o code 200 e as informacoes de todos as vendas em um array.',async ()=>{
        const serviceResponse = await salesService.getAll();
        expect(serviceResponse).to.be.deep.equal(serviceSuccessResponse);
      })
    })
  })
})
const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../services/sales');
const salesModel = require('../../../models/sales');

describe('Services Tests: ',()=>{
  describe('List all sales',()=>{
    const modelResponse = [{id: 1, date: '2021-09-09  00:45:32'}, {id:2, date: '2021-09-09  00:45:36'}];
    const serviceSuccessResponse = {code: 200, response: modelResponse};
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
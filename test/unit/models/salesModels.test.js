const sinon = require('sinon');
const { expect } = require('chai');

const DB = require('../../../models/connection');
const sales = require('../../../models/sales');

describe('Model Tests: ', ()=>{

  const executeResponse = [[{id: 1, date:'2021-09-09  00:45:32'}, {id: 2, date:'2021-09-09  00:45:36'}]];
  const modelSucessResponse = [{id: 1, date:'2021-09-09  00:45:32'}, {id: 2, date:'2021-09-09  00:45:36'}]
  describe('List all sales',()=>{
    before(() => {
      sinon.stub(DB, 'execute').resolves(executeResponse);
    })

    after(() => {
      DB.execute.restore();
    });

    it('Retorna um array com todos os produtos',async ()=>{
      const modelResponse = await sales.getAll();
      expect(modelResponse).to.be.deep.equal(modelSucessResponse);
    })

  })

})

const sinon = require('sinon');
const { expect } = require('chai');

const DB = require('../../../models/connection');
const sales = require('../../../models/sales');

describe('Model Tests: ', ()=>{

  describe('List all sales',()=>{
    const executeResponse = [[{id: 1, date:'2021-09-09  00:45:32'}, {id: 2, date:'2021-09-09  00:45:36'}]];
    const modelSucessResponse = [{id: 1, date:'2021-09-09  00:45:32'}, {id: 2, date:'2021-09-09  00:45:36'}]
    before(() => {
      sinon.stub(DB, 'execute').resolves(executeResponse);
    })

    after(() => {
      DB.execute.restore();
    });

    it('Should return an array of sales',async ()=>{
      const modelResponse = await sales.getAll();
      expect(modelResponse).to.be.deep.equal(modelSucessResponse);
    })
  })
  describe('List sale by id',()=>{
    const executeResponse = [[{id: 1, date:'2021-09-09  00:45:32'}]]
    const modelSucessResponse = [{id: 1, date:'2021-09-09  00:45:32'}]
    before(() => {
      sinon.stub(DB, 'execute').resolves(executeResponse);
    })

    after(() => {
      DB.execute.restore();
    });
    it('Should return an array containing the sale found', async ()=> {
      const modelResponse = await sales.getById();
      expect(modelResponse).to.be.deep.equal(modelSucessResponse);
    })
  })

})

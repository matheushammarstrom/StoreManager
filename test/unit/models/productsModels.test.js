const sinon = require('sinon');
const { expect } = require('chai');

const DB = require('../../../models/connection');
const products = require('../../../models/products');

describe('Model Tests: ', ()=>{
  describe('List all products',()=>{
    const executeResponse = [[{id: 1, name: 'Martelo de Thor', quantity: 10}, {id:2, name:'Escudo', quantity:100}]];
    const modelSucessResponse = [{id: 1, name: 'Martelo de Thor', quantity: 10}, {id:2, name:'Escudo', quantity:100}];
    before(() => {
      sinon.stub(DB, 'execute').resolves(executeResponse);
    })

    after(() => {
      DB.execute.restore();
    });

    it('Retorna um array com todos os produtos',async ()=>{
      const modelResponse = await products.getAll();
      expect(modelResponse).to.be.deep.equal(modelSucessResponse);
    })
  })
  describe('List product by id',()=>{
    const executeResponse = [[{id: 1, name: 'Martelo de Thor', quantity: 10}]]
    const modelSucessResponse = [{id: 1, name: 'Martelo de Thor', quantity: 10}]
    before(() => {
      sinon.stub(DB, 'execute').resolves(executeResponse);
    })

    after(() => {
      DB.execute.restore();
    });
    it('Retorna um array com o produto buscado pelo id', async ()=>{
      const modelResponse = await products.getById();
      expect(modelResponse).to.be.deep.equal(modelSucessResponse);
    })
  })
})
const sinon = require('sinon');
const { expect } = require('chai');

const DB = require('../../../models/connection');
const products = require('../../../models/products');

describe('Model Tests: ', ()=>{

  const executeResponse = [[{id: 1, name: 'Martelo de Thor', quantity: 10}, {id:2, name:'Escudo', quantity:100}]];
  const modelSucessResponse = [{id: 1, name: 'Martelo de Thor', quantity: 10}, {id:2, name:'Escudo', quantity:100}]
  describe('List all products',()=>{
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







})
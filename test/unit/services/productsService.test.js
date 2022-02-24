const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/products');
const productsModel = require('../../../models/products');

describe('Services Tests: ',()=>{
  describe('List all products',()=>{
    const modelResponse = [{id: 1, name: 'Martelo de Thor', quantity: 10}, {id:2, name:'Escudo', quantity:100}];
    const serviceSuccessResponse = {code: 200, data: modelResponse};
    describe('List all sales',()=> {
      before(() => {
        sinon.stub(productsModel, 'getAll').resolves(modelResponse);
      })
  
      after(() => {
        productsModel.getAll.restore();
      });
      it('Retorna um objeto contendo o code 200 e as informacoes de todos os produtos em um array.',async ()=>{
        const serviceResponse = await productsService.getAll();
        expect(serviceResponse).to.be.deep.equal(serviceSuccessResponse);
      })
    })
  })
})
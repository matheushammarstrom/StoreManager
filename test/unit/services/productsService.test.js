const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/products');
const productsModel = require('../../../models/products');

describe('Services Tests: ',()=>{

  describe('List all products',()=>{
    const modelResponse = [{id: 1, name: 'Martelo de Thor', quantity: 10}, {id:2, name:'Escudo', quantity:100}];
    const serviceSuccessResponse = {code: 200, data: modelResponse};
    describe('List all products',()=> {
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

  describe('List product by id',()=>{
    describe('If the product is found',()=>{
      const modelResponse =[{id: 1, name: 'Martelo de Thor', quantity: 10}];
      const serviceSuccessResponse = {code: 200, data: modelResponse};
      before(() => {
        sinon.stub(productsModel, 'getById').resolves(modelResponse);
      })
  
      after(() => {
        productsModel.getById.restore();
      });
      it('Retorna um objeto contendo o code 200 e as informacoes do produto em um array', async ()=>{
        const serviceResponses = await productsService.getById();
        expect(serviceResponses).to.be.deep.equal(serviceSuccessResponse);
      })
    })
    
    describe('If the product is not found',()=>{
      const modelResponse = [];
      const serviceResponse = { code: 404, message: 'Product not found' };
      before(() => {
        sinon.stub(productsModel, 'getById').resolves(modelResponse);
      })
  
      after(() => {
        productsModel.getById.restore();
      });
      it('Retorna um objeto contendo o code 404 e as mensagem de erro', async ()=>{
        const serviceResponses = await productsService.getById();
        expect(serviceResponses).to.be.deep.equal(serviceResponse);
      })

    })
  })
})
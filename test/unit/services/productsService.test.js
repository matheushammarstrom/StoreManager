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
      it('Should return an object that has the property code and its equal to 200 and the property data that cointains all the products info',async ()=>{
        const serviceResponse = await productsService.getAll();
        expect(serviceResponse).to.be.deep.equal(serviceSuccessResponse);
      })
    })
  })

  describe('List product by id',()=>{
    describe('If the product is found',()=>{
      const modelResponse =[{id: 1, name: 'Martelo de Thor', quantity: 10}];
      const serviceSuccessResponse = {code: 200, data: {id: 1, name: 'Martelo de Thor', quantity: 10}};
      before(() => {
        sinon.stub(productsModel, 'getById').resolves(modelResponse);
      })
  
      after(() => {
        productsModel.getById.restore();
      });
      it('Should return an object that has the property code and its equal to 200 and the property data that cointains all the product info', async ()=>{
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
      it('Should return an object that has the property code and its equal to 404 and the property message containing the error message', async ()=>{
        const serviceResponses = await productsService.getById();
        expect(serviceResponses).to.be.deep.equal(serviceResponse);
      })

    })
  })
  describe('Create a new product',()=>{
    describe('If the product does not exist',()=> {
      const modelGetByNameResponse =  {insertId: 1};
      const serviceSuccessResponse = {code:201, data:{id: 1, name: 'Carro', quantity: 2}};
      before(() => {
        sinon.stub(productsModel, 'create').resolves(modelGetByNameResponse);
        sinon.stub(productsModel, 'getByName').resolves([]);
      })
  
      after(() => {
        productsModel.create.restore();
        productsModel.getByName.restore();
      });
      it('Should return the status code and the product info',async ()=> {
        const serviceResponse = await productsService.create('Carro', 2);
        expect(serviceResponse).to.be.deep.equal(serviceSuccessResponse);
      })
    })
    describe('If the product exists',()=>{
      const modelGetByNameResponse =  {insertId: 2};
      const serviceFailResponse = {code:409, message: 'Product already exists'};
      before(() => {
        sinon.stub(productsModel, 'create').resolves(modelGetByNameResponse);
        sinon.stub(productsModel, 'getByName').resolves([{name: 'car', quantity: 1, id: 3}]);
      })
  
      after(() => {
        productsModel.create.restore();
        productsModel.getByName.restore();
      });
      it('Should return the status code and the product info',async ()=> {
        const serviceResponse = await productsService.create();
        expect(serviceResponse).to.be.deep.equal(serviceFailResponse);
      })

    })
  })
  describe('Updates the product',()=>{
    describe('If the product does not exist',()=>{
      const modelGetByIdResponse = [];
      const serviceFailResponse = { code: 404, message: 'Product not found' }
      before(() => {
        sinon.stub(productsModel, 'getById').resolves(modelGetByIdResponse);
        sinon.stub(productsModel, 'update').resolves({insertId: 1});
      })
  
      after(() => {
        productsModel.update.restore();
        productsModel.getById.restore();
      });
      it('Should return the status code and the error message',async ()=> {
        const serviceResponse = await productsService.update();
        expect(serviceResponse).to.be.deep.equal(serviceFailResponse);
      })
    })
    describe('If the product exists', () => {
      const modelGetByIdResponse = [{name: 'Hammer'}];
      const serviceSucessResponse = {code: 200, data:{id: 1, name:'Hammer', quantity: 10}};
      before(() => {
        sinon.stub(productsModel, 'getById').resolves(modelGetByIdResponse);
        sinon.stub(productsModel, 'update').resolves({insertId: 1});
      })
  
      after(() => {
        productsModel.update.restore();
        productsModel.getById.restore();
      });
      it('Should return the product info updated',async ()=> {
        const serviceResponse = await productsService.update(1, 'Hammer', 10);
        expect(serviceResponse).to.be.deep.equal(serviceSucessResponse);
      })
    })

  })
})
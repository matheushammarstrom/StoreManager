const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/products');
const productsController = require('../../../controllers/products');

describe('Controller Tests: ',()=>{
  const request = {};
  const response = {};
  let next = () => {};
  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  })
  describe('List all products',()=>{

    describe('List all products',()=> {
      const serviceResponse = {code: 200, data: [{id: 1, name: 'Martelo de Thor', quantity: 10}]};
      before(()=>{
        sinon.stub(productsService, 'getAll').resolves(serviceResponse)
      })
      after(() => {
        productsService.getAll.restore();
      });

      it('Calls response.status with 200 value from serviceResponse.', async ()=>{
        await productsController.getAll(request, response, next)
        expect(response.status.calledWith(serviceResponse.code)).to.be.true;
      })

      it('Calls response.json with data from serviceResponse.', async()=> {
        await productsController.getAll(request, response, next);
        expect(response.json.calledWith(serviceResponse.data)).to.be.true;
      })
    })
  })
  describe('List product by id',()=>{
    describe('If the product is found', ()=>{
      const serviceResponse = {code: 200, data: {id: 1, name: 'Martelo de Thor', quantity: 10}}
      request.params = { id: 1 }
      before(()=>{
        sinon.stub(productsService, 'getById').resolves(serviceResponse)
      })
      after(() => {
        productsService.getById.restore();
      });
      it('Calls response.status with 200 value from serviceResponse.', async ()=>{
        await productsController.getById(request, response, next);
        expect(response.status.calledWith(serviceResponse.code)).to.be.true;
      })

      it('Calls response.json with data from serviceResponse.', async()=> {
        await productsController.getById(request, response, next);
        expect(response.json.calledWith(serviceResponse.data)).to.be.true;
      })
    })
    describe('If the product is not found', ()=>{
      const serviceResponse = { code: 404, message: 'Product not found'}
      request.params = { id: 1 }
      before(()=>{
        sinon.stub(productsService, 'getById').resolves(serviceResponse)
      })
      after(() => {
        productsService.getById.restore();
      });
      it('Calls response.status with 404 value from serviceResponse.', async ()=>{
        await productsController.getById(request, response, next);
        expect(response.status.calledWith(serviceResponse.code)).to.be.true;
      })

      it('Calls response.json with message from serviceResponse.', async()=> {
        await productsController.getById(request, response, next);
        expect(response.json.calledWith(serviceResponse.message)).to.be.true;
      })
    })
  })
})
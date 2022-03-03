const sinon = require('sinon');
const { expect } = require('chai');

const Joi = require('joi');
const productsService = require('../../../services/products');
const productsController = require('../../../controllers/products');
const productSchema = require('../../../schemas/productSchema');

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
        expect(response.json.calledWith({message: serviceResponse.message})).to.be.true;
      })
    })
  })
  describe('Create new product',()=>{
    describe('If the product format is invalid',()=>{
      it('Quando "name" não é enviado', async () =>{
        request.body = { quantity: 700 };
        await productsController.create(request, response, next)

        expect(response.status.calledWith('400')).to.be.true;
        expect(response.json.calledWith({message: '"name" is required'})).to.be.true;
      })
      it('Quando "quantity" não é enviado', async () =>{
        request.body = { name: 'car thor' };
        await productsController.create(request, response, next)
        expect(response.status.calledWith('400')).to.be.true;
        expect(response.json.calledWith({message: '"quantity" is required'})).to.be.true;
      })
    })
    describe('If the product format is valid', ()=>{
      describe('If the product already exists',()=>{
        const serviceResponse = { code: 404, message: 'Product not found'}
        before(()=>{
          sinon.stub(productsService, 'create').resolves(serviceResponse)
        })
        after(() => {
          productsService.create.restore();
        });
        it('Calls response.status with 404 value from serviceResponse.', async ()=>{
          await productsController.create(request, response, next);
          expect(response.status.calledWith(serviceResponse.code)).to.be.true;
        })
  
        it('Calls response.json with message from serviceResponse.', async()=> {
          await productsController.create(request, response, next);
          expect(response.json.calledWith({message: serviceResponse.message})).to.be.true;
        })
      })
      describe('If the product does not exist', ()=>{
        const serviceResponse = { code: 204, data: {name: 'Hammer Thor', id: 5, quantity: 10}}

        before(()=>{
          request.body = { name: 'Hammer Thor', quantity: 10 };
          sinon.stub(productsService, 'create').resolves(serviceResponse)
        })
        after(() => {
          productsService.create.restore();
        });

        it('Calls response.status with code value from serviceResponse.', async ()=>{
          await productsController.create(request, response, next);
          expect(response.status.calledWith(serviceResponse.code)).to.be.true;
        })
  
        it('Calls response.json with data from serviceResponse.', async()=> {
          await productsController.create(request, response, next);
          expect(response.json.calledWith(serviceResponse.data)).to.be.true;
        })

      })
    })
    
  })
  describe('Update a product', ()=>{
    describe('If the product info is invalid',()=>{
      it('Quando "name" não é enviado', async () =>{
        request.body = { quantity: 700 };
        await productsController.update(request, response, next)

        expect(response.status.calledWith('400')).to.be.true;
        expect(response.json.calledWith({message: '"name" is required'})).to.be.true;
      })
      it('Quando "quantity" não é enviado', async () =>{
        request.body = { name: 'car thor' };
        await productsController.update(request, response, next)
        expect(response.status.calledWith('400')).to.be.true;
        expect(response.json.calledWith({message: '"quantity" is required'})).to.be.true;
      })
    })
    describe('If the product does not exists', ()=>{
      const serviceResponse = { code: 404, message: 'Product not found' };
      before(()=> {
        sinon.stub(productsService, 'update').resolves(serviceResponse);
        request.body = { name: 'Hammer Thor', quantity: 10 };
      })
      after(()=>{
        productsService.update.restore();
      })
      it('Calls response.status with code value from serviceResponse.', async ()=>{
        await productsController.update(request, response, next);
        expect(response.status.calledWith(serviceResponse.code)).to.be.true;
      })

      it('Calls response.json with data from serviceResponse.', async()=> {
        await productsController.update(request, response, next);
        expect(response.json.calledWith({message: serviceResponse.message})).to.be.true;
      })
    })
    describe('If the product exists', ()=>{
      const serviceResponse = { code:200, data: {name: 'Hammer Thor', quantity:10, id: 2}};
      before(()=> {
        sinon.stub(productsService, 'update').resolves(serviceResponse);
        request.body = { name: 'Hammer Thor', quantity: 10 };
      })
      after(()=>{
        productsService.update.restore();
      })
      it('Calls response.status with code value from serviceResponse.', async ()=>{
        await productsController.update(request, response, next);
        expect(response.status.calledWith(serviceResponse.code)).to.be.true;
      })

      it('Calls response.json with data from serviceResponse.', async()=> {
        await productsController.update(request, response, next);
        expect(response.json.calledWith(serviceResponse.data)).to.be.true;
      })
    })
  })
})
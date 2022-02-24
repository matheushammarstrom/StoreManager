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

    const serviceResponse = {code: 200, data: [{id: 1, name: 'Martelo de Thor', quantity: 10}]};
    describe('List all sales',()=> {
      before(()=>{
        sinon.stub(productsService, 'getAll').resolves(serviceResponse)
      })
      after(() => {
        productsService.getAll.restore();
      });

      it('Calls response.status with "code" value from serviceResponse.', async ()=>{
        await productsController.getAll(request, response, next)
        expect(response.status.calledWith(serviceResponse.code)).to.be.true;
      })

      it('Calls response.json with data from serviceResponse.', async()=> {
        await productsController.getAll(request, response, next);
        expect(response.json.calledWith(serviceResponse.data)).to.be.true;
      })

    })
  })
})
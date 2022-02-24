const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../services/sales');
const salesController = require('../../../controllers/sales');

describe('Controller Tests: ',()=>{
  const request = {};
  const response = {};
  let next = () => {};
  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    next = sinon.stub().returns();
  })
  describe('List all sales',()=>{

    const serviceResponse = {code: 200, data: [{id: 1, date: '2021-09-09  00:45:32'}]};
    describe('List all sales',()=> {
      before(()=>{
        sinon.stub(salesService, 'getAll').resolves(serviceResponse)
      })
      after(() => {
        salesService.getAll.restore();
      });

      it('Calls response.status with "code" value from serviceResponse.', async ()=>{
        await salesController.getAll(request, response, next)
        expect(response.status.calledWith(serviceResponse.code)).to.be.true;
      })

      it('Calls response.json with data from serviceResponse.', async()=> {
        await salesController.getAll(request, response, next);
        expect(response.json.calledWith(serviceResponse.data)).to.be.true;
      })

    })
  })
})
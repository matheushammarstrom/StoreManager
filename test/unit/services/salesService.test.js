const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../services/sales');
const salesModel = require('../../../models/sales');

describe('Services Tests: ',()=>{
  describe('List all sales',()=>{
    const modelResponse = [{ date: '2021-09-09  00:45:32', product_id: 2, quantity: 3, sale_id: 4}];
    const serviceSuccessResponse = {code: 200, data: [{date: '2021-09-09  00:45:32', productId: 2, quantity: 3, saleId: 4}]};
    describe('List all sales',()=> {
      before(() => {
        sinon.stub(salesModel, 'getAll').resolves(modelResponse);
      })
  
      after(() => {
        salesModel.getAll.restore();
      });
      it('Should return an object that has the property code and its equal to 200 and the property data that cointains all the sales info',async ()=>{
        const serviceResponse = await salesService.getAll();
        expect(serviceResponse).to.be.deep.equal(serviceSuccessResponse);
      })
    })
  })
  describe('List sale by id',()=>{
    describe('If the sale is found',()=>{
      const modelResponse = [{ date: '2021-09-09  00:45:32', product_id: 2, quantity: 3, sale_id: 4}];
      const serviceSuccessResponse = {code: 200, data: [{ date: '2021-09-09  00:45:32', productId: 2, quantity: 3}]};
      before(() => {
        sinon.stub(salesModel, 'getById').resolves(modelResponse);
      })
  
      after(() => {
        salesModel.getById.restore();
      });
      it('Should return an object that has the property code and its equal to 200 and the property data that cointains the sale info', async ()=>{
        const serviceResponses = await salesService.getById();
        expect(serviceResponses).to.be.deep.equal(serviceSuccessResponse);
      })
    })
    
    describe('If the sale is not found',()=>{
      const modelResponse = [];
      const serviceResponse = { code: 404, message: 'Sale not found' };
      before(() => {
        sinon.stub(salesModel, 'getById').resolves(modelResponse);
      })
  
      after(() => {
        salesModel.getById.restore();
      });
      it('Should return an object that has the property code and its equal to 404 and the property message containing the error message', async ()=>{
        const serviceResponses = await salesService.getById();
        expect(serviceResponses).to.be.deep.equal(serviceResponse);
      })

    })
  })
})
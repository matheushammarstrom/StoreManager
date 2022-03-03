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
  describe('Create new product', ()=>{
    const executeResponse = [{insertId: 1}]
    before(() => {
      sinon.stub(DB, 'execute').resolves(executeResponse);
    })

    after(() => {
      DB.execute.restore();
    });
    it('Deve retornar um objeto contendo a chave insertId',async ()=>{
      const modelResponse = await products.create();
      expect(modelResponse).to.have.property('insertId');
    })
  })
  describe('Check if a product already exists', ()=>{
    describe('If the product exists', () => { 
      const executeResponse = [{name: 'car'},{}]
      before(() => {
        sinon.stub(DB, 'execute').resolves(executeResponse);
      })
      after(() => {
        DB.execute.restore();
      });
        it('Should return an object with product info if exists', async ()=>{
          const modelResponse = await products.getByName();
          expect(modelResponse).to.have.property('name');
      }) })
    describe('If the product does not exist',()=>{
      const executeResponse = [[],{}]
      before(() => {
        sinon.stub(DB, 'execute').resolves(executeResponse);
      })
      after(() => {
        DB.execute.restore();
      });
        it('Should return an empty array if product does not exist', async ()=>{
          const modelResponse = await products.getByName();
          expect(modelResponse).to.be.deep.equal([]);
      })
    })
  })
  describe('Updates a product', ()=> {
    const executeResponse = [{insertId: 1}]
    before(() => {
      sinon.stub(DB, 'execute').resolves(executeResponse);
    })

    after(() => {
      DB.execute.restore();
    });
    it('Should return an object containing insertId',async ()=>{
      const modelResponse = await products.update();
      expect(modelResponse).to.have.property('insertId');
    })
  })
})
/*globals describe, it*/
let SolidityCompiler = require('../lib/modules/solidity');
let TestLogger = require('../lib/tests/test_logger.js');
let File = require('../lib/core/file.js');
let assert = require('assert');

let readFile = function(file) {
  return new File({filename: file, type: File.types.dapp_file, path: file});
};

var solcVersion = "0.4.17";

var TestEvents = {
  request: (cmd, cb) => {
    cb(solcVersion);
  }
};

var apiObject = {
  registerCompiler: function() {},
  logger: new TestLogger({}),
  events: TestEvents
};

describe('embark.Compiler', function() {
  //let compiler = new Compiler({logger: new TestLogger({})});
  let compiler = new SolidityCompiler(apiObject, {contractDirectories: ['app/contracts/']});

  describe('#compile_solidity', function() {
    this.timeout(0);

    let expectedObject = {};

    expectedObject["SimpleStorage"] = {"code":"6060604052341561000f57600080fd5b60405160208061010883398101604052808051600055505060d3806100356000396000f300606060405263ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416632a1afcd98114604f57806360fe47b11460715780636d4ce63c14608657600080fd5b3415605957600080fd5b605f6096565b60405190815260200160405180910390f35b3415607b57600080fd5b6084600435609c565b005b3415609057600080fd5b605f60a1565b60005481565b600055565b600054905600a165627a7a72305820330a7d10dd5f07c8182fbdff4e0f5c5994830dbc4f07922898d06486526bead30029","runtimeBytecode":"606060405263ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416632a1afcd98114604f57806360fe47b11460715780636d4ce63c14608657600080fd5b3415605957600080fd5b605f6096565b60405190815260200160405180910390f35b3415607b57600080fd5b6084600435609c565b005b3415609057600080fd5b605f60a1565b60005481565b600055565b600054905600a165627a7a72305820330a7d10dd5f07c8182fbdff4e0f5c5994830dbc4f07922898d06486526bead30029","realRuntimeBytecode":"606060405263ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416632a1afcd98114604f57806360fe47b11460715780636d4ce63c14608657600080fd5b3415605957600080fd5b605f6096565b60405190815260200160405180910390f35b3415607b57600080fd5b6084600435609c565b005b3415609057600080fd5b605f60a1565b60005481565b600055565b600054905600a165627a7a72305820","swarmHash":"330a7d10dd5f07c8182fbdff4e0f5c5994830dbc4f07922898d06486526bead3","gasEstimates":{"creation":{"codeDepositCost":"42200","executionCost":"20140","totalCost":"62340"},"external":{"get()":"396","set(uint256)":"20135","storedData()":"352"}},"functionHashes":{"get()":"6d4ce63c","set(uint256)":"60fe47b1","storedData()":"2a1afcd9"},"abiDefinition":[{"constant":true,"inputs":[],"name":"storedData","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"retVal","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialValue","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}],"filename":"test/contracts/simple_storage.sol"};

    expectedObject["Token"] = {"code":"6060604052341561000f57600080fd5b60405160208061047583398101604052808051600160a060020a03331660009081526020819052604090208190556002555050610424806100516000396000f300606060405236156100755763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663095ea7b3811461007a57806318160ddd146100b057806323b872dd146100d557806370a08231146100fd578063a9059cbb1461011c578063dd62ed3e1461013e575b600080fd5b341561008557600080fd5b61009c600160a060020a0360043516602435610163565b604051901515815260200160405180910390f35b34156100bb57600080fd5b6100c36101cf565b60405190815260200160405180910390f35b34156100e057600080fd5b61009c600160a060020a03600435811690602435166044356101d5565b341561010857600080fd5b6100c3600160a060020a03600435166102e9565b341561012757600080fd5b61009c600160a060020a0360043516602435610304565b341561014957600080fd5b6100c3600160a060020a03600435811690602435166103c6565b600160a060020a03338116600081815260016020908152604080832094871680845294909152808220859055909291907f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259085905190815260200160405180910390a350600192915050565b60025490565b600160a060020a038316600090815260208190526040812054829010156101fb57600080fd5b600160a060020a03808516600090815260016020908152604080832033909416835292905220548290101561022f57600080fd5b600160a060020a03831660009081526020819052604090205461025290836103f1565b151561025d57600080fd5b600160a060020a0380851660008181526001602090815260408083203386168452825280832080548890039055838352908290528082208054879003905592861680825290839020805486019055917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9085905190815260200160405180910390a35060019392505050565b600160a060020a031660009081526020819052604090205490565b600160a060020a0333166000908152602081905260408120548290101561032a57600080fd5b600160a060020a03831660009081526020819052604090205461034d90836103f1565b151561035857600080fd5b600160a060020a033381166000818152602081905260408082208054879003905592861680825290839020805486019055917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9085905190815260200160405180910390a350600192915050565b600160a060020a03918216600090815260016020908152604080832093909416825291909152205490565b81011015905600a165627a7a723058203c32962ee70b1d7d79b4ca95877ef502f88f4b06fd14a1464f74a1a84bb0f7c90029","runtimeBytecode":"606060405236156100755763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663095ea7b3811461007a57806318160ddd146100b057806323b872dd146100d557806370a08231146100fd578063a9059cbb1461011c578063dd62ed3e1461013e575b600080fd5b341561008557600080fd5b61009c600160a060020a0360043516602435610163565b604051901515815260200160405180910390f35b34156100bb57600080fd5b6100c36101cf565b60405190815260200160405180910390f35b34156100e057600080fd5b61009c600160a060020a03600435811690602435166044356101d5565b341561010857600080fd5b6100c3600160a060020a03600435166102e9565b341561012757600080fd5b61009c600160a060020a0360043516602435610304565b341561014957600080fd5b6100c3600160a060020a03600435811690602435166103c6565b600160a060020a03338116600081815260016020908152604080832094871680845294909152808220859055909291907f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259085905190815260200160405180910390a350600192915050565b60025490565b600160a060020a038316600090815260208190526040812054829010156101fb57600080fd5b600160a060020a03808516600090815260016020908152604080832033909416835292905220548290101561022f57600080fd5b600160a060020a03831660009081526020819052604090205461025290836103f1565b151561025d57600080fd5b600160a060020a0380851660008181526001602090815260408083203386168452825280832080548890039055838352908290528082208054879003905592861680825290839020805486019055917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9085905190815260200160405180910390a35060019392505050565b600160a060020a031660009081526020819052604090205490565b600160a060020a0333166000908152602081905260408120548290101561032a57600080fd5b600160a060020a03831660009081526020819052604090205461034d90836103f1565b151561035857600080fd5b600160a060020a033381166000818152602081905260408082208054879003905592861680825290839020805486019055917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9085905190815260200160405180910390a350600192915050565b600160a060020a03918216600090815260016020908152604080832093909416825291909152205490565b81011015905600a165627a7a723058203c32962ee70b1d7d79b4ca95877ef502f88f4b06fd14a1464f74a1a84bb0f7c90029","realRuntimeBytecode":"606060405236156100755763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663095ea7b3811461007a57806318160ddd146100b057806323b872dd146100d557806370a08231146100fd578063a9059cbb1461011c578063dd62ed3e1461013e575b600080fd5b341561008557600080fd5b61009c600160a060020a0360043516602435610163565b604051901515815260200160405180910390f35b34156100bb57600080fd5b6100c36101cf565b60405190815260200160405180910390f35b34156100e057600080fd5b61009c600160a060020a03600435811690602435166044356101d5565b341561010857600080fd5b6100c3600160a060020a03600435166102e9565b341561012757600080fd5b61009c600160a060020a0360043516602435610304565b341561014957600080fd5b6100c3600160a060020a03600435811690602435166103c6565b600160a060020a03338116600081815260016020908152604080832094871680845294909152808220859055909291907f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259085905190815260200160405180910390a350600192915050565b60025490565b600160a060020a038316600090815260208190526040812054829010156101fb57600080fd5b600160a060020a03808516600090815260016020908152604080832033909416835292905220548290101561022f57600080fd5b600160a060020a03831660009081526020819052604090205461025290836103f1565b151561025d57600080fd5b600160a060020a0380851660008181526001602090815260408083203386168452825280832080548890039055838352908290528082208054879003905592861680825290839020805486019055917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9085905190815260200160405180910390a35060019392505050565b600160a060020a031660009081526020819052604090205490565b600160a060020a0333166000908152602081905260408120548290101561032a57600080fd5b600160a060020a03831660009081526020819052604090205461034d90836103f1565b151561035857600080fd5b600160a060020a033381166000818152602081905260408082208054879003905592861680825290839020805486019055917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9085905190815260200160405180910390a350600192915050565b600160a060020a03918216600090815260016020908152604080832093909416825291909152205490565b81011015905600a165627a7a72305820","swarmHash":"3c32962ee70b1d7d79b4ca95877ef502f88f4b06fd14a1464f74a1a84bb0f7c9","gasEstimates":{"creation":{"codeDepositCost":"212000","executionCost":"40459","totalCost":"252459"},"external":{"allowance(address,address)":"804","approve(address,uint256)":"22330","balanceOf(address)":"661","totalSupply()":"392","transfer(address,uint256)":"43608","transferFrom(address,address,uint256)":"64391"},"internal":{"safeToAdd(uint256,uint256)":"24"}},"functionHashes":{"allowance(address,address)":"dd62ed3e","approve(address,uint256)":"095ea7b3","balanceOf(address)":"70a08231","totalSupply()":"18160ddd","transfer(address,uint256)":"a9059cbb","transferFrom(address,address,uint256)":"23b872dd"},"abiDefinition":[{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"ok","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"supply","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"ok","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"ok","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"_allowance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initial_balance","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}],"filename":"test/contracts/token.sol"};

    it('should generate compiled code and abi', function(done) {
      compiler.compile_solidity([
        readFile('test/contracts/simple_storage.sol'),
        readFile('test/contracts/token.sol')
      ], function(err, compiledContracts) {
        assert.deepEqual(compiledContracts, expectedObject);
        done();
      });
    });

  });

});

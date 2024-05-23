const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Cargar el archivo proto
const PROTO_PATH = path.join(__dirname, 'proto', 'audio.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const audioProto = grpc.loadPackageDefinition(packageDefinition).AudioService;

// Crear el cliente gRPC
const grpcClient = new audioProto(
  'localhost:3500', 
  grpc.credentials.createInsecure()
);

module.exports = grpcClient;

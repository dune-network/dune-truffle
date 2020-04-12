declare module "@dune-network/contract" {
  import { ContractObject } from "@dune-network/contract-schema";
  namespace TruffleContract {
    export type Contract = ContractObject;
  }
  export default TruffleContract;
}

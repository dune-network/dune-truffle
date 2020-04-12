declare module "@dune-network/contract-schema" {
  import { ContractObject } from "@dune-network/contract-schema/spec";
  export { ContractObject } from "@dune-network/contract-schema/spec";

  namespace Schema {
    export function normalize(dirtyObj: object, opts?: object): ContractObject;
  }

  export default Schema;
}

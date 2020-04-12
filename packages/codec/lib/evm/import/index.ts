import * as Format from "@dune-network/codec/format";
import { makeTypeId } from "@dune-network/codec/contexts/import";
import { InternalFunction } from "@dune-network/codec/evm/types";

//creates a type object for the contract the function was defined in
export function functionTableEntryToType(
  functionEntry: InternalFunction
): Format.Types.ContractTypeNative {
  return {
    typeClass: "contract" as const,
    kind: "native" as const,
    id: makeTypeId(functionEntry.contractId, functionEntry.compilationId),
    typeName: functionEntry.contractName,
    contractKind: functionEntry.contractKind,
    payable: functionEntry.contractPayable
  };
}

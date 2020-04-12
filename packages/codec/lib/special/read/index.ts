import * as Evm from "@dune-network/codec/evm";
import * as Pointer from "@dune-network/codec/pointer";

export function readSpecial(
  pointer: Pointer.SpecialPointer,
  state: Evm.EvmState
): Uint8Array {
  //not bothering with error handling on this one as I don't expect errors
  return state.specials[pointer.special];
}

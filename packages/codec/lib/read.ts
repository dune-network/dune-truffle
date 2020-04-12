import * as StorageRead from "@dune-network/codec/storage/read";
import * as StackRead from "@dune-network/codec/stack/read";
import * as BytesRead from "@dune-network/codec/bytes/read";
import * as AstConstantRead from "@dune-network/codec/ast-constant/read";
import * as TopicRead from "@dune-network/codec/topic/read";
import * as SpecialRead from "@dune-network/codec/special/read";
import * as Pointer from "@dune-network/codec/pointer";
import { DecoderRequest } from "@dune-network/codec/types";
import * as Evm from "@dune-network/codec/evm";

export default function* read(
  pointer: Pointer.DataPointer,
  state: Evm.EvmState
): Generator<DecoderRequest, Uint8Array, Uint8Array> {
  switch (pointer.location) {
    case "stack":
      return StackRead.readStack(pointer, state);

    case "storage":
      return yield* StorageRead.readStorage(pointer, state);

    case "memory":
    case "calldata":
    case "eventdata":
    case "returndata":
      return BytesRead.readBytes(pointer, state);

    case "stackliteral":
      return StackRead.readStackLiteral(pointer);

    case "definition":
      return AstConstantRead.readDefinition(pointer);

    case "special":
      return SpecialRead.readSpecial(pointer, state);

    case "eventtopic":
      return TopicRead.readTopic(pointer, state);
  }
}

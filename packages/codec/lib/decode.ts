import debugModule from "debug";
const debug = debugModule("codec:decode");

import * as AstConstant from "@dune-network/codec/ast-constant";
import * as AbiData from "@dune-network/codec/abi-data";
import * as Format from "@dune-network/codec/format";
import * as Pointer from "@dune-network/codec/pointer";
import * as Basic from "@dune-network/codec/basic";
import * as Bytes from "@dune-network/codec/bytes";
import * as Evm from "@dune-network/codec/evm";
import { DecoderRequest, DecoderOptions } from "@dune-network/codec/types";
import * as Memory from "@dune-network/codec/memory";
import * as Special from "@dune-network/codec/special";
import * as Stack from "@dune-network/codec/stack";
import * as Storage from "@dune-network/codec/storage";
import * as Topic from "@dune-network/codec/topic";

export default function* decode(
  dataType: Format.Types.Type,
  pointer: Pointer.DataPointer,
  info: Evm.EvmInfo,
  options: DecoderOptions = {}
): Generator<DecoderRequest, Format.Values.Result, Uint8Array> {
  return Format.Utils.Circularity.tie(
    yield* decodeDispatch(dataType, pointer, info, options)
  );
}

function* decodeDispatch(
  dataType: Format.Types.Type,
  pointer: Pointer.DataPointer,
  info: Evm.EvmInfo,
  options: DecoderOptions = {}
): Generator<DecoderRequest, Format.Values.Result, Uint8Array> {
  debug("type %O", dataType);
  debug("pointer %O", pointer);

  switch (pointer.location) {
    case "storage":
      return yield* Storage.Decode.decodeStorage(dataType, pointer, info);

    case "stack":
      return yield* Stack.Decode.decodeStack(dataType, pointer, info);

    case "stackliteral":
      return yield* Stack.Decode.decodeLiteral(dataType, pointer, info);

    case "definition":
      return yield* AstConstant.Decode.decodeConstant(dataType, pointer, info);

    case "special":
      return yield* Special.Decode.decodeSpecial(dataType, pointer, info);

    case "calldata":
    case "eventdata":
    case "returndata":
      return yield* AbiData.Decode.decodeAbi(dataType, pointer, info, options);

    case "eventtopic":
      return yield* Topic.Decode.decodeTopic(dataType, pointer, info, options);

    case "memory":
      //NOTE: this case should never actually occur, but I'm including it
      //anyway as a fallback
      return yield* Memory.Decode.decodeMemory(
        dataType,
        pointer,
        info,
        options
      );
  }
}

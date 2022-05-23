import React from "react";
import OpcodeCardLarge from "./OpcodeCardLarge";

export const TestOpcodeLarge = () => {
    const data = {
        "_id":"625b22853323612bb4f1f468",
        "mnemonic":"LD",
        "bytes":3,
        "cycles":[12],
        "operands":[
            {"name":"BC","immediate":true},
            {"name":"d16","bytes":2,"immediate":true}
        ],
        "immediate":true,
        "flags":{"Z":"-","N":"-","H":"-","C":"-"},
        "hexCode":"0x01",
        "category":"sixteenBitLd"};


    return <OpcodeCardLarge 
        mnemonic={data.mnemonic}
        bytes={data.bytes}
        cycles={data.cycles}
        operands={data.operands}
        immediate={data.immediate}
        flags={data.flags}
        hexCode={data.hexCode}
        category={data.category}
        />
}
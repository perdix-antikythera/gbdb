import React, {useContext} from 'react';
import OpcodeCardSmall from './OpcodeCardSmall';

const TestOpcodeCardSmall = () => {
    const data = {
        "_id": "625b22853323612bb4f1f469",
        "mnemonic": "LD",
        "bytes": 1,
        "cycles": [
            8
        ],
        "operands": [
            {
                "name": "BC",
                "immediate": false
            },
            {
                "name": "A",
                "immediate": true
            }
        ],
        "immediate": false,
        "flags": {
            "Z": "-",
            "N": "-",
            "H": "-",
            "C": "-"
        },
        "hexCode": "0x02"
    };

    return(
        <OpcodeCardSmall
            mnemonic={data.mnemonic}
            cycles={data.cycles}
            operands={data.operands}
            flags={data.flags}
            hexCode={data.hexCode}
        />
    );
};

export default TestOpcodeCardSmall;
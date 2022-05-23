 // How we can combine together the various rows
 export const logicalOptions = [
    {value: 'and', label:'AND'},
    {value: 'or', label:"OR"},
];

// The different types of information that we can search by
export const searchTypeOptions = [
    {value: 'category', label: 'Opcode Category'},
    {value: 'mnemonic', label: 'Mnemonic'},
    {value: 'bytes', label: 'Bytes'},
    {value: 'immediate', label: 'Immediate'},
    {value: 'hexCode', label: 'Hex Code'},
    {value: 'cycles', label: 'Cycles'},
    {value: 'flags', label: 'Flags'},
    {value: 'operand', label: 'Operand'},
];

// Allowed values for mnemonic 
export const mnemonicOptions = [
    {value: 'NOP', label:'NOP'},
    {value: 'LD', label:'LD'},
    {value: 'INC', label:'INC'},
    {value: 'DEC', label:'DEC'},
    {value: 'RLCA', label:'RLCA'},
    {value: 'ADD', label:'ADD'},
    {value: 'RRCA', label:'RRCA'},
    {value: 'STOP', label:'STOP'},
    {value: 'RLA', label:'RLA'},
    {value: 'JR', label:'JR'},
    {value: 'RRA', label:'RRA'},
    {value: 'DAA', label:'DAA'},
    {value: 'CPL', label:'CPL'},
    {value: 'SCF', label:'SCF'},
    {value: 'CCF', label:'CCF'},
    {value: 'HALT', label:'HALT'},
    {value: 'ADC', label:'ADC'},
    {value: 'SUB', label:'SUB'},
    {value: 'SBC', label:'SBC'},
    {value: 'AND', label:'AND'},
    {value: 'XOR', label:'XOR'},
    {value: 'OR', label:'OR'},
    {value: 'CP', label:'CP'},
    {value: 'RET', label:'RET'},
    {value: 'POP', label:'POP'},
    {value: 'JP', label:'JP'},
    {value: 'CALL', label:'CALL'},
    {value: 'PUSH', label:'PUSH'},
    {value: 'RST', label:'RST'},
    {value: 'PREFIX', label:'PREFIX'},
    {value: 'ILLEGAL_D3', label:'ILLEGAL_D3'},
    {value: 'RETI', label:'RETI'},
    {value: 'ILLEGAL_DB', label:'ILLEGAL_DB'},
    {value: 'ILLEGAL_DD', label:'ILLEGAL_DD'},
    {value: 'LDH', label:'LDH'},
    {value: 'ILLEGAL_E3', label:'ILLEGAL_E3'},
    {value: 'ILLEGAL_E4', label:'ILLEGAL_E4'},
    {value: 'ILLEGAL_EB', label:'ILLEGAL_EB'},
    {value: 'ILLEGAL_EC', label:'ILLEGAL_EC'},
    {value: 'ILLEGAL_ED', label:'ILLEGAL_ED'},
    {value: 'DI', label:'DI'},
    {value: 'ILLEGAL_F4', label:'ILLEGAL_F4'},
    {value: 'EI', label:'EI'},
    {value: 'ILLEGAL_FC', label:'ILLEGAL_FC'},
    {value: 'ILLEGAL_FD', label:'ILLEGAL_FD'},
    {value: 'RLC', label:'RLC'},
    {value: 'RRC', label:'RRC'},
    {value: 'RL', label:'RL'},
    {value: 'RR', label:'RR'},
    {value: 'SLA', label:'SLA'},
    {value: 'SRA', label:'SRA'},
    {value: 'SWAP', label:'SWAP'},
    {value: 'SRL', label:'SRL'},
    {value: 'BIT', label:'BIT'},
    {value: 'RES', label:'RES'},
    {value: 'SET', label:'SET'},
];

// Allowed options for category
export const categoryOptions = [
    {value:'eightBitLd', label:'8 Bit Loads'},
    {value:'sixteenBitLd', label:'16 Bit Loads'},
    {value:'eightBitAlu', label:'8 Bit ALU Operations'},
    {value:'sixteenBitAlu', label:'16 Bit ALU Operations'},
    {value:'jp', label:'Jump & Call Operations'},
    {value:'ctrl', label:'Control Operations'},
    {value:'reg', label:'Shift, Rotate, & Bitwise Operations'},
    {value:'illegal', label: 'Illegal Operations'}
];

// allowed options for bytes
export const bytesOptions = [
    {value:1, label:1},
    {value:2, label:2},
    {value:3, label:3},
];

// allowed options for cycle values
export const cyclesOptions = [
    {value:4, label: 4},
    {value:8, label: 8},
    {value:12, label:12},
    {value:16, label: 16},
    {value:20, label:20},
    {value:24, label:24},
];

// allowed options for cycle operations
export const operationOptions = [
    {value: 'lt', label: 'Less Than'},
    {value: 'eq', label: 'Equal To'},
    {value: 'gt', label: 'Greater Than'}
];

// common flag options
// others will be added when the component generates
export const flagOptions = [
    {value: '0', label: '0'},
    {value: '1', label: '1'},
    {value: '-', label: '-'},
    {value: 'N', label: 'N'},
    {value: 'Z', label: 'Z'},
    {value: 'H', label: 'H'},
    {value: 'C', label: 'C'},
]; 

export const operandNameOptions = [
    {value:'d8', label:'d8'},
    {value:'d16', label:'d16'},
    {value:'r8', label:'r8'},
    {value:'a8', label:'a8'},
    {value:'a16', label:'a16'},
    {value:'SP', label:'SP'},
    {value:'AF', label:'AF'},
    {value:'BC', label:'BC'},
    {value:'DE', label:'DE'},
    {value:'HL', label:'HL'},
    {value: 'A', label:'A'},
    {value: 'B', label:'B'},
    {value:'C', label:'C'},
    {value:'D', label:'D'},
    {value:'E', label:'E'},
    {value:'NZ', label:'NZ'},
    {value:'H', label:'H'},
    {value:'Z', label:'Z'},
    {value:'L', label:'L'},
    {value:'NC', label:'NC'},
    {value:'00H', label:'00H'},
    {value:'08H', label:'00H'},
    {value:'10H', label:'10H'},
    {value:'18H', label:'18H'},
    {value:'20H', label:'20H'},
    {value:'28H', label:'28H'},
    {value:'30H', label:'30H'},
    {value:'38H', label:'38H'},
    {value:'0', label:'0'},
    {value:'1', label:'1'},
    {value:'2', label:'2'},
    {value:'3', label:'3'},
    {value:'4', label:'4'},
    {value:'5', label:'5'},
    {value:'6', label:'6'},
    {value:'7', label:'7'},
];

export const operandBytesOptions = [
    {value: '0', label:'0'},
    {value: '1', label:'1'},
    {value: '2', label:'2'},
];

// Will be used by both the top level 'does this operation take data immediately from the stream'
// as well as the 'is this operand taken from the stream' searches
export const immediateOptions = [
    {value: true, label:'True'},
    {value: false, label: 'False'},
];


export const operandIndexOptions = [
    {value: '0', label:'0'},
    {value: '1', label:'1'}
];
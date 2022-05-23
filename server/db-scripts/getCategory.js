// 8 bit loads
const eightBitLdTheme = {
    primary: 'var(--color-pinkred)',
    secondary: "var(--color-pinkred-ds)",
};

//  16 bit loads
const sixteenBitLdTheme =  {
    primary: 'var(--color-pink)',
    secondary: "var(--color-pink-ds)",
};

// 8 bit alu ops
 const eightBitAluTheme = {
    primary: "var(--color-lightblue)",
    secondary: "var(--color-lightblue-ds)",
};

// 16 bit alu ops
 const sixteenBitAluTheme = {
    primary: "var(--color-blue)",
    secondary: "var(--color-blue-ds)",
};

// jump & call ops
 const jpTheme = {
    primary: "var(--color-tangerine)",
    secondary: "var(--color-tangerine-ds)",
};

// 8 bit shifts, rotations, bitwise ops
 const regTheme = {
    primary: "var(--color-purple)",
    secondary: "var(--color-purple-ds)",
};


// control ops
 const controlTheme = {
    primary: "var(--color-bluegreen)",
    secondary: "var(--color-bluegreen-ds)"
};

// fallback

 const defaultTheme = {
    primary: '#F5F5F5',
    secondary: '#808080',
}

 const isEightBit = (mnemonic, operands) => {
    // return a boolean representing if an operation is an 8 bit operation
    /*
        Loads/moves:
        1) If the opernand list contains d16, it is 2 bytes
        2) Pop or Push operands are considerd 2 bytes
        3) Loads acting on SP and one of HL, a16 are 2 bytes

        ALU:
        1) INC on a 16 bit register is considered 2 bytes
        2) DEC on a 16 bit register is considered 2 bytes
        3) ADD on 2 16 bit registers is considered 2 bytes
    */

    // ALU operations
    if(['INC', 'DEC', 'ADD'].includes(mnemonic)){
        // 16 bit registers will have a name at least two chars
        // if any 16bit operand is present, consider this a 16 bit operation
        return operands.every(operand => operand.name.length < 2);
    }

    else if(mnemonic === 'LD'){
        let isEightB = true;
        let operandNames = operands.map(operand => operand.name);

        if(operandNames.includes('d16')){
            isEightB = false;
        }

        if(
            operandNames === ['HL', 'SP', 'r8'] || 
            operandNames === ['SP', 'HL'] ||
            operandNames === ['a16', 'SP']
        ){
            isEightB = false;
        }

        return isEightB;
    }

    else if(['POP', 'PUSH'].includes(mnemonic)){
        return false;
    }

    else{
        return true;
    }
}

 const getCardColor = (mnemonic, operands) => {
    
    const isEightB = isEightBit(mnemonic, operands);
    if(['NOP', 'STOP', 'HALT', 'PREFIX', 'DI', 'EI'].includes(mnemonic)){
        return controlTheme;
    }

    else if([
        'RLCA',
        'RRCA',
        'RLA',
        'RRA',
        'RLC',
        'RRC',
        'RR',
        'RL',
        'SLA',
        'SRA',
        'SWAP',
        'SRL',
        'BIT',
        'RES',
        'SET'
    ].includes(mnemonic)){
        return regTheme;
    }

    else if(mnemonic === 'LD' && isEightB){
        return eightBitLdTheme;
    }

    else if(['LD', 'PUSH', 'POP'].includes(mnemonic) && !isEightB){
        return sixteenBitLdTheme;
    }

    else if([
        'INC',
        'DEC',
        'ADD',
        'DAA',
        'CPL',
        'SCF',
        'CCF',
        'ADC',
        'SUB',
        'SBC',
        'AND',
        'XOR',
        'OR',
        'CP',
    ].includes(mnemonic) && isEightB ){
        return eightBitAluTheme;
    }

    else if(['INC', 'ADD', 'DEC'].includes(mnemonic) && !isEightB){
        return sixteenBitAluTheme;
    }

    else if([
        'RET',
        'JP',
        'CALL',
        'JR',
        'RET',
        'RETI',
        'RST',
    ].includes(mnemonic)) {
        return jpTheme;
    }

    else{
        return defaultTheme;
    }
}


const getCategory = (mnemonic, operands) => {
    // To be used for categorizing opcodes in the DB
    const theme = getCardColor(mnemonic, operands);
    switch(theme){
        case eightBitLdTheme:{
            return 'eightBitLd';
        }

        case sixteenBitLdTheme:{
            return 'sixteenBitLd';
        }

        case eightBitAluTheme: {
            return 'eightBitAlu';
        }

        case sixteenBitAluTheme: {
            return 'sixteenBitAlu';
        }

        case jpTheme: {
            return 'jp';
        }

        case regTheme: {
            return 'reg';
        }

        case controlTheme: {
            return 'control';
        }

        case defaultTheme: {
            return 'illegal';
        }

        default:{
            return '';
        }
    }
};

// This will be used as a part of the DB population
module.exports = { getCategory };
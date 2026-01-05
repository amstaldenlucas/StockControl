/**
 * Mapeamento das configurações de máscara para uso com o hook useMask 
 * da biblioteca '@react-input/mask'.
 * * NOTA: 'replacement' aceita regex ou strings.
 * 'A': Letras (alfabéticos)
 * '9': Dígitos (numéricos)
 */

// Padrão para letras (alfabéticos)
const CHAR_ALPHABETIC = /[a-zA-Z]/; 

// Padrão para dígitos (numéricos)
const CHAR_DIGIT = /\d/;

export const maskCpf = {
  mask: '___.___.___-__', // 999.999.999-99
  replacement: { '_': CHAR_DIGIT },
  maxLength: 14,
  placeholder: '999.999.999-99',
};

export const maskCnpj = {
  mask: '__.___.___/____-__', // 99.999.999/9999-99
  replacement: { '_': CHAR_DIGIT },
  maxLength: 18,
  placeholder: '99.999.999/9999-99',
};

export const maskPhone = {
  mask: '(__) _____-____', // (99) 99999-9999
  replacement: { '_': CHAR_DIGIT },
  maxLength: 15,
  placeholder: '(99) 99999-9999',
};

export const maskCep = {
  mask: '_____-___', // 99999-999
  replacement: { '_': CHAR_DIGIT },
  maxLength: 9,
  placeholder: '99999-999',
};

export const maskPlaca = {
  mask: 'AAA-9A99',
  replacement: {
    'A': CHAR_ALPHABETIC,
    '9': CHAR_DIGIT,
  },
  maxLength: 8,
  placeholder: 'AAA-9A99',
};

// Se preferir exportar tudo como um objeto único:
// export const MASK_CONFIGS = {
//   cpf: maskCpf,
//   cnpj: maskCnpj,
//   phone: maskPhone,
//   cep: maskCep,
//   placa: maskPlaca,
// };